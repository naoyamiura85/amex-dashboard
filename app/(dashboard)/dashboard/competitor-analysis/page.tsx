"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

const COMPETITORS = [
  { name: "AMEX", share: 8.7, adSpend: 120, color: "#006FCF", trend: "+0.5%" },
  { name: "JCB", share: 24.2, adSpend: 85, color: "#0F4C81", trend: "-0.2%" },
  { name: "VISA", share: 32.5, adSpend: 150, color: "#1A1F71", trend: "+0.3%" },
  { name: "Mastercard", share: 18.4, adSpend: 95, color: "#EB001B", trend: "+0.1%" },
  { name: "Diners", share: 2.8, adSpend: 25, color: "#004080", trend: "-0.3%" },
  { name: "Others", share: 13.4, adSpend: 45, color: "#94A3B8", trend: "-0.4%" },
]

const COMPETITOR_MOVES = [
  { company: "JCB", move: "ポイント還元率を1.5倍に引き上げ", impact: "高", date: "2026/03" },
  { company: "VISA", move: "新規入会キャンペーン強化", impact: "中", date: "2026/04" },
  { company: "Mastercard", move: "海外旅行保険を自動付帯に変更", impact: "中", date: "2026/02" },
]

export default function CompetitorAnalysisPage() {
  return (
    <>
      <DashboardHeader 
        title="Competitor Analysis" 
        breadcrumb={["Japan Brand Plan", "Competitor Analysis"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          競合の動向と推計広告投資額の分析
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 市場シェア */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">市場シェア（%）</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={COMPETITORS} layout="vertical">
                  <XAxis type="number" domain={[0, 40]} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip />
                  <Bar dataKey="share" radius={[0, 4, 4, 0]}>
                    {COMPETITORS.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 推計広告投資額 */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">推計広告投資額（億円/年）</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={COMPETITORS} layout="vertical">
                  <XAxis type="number" domain={[0, 200]} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip />
                  <Bar dataKey="adSpend" radius={[0, 4, 4, 0]}>
                    {COMPETITORS.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* シェア変動 */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">シェア変動（前年比）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {COMPETITORS.map((c, i) => (
                <div key={i} className="text-center p-3 rounded-lg border">
                  <p className="text-sm font-medium">{c.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {c.trend.startsWith("+") ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-bold ${c.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                      {c.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 競合動向 */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              最新の競合動向
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {COMPETITOR_MOVES.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{m.company}</Badge>
                    <span className="text-sm">{m.move}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={m.impact === "高" ? "destructive" : "secondary"}>{m.impact}</Badge>
                    <span className="text-xs text-muted-foreground">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
