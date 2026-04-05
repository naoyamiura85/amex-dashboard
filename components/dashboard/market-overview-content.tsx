"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Users,
  CreditCard,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Award,
  Briefcase,
  ShoppingBag,
  Plane,
  Coffee,
  Star,
  ArrowUpRight,
  Download,
} from "lucide-react"

// 会員ファネルステージ
const funnelStages = [
  { id: "prospect", name: "見込み層", total: "2,850万人", color: "#006FCF", subLabel: "AMEX認知あり・未申込" },
  { id: "applicant", name: "申込済み", total: "58万人", color: "#0051A8", subLabel: "当月申込件数" },
  { id: "approved", name: "審査通過", total: "41万人", color: "#00175A", subLabel: "承認率 70.7%" },
  { id: "active", name: "アクティブ", total: "370万人", color: "#B4975A", subLabel: "月1回以上利用" },
  { id: "premium", name: "プレミアム", total: "49万人", color: "#D4B483", subLabel: "プラチナ・センチュリオン" },
]

// カード別会員データ
const cardSegments = [
  {
    id: "platinum",
    name: "プラチナ・カード",
    members: 420000,
    avgSpend: "¥1,840,000",
    retention: 94.2,
    nps: 72,
    color: "#B4975A",
    trend: "+3.1%",
  },
  {
    id: "gold",
    name: "ゴールド・カード",
    members: 1095000,
    avgSpend: "¥420,000",
    retention: 88.5,
    nps: 58,
    color: "#006FCF",
    trend: "+5.8%",
  },
  {
    id: "green",
    name: "グリーン・カード",
    members: 1345000,
    avgSpend: "¥180,000",
    retention: 82.1,
    nps: 48,
    color: "#10B981",
    trend: "+1.2%",
  },
  {
    id: "blue",
    name: "ブルー・カード",
    members: 917000,
    avgSpend: "¥95,000",
    retention: 75.4,
    nps: 38,
    color: "#64B5F6",
    trend: "-0.8%",
  },
  {
    id: "business",
    name: "ビジネス・ゴールド",
    members: 70000,
    avgSpend: "¥2,200,000",
    retention: 91.8,
    nps: 65,
    color: "#00175A",
    trend: "+8.4%",
  },
]

// ペルソナ定義
const personas = [
  {
    id: "executive",
    name: "エグゼクティブ層",
    segment: "プラチナ保有",
    age: "50-65歳",
    gender: "男性 82%",
    occupation: "経営者・役員",
    annualSpend: "¥1,800万+",
    interests: ["ゴルフ", "高級レストラン", "海外出張", "ワイン"],
    churnRisk: "低",
    upgradeProb: 5,
    avatar: "EX",
    avatarColor: "bg-amber-100 text-amber-700",
    radarData: [
      { subject: "利用額", value: 98 },
      { subject: "旅行", value: 95 },
      { subject: "グルメ", value: 88 },
      { subject: "エンタメ", value: 72 },
      { subject: "ショッピング", value: 70 },
      { subject: "デジタル", value: 55 },
    ],
    churnColor: "text-emerald-600",
    badges: ["高LTV", "チャーンリスク低", "紹介多"],
  },
  {
    id: "biz-pro",
    name: "ビジネスプロフェッショナル",
    segment: "ゴールド保有",
    age: "35-50歳",
    gender: "男性 71%",
    occupation: "外資系・上級管理職",
    annualSpend: "¥420万",
    interests: ["出張", "ラウンジ", "ホテル", "マイル"],
    churnRisk: "中",
    upgradeProb: 28,
    avatar: "BP",
    avatarColor: "bg-blue-100 text-blue-700",
    radarData: [
      { subject: "利用額", value: 75 },
      { subject: "旅行", value: 92 },
      { subject: "グルメ", value: 68 },
      { subject: "エンタメ", value: 55 },
      { subject: "ショッピング", value: 60 },
      { subject: "デジタル", value: 85 },
    ],
    churnColor: "text-amber-600",
    badges: ["出張多", "マイル重視", "アップグレード候補"],
  },
  {
    id: "affluent-f",
    name: "アフルエント女性",
    segment: "ゴールド・グリーン",
    age: "30-45歳",
    gender: "女性 100%",
    occupation: "専門職・管理職",
    annualSpend: "¥280万",
    interests: ["ラグジュアリーブランド", "スパ・美容", "海外旅行", "グルメ"],
    churnRisk: "低",
    upgradeProb: 35,
    avatar: "AF",
    avatarColor: "bg-rose-100 text-rose-700",
    radarData: [
      { subject: "利用額", value: 68 },
      { subject: "旅行", value: 78 },
      { subject: "グルメ", value: 82 },
      { subject: "エンタメ", value: 70 },
      { subject: "ショッピング", value: 95 },
      { subject: "デジタル", value: 78 },
    ],
    churnColor: "text-emerald-600",
    badges: ["ショッピング高", "体験重視", "SNS影響受"],
  },
  {
    id: "young-pro",
    name: "若手プロフェッショナル",
    segment: "グリーン・ブルー",
    age: "25-35歳",
    gender: "男女ほぼ同率",
    occupation: "コンサル・金融・IT",
    annualSpend: "¥95万",
    interests: ["カフェ", "サブスク", "キャリア投資", "テック"],
    churnRisk: "高",
    upgradeProb: 42,
    avatar: "YP",
    avatarColor: "bg-green-100 text-green-700",
    radarData: [
      { subject: "利用額", value: 45 },
      { subject: "旅行", value: 55 },
      { subject: "グルメ", value: 72 },
      { subject: "エンタメ", value: 80 },
      { subject: "ショッピング", value: 68 },
      { subject: "デジタル", value: 95 },
    ],
    churnColor: "text-red-600",
    badges: ["デジタルネイティブ", "チャーンリスク", "将来の高LTV候補"],
  },
]

