"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Users,
  Building2,
  Sparkles,
  Bookmark,
  RefreshCw,
  Download,
  BarChart3,
  UserCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { MapRegion } from "./global-map"

// react-simple-maps はSSR非対応のため dynamic import
const GlobalMap = dynamic(
  () => import("./global-map").then((m) => m.GlobalMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-xl bg-[#EFF4FB] animate-pulse"
        style={{ aspectRatio: "2/1" }}
      />
    ),
  }
)

// ─── 地域データ（3地域: 欧州・日本・北米）──────────────────────────────────────
const REGIONS: MapRegion[] = [
  { id: "eu", name: "欧州", marketSize: "$3.5T", sizeNum: 3.5, growth: "+5.2%", growthNum: 5.2, color: "#38A169", coordinates: [10, 50]   },
  { id: "jp", name: "日本", marketSize: "$2.0T", sizeNum: 2.0, growth: "+5.1%", growthNum: 5.1, color: "#B4975A", coordinates: [138, 36]  },
  { id: "na", name: "北米", marketSize: "$4.7T", sizeNum: 4.7, growth: "+5.8%", growthNum: 5.8, color: "#006FCF", coordinates: [-100, 40] },
]

// 地域ごとのトレンドサマリー（3地域）
const REGION_TREND: Record<string, string> = {
  eu: "欧州市場は$3.5T規模。ラグジュアリー・ファッション・ガストロノミー消費が堅調。EUの規制強化に伴い競合各社のシェア再編が進行中。",
  jp: "日本市場は$2.0T規模。インバウンド回復と円安によるラグジュアリー消費急増。プラチナ・センチュリオン保有者の利用額が前年比+18%。",
  na: "北米市場は$4.7T規模。プレミアム旅行・エンタメ消費が牽引し、UHNW層のセンチュリオン利用が過去最高。Z世代富裕層の新規獲得が課題。",
}

// ─── 年間変化率 ──────────────────────────────────────────────────────────────
const ANNUAL_CHANGES = [
  { label: "プレミアム富裕層",   change: 25.5, up: true  },
  { label: "健康志向消費者",     change: 18.2, up: true  },
  { label: "テック・デジタル層", change: 12.8, up: true  },
  { label: "伝統的高額消費者",   change:  5.2, up: false },
]

// ─── 競合シェア ──────────────────────────────────────────────────────────────
const COMPETITOR_DATA = [
  { name: "Visa",       share: 42, color: "#1A56DB" },
  { name: "Mastercard", share: 28, color: "#E53E3E" },
  { name: "AMEX",       share: 14, color: "#006FCF" },
  { name: "JCB",        share:  8, color: "#38A169" },
  { name: "Others",     share:  8, color: "#A0AEC0" },
]

// ─── 3C インサイト ────────────────────────────────────────────────────────────
const THREE_C = [
  {
    key: "Customer",
    label: "Customer（顧客）",
    icon: Users,
    color: "text-[#006FCF]",
    bg: "bg-[#E6F2FF]",
    text: "プレミアム富裕層が前年比+25.5%成長。若年富裕層の「体験消費」トレンドが定着しており、旅行・ダイニングへの高額支出が継続拡大しています。",
  },
  {
    key: "Company",
    label: "Company（自社）",
    icon: Building2,
    color: "text-[#B4975A]",
    bg: "bg-amber-50",
    text: "AMEXのグローバル会員数が1,158万人に到達。アジア太平洋・中東での新規獲得を加速しており、センチュリオン会員は過去最高水準を更新。",
  },
  {
    key: "Competitor",
    label: "Competitor（競合）",
    icon: TrendingUp,
    color: "text-rose-600",
    bg: "bg-rose-50",
    text: "Visaがプレミアム領域に参入強化。一方でAMEXの会員ロイヤルティ指標（NPS: 72）は業界トップを維持しており、プレミアム特典での差別化が奏功。",
  },
]

// ─── 地域別KPIデータ ───────────────────────────────────────────────────────────
const REGION_KPI: Record<string, { ar: number; ar_change: number; ltcs: number; ltcs_change: number; bc: number; bc_change: number }> = {
  eu: { ar: 56, ar_change: 5, ltcs: 70, ltcs_change: 5, bc: 45, bc_change: 5 },
  jp: { ar: 50, ar_change: 8, ltcs: 73, ltcs_change: 5, bc: 37, bc_change: 5 },
  na: { ar: 65, ar_change: 7, ltcs: 77, ltcs_change: 5, bc: 50, bc_change: 5 },
}

const KPI_METRICS = [
  { id: "ad-recall", key: "ar", changeKey: "ar_change", name: "Ad Recall", color: "#006FCF" },
  { id: "ltcs", key: "ltcs", changeKey: "ltcs_change", name: "LTCS", color: "#B4975A" },
  { id: "brand-consideration", key: "bc", changeKey: "bc_change", name: "Brand Consideration", color: "#00175A" },
]

