"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
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
  { name: "Amex",    share: 8.7,  adSpend: 120, color: "#006FCF", trend: "+0.5%" },
  { name: "SMCC",    share: 28.4, adSpend: 165, color: "#0F4C81", trend: "+0.3%" },
  { name: "JCB",     share: 22.1, adSpend: 85,  color: "#1A3A6B", trend: "-0.2%" },
  { name: "Rakuten", share: 19.8, adSpend: 140, color: "#BF0000", trend: "+1.2%" },
  { name: "Others",  share: 21.0, adSpend: 55,  color: "#94A3B8", trend: "-1.8%" },
]

const COMPETITOR_MOVES = [
  { company: "SMCC",    move: "Vポイント連携強化・新規入会特典を倍増",          impact: "高", date: "2026/03" },
  { company: "Rakuten", move: "楽天市場での還元率最大5%キャンペーン展開",        impact: "高", date: "2026/04" },
  { company: "JCB",     move: "ポイント還元率を1.5倍に引き上げ",                impact: "中", date: "2026/02" },
  { company: "Amex",    move: "プラチナカード向けラウンジ・特典を国内拡充",      impact: "中", date: "2026/03" },
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
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-4">市場シェア（%）</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={COMPETITORS} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                  <XAxis type="number" domain={[0, 35]} />
                  <YAxis type="category" dataKey="name" width={72} tick={{ fontSize: 13 }} />
                  <Tooltip formatter={(v) => [`${v}%`, "シェア"]} />
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
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-4">推計広告投資額（億円/年）</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={COMPETITORS} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                  <XAxis type="number" domain={[0, 200]} />
                  <YAxis type="category" dataKey="name" width={72} tick={{ fontSize: 13 }} />
                  <Tooltip formatter={(v) => [`${v}億円`, "広告投資額"]} />
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
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground mb-4">シェア変動（前年比）</p>
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
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              最新の競合動向
            </p>
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
