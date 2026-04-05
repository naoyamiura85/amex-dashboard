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
  BarChart,
  Bar,
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Bell,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  Users,
  CreditCard,
  Download,
} from "lucide-react"

// チャーン予測データ
const churnPredictionData = [
  { month: "11月", actual: null, predicted: 1.82, lower: 1.68, upper: 1.96 },
  { month: "12月", actual: null, predicted: 1.95, lower: 1.78, upper: 2.12 },
  { month: "1月", actual: null, predicted: 2.10, lower: 1.88, upper: 2.32 },
  { month: "2月", actual: null, predicted: 1.88, lower: 1.70, upper: 2.06 },
  { month: "3月", actual: null, predicted: 1.72, lower: 1.58, upper: 1.86 },
  { month: "4月", actual: null, predicted: 1.65, lower: 1.52, upper: 1.78 },
]

const churnHistoricalData = [
  { month: "5月", actual: 1.9, predicted: null },
  { month: "6月", actual: 1.85, predicted: null },
  { month: "7月", actual: 2.0, predicted: null },
  { month: "8月", actual: 1.95, predicted: null },
  { month: "9月", actual: 1.8, predicted: null },
  { month: "10月", actual: 1.8, predicted: null },
]

const combinedData = [
  ...churnHistoricalData,
  ...churnPredictionData,
]

// アップグレード予測
const upgradePredictions = [
  { segment: "ゴールド→プラチナ候補", count: 132400, probability: 28, trigger: "年利用額¥600万超・海外利用増加", priority: "high" },
  { segment: "グリーン→ゴールド候補", count: 284000, probability: 35, trigger: "旅行利用が3ヶ月連続増加", priority: "high" },
  { segment: "ブルー→グリーン候補", count: 189000, probability: 42, trigger: "25-30歳・収入増加シグナル", priority: "medium" },
  { segment: "通常→ビジネス候補", count: 48200, probability: 22, trigger: "法人設立・経費利用パターン", priority: "medium" },
]

// 解約リスクアラート
const churnAlerts = [
  {
    type: "高リスク",
    message: "プラチナ会員 4,210人でラウンジ未利用が6ヶ月継続。解約確率 68%。",
    severity: "high",
    members: 4210,
    time: "15分前",
    action: "リテンションキャンペーンを設計",
  },
  {
    type: "中リスク",
    message: "ゴールド会員 18,400人で競合カード保有シグナル（信用情報照会）。",
    severity: "medium",
    members: 18400,
    time: "2時間前",
    action: "オファー検討",
  },
  {
    type: "高リスク",
    message: "年会費更新月（来月）を迎える会員 82,000人。過去解約率 4.8%。",
    severity: "high",
    members: 82000,
    time: "本日",
    action: "プロアクティブ接触",
  },
  {
    type: "低リスク",
    message: "ブルー会員 44,000人でアプリ利用が90日以上停止。",
    severity: "low",
    members: 44000,
    time: "昨日",
    action: "エンゲージメント促進",
  },
]

// 収益予測
const revenueForecast = [
  { quarter: "Q1 25", actual: 4820, forecast: null },
  { quarter: "Q2 25", actual: 5140, forecast: null },
  { quarter: "Q3 25", actual: 5380, forecast: null },
  { quarter: "Q4 25", actual: 5620, forecast: null },
  { quarter: "Q1 26", actual: null, forecast: 5900 },
  { quarter: "Q2 26", actual: null, forecast: 6250 },
  { quarter: "Q3 26", actual: null, forecast: 6580 },
  { quarter: "Q4 26", actual: null, forecast: 6870 },
]