// ─── 地域別Audienceデータ ──────────────────────────────────────────────────────
const REGION_AUDIENCE: Record<string, { demographics: { label: string; value: string }[]; personas: { name: string; age: string; occupation: string; income: string; interests: string[]; quote: string }[] }> = {
  eu: {
    demographics: [
      { label: "平均年齢", value: "44歳" },
      { label: "平均世帯年収", value: "€165K" },
      { label: "男女比", value: "62:38" },
      { label: "都市部居住率", value: "75%" },
    ],
    personas: [
      { name: "James Thompson", age: "48歳", occupation: "弁護士", income: "€180K+", interests: ["劇場", "ワイン", "旅行"], quote: "伝統と名声が私には重要です" },
      { name: "Sophie Renard", age: "35歳", occupation: "クリエイティブディレクター", income: "€150K+", interests: ["アート", "ガストロノミー", "旅行"], quote: "AMEXの特典で特別な体験にアクセスできます" },
    ],
  },
  jp: {
    demographics: [
      { label: "平均年齢", value: "38歳" },
      { label: "平均世帯年収", value: "1,250万円" },
      { label: "男女比", value: "65:35" },
      { label: "都市部居住率", value: "78%" },
    ],
    personas: [
      { name: "田中 健一", age: "42歳", occupation: "外資系企業 部長", income: "1,500万円+", interests: ["ゴルフ", "高級ダイニング", "海外旅行"], quote: "ステータスと実用性を兼ね備えたカードを求めています" },
      { name: "佐藤 美咲", age: "35歳", occupation: "医師", income: "1,200万円+", interests: ["ワイン", "アート", "ウェルネス"], quote: "特別な体験と手厚いサービスが決め手です" },
    ],
  },
  na: {
    demographics: [
      { label: "平均年齢", value: "42歳" },
      { label: "平均世帯年収", value: "$220K" },
      { label: "男女比", value: "58:42" },
      { label: "都市部居住率", value: "82%" },
    ],
    personas: [
      { name: "Michael Chen", age: "45歳", occupation: "Tech Executive", income: "$250K+", interests: ["旅行", "高級ダイニング", "ゴルフ"], quote: "プレミアム特典とグローバルな利用を重視しています" },
      { name: "Sarah Williams", age: "38歳", occupation: "投資銀行家", income: "$300K+", interests: ["ラグジュアリーショッピング", "スパ", "アート"], quote: "コンシェルジュサービスは他に類を見ません" },
    ],
  },
}

// ─── ペルソナ ─────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    name: "田中 雅子",
    age: 42,
    role: "外資系コンサル パートナー",
    location: "東京都港区",
    quote: "出張が月15日以上。ラウンジと優先搭乗は外せません。出費は惜しまないけど、それ以上の価値が欲しい。",
    quoteEn: "Business travel 15+ days/month. Lounge and priority boarding are must-haves.",
    initials: "TM",
    color: "#006FCF",
  },
  {
    name: "James Carter",
    age: 38,
    role: "Senior VP, Private Banking",
    location: "New York, USA",
    quote: "My Centurion card is the first thing clients notice. Status matters in my world.",
    quoteEn: null,
    initials: "JC",
    color: "#B4975A",
  },
  {
    name: "Sophie Renard",
    age: 35,
    role: "Creative Director",
    location: "Paris, France",
    quote: "Je voyage pour l\u2019art et la gastronomie. Les avantages AMEX me donnent acc\u00e8s \u00e0 l\u2019inaccessible.",
    quoteEn: "I travel for art and gastronomy. AMEX perks give me access to the inaccessible.",
    initials: "SR",
    color: "#38A169",
  },
  {
    name: "\u9648 \u660e\u8fdc",
    age: 44,
    role: "\u79d1\u6280\u521b\u4e1a\u8005 / Tech Founder",
    location: "\u4e0a\u6d77, China",
    quote: "\u56fd\u9645\u5546\u52a1\u4e2d\uff0c\u7f8e\u56fd\u8fd0\u901a\u5361\u662f\u8eab\u4efd\u4e0e\u4fe1\u8d56\u7684\u8c61\u5f81\u3002\u9ad8\u7aef\u670d\u52a1\u662f\u6211\u9009\u62e9\u7684\u6838\u5fc3\u3002",
    quoteEn: "In international business, AMEX is a symbol of status and trust.",
    initials: "CM",
    color: "#E53E3E",
  },
]