// 会員属性データ（年齢分布）
const ageDistribution = [
  { age: "20代", members: 620, platinum: 15, gold: 140, green: 280, blue: 185 },
  { age: "30代", members: 980, platinum: 75, gold: 285, green: 380, blue: 240 },
  { age: "40代", members: 1150, platinum: 160, gold: 380, green: 390, blue: 220 },
  { age: "50代", members: 820, platinum: 135, gold: 200, green: 280, blue: 205 },
  { age: "60代以上", members: 277, platinum: 105, gold: 90, green: 55, blue: 27 },
]

// 解約率トレンド
const churnTrend = [
  { month: "5月", platinum: 0.9, gold: 1.8, green: 2.4, blue: 3.8 },
  { month: "6月", platinum: 0.8, gold: 1.9, green: 2.6, blue: 3.6 },
  { month: "7月", platinum: 1.0, gold: 2.0, green: 2.5, blue: 4.0 },
  { month: "8月", platinum: 0.9, gold: 1.8, green: 2.3, blue: 3.9 },
  { month: "9月", platinum: 0.8, gold: 1.7, green: 2.2, blue: 3.5 },
  { month: "10月", platinum: 0.7, gold: 1.6, green: 2.1, blue: 3.4 },
]

function formatMembers(n: number) {
  if (n >= 1000000) return `${(n / 10000).toFixed(0)}万人`
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万人`
  return `${n.toLocaleString()}人`
}

export function MarketOverviewContent() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0])
  const [activeTab, setActiveTab] = useState("segments")

  return (
    <div className="p-6 space-y-6">
      {/* ページヘッダーアクション */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {funnelStages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center gap-2">
              <div
                className="px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                style={{ backgroundColor: stage.color }}
              >
                <span className="block font-bold">{stage.total}</span>
                <span className="block opacity-80 text-[10px]">{stage.name}</span>
              </div>
              {idx < funnelStages.length - 1 && (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Download className="h-3.5 w-3.5" />
          レポート出力
        </Button>
      </div>

      {/* タブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="segments" className="text-xs">カードセグメント</TabsTrigger>
          <TabsTrigger value="personas" className="text-xs">ペルソナ分析</TabsTrigger>
          <TabsTrigger value="demographics" className="text-xs">会員属性</TabsTrigger>
          <TabsTrigger value="churn" className="text-xs">チャーン分析</TabsTrigger>
        </TabsList>

        {/* カードセグメント */}
        <TabsContent value="segments" className="mt-4">
          <div className="space-y-3">
            {cardSegments.map((seg) => (
              <Card key={seg.id} className="border border-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-1 h-16 rounded-full flex-shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{seg.name}</p>
                        <p className="text-xl font-bold mt-0.5" style={{ color: seg.color }}>
                          {formatMembers(seg.members)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">平均年間利用額</p>
                        <p className="text-sm font-bold text-foreground mt-0.5">{seg.avgSpend}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">継続率</p>
                        <div className="flex items-center justify-center gap-1 mt-0.5">
                          <p className="text-sm font-bold text-foreground">{seg.retention}%</p>
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${seg.retention}%`, backgroundColor: seg.color }} />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">NPS</p>
                        <p className="text-sm font-bold text-foreground mt-0.5">{seg.nps}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`text-xs border-0 ${seg.trend.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                        >
                          {seg.trend.startsWith("+") ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {seg.trend}
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">前月比</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ペルソナ分析 */}
        <TabsContent value="personas" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* ペルソナ選択 */}
            <div className="space-y-2">
              {personas.map((p) => (
                <Card
                  key={p.id}
                  className={`cursor-pointer border transition-all shadow-sm ${
                    selectedPersona.id === p.id
                      ? "border-[#006FCF] bg-[#E6F2FF]/50 shadow-md"
                      : "border-border hover:border-[#006FCF]/50"
                  }`}
                  onClick={() => setSelectedPersona(p)}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`text-sm font-bold ${p.avatarColor}`}>{p.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.segment}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-xs font-medium ${p.churnColor}`}>解約リスク: {p.churnRisk}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ペルソナ詳細 */}
            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`text-base font-bold ${selectedPersona.avatarColor}`}>
                      {selectedPersona.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{selectedPersona.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{selectedPersona.segment} | {selectedPersona.age}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPersona.badges.map((b) => (
                        <Badge key={b} variant="secondary" className="text-[10px] h-5 px-1.5 bg-muted border-0">{b}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* 基本情報 */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">基本属性</p>
                      {[
                        { icon: Users, label: "性別・年齢", value: `${selectedPersona.gender} / ${selectedPersona.age}` },
                        { icon: Briefcase, label: "職業", value: selectedPersona.occupation },
                        { icon: CreditCard, label: "年間利用額", value: selectedPersona.annualSpend },
                        { icon: ArrowUpRight, label: "アップグレード確率", value: `${selectedPersona.upgradeProb}%` },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div key={item.label} className="flex items-center gap-2 py-1.5 border-b border-border/50 last:border-0">
                            <Icon className="h-3.5 w-3.5 text-[#006FCF] flex-shrink-0" />
                            <span className="text-xs text-muted-foreground w-28 flex-shrink-0">{item.label}</span>
                            <span className="text-xs font-medium text-foreground">{item.value}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">主な関心</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPersona.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs h-6 px-2 border-[#006FCF]/30 text-[#006FCF]">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* レーダーチャート */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">利用行動プロファイル</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={selectedPersona.radarData}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name={selectedPersona.name}
                          dataKey="value"
                          stroke="#006FCF"
                          fill="#006FCF"
                          fillOpacity={0.25}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 会員属性 */}
        <TabsContent value="demographics" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">年齢層別カード保有構成（千人）</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">年代別のカードポートフォリオ</p>
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageDistribution} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="age" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                  />
                  <Bar dataKey="platinum" name="プラチナ" stackId="a" fill="#B4975A" radius={[0,0,0,0]} />
                  <Bar dataKey="gold" name="ゴールド" stackId="a" fill="#006FCF" radius={[0,0,0,0]} />
                  <Bar dataKey="green" name="グリーン" stackId="a" fill="#10B981" radius={[0,0,0,0]} />
                  <Bar dataKey="blue" name="ブルー" stackId="a" fill="#64B5F6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* チャーン分析 */}
        <TabsContent value="churn" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">カード別月次解約率推移（%）</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">過去6ヶ月のチャーントレンド</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {[
                    { name: "プラチナ", color: "#B4975A" },
                    { name: "ゴールド", color: "#006FCF" },
                    { name: "グリーン", color: "#10B981" },
                    { name: "ブルー", color: "#64B5F6" },
                  ].map((l) => (
                    <span key={l.name} className="flex items-center gap-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                      {l.name}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={churnTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                      formatter={(v: number) => [`${v}%`, ""]}
                    />
                    <Line type="monotone" dataKey="platinum" name="プラチナ" stroke="#B4975A" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="gold" name="ゴールド" stroke="#006FCF" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="green" name="グリーン" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="blue" name="ブルー" stroke="#64B5F6" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 解約要因 */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">解約主要因（AI分析）</CardTitle>
                <p className="text-xs text-muted-foreground">今月の解約申請 4,820件より</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { reason: "年会費コストパフォーマンス", pct: 38, color: "#006FCF" },
                  { reason: "競合カードへの切り替え", pct: 24, color: "#00175A" },
                  { reason: "特典の未活用", pct: 18, color: "#B4975A" },
                  { reason: "引越し・ライフステージ変化", pct: 12, color: "#10B981" },
                  { reason: "その他", pct: 8, color: "#D0DCE8" },
                ].map((item) => (
                  <div key={item.reason}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-foreground">{item.reason}</span>
                      <span className="text-xs font-semibold text-foreground">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-border/50">
                  <Badge className="bg-[#E6F2FF] text-[#006FCF] border-0 text-xs">
                    AI推奨: 特典リマインドキャンペーンで18%削減可能
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
