"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Users,
  Target,
  BarChart2,
  Bookmark,
  Sparkles,
  Building2,
  TrendingDown,
  RefreshCw,
  Download,
} from "lucide-react"

// ─── KPI ──────────────────────────────────────────────────────────────────
const KPI_DATA = [
  {
    icon: Globe,
    label: "総市場規模",
    value: "$13.7T",
    sub: "YoY変動中",
    subColor: "text-emerald-600",
    subIcon: TrendingUp,
  },
  {
    icon: Users,
    label: "アクティブ会員",
    value: "1,158万人",
    sub: "+8.4% YoY",
    subColor: "text-emerald-600",
    subIcon: ArrowUpRight,
  },
  {
    icon: Target,
    label: "市場シェア",
    value: "8.7%",
    sub: "業界平均: +3.2%",
    subColor: "text-muted-foreground",
    subIcon: null,
  },
  {
    icon: BarChart2,
    label: "成長率",
    value: "+6.8%",
    sub: "業界平均: +3.2%",
    subColor: "text-muted-foreground",
    subIcon: null,
  },
]

// ─── 地域データ ───────────────────────────────────────────────────────────
interface Region {
  id: string
  name: string
  marketSize: string // 表示用
  sizeNum: number    // T USD（バブルサイズ比較用）
  growth: string
  growthNum: number
  color: string
  // SVG投影座標(%) 世界地図画像に対する相対位置
  x: number
  y: number
}

const REGIONS: Region[] = [
  { id: "na",  name: "北米",       marketSize: "$4.7T", sizeNum: 4.7, growth: "+5.8%", growthNum: 5.8, color: "#006FCF", x: 18, y: 32 },
  { id: "eu",  name: "欧州",       marketSize: "$3.5T", sizeNum: 3.5, growth: "+5.2%", growthNum: 5.2, color: "#38A169", x: 46, y: 24 },
  { id: "cn",  name: "中国",       marketSize: "$6.5T", sizeNum: 6.5, growth: "+6%",   growthNum: 6.0, color: "#E53E3E", x: 73, y: 30 },
  { id: "in",  name: "インド",     marketSize: "$1.6T", sizeNum: 1.6, growth: "+6.7%", growthNum: 6.7, color: "#D69E2E", x: 63, y: 42 },
  { id: "sa",  name: "南米",       marketSize: "$1.2T", sizeNum: 1.2, growth: "+8.9%", growthNum: 8.9, color: "#9B2335", x: 28, y: 65 },
  { id: "jp",  name: "日本",       marketSize: "$2.0T", sizeNum: 2.0, growth: "+5.1%", growthNum: 5.1, color: "#B4975A", x: 80, y: 30 },
  { id: "oc",  name: "オセアニア", marketSize: "$1.2T", sizeNum: 1.2, growth: "+8.9%", growthNum: 8.9, color: "#805AD5", x: 80, y: 70 },
]

// ─── 年間変化率 ───────────────────────────────────────────────────────────
const ANNUAL_CHANGES = [
  { label: "プレミアム富裕層",     change: 25.5, up: true },
  { label: "健康志向消費者",       change: 18.2, up: true },
  { label: "テック・デジタル層",   change: 12.8, up: true },
  { label: "伝統的高額消費者",     change: 5.2,  up: false },
]

// ─── 競合シェア ───────────────────────────────────────────────────────────
const COMPETITOR_DATA = [
  { name: "Visa",       share: 42, color: "#1A56DB" },
  { name: "Mastercard", share: 28, color: "#E53E3E" },
  { name: "AMEX",       share: 14, color: "#006FCF" },
  { name: "JCB",        share: 8,  color: "#38A169" },
  { name: "Others",     share: 8,  color: "#A0AEC0" },
]

// ─── 3C インサイト ────────────────────────────────────────────────────────
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