const severityConfig: Record<string, { badge: string; dot: string }> = {
  high: { badge: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  medium: { badge: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  low: { badge: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
}

export function AIPredictionsContent() {
  const [activeTab, setActiveTab] = useState("churn")

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダーアクション */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E6F2FF]">
            <Sparkles className="h-4 w-4 text-[#006FCF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AIモデル: AMEX-Predict v3.2</p>
            <p className="text-xs text-muted-foreground">最終学習: 2026/10/04 | 精度: 94.7%</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Download className="h-3.5 w-3.5" />
          レポート出力
        </Button>
      </div>

      {/* サマリーKPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "解約予測（来月）", value: "1.82%", change: "+0.02pt", trend: "up-bad", icon: TrendingUp, color: "text-red-600", bg: "bg-red-50" },
          { label: "アップグレード機会", value: "65.4万人", change: "+8.2%", trend: "up-good", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "収益予測（来Q）", value: "¥5,900億", change: "+5.0%", trend: "up-good", icon: BarChart3, color: "text-[#006FCF]", bg: "bg-[#E6F2FF]" },
          { label: "高リスク会員数", value: "86,210人", change: "-3.1%", trend: "down-good", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi) => {
          const Icon = kpi.icon
          const isGood = kpi.trend === "up-good" || kpi.trend === "down-good"
          return (
            <Card key={kpi.label} className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${kpi.bg}`}>
                    <Icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${isGood ? "text-emerald-600" : "text-red-600"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* タブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="churn" className="text-xs">チャーン予測</TabsTrigger>
          <TabsTrigger value="upgrade" className="text-xs">アップグレード予測</TabsTrigger>
          <TabsTrigger value="revenue" className="text-xs">収益予測</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs">アラート一覧</TabsTrigger>
        </TabsList>

        {/* チャーン予測 */}
        <TabsContent value="churn" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">月次解約率予測（全カード平均）</CardTitle>
                <p className="text-xs text-muted-foreground">実績値 + AI予測（95%信頼区間）</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={combinedData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[1.4, 2.5]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                      formatter={(v: number) => v ? [`${v}%`, ""] : ["-", ""]}
                    />
                    <ReferenceLine x="10月" stroke="var(--border)" strokeDasharray="4 2" label={{ value: "現在", fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Line type="monotone" dataKey="actual" name="実績" stroke="#006FCF" strokeWidth={2.5} dot={{ r: 3, fill: "#006FCF" }} connectNulls={false} />
                    <Line type="monotone" dataKey="predicted" name="予測" stroke="#B4975A" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: "#B4975A" }} connectNulls={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">解約ドライバー分析</CardTitle>
                <p className="text-xs text-muted-foreground">AIモデル重要度スコア</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { factor: "年会費更新月", score: 92, color: "#006FCF" },
                  { factor: "ラウンジ未利用", score: 78, color: "#006FCF" },
                  { factor: "競合照会あり", score: 71, color: "#B4975A" },
                  { factor: "利用額低下", score: 65, color: "#B4975A" },
                  { factor: "特典未使用", score: 58, color: "#10B981" },
                  { factor: "サービス問合せ増", score: 44, color: "#10B981" },
                ].map((item) => (
                  <div key={item.factor}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-foreground">{item.factor}</span>
                      <span className="text-xs font-semibold text-foreground">{item.score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* アップグレード予測 */}
        <TabsContent value="upgrade" className="mt-4">
          <div className="space-y-3">
            {upgradePredictions.map((pred) => (
              <Card key={pred.segment} className="border border-border shadow-sm">
                <CardContent className="p-4 flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">{pred.segment}</p>
                      <Badge className={`text-xs border-0 h-5 ${pred.priority === "high" ? "bg-[#E6F2FF] text-[#006FCF]" : "bg-muted text-muted-foreground"}`}>
                        {pred.priority === "high" ? "優先対応" : "通常"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{pred.trigger}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-foreground">{pred.count.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">対象会員数</p>
                  </div>
                  <div className="text-right flex-shrink-0 w-28">
                    <p className="text-sm font-bold text-[#006FCF]">{pred.probability}%</p>
                    <p className="text-xs text-muted-foreground mb-1">確率</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#006FCF]" style={{ width: `${pred.probability}%` }} />
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#006FCF] hover:bg-[#0051A8] text-white text-xs flex-shrink-0">
                    施策設計
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 収益予測 */}
        <TabsContent value="revenue" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">四半期収益予測（億円）</CardTitle>
                <p className="text-xs text-muted-foreground">実績 + AIフォーキャスト</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="inline-block w-8 h-2 rounded bg-[#006FCF]" />実績</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-8 h-2 rounded bg-[#B4975A]/70 border border-[#B4975A] border-dashed" />予測</span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueForecast} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 8000]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v: number) => v ? [`¥${v}億`, ""] : ["-", ""]}
                  />
                  <ReferenceLine x="Q4 25" stroke="var(--border)" strokeDasharray="4 2" />
                  <Bar dataKey="actual" name="実績" fill="#006FCF" radius={[4,4,0,0]} barSize={28} />
                  <Bar dataKey="forecast" name="予測" fill="#B4975A" opacity={0.7} radius={[4,4,0,0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* アラート一覧 */}
        <TabsContent value="alerts" className="mt-4">
          <div className="space-y-3">
            {churnAlerts.map((alert, idx) => {
              const cfg = severityConfig[alert.severity]
              return (
                <Card key={idx} className="border border-border shadow-sm">
                  <CardContent className="p-4 flex gap-4 items-start">
                    <div className="mt-1 flex-shrink-0">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${cfg.badge}`}>{alert.type}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {alert.members.toLocaleString()}人
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{alert.message}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs flex-shrink-0 text-[#006FCF] border-[#006FCF]/30 hover:bg-[#E6F2FF]">
                      {alert.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
