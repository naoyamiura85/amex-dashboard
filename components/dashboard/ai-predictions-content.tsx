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
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts"
import { Sparkles, TrendingDown, ArrowUpRight, AlertTriangle, CheckCircle, Download } from "lucide-react"

// --- 予測データ ---
const churnForecastData = [
  { month: "4月", actual: 1.92, forecast: null, lower: null, upper: null },
  { month: "5月", actual: 1.88, forecast: null, lower: null, upper: null },
  { month: "6月", actual: 1.85, forecast: null, lower: null, upper: null },
  { month: "7月", actual: 1.82, forecast: null, lower: null, upper: null },
  { month: "8月", actual: 1.83, forecast: null, lower: null, upper: null },
  { month: "9月", actual: 1.80, forecast: null, lower: null, upper: null },
  { month: "10月(現在)", actual: 1.80, forecast: 1.80, lower: 1.75, upper: 1.85 },
  { month: "11月", actual: null, forecast: 1.77, lower: 1.70, upper: 1.84 },
  { month: "12月", actual: null, forecast: 1.74, lower: 1.64, upper: 1.84 },
  { month: "1月", actual: null, forecast: 1.78, lower: 1.65, upper: 1.91 },
  { month: "2月", actual: null, forecast: 1.75, lower: 1.60, upper: 1.90 },
  { month: "3月", actual: null, forecast: 1.71, lower: 1.54, upper: 1.88 },
]

const upgradeData = [
  { segment: "グリーン→ゴールド", count: 28400, score: 74, color: "#006FCF" },
  { segment: "ゴールド→プラチナ", count: 13200, score: 68, color: "#B4975A" },
  { segment: "ブルー→グリーン", count: 42800, score: 61, color: "#10B981" },
]

const memberGrowthForecast = [
  { month: "10月", actual: 3847, forecast: null },
  { month: "11月", actual: null, forecast: 3880 },
  { month: "12月", actual: null, forecast: 3910 },
  { month: "1月", actual: null, forecast: 3895 },
  { month: "2月", actual: null, forecast: 3925 },
  { month: "3月", actual: null, forecast: 3962 },
]

const riskMembers = [
  { id: "PT-00182", segment: "プラチナ", risk: 87, reason: "直近3ヶ月利用 -41%、年会費更新月接近", action: "専任担当者によるコンタクト" },
  { id: "GD-01924", segment: "ゴールド", risk: 76, reason: "特典未利用 9ヶ月、ログイン頻度低下", action: "特典リマインドキャンペーン" },
  { id: "GD-03841", segment: "ゴールド", risk: 71, reason: "競合カード保有検知、利用シェア低下", action: "ポイント加速オファー" },
  { id: "GN-18204", segment: "グリーン", risk: 68, reason: "申込後6ヶ月以内、初回利用なし", action: "オンボーディング促進" },
]

const aiInsights = [
  {
    type: "解約予測",
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    headline: "プラチナ会員 4,200人 が高リスク",
    detail: "年会費更新月（翌月）前の利用額が前年同期比 -35% を下回るセグメント。過去データから解約確率 72%。",
    confidence: 87,
  },
  {
    type: "アップグレード予測",
    icon: ArrowUpRight,
    color: "text-[#006FCF]",
    bg: "bg-[#E6F2FF]",
    border: "border-[#B3D9FF]",
    headline: "ゴールド 13,200人 がプラチナ移行に適合",
    detail: "旅行・ダイニング利用比率と決済金額の増加パターンがプラチナ移行前会員の行動と高相関（r=0.83）。",
    confidence: 81,
  },
  {
    type: "収益予測",
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    headline: "Q1 手数料収益 前年比 +6.2% 見込み",
    detail: "プラチナ新規獲得ペース (+12%) と利用額単価の増加を織り込んだ予測。年会費改定効果も寄与。",
    confidence: 79,
  },
  {
    type: "リスク警告",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    headline: "ブルー 18,000人 が60日以内に失効リスク",
    detail: "入会後 90日以内の非アクティブ会員。ファーストトランザクション誘導施策の効果が検証済み。",
    confidence: 83,
  },
]

