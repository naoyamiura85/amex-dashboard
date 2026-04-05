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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Shield,
  Activity,
  Target,
  Download,
  RefreshCw,
} from "lucide-react"

// KPI データ
const kpiData = [
  {
    title: "総会員数",
    value: "3,847,200",
    unit: "人",
    change: "+2.4%",
    trend: "up",
    sub: "前月比",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "月間利用総額",
    value: "¥1.28兆",
    unit: "",
    change: "+5.7%",
    trend: "up",
    sub: "前月比",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "新規申込数",
    value: "48,320",
    unit: "件",
    change: "+12.1%",
    trend: "up",
    sub: "前月比",
    icon: CreditCard,
    color: "text-[#006FCF]",
    bg: "bg-[#E6F2FF]",
  },
  {
    title: "チャーン率",
    value: "1.8%",
    unit: "",
    change: "-0.3pt",
    trend: "down-good",
    sub: "前月比",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
]

// 月次会員数推移
const memberTrendData = [
  { month: "1月", total: 3540, platinum: 420, gold: 980, green: 1240, blue: 900 },
  { month: "2月", total: 3620, platinum: 435, gold: 1005, green: 1265, blue: 915 },
  { month: "3月", total: 3680, platinum: 448, gold: 1020, green: 1288, blue: 924 },
  { month: "4月", total: 3710, platinum: 455, gold: 1035, green: 1295, blue: 925 },
  { month: "5月", total: 3760, platinum: 462, gold: 1048, green: 1318, blue: 932 },
  { month: "6月", total: 3790, platinum: 470, gold: 1062, green: 1328, blue: 930 },
  { month: "7月", total: 3810, platinum: 475, gold: 1075, green: 1335, blue: 925 },
  { month: "8月", total: 3825, platinum: 480, gold: 1082, green: 1338, blue: 925 },
  { month: "9月", total: 3840, platinum: 485, gold: 1088, green: 1342, blue: 925 },
  { month: "10月", total: 3847, platinum: 490, gold: 1095, green: 1345, blue: 917 },
]

// カード別利用額構成
const spendByCard = [
  { name: "プラチナ", value: 42, color: "#B4975A" },
  { name: "ゴールド", value: 31, color: "#006FCF" },
  { name: "グリーン", value: 16, color: "#10B981" },
  { name: "ブルー", value: 8, color: "#64B5F6" },
  { name: "ビジネス", value: 3, color: "#00175A" },
]

// カテゴリ別利用額
const spendByCategoryData = [
  { category: "旅行・交通", amount: 3820, prev: 3540 },
  { category: "飲食", amount: 2640, prev: 2480 },
  { category: "ショッピング", amount: 2210, prev: 2380 },
  { category: "ホテル", amount: 1870, prev: 1750 },
  { category: "エンタメ", amount: 980, prev: 920 },
  { category: "その他", amount: 760, prev: 810 },
]

// AIアラート
const aiAlerts = [
  {
    type: "解約リスク",
    message: "プラチナ会員4,200人でエンゲージメント低下を検知。過去3ヶ月の利用額が前年比-35%。",
    severity: "high",
    time: "15分前",
    action: "対応策を見る",
  },
  {
    type: "アップグレード機会",
    message: "ゴールド会員の12%（約13万人）がプラチナ移行の行動パターンに合致。",
    severity: "medium",
    time: "2時間前",
    action: "セグメントを見る",
  },
  {
    type: "不正検知",
    message: "東南アジア発の異常な利用パターン検知。対象カード数: 284件。",
    severity: "high",
    time: "32分前",
    action: "詳細確認",
  },
  {
    type: "申込増加",
    message: "20代の新規申込が前月比+28%。SNSキャンペーン効果と相関。",
    severity: "info",
    time: "本日",
    action: "分析を見る",
  },
]

// ファネルデータ
const funnelData = [
  { stage: "認知", count: 28500000, rate: 100, color: "#006FCF" },
  { stage: "検討", count: 4200000, rate: 14.7, color: "#0051A8" },
  { stage: "申込", count: 580000, rate: 2.0, color: "#003D80" },
  { stage: "審査通過", count: 410000, rate: 1.4, color: "#B4975A" },
  { stage: "アクティブ", count: 280000, rate: 1.0, color: "#D4B483" },
]

const severityConfig: Record<string, { badge: string; dot: string }> = {
  high: { badge: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  medium: { badge: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  info: { badge: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
}

function formatNumber(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return n.toString()
}

export function AmexHomeContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6 space-y-6">
      {/* ページ上部ツールバー */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">2026年10月 | データ更新: 本日 09:15</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            更新
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            レポート出力
          </Button>
        </div>
      </div>

      {/* KPI カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          const isUp = kpi.trend === "up"
          const isDownGood = kpi.trend === "down-good"
          return (
            <Card key={kpi.title} className="border border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.bg}`}>
                    <Icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${
                    isUp ? "text-emerald-600" : isDownGood ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.change}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl font-bold text-foreground tracking-tight">
                    {kpi.value}
                    <span className="text-sm font-normal ml-1 text-muted-foreground">{kpi.unit}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* メインコンテンツ: タブ切り替え */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="overview" className="text-xs">会員トレンド</TabsTrigger>
          <TabsTrigger value="spend" className="text-xs">利用額分析</TabsTrigger>
          <TabsTrigger value="funnel" className="text-xs">取得ファネル</TabsTrigger>
        </TabsList>

        {/* 会員トレンド */}
        <TabsContent value="overview" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">月次会員数推移（千人）</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">カード種別の積み上げ推移</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {[
                  { name: "プラチナ", color: "#B4975A" },
                  { name: "ゴールド", color: "#006FCF" },
                  { name: "グリーン", color: "#10B981" },
                  { name: "ブルー", color: "#64B5F6" },
                ].map((l) => (
                  <span key={l.name} className="flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={memberTrendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="platinum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B4975A" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#B4975A" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#006FCF" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#006FCF" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64B5F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#64B5F6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="platinum" stackId="1" stroke="#B4975A" fill="url(#platinum)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="gold" stackId="1" stroke="#006FCF" fill="url(#gold)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="green" stackId="1" stroke="#10B981" fill="url(#green)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="blue" stackId="1" stroke="#64B5F6" fill="url(#blue)" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 利用額分析 */}
        <TabsContent value="spend" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Card className="lg:col-span-3 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">カテゴリ別利用額（億円）</CardTitle>
                <p className="text-xs text-muted-foreground">今月 vs 前月比較</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={spendByCategoryData} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="category" type="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={72} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    />
                    <Bar dataKey="prev" name="前月" fill="#D0DCE8" radius={[0, 3, 3, 0]} barSize={10} />
                    <Bar dataKey="amount" name="今月" fill="#006FCF" radius={[0, 3, 3, 0]} barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">カード別利用額構成</CardTitle>
                <p className="text-xs text-muted-foreground">今月の比率</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={spendByCard}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {spendByCard.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                      formatter={(v) => [`${v}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-1.5 w-full text-xs">
                  {spendByCard.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-muted-foreground">{d.name}</span>
                      </span>
                      <span className="font-semibold text-foreground">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 取得ファネル */}
        <TabsContent value="funnel" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">会員取得ファネル（今月）</CardTitle>
              <p className="text-xs text-muted-foreground">認知からアクティブ会員化までの転換率</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mt-2">
                {funnelData.map((stage, idx) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="w-20 text-right">
                      <span className="text-xs font-medium text-muted-foreground">{stage.stage}</span>
                    </div>
                    <div className="flex-1 relative h-9 rounded-md overflow-hidden bg-muted/50">
                      <div
                        className="h-full rounded-md flex items-center pl-3 transition-all duration-500"
                        style={{ width: `${stage.rate}%`, backgroundColor: stage.color }}
                      >
                        <span className="text-white text-xs font-semibold whitespace-nowrap">
                          {formatNumber(stage.count)}人
                        </span>
                      </div>
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-xs font-bold text-foreground">{stage.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 下段: AIアラート + クイックアクセス */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AIアラート */}
        <Card className="lg:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#E6F2FF]">
                <Sparkles className="h-4 w-4 text-[#006FCF]" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">AI インサイト・アラート</CardTitle>
                <p className="text-xs text-muted-foreground">リアルタイム検知</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs bg-[#E6F2FF] text-[#006FCF] border-0">
              4件 新着
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiAlerts.map((alert, idx) => {
              const cfg = severityConfig[alert.severity] || severityConfig.info
              return (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="mt-1 flex-shrink-0">
                    <span className={`inline-block w-2 h-2 rounded-full ${cfg.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${cfg.badge}`}>
                        {alert.type}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">{alert.message}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] text-[#006FCF] h-7 px-2 flex-shrink-0 hover:bg-[#E6F2FF]">
                    {alert.action}
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* クイックアクセス & ステータス */}
        <div className="space-y-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#006FCF]" />
                セキュリティステータス
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { label: "不正検知件数（今月）", value: "284", status: "warn" },
                { label: "ブロック済み件数", value: "261", status: "good" },
                { label: "調査中", value: "23", status: "warn" },
                { label: "不正率", value: "0.007%", status: "good" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-semibold ${item.status === "warn" ? "text-amber-600" : "text-emerald-600"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-[#006FCF]" />
                月次目標達成率
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "新規申込", current: 48320, target: 50000, pct: 97 },
                { label: "アクティブ率", current: 78.4, target: 80, pct: 98, isPercent: true },
                { label: "年会費収入", current: 82, target: 100, pct: 82, isBillion: true },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-semibold text-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.pct}%`,
                        backgroundColor: item.pct >= 90 ? "#10B981" : item.pct >= 70 ? "#006FCF" : "#D73B3B",
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
