"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts"
import { BarChart3, TrendingUp, TrendingDown, Minus, Globe, Bell, Clock } from "lucide-react"

const trendArrivalData = [
  { trend: "ポストバイオティクス", origin: "米国", arrivalMonth: "2025年7月", confidence: 92, growth: "+180%", status: "到来直前" },
  { trend: "クリーンビューティー2.0", origin: "欧州", arrivalMonth: "2025年9月", confidence: 87, growth: "+145%", status: "準備期" },
  { trend: "バイオミメティクス成分", origin: "韓国", arrivalMonth: "2025年5月", confidence: 94, growth: "+210%", status: "到来直前" },
  { trend: "スキンマイクロバイオーム", origin: "米国", arrivalMonth: "2026年1月", confidence: 78, growth: "+98%", status: "浸透中" },
  { trend: "量子コスメ", origin: "日本", arrivalMonth: "2026年4月", confidence: 61, growth: "+67%", status: "萌芽期" },
]

const trendLifecycleData = [
  {
    name: "バクチオール",
    data: [
      { month: "24/01", value: 20 }, { month: "24/04", value: 45 }, { month: "24/07", value: 72 },
      { month: "24/10", value: 88 }, { month: "25/01", value: 95 }, { month: "25/04", value: 91 },
      { month: "25/07", value: 82, predicted: true }, { month: "25/10", value: 70, predicted: true },
    ],
    phase: "成熟",
    color: "#3700FF",
  },
  {
    name: "CICA",
    data: [
      { month: "24/01", value: 65 }, { month: "24/04", value: 71 }, { month: "24/07", value: 78 },
      { month: "24/10", value: 80 }, { month: "25/01", value: 79 }, { month: "25/04", value: 75 },
      { month: "25/07", value: 68, predicted: true }, { month: "25/10", value: 59, predicted: true },
    ],
    phase: "衰退",
    color: "#94a3b8",
  },
  {
    name: "ポストバイオティクス",
    data: [
      { month: "24/01", value: 5 }, { month: "24/04", value: 8 }, { month: "24/07", value: 15 },
      { month: "24/10", value: 28 }, { month: "25/01", value: 42 }, { month: "25/04", value: 61 },
      { month: "25/07", value: 78, predicted: true }, { month: "25/10", value: 90, predicted: true },
    ],
    phase: "急成長",
    color: "#C8FF00",
  },
]

const breakpointAlerts = [
  { trend: "ポストバイオティクス", type: "急上昇", message: "過去30日で検索量が+340%急増。ブレイクポイント検知。", time: "2時間前", severity: "high" },
  { trend: "更年期ケア成分", type: "新興", message: "新規参入ブランドが急増、カテゴリ形成の兆候あり", time: "6時間前", severity: "medium" },
  { trend: "CICA", type: "鈍化", message: "成長率が前月比-18pt。ピークアウトの可能性", time: "1日前", severity: "low" },
  { trend: "バイオミメティクス", type: "急上昇", message: "韓国発トレンドが日本市場に波及開始", time: "3時間前", severity: "high" },
]

const phaseColors: Record<string, string> = {
  急成長: "bg-emerald-100 text-emerald-700",
  成熟: "bg-blue-100 text-blue-700",
  衰退: "bg-gray-100 text-gray-600",
  萌芽期: "bg-amber-100 text-amber-700",
  到来直前: "bg-red-100 text-red-700",
  準備期: "bg-orange-100 text-orange-700",
  浸透中: "bg-blue-100 text-blue-700",
}

const allLifecyclePoints = trendLifecycleData[0].data.map((d) => {
  const result: Record<string, string | number | boolean> = { month: d.month }
  trendLifecycleData.forEach((t) => {
    const point = t.data.find((p) => p.month === d.month)
    if (point) {
      result[t.name] = point.value
      result[`${t.name}_predicted`] = point.predicted ?? false
    }
  })
  return result
})

export function AIPredictionsContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <BarChart3 className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-bold">トレンド予測エンジン</h2>
          <p className="text-sm text-muted-foreground">海外トレンドの到来予測・寿命予測・ブレイクポイント検知でビジネス判断を先読み</p>
        </div>
      </div>

      <Tabs defaultValue="arrival">
        <TabsList className="h-9">
          <TabsTrigger value="arrival" className="text-xs">海外トレンド到来予測</TabsTrigger>
          <TabsTrigger value="lifecycle" className="text-xs">トレンド寿命予測</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs">ブレイクポイント検知</TabsTrigger>
        </TabsList>

        {/* 到来予測 */}
        <TabsContent value="arrival" className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">海外市場データから日本への到来時期をAIが予測。先行開発のリードタイムを確保できます。</p>
          {trendArrivalData.map((t, i) => (
            <Card key={i} className="rounded-xl">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{t.trend}</p>
                      <Badge className={`text-[10px] ${phaseColors[t.status] || "bg-gray-100 text-gray-600"}`}>{t.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">発祥: {t.origin}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">日本到来予測</p>
                      <p className="text-sm font-bold">{t.arrivalMonth}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">確信度</p>
                      <p className="text-lg font-bold text-primary">{t.confidence}%</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{t.growth}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 寿命予測 */}
        <TabsContent value="lifecycle" className="mt-4 space-y-4">
          <p className="text-xs text-muted-foreground">各トレンドの成長→成熟→衰退フェーズをAIが予測。破線部分はAI予測値。投資判断の最適化に活用。</p>
          <Card className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">トレンド寿命マップ（過去12ヶ月 + 6ヶ月予測）</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                {trendLifecycleData.map((t) => (
                  <div key={t.name} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: t.color }} />
                    <span className="text-xs text-muted-foreground">{t.name}</span>
                    <Badge className={`text-[10px] ${phaseColors[t.phase] || ""}`}>{t.phase}</Badge>
                  </div>
                ))}
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={allLifecyclePoints} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}`} />
                    <Tooltip contentStyle={{ fontSize: 12 }} />
                    <ReferenceLine x="25/04" stroke="#e5e7eb" strokeDasharray="4 4" label={{ value: "現在", fontSize: 10 }} />
                    {trendLifecycleData.map((t) => (
                      <Line
                        key={t.name}
                        type="monotone"
                        dataKey={t.name}
                        stroke={t.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ブレイクポイント検知 */}
        <TabsContent value="alerts" className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">AIが異常な成長パターンを検知し、ブレイクポイントを早期にアラート。機会損失を防ぎます。</p>
          {breakpointAlerts.map((alert, i) => (
            <Card key={i} className={`rounded-xl ${alert.severity === "high" ? "border-red-200 bg-red-50/30" : alert.severity === "medium" ? "border-amber-200 bg-amber-50/30" : ""}`}>
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    alert.severity === "high" ? "bg-red-100" : alert.severity === "medium" ? "bg-amber-100" : "bg-gray-100"
                  }`}>
                    {alert.type === "急上昇" ? (
                      <TrendingUp className={`h-4 w-4 ${alert.severity === "high" ? "text-red-600" : "text-amber-600"}`} />
                    ) : alert.type === "鈍化" ? (
                      <TrendingDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Bell className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{alert.trend}</p>
                      <Badge variant="outline" className="text-[10px]">{alert.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )

export { AIPredictionsContent }