export function AIPredictionsContent() {
  const [activeTab, setActiveTab] = useState("churn")

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F2FF]">
            <Sparkles className="h-4 w-4 text-[#006FCF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI 予測エンジン</p>
            <p className="text-xs text-muted-foreground">モデル更新: 2026/10/01 | 精度: 84.3%</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Download className="h-3.5 w-3.5" />
          レポート出力
        </Button>
      </div>

      {/* AI インサイトカード */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aiInsights.map((insight) => {
          const Icon = insight.icon
          return (
            <div
              key={insight.type}
              className={`p-4 rounded-xl border ${insight.border} ${insight.bg}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg bg-white/70 flex-shrink-0`}>
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold ${insight.color}`}>{insight.type}</span>
                    <span className="text-[10px] text-muted-foreground">信頼度 {insight.confidence}%</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground mb-1">{insight.headline}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.detail}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 予測グラフタブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="churn" className="text-xs">解約率予測</TabsTrigger>
          <TabsTrigger value="upgrade" className="text-xs">アップグレード予測</TabsTrigger>
          <TabsTrigger value="growth" className="text-xs">会員数予測</TabsTrigger>
          <TabsTrigger value="risk" className="text-xs">高リスク会員</TabsTrigger>
        </TabsList>

        {/* 解約率予測 */}
        <TabsContent value="churn" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">月次チャーン率 実績 + AI予測（%）</CardTitle>
              <p className="text-xs text-muted-foreground">信頼区間 90% | 破線: AI予測値</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={churnForecastData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#006FCF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#006FCF" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B4975A" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#B4975A" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[1.5, 2.1]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v: number | null) => v != null ? [`${v.toFixed(2)}%`, ""] : ["-", ""]}
                  />
                  <ReferenceLine x="10月(現在)" stroke="var(--muted-foreground)" strokeDasharray="4 4" strokeWidth={1} />
                  <Area type="monotone" dataKey="actual" name="実績" stroke="#006FCF" fill="url(#actualGrad)" strokeWidth={2} dot={false} connectNulls={false} />
                  <Area type="monotone" dataKey="forecast" name="予測" stroke="#B4975A" fill="url(#forecastGrad)" strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* アップグレード予測 */}
        <TabsContent value="upgrade" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">アップグレード対象会員予測</CardTitle>
              <p className="text-xs text-muted-foreground">次の90日以内にアップグレードの可能性が高い会員数</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                {upgradeData.map((item) => (
                  <div key={item.segment} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">{item.segment}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">AIスコア</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}</span>
                        <Badge className="text-[10px]" style={{ backgroundColor: item.color, color: "#fff", border: "none" }}>
                          {item.count.toLocaleString()}人
                        </Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 会員数予測 */}
        <TabsContent value="growth" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">総会員数 予測推移（千人）</CardTitle>
              <p className="text-xs text-muted-foreground">翌6ヶ月の会員数予測</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={memberGrowthForecast} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[3800, 4000]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                  />
                  <Bar dataKey="actual" name="実績" fill="#006FCF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="forecast" name="予測" fill="#B4975A" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 高リスク会員 */}
        <TabsContent value="risk" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">解約高リスク会員（サンプル）</CardTitle>
              <p className="text-xs text-muted-foreground">リスクスコア上位 / 推奨アクション付き</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskMembers.map((m) => (
                  <div key={m.id} className="flex items-center gap-4 p-3 rounded-lg border border-border/70 bg-muted/20">
                    <div className="text-center w-12 flex-shrink-0">
                      <p className="text-[10px] text-muted-foreground">スコア</p>
                      <p className={`text-lg font-bold ${m.risk >= 80 ? "text-red-600" : m.risk >= 70 ? "text-amber-600" : "text-[#006FCF]"}`}>
                        {m.risk}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-foreground">{m.id}</span>
                        <Badge
                          className="text-[10px] border-0"
                          style={{
                            backgroundColor: m.segment === "プラチナ" ? "#B4975A" : m.segment === "ゴールド" ? "#006FCF" : "#10B981",
                            color: "#fff",
                          }}
                        >
                          {m.segment}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">{m.reason}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-muted-foreground">推奨アクション</p>
                      <p className="text-[11px] font-semibold text-[#006FCF]">{m.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
