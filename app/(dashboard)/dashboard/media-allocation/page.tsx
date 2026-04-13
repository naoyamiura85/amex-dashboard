"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"

interface MediaChannel {
  id: string
  name: string
  allocation: number
  color: string
  roi: number
}

const INITIAL_CHANNELS: MediaChannel[] = [
  { id: "tv", name: "TV", allocation: 30, color: "#006FCF", roi: 1.8 },
  { id: "digital", name: "デジタル広告", allocation: 35, color: "#B4975A", roi: 2.4 },
  { id: "social", name: "SNS", allocation: 15, color: "#00175A", roi: 2.1 },
  { id: "ooh", name: "OOH", allocation: 10, color: "#38A169", roi: 1.5 },
  { id: "print", name: "プリント", allocation: 5, color: "#E53E3E", roi: 1.2 },
  { id: "events", name: "イベント", allocation: 5, color: "#805AD5", roi: 2.8 },
]

export default function MediaAllocationPage() {
  const [channels, setChannels] = useState(INITIAL_CHANNELS)
  const totalBudget = 120 // 億円

  const handleAllocationChange = (id: string, value: number[]) => {
    const newValue = value[0]
    const oldChannel = channels.find((c) => c.id === id)
    if (!oldChannel) return
    
    const diff = newValue - oldChannel.allocation
    const others = channels.filter((c) => c.id !== id)
    const totalOthers = others.reduce((sum, c) => sum + c.allocation, 0)
    
    if (totalOthers - diff < 0) return
    
    setChannels(
      channels.map((c) => {
        if (c.id === id) return { ...c, allocation: newValue }
        const ratio = c.allocation / totalOthers
        return { ...c, allocation: Math.max(0, c.allocation - diff * ratio) }
      })
    )
  }

  const pieData = channels.map((c) => ({ name: c.name, value: c.allocation, color: c.color }))

  return (
    <>
      <DashboardHeader 
        title="Media Allocation" 
        breadcrumb={["Japan Brand Plan", "Media Allocation"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          媒体ごとの予算アロケーション最適化
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 配分チャート */}
          <Card className="border shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">予算配分</CardTitle>
              <p className="text-xs text-muted-foreground">総予算: {totalBudget}億円</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* スライダー調整 */}
          <Card className="border shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">配分調整</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {channels.map((c) => (
                <div key={c.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold" style={{ color: c.color }}>
                        {c.allocation.toFixed(0)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({(totalBudget * c.allocation / 100).toFixed(1)}億円)
                      </span>
                      <Badge variant="outline" className="text-xs">
                        ROI: {c.roi}x
                      </Badge>
                    </div>
                  </div>
                  <Slider
                    value={[c.allocation]}
                    onValueChange={(v) => handleAllocationChange(c.id, v)}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 推奨 */}
        <Card className="border shadow-sm border-[#006FCF]/30 bg-[#006FCF]/5">
          <CardContent className="p-4">
            <p className="text-sm">
              <span className="font-semibold text-[#006FCF]">AI推奨:</span> 現在のROIデータに基づき、
              <span className="font-semibold">イベント(ROI 2.8x)</span>と
              <span className="font-semibold">デジタル広告(ROI 2.4x)</span>への配分増加を推奨します。
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
