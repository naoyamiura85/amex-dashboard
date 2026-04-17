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

import { cn } from "@/lib/utils"

// メディアチャネルタブ定義
const MEDIA_TABS = [
  { key: "tv",      label: "TV" },
  { key: "ctv",     label: "CTV" },
  { key: "ooh",     label: "OOH" },
  { key: "olv",     label: "OLV" },
  { key: "social",  label: "Social" },
  { key: "audio",   label: "Audio" },
  { key: "display", label: "Display" },
] as const
type MediaTabKey = typeof MEDIA_TABS[number]["key"]

interface MediaChannel {
  id: string
  name: string
  allocation: number
  color: string
  roi: number
}

// チャネルごとのサブ配分データ
const CHANNEL_ALLOCATIONS: Record<MediaTabKey, MediaChannel[]> = {
  tv: [
    { id: "prime", name: "プライムタイム", allocation: 40, color: "#006FCF", roi: 1.8 },
    { id: "daytime", name: "デイタイム", allocation: 25, color: "#B4975A", roi: 1.5 },
    { id: "late", name: "深夜帯", allocation: 20, color: "#00175A", roi: 1.3 },
    { id: "weekend", name: "週末枠", allocation: 15, color: "#38A169", roi: 2.0 },
  ],
  ctv: [
    { id: "streaming", name: "ストリーミング", allocation: 50, color: "#006FCF", roi: 2.4 },
    { id: "vod", name: "VOD", allocation: 30, color: "#B4975A", roi: 2.2 },
    { id: "live", name: "ライブ配信", allocation: 20, color: "#00175A", roi: 1.9 },
  ],
  ooh: [
    { id: "billboard", name: "ビルボード", allocation: 35, color: "#006FCF", roi: 1.5 },
    { id: "transit", name: "交通広告", allocation: 35, color: "#B4975A", roi: 1.8 },
    { id: "digital_ooh", name: "デジタルOOH", allocation: 30, color: "#00175A", roi: 2.1 },
  ],
  olv: [
    { id: "youtube", name: "YouTube", allocation: 40, color: "#006FCF", roi: 2.6 },
    { id: "preroll", name: "プレロール", allocation: 30, color: "#B4975A", roi: 2.3 },
    { id: "instream", name: "インストリーム", allocation: 30, color: "#00175A", roi: 2.1 },
  ],
  social: [
    { id: "instagram", name: "Instagram", allocation: 35, color: "#006FCF", roi: 2.5 },
    { id: "twitter", name: "X (Twitter)", allocation: 25, color: "#B4975A", roi: 2.0 },
    { id: "facebook", name: "Facebook", allocation: 20, color: "#00175A", roi: 1.8 },
    { id: "tiktok", name: "TikTok", allocation: 20, color: "#38A169", roi: 2.8 },
  ],
  audio: [
    { id: "spotify", name: "Spotify", allocation: 45, color: "#006FCF", roi: 2.2 },
    { id: "podcast", name: "ポッドキャスト", allocation: 35, color: "#B4975A", roi: 2.5 },
    { id: "radio", name: "ラジオ", allocation: 20, color: "#00175A", roi: 1.6 },
  ],
  display: [
    { id: "programmatic", name: "プログラマティック", allocation: 40, color: "#006FCF", roi: 2.1 },
    { id: "native", name: "ネイティブ広告", allocation: 35, color: "#B4975A", roi: 2.4 },
    { id: "banner", name: "バナー", allocation: 25, color: "#00175A", roi: 1.7 },
  ],
}

export default function MediaAllocationPage() {
  const [selectedTab, setSelectedTab] = useState<MediaTabKey>("tv")
  const [channelAllocations, setChannelAllocations] = useState(CHANNEL_ALLOCATIONS)
  const totalBudget = 120 // 億円
  
  const channels = channelAllocations[selectedTab]

  const handleAllocationChange = (id: string, value: number[]) => {
    const newValue = value[0]
    const currentChannels = channelAllocations[selectedTab]
    const oldChannel = currentChannels.find((c) => c.id === id)
    if (!oldChannel) return
    
    const diff = newValue - oldChannel.allocation
    const others = currentChannels.filter((c) => c.id !== id)
    const totalOthers = others.reduce((sum, c) => sum + c.allocation, 0)
    
    if (totalOthers - diff < 0) return
    
    setChannelAllocations({
      ...channelAllocations,
      [selectedTab]: currentChannels.map((c) => {
        if (c.id === id) return { ...c, allocation: newValue }
        const ratio = c.allocation / totalOthers
        return { ...c, allocation: Math.max(0, c.allocation - diff * ratio) }
      })
    })
  }

  const pieData = channels.map((c) => ({ name: c.name, value: c.allocation, color: c.color }))

  return (
    <>
      <DashboardHeader 
        title="Media Allocation" 
        breadcrumb={["Japan Brand Plan", "Media Allocation"]}
      />
      <div className="p-6 space-y-6">
        {/* メディアチャネルタブ */}
        <div className="flex rounded-lg overflow-hidden border border-[#006FCF]">
          {MEDIA_TABS.map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={cn(
                "flex-1 px-4 py-2.5 text-sm font-semibold transition-all",
                index !== MEDIA_TABS.length - 1 && "border-r border-[#006FCF]/30",
                selectedTab === tab.key
                  ? "bg-[#006FCF] text-white"
                  : "bg-white text-[#006FCF] hover:bg-[#006FCF]/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {MEDIA_TABS.find(t => t.key === selectedTab)?.label}チャネルの予算アロケーション最適化
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 配分チャート */}
          <Card className="border shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">{MEDIA_TABS.find(t => t.key === selectedTab)?.label} 予算配分</CardTitle>
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