// ─── コンポーネント ───────────────────────────────────────────────────────────
export function AmexHomeContent() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const selected = REGIONS.find((r) => r.id === selectedRegion) ?? null

  const trendText = selected
    ? (REGION_TREND[selected.id] ?? "")
    : "グローバルプレミアムカード市場では、富裕層（+25.5%）とテック・デジタル消費者（+12.8%）が成長を牽引。特に35歳以下の若手富裕層でセンチュリオン・プラチナへの関心が急増。伝統的消費者層は微減傾向にあり、体験型特典の拡充が重要な戦略課題です。"

  return (
    <div className="p-6 space-y-6">
      {/* ツールバー */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <RefreshCw className="h-3.5 w-3.5" />
          更新
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Download className="h-3.5 w-3.5" />
          レポート出力
        </Button>
      </div>

      {/* メインパネル: 地図 + サマリー */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* 世界地図 */}
        <Card className="lg:col-span-3 border border-border shadow-sm">
          <CardHeader className="pb-2 flex-row items-center gap-2">
            <Globe className="h-4 w-4 text-[#006FCF]" />
            <CardTitle className="text-sm font-semibold">グローバルマップ</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <GlobalMap
              regions={REGIONS}
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
            />
            {/* 凡例 */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 px-1">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id === selectedRegion ? null : r.id)}
                  className={`flex items-center gap-1.5 text-xs transition-opacity ${
                    selectedRegion && selectedRegion !== r.id ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="font-medium text-foreground">{r.name}</span>
                  <span className="font-bold" style={{ color: r.color }}>{r.marketSize}</span>
                  <span className="text-emerald-600 font-semibold">{r.growth}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* サマリーパネル */}
        <Card className="lg:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              {selected ? `${selected.name} サマリー` : "全世界 サマリー"}
            </CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </CardHeader>
          <CardContent className="space-y-5">
            {/* トレンド */}
            <div>
              <p className="text-xs font-bold text-foreground mb-2">トレンド</p>
              <div className="bg-[#EEF6FF] rounded-lg p-3 flex gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#006FCF] shrink-0 mt-0.5" />
                <p className="text-xs text-foreground leading-relaxed">{trendText}</p>
              </div>
            </div>

            {/* 年間変化率 */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">
                年間変化率（セグメント別）
              </p>
              <div className="space-y-1.5">
                {ANNUAL_CHANGES.map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                    <span className={`text-xs font-bold ${c.up ? "text-emerald-600" : "text-red-500"}`}>
                      {c.up ? "↑" : "↓"} {c.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 競合シェア */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">競合</p>
                <p className="text-[10px] text-muted-foreground">市場シェア（%）</p>
              </div>
              <ResponsiveContainer width="100%" height={110}>
                <BarChart
                  layout="vertical"
                  data={COMPETITOR_DATA}
                  margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 50]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#111827" }}
                    axisLine={false}
                    tickLine={false}
                    width={68}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [`${v}%`, "シェア"]}
                  />
                  <Bar dataKey="share" radius={[0, 3, 3, 0]} barSize={10}>
                    {COMPETITOR_DATA.map((d) => (
                      <Cell
                        key={d.name}
                        fill={d.color}
                        opacity={d.name === "AMEX" ? 1 : 0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 地域選択時: KPIトラッキング + Audience Profile */}
      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* KPIトラッキング */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3 flex-row items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#006FCF]" />
              <CardTitle className="text-sm font-semibold">{selected.name} - KPI Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {KPI_METRICS.map((m) => {
                  const kpi = REGION_KPI[selected.id]
                  const value = kpi[m.key as keyof typeof kpi] as number
                  const change = kpi[m.changeKey as keyof typeof kpi] as number
                  return (
                    <div key={m.id} className="rounded-lg border border-border/60 p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">{m.name}</p>
                      <p className="text-2xl font-bold" style={{ color: m.color }}>{value}%</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {change >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs font-medium ${change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                          {change >= 0 ? "+" : ""}{change}% YoY
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Audience Profile + ペルソナ分析 統合 */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3 flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-[#006FCF]" />
                <CardTitle className="text-sm font-semibold">{selected.name} - Audience Profile</CardTitle>
              </div>
              <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Demographics */}
              <div className="grid grid-cols-4 gap-2">
                {REGION_AUDIENCE[selected.id]?.demographics.map((d, i) => (
                  <div key={i} className="text-center p-2 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-bold text-[#006FCF]">{d.value}</p>
                  </div>
                ))}
              </div>
              {/* ペルソナ分析 */}
              <div className="space-y-0 divide-y divide-border/60">
                {PERSONAS.map((p) => (
                  <div key={p.name} className="py-3 first:pt-0">
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-foreground">{p.name}</span>
                          <span className="text-xs text-muted-foreground">{p.age}歳 · {p.role}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{p.location}</p>
                        <p className="text-xs text-foreground mt-1.5 leading-relaxed italic">
                          &ldquo;{p.quote}&rdquo;
                        </p>
                        <button className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5 hover:text-foreground">
                          <Bookmark className="h-3 w-3" />
                          保存
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 下段: 3C分析インサイト */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-3 flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#006FCF]" />
            <CardTitle className="text-sm font-semibold">全世界 - 3C分析インサイト</CardTitle>
          </div>
          <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          {THREE_C.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.key}
                className="rounded-xl border border-border/60 p-4 hover:border-border transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg ${c.bg} shrink-0`}>
                    <Icon className={`h-3.5 w-3.5 ${c.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-bold text-foreground">{c.label}</p>
                      <Bookmark className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
