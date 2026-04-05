"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, TrendingUp, TrendingDown, ArrowUpRight, Filter, Download } from "lucide-react"

// --- データ定義 ---

const segmentData = [
  { segment: "プラチナ", members: 490, churn: 1.2, spend: 68, nps: 72, color: "#B4975A" },
  { segment: "ゴールド", members: 1095, churn: 1.8, spend: 38, nps: 61, color: "#006FCF" },
  { segment: "グリーン", members: 1345, churn: 2.3, spend: 18, nps: 54, color: "#10B981" },
  { segment: "ブルー", members: 917, churn: 3.1, spend: 9, nps: 46, color: "#64B5F6" },
]

const ageData = [
  { age: "18-24歳", platinum: 2, gold: 8, green: 22, blue: 18 },
  { age: "25-34歳", platinum: 12, gold: 28, green: 38, blue: 25 },
  { age: "35-44歳", platinum: 28, gold: 32, green: 24, blue: 20 },
  { age: "45-54歳", platinum: 32, gold: 20, green: 10, blue: 14 },
  { age: "55-64歳", platinum: 18, gold: 9, green: 5, blue: 14 },
  { age: "65歳+", platinum: 8, gold: 3, green: 1, blue: 9 },
]

const retentionData = [
  { month: "1月", platinum: 98.9, gold: 98.2, green: 97.7, blue: 96.9 },
  { month: "2月", platinum: 98.7, gold: 98.0, green: 97.5, blue: 96.8 },
  { month: "3月", platinum: 98.8, gold: 98.1, green: 97.8, blue: 97.0 },
  { month: "4月", platinum: 99.0, gold: 98.3, green: 97.6, blue: 96.7 },
  { month: "5月", platinum: 98.9, gold: 98.2, green: 97.9, blue: 96.5 },
  { month: "6月", platinum: 99.1, gold: 98.4, green: 98.0, blue: 96.8 },
  { month: "7月", platinum: 98.8, gold: 98.3, green: 97.7, blue: 97.1 },
  { month: "8月", platinum: 99.0, gold: 98.5, green: 97.8, blue: 96.9 },
  { month: "9月", platinum: 98.9, gold: 98.4, green: 97.9, blue: 97.0 },
  { month: "10月", platinum: 99.2, gold: 98.6, green: 97.8, blue: 96.8 },
]

// ペルソナ定義
const personas = [
  {
    id: "urban-exec",
    name: "都市型エグゼクティブ",
    card: "プラチナ",
    cardColor: "#B4975A",
    age: "42歳 / 男性",
    income: "年収 2,000万+",
    spend: "月平均利用 ¥84万",
    topCategories: ["航空・ホテル", "高級レストラン", "海外ショッピング"],
    avatar: "UE",
    nps: 78,
    churnRisk: "低",
    upgradeScore: null,
    size: "490K人",
    radarData: [
      { metric: "利用頻度", value: 95 },
      { metric: "利用金額", value: 98 },
      { metric: "特典利用", value: 88 },
      { metric: "NPS", value: 82 },
      { metric: "継続期間", value: 92 },
    ],
  },
  {
    id: "career-gold",
    name: "キャリア志向ゴールド",
    card: "ゴールド",
    cardColor: "#006FCF",
    age: "35歳 / 女性",
    income: "年収 800万",
    spend: "月平均利用 ¥32万",
    topCategories: ["飲食・カフェ", "EC通販", "国内旅行"],
    avatar: "CG",
    nps: 64,
    churnRisk: "中",
    upgradeScore: 72,
    size: "1,095K人",
    radarData: [
      { metric: "利用頻度", value: 78 },
      { metric: "利用金額", value: 68 },
      { metric: "特典利用", value: 62 },
      { metric: "NPS", value: 64 },
      { metric: "継続期間", value: 71 },
    ],
  },
  {
    id: "young-green",
    name: "ヤングプロフェッショナル",
    card: "グリーン",
    cardColor: "#10B981",
    age: "28歳 / 男性",
    income: "年収 450万",
    spend: "月平均利用 ¥15万",
    topCategories: ["EC通販", "サブスク", "コンビニ"],
    avatar: "YP",
    nps: 55,
    churnRisk: "高",
    upgradeScore: 58,
    size: "1,345K人",
    radarData: [
      { metric: "利用頻度", value: 65 },
      { metric: "利用金額", value: 42 },
      { metric: "特典利用", value: 38 },
      { metric: "NPS", value: 55 },
      { metric: "継続期間", value: 44 },
    ],
  },
]