// ─── ペルソナ ─────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    name: "田中 雅子",
    age: 42,
    role: "外資系コンサル パートナー",
    location: "東京都港区",
    quote: "出張が月15日以上。ラウンジと優先搭乗は外せません。出費は惜しまないけど、それ以上の価値が欲しい。",
    quoteEn: "Business travel 15+ days/month. Lounge and priority boarding are must-haves.",
    image: null,
    initials: "TM",
    color: "#006FCF",
  },
  {
    name: "James Carter",
    age: 38,
    role: "Senior VP, Private Banking",
    location: "New York, USA",
    quote: "My centurion card is the first thing clients notice. Status matters in my world.",
    quoteEn: null,
    image: null,
    initials: "JC",
    color: "#B4975A",
  },
  {
    name: "Sophie Renard",
    age: 35,
    role: "Creative Director",
    location: "Paris, France",
    quote: "Je voyage pour l'art et la gastronomie. Les avantages AMEX me donnent accès à l'inaccessible.",
    quoteEn: "I travel for art and gastronomy. AMEX perks give me access to the inaccessible.",
    image: null,
    initials: "SR",
    color: "#38A169",
  },
  {
    name: "陈 明远",
    age: 44,
    role: "科技创业者 / Tech Founder",
    location: "上海, China",
    quote: "国际商务中，美国运通卡是身份与信赖的象征。高端服务是我选择的核心。",
    quoteEn: "In international business, AMEX is a symbol of status and trust.",
    image: null,
    initials: "CM",
    color: "#E53E3E",
  },
]

// ─── バブルサイズ計算 ─────────────────────────────────────────────────────
function getBubbleSize(sizeNum: number): number {
  const min = 40, max = 90
  const minV = 1.2, maxV = 6.5
  return min + ((sizeNum - minV) / (maxV - minV)) * (max - min)
}

export function AmexHomeContent() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const selected = REGIONS.find((r) => r.id === selectedRegion) ?? null

  return (
    <div className="p-6 space-y-6">
      {/* ページヘッダー */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">市場オーバービュー</h1>
          <p className="text-sm text-muted-foreground mt-0.5">グローバルプレミアムカード市場の動向とインサイト</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            更新
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            レポート出力
          </Button>
        </div>
      </div>

      {/* KPI カード 4枚 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((k) => {
          const Icon = k.icon
          const Sub = k.subIcon
          return (
            <Card key={k.label} className="border border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4 text-[#006FCF]" />
                  <span className="text-xs text-muted-foreground font-medium">{k.label}</span>
                </div>
                <p className="text-3xl font-bold text-foreground tracking-tight leading-none">{k.value}</p>
                <p className={`flex items-center gap-0.5 text-xs mt-2 font-medium ${k.subColor}`}>
                  {Sub && <Sub className="h-3 w-3" />}
                  {k.sub}
                </p>
              </CardContent>
            </Card>
          )
        })}
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
            {/* 地図エリア */}
            <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border border-border/50" style={{ aspectRatio: "16/9" }}>
              {/* 世界地図 SVG (簡易矩形投影) */}
              <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
                {/* 大陸シルエット（簡易） */}
                {/* 北米 */}
                <path d="M 60 60 L 200 55 L 220 90 L 240 160 L 200 200 L 160 230 L 100 220 L 60 180 Z" fill="#64748b" />
                {/* 南米 */}
                <path d="M 150 240 L 220 230 L 230 280 L 220 370 L 180 390 L 140 360 L 130 300 Z" fill="#64748b" />
                {/* 欧州 */}
                <path d="M 320 50 L 420 45 L 440 80 L 420 120 L 360 130 L 320 100 Z" fill="#64748b" />
                {/* アフリカ */}
                <path d="M 330 130 L 420 120 L 440 200 L 420 330 L 360 360 L 310 300 L 300 200 Z" fill="#64748b" />
                {/* アジア */}
                <path d="M 430 40 L 680 50 L 700 150 L 650 200 L 560 210 L 480 180 L 440 120 Z" fill="#64748b" />
                {/* 南アジア */}
                <path d="M 530 180 L 600 190 L 600 260 L 570 280 L 530 250 Z" fill="#64748b" />
                {/* 東南アジア */}
                <path d="M 610 200 L 700 200 L 710 260 L 670 270 L 620 250 Z" fill="#64748b" />
                {/* オーストラリア */}
                <path d="M 640 300 L 750 290 L 760 370 L 700 390 L 640 370 Z" fill="#64748b" />
                {/* 日本 */}
                <path d="M 700 80 L 730 75 L 735 120 L 705 125 Z" fill="#64748b" />
              </svg>

              {/* 地域バブル */}
              {REGIONS.map((r) => {
                const size = getBubbleSize(r.sizeNum)
                const isSelected = selectedRegion === r.id
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id === selectedRegion ? null : r.id)}
                    className="absolute flex flex-col items-center justify-center rounded-full border-2 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none"
                    style={{
                      left: `${r.x}%`,
                      top: `${r.y}%`,
                      width: size,
                      height: size,
                      marginLeft: -size / 2,
                      marginTop: -size / 2,
                      borderColor: r.color,
                      boxShadow: isSelected ? `0 0 0 3px ${r.color}40` : undefined,
                      zIndex: isSelected ? 10 : 1,
                    }}
                  >
                    <div className="flex items-center gap-0.5">
                      <ArrowUpRight className="h-2.5 w-2.5" style={{ color: r.color }} />
                    </div>
                    <span className="text-[11px] font-bold leading-none text-foreground">{r.marketSize}</span>
                  </button>
                )
              })}
            </div>

            {/* 凡例 */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 px-1">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id === selectedRegion ? null : r.id)}
                  className={`flex items-center gap-1.5 text-xs transition-opacity ${selectedRegion && selectedRegion !== r.id ? "opacity-40" : "opacity-100"}`}
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

        {/* 全世界 サマリー */}
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
                <p className="text-xs text-foreground leading-relaxed">
                  {selected
                    ? `${selected.name}市場は${selected.marketSize}規模、成長率${selected.growth}。プレミアム消費を牽引するUHNW（超富裕層）の増加が顕著で、AMEXシェアの拡大機会が高まっています。`
                    : "グローバルプレミアムカード市場では、富裕層（+25.5%）とテック・デジタル消費者（+12.8%）が成長を牽引。特に35歳以下の若手富裕層でセンチュリオン・プラチナへの関心が急増。伝統的消費者層は微減傾向にあり、体験型特典の拡充が重要な戦略課題です。"}
                </p>
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
                  <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 50]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "var(--foreground)" }} axisLine={false} tickLine={false} width={68} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: 11 }}
                    formatter={(v: number) => [`${v}%`, "シェア"]}
                  />
                  <Bar dataKey="share" radius={[0, 3, 3, 0]} barSize={10}>
                    {COMPETITOR_DATA.map((d) => (
                      <Cell key={d.name} fill={d.name === "AMEX" ? "#006FCF" : d.color} opacity={d.name === "AMEX" ? 1 : 0.6} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 下段: 3C分析 + ペルソナ分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 3C分析インサイト */}
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
                <div key={c.key} className="rounded-xl border border-border/60 p-4 hover:border-border transition-colors">
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

        {/* ペルソナ分析 */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#006FCF]" />
              <CardTitle className="text-sm font-semibold">全世界 - ペルソナ分析</CardTitle>
            </div>
            <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-border/60">
            {PERSONAS.map((p) => (
              <div key={p.name} className="py-4 first:pt-0">
                <div className="flex gap-3">
                  {/* アバター */}
                  <div
                    className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-bold"
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
                    {p.quoteEn && (
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                        {p.quoteEn}
                      </p>
                    )}
                    <button className="flex items-center gap-1 text-[11px] text-muted-foreground mt-2 hover:text-foreground">
                      <Bookmark className="h-3 w-3" />
                      保存
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