const genderData = [
  { name: "男性", value: 61, color: "#006FCF" },
  { name: "女性", value: 36, color: "#B4975A" },
  { name: "その他", value: 3, color: "#64B5F6" },
]

const acquisitionData = [
  { channel: "Web直接", count: 18420, color: "#006FCF" },
  { channel: "紹介プログラム", count: 12380, color: "#B4975A" },
  { channel: "SNS広告", count: 8640, color: "#10B981" },
  { channel: "金融機関提携", count: 5280, color: "#64B5F6" },
  { channel: "空港・店舗", count: 3600, color: "#00175A" },
]

const churnRiskConfig: Record<string, string> = {
  低: "text-emerald-600 bg-emerald-50 border-emerald-200",
  中: "text-amber-600 bg-amber-50 border-amber-200",
  高: "text-red-600 bg-red-50 border-red-200",
}

export function MarketOverviewContent() {
  const [activeTab, setActiveTab] = useState("segments")
  const [selectedPersona, setSelectedPersona] = useState(personas[0])

  return (
    <div className="p-6 space-y-6">
      {/* ツールバー */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">2026年10月 | 会員データ基準日: 2026/10/01</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Filter className="h-3.5 w-3.5" />
            フィルター
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* セグメントサマリーカード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {segmentData.map((seg) => (
          <Card key={seg.segment} className="border border-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: seg.color }}
                >
                  {seg.segment}
                </span>
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  NPS {seg.nps}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{seg.members}<span className="text-sm font-normal ml-1 text-muted-foreground">K人</span></p>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>月平均利用 ¥{seg.spend}万</span>
                <span className={`${seg.churn > 2.5 ? "text-red-600" : "text-muted-foreground"}`}>解約率 {seg.churn}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* タブコンテンツ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="segments" className="text-xs">セグメント分析</TabsTrigger>
          <TabsTrigger value="persona" className="text-xs">ペルソナ詳細</TabsTrigger>
          <TabsTrigger value="retention" className="text-xs">継続率推移</TabsTrigger>
          <TabsTrigger value="acquisition" className="text-xs">獲得チャネル</TabsTrigger>
        </TabsList>

        {/* セグメント分析 */}
        <TabsContent value="segments" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Card className="lg:col-span-3 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">年代別・カード種別会員分布</CardTitle>
                <p className="text-xs text-muted-foreground">各年代のカード保有比率（千人）</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={ageData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="age" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    />
                    <Bar dataKey="platinum" name="プラチナ" stackId="a" fill="#B4975A" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="gold" name="ゴールド" stackId="a" fill="#006FCF" />
                    <Bar dataKey="green" name="グリーン" stackId="a" fill="#10B981" />
                    <Bar dataKey="blue" name="ブルー" stackId="a" fill="#64B5F6" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">性別構成比</CardTitle>
                <p className="text-xs text-muted-foreground">全会員ベース</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={78}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                      formatter={(v) => [`${v}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full space-y-1.5 text-xs">
                  {genderData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
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

        {/* ペルソナ詳細 */}
        <TabsContent value="persona" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* ペルソナ一覧 */}
            <div className="space-y-3">
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedPersona.id === p.id
                      ? "border-[#006FCF] bg-[#E6F2FF]"
                      : "border-border bg-card hover:border-[#006FCF]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                      <AvatarFallback
                        className="text-xs font-bold text-white"
                        style={{ backgroundColor: p.cardColor }}
                      >
                        {p.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.size} | {p.age}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ペルソナ詳細 */}
            <Card className="lg:col-span-3 border border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback
                        className="text-base font-bold text-white"
                        style={{ backgroundColor: selectedPersona.cardColor }}
                      >
                        {selectedPersona.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{selectedPersona.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: selectedPersona.cardColor }}
                        >
                          {selectedPersona.card}
                        </span>
                        <span className="text-xs text-muted-foreground">{selectedPersona.age}</span>
                        <span className="text-xs text-muted-foreground">{selectedPersona.income}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">会員数</p>
                    <p className="text-lg font-bold text-foreground">{selectedPersona.size}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">主要利用カテゴリ</p>
                      <div className="space-y-1.5">
                        {selectedPersona.topCategories.map((cat, i) => (
                          <div key={cat} className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground w-3">{i + 1}.</span>
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${[85, 65, 45][i]}%`,
                                  backgroundColor: selectedPersona.cardColor,
                                }}
                              />
                            </div>
                            <span className="text-xs text-foreground">{cat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2.5 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">NPS</p>
                        <p className="text-xl font-bold" style={{ color: selectedPersona.cardColor }}>
                          {selectedPersona.nps}
                        </p>
                      </div>
                      <div className="text-center p-2.5 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">解約リスク</p>
                        <Badge className={`text-[10px] mt-0.5 border ${churnRiskConfig[selectedPersona.churnRisk]}`}>
                          {selectedPersona.churnRisk}
                        </Badge>
                      </div>
                      <div className="text-center p-2.5 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">月平均</p>
                        <p className="text-xs font-bold text-foreground mt-0.5">{selectedPersona.spend}</p>
                      </div>
                    </div>

                    {selectedPersona.upgradeScore && (
                      <div className="p-3 rounded-lg border border-[#006FCF]/30 bg-[#E6F2FF]">
                        <p className="text-xs font-semibold text-[#006FCF] mb-1">アップグレードスコア</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#B3D9FF] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#006FCF] rounded-full"
                              style={{ width: `${selectedPersona.upgradeScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-[#006FCF]">{selectedPersona.upgradeScore}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">エンゲージメントレーダー</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={selectedPersona.radarData} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          dataKey="value"
                          stroke={selectedPersona.cardColor}
                          fill={selectedPersona.cardColor}
                          fillOpacity={0.2}
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

        {/* 継続率推移 */}
        <TabsContent value="retention" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">カード種別 月次継続率（%）</CardTitle>
                <p className="text-xs text-muted-foreground">解約・失効を除く在籍率</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {[
                  { name: "プラチナ", color: "#B4975A" },
                  { name: "ゴールド", color: "#006FCF" },
                  { name: "グリーン", color: "#10B981" },
                  { name: "ブルー", color: "#64B5F6" },
                ].map((l) => (
                  <span key={l.name} className="flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={retentionData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[95, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v: number) => [`${v.toFixed(1)}%`, ""]}
                  />
                  <Line type="monotone" dataKey="platinum" stroke="#B4975A" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="gold" stroke="#006FCF" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="green" stroke="#10B981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="blue" stroke="#64B5F6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 獲得チャネル */}
        <TabsContent value="acquisition" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">チャネル別 新規申込数（今月）</CardTitle>
                <p className="text-xs text-muted-foreground">申込経路の内訳</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {acquisitionData.map((item) => {
                    const max = acquisitionData[0].count
                    const pct = Math.round((item.count / max) * 100)
                    return (
                      <div key={item.channel} className="flex items-center gap-4">
                        <div className="w-24 text-right">
                          <span className="text-xs font-medium text-muted-foreground">{item.channel}</span>
                        </div>
                        <div className="flex-1 h-7 rounded-md overflow-hidden bg-muted/50">
                          <div
                            className="h-full rounded-md flex items-center pl-3"
                            style={{ width: `${pct}%`, backgroundColor: item.color }}
                          >
                            <span className="text-white text-xs font-semibold whitespace-nowrap">
                              {item.count.toLocaleString()}件
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">チャネル別 コスト効率</CardTitle>
                <p className="text-xs text-muted-foreground">CPA（申込一件あたりコスト）</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {[
                    { channel: "紹介プログラム", cpa: 2800, trend: "down", prev: 3100 },
                    { channel: "Web直接", cpa: 4200, trend: "down", prev: 4580 },
                    { channel: "金融機関提携", cpa: 5800, trend: "up", prev: 5600 },
                    { channel: "SNS広告", cpa: 6400, trend: "down", prev: 7200 },
                    { channel: "空港・店舗", cpa: 9800, trend: "up", prev: 9200 },
                  ].map((item) => (
                    <div key={item.channel} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-xs text-foreground">{item.channel}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">¥{item.prev.toLocaleString()}</span>
                        <span className="text-xs font-bold text-foreground">¥{item.cpa.toLocaleString()}</span>
                        <span className={`flex items-center text-xs font-medium ${item.trend === "down" ? "text-emerald-600" : "text-red-600"}`}>
                          {item.trend === "down" ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
