"use client"

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
  Sparkles,
  Bookmark,
  RefreshCw,
  Download,
  BarChart3,
  UserCircle,
  Plane,
  UtensilsCrossed,
  Music,
  Globe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { GlobalMap, type MapRegion } from "./global-map"

// ─── 地域データ（5カ国: 日本・US・UK・メキシコ・カナダ）──────────────────────────────────────
const REGIONS: MapRegion[] = [
  { id: "jp", name: "日本",     flag: "/images/flags/jp.jpg", marketSize: "$2.0T", sizeNum: 2.0, growth: "+5.1%", growthNum: 5.1, color: "#B4975A", coordinates: [138, 36]  },
  { id: "us", name: "US",       flag: "/images/flags/us.jpg", marketSize: "$4.2T", sizeNum: 4.2, growth: "+7.8%", growthNum: 7.8, color: "#006FCF", coordinates: [-98, 39]  },
  { id: "uk", name: "UK",       flag: "/images/flags/uk.jpg", marketSize: "$1.2T", sizeNum: 1.2, growth: "+4.1%", growthNum: 4.1, color: "#9B2335", coordinates: [-2, 54]   },
  { id: "mx", name: "メキシコ", flag: "/images/flags/mx.jpg", marketSize: "$0.6T", sizeNum: 0.6, growth: "+9.4%", growthNum: 9.4, color: "#38A169", coordinates: [-102, 24] },
  { id: "ca", name: "カナダ",   flag: "/images/flags/ca.jpg", marketSize: "$0.8T", sizeNum: 0.8, growth: "+5.5%", growthNum: 5.5, color: "#805AD5", coordinates: [-106, 56] },
]

// 地域ごとのトレンドサマリー（5カ国）
const REGION_TREND: Record<string, string> = {
  jp: "日本市場は$2.0T規模。インバウンド回復と円安によるラグジュアリー消費急増。プラチナ・センチュリオン保有者の利用額が前年比+18%。",
  us: "US市場は$4.2T規模。プレミアム旅行・エンタメ消費が牽引し、UHNW層のセンチュリオン利用が過去最高。Z世代富裕層の新規獲得が課題。",
  uk: "UK市場は$1.2T規模。ウエストエンド観劇・ゴルフ特典が高評価。Brexit後の旅行需要回復で欧州路線のラウンジ利用が増加傾向。",
  mx: "メキシコ市場は$0.6T規模。富裕層の海外旅行需要とe-commerceでの利用が急伸。ニアショアリング景気で法人カード需要拡大。",
  ca: "カナダ市場は$0.8T規模。移民高所得層が新規入会を牽引。スキー・アウトドアとラグジュアリーホテル特典への需要が特に高い。",
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

// ─── 地域別 Travel / Dining / Entertainment トピックス ─────────────────────────

const REGION_TOPICS: Record<string, { travel: string[]; dining: string[]; entertainment: string[] }> = {
  global: {
    travel: [
      "プレミアム旅行需要が過去最高、ファーストクラス予約が前年比+32%",
      "サステナブルツーリズムへの関心が急上昇、エコラグジュアリーリゾートが人気",
    ],
    dining: [
      "ミシュラン星付きレストランの予約が+28%増加、体験型ダイニングがトレンド",
      "プライベートシェフサービスの利用が富裕層で拡大中",
    ],
    entertainment: [
      "VIPコンサート・スポーツイベントのプレミアムシート需要が急増",
      "プライベートジェットでのイベント参加パッケージが人気上昇",
    ],
  },
  jp: {
    travel: [
      "国内高級温泉旅館の予約が+45%増、星のやブランドが特に好調",
      "ファーストクラス利用のハワイ・ヨーロッパ旅行が富裕層で人気継続",
    ],
    dining: [
      "会員限定のオマカセダイニング体験への参加が+38%増加",
      "銀座・六本木エリアの高級鮨店予約がAMEXコンシェルジュ経由で急増",
    ],
    entertainment: [
      "歌舞伎・能楽のVIP席アレンジ依頼が増加、伝統芸能への関心が高まる",
      "プライベートワインテイスティングイベントの開催リクエストが+25%",
    ],
  },
  us: {
    travel: [
      "マイアミ・アスペンへのプライベートジェット予約が+52%増加",
      "カリブ海オールインクルーシブリゾートのセンチュリオン特典利用が好調",
    ],
    dining: [
      "NYCのミシュラン3つ星レストラン「Eleven Madison Park」予約が+40%",
      "ナパバレーのワイナリーディナー体験への需要が急増",
    ],
    entertainment: [
      "NFL・NBAプレミアムスイート利用がビジネスエンターテイメントで人気",
      "ブロードウェイVIP体験パッケージの予約が前年比+35%",
    ],
  },
  uk: {
    travel: [
      "コッツウォルズの高級カントリーハウス滞在が+30%増加",
      "ヨーロッパ周遊のオリエント急行体験への予約が好調",
    ],
    dining: [
      "ロンドンのGordon Ramsayグループレストラン予約が+33%増",
      "スコットランドのウイスキー蒸留所でのプライベートディナーが人気",
    ],
    entertainment: [
      "ウィンブルドン・ロイヤルボックス席の需要が過去最高",
      "ウエストエンドのプレミア公演VIPパッケージ利用が増加",
    ],
  },
  mx: {
    travel: [
      "ロスカボスのオールインクルーシブリゾート予約が+48%増加",
      "メキシコシティ〜カンクン間のプライベートジェット利用が拡大",
    ],
    dining: [
      "Pujolなど世界ベストレストラン50選の店舗予約が+42%増",
      "オアハカの伝統料理とメスカルペアリングディナーが人気",
    ],
    entertainment: [
      "F1メキシコGPのVIPホスピタリティパッケージが即完売",
      "メキシコシティのアートギャラリープライベートツアーが好評",
    ],
  },
  ca: {
    travel: [
      "ウィスラーの高級スキーリゾート予約が+38%増、ヘリスキーが人気",
      "バンクーバー〜トロント間のビジネスクラス利用が過去最高",
    ],
    dining: [
      "トロントのCanoe、Aloレストラン予約がAMEX会員で+35%増加",
      "モントリオールのフレンチダイニング体験への需要が拡大",
    ],
    entertainment: [
      "NHL・MLBのプレミアムスイート利用がコーポレートイベントで人気",
      "トロント国際映画祭のVIPパッケージ予約が+28%増加",
    ],
  },
}

const TOPIC_CATEGORIES = [
  { key: "travel", label: "Travel", icon: Plane, color: "text-sky-600", bg: "bg-sky-50" },
  { key: "dining", label: "Dining", icon: UtensilsCrossed, color: "text-amber-600", bg: "bg-amber-50" },
  { key: "entertainment", label: "Entertainment", icon: Music, color: "text-purple-600", bg: "bg-purple-50" },
]

// ─── 地域別KPIデータ ───────────────────────────────────────────────────────────
const REGION_KPI: Record<string, { ar: number; ar_change: number; ltcs: number; ltcs_change: number; bc: number; bc_change: number }> = {
  global: { ar: 58, ar_change: 6, ltcs: 72, ltcs_change: 5, bc: 44, bc_change: 5 },
  jp: { ar: 50, ar_change: 8, ltcs: 73, ltcs_change: 5, bc: 37, bc_change: 5 },
  us: { ar: 65, ar_change: 7, ltcs: 77, ltcs_change: 5, bc: 50, bc_change: 5 },
  uk: { ar: 56, ar_change: 5, ltcs: 70, ltcs_change: 5, bc: 45, bc_change: 5 },
  mx: { ar: 48, ar_change: 10, ltcs: 68, ltcs_change: 6, bc: 35, bc_change: 7 },
  ca: { ar: 60, ar_change: 6, ltcs: 75, ltcs_change: 4, bc: 48, bc_change: 5 },
}

const KPI_METRICS = [
  { id: "ad-recall", key: "ar", changeKey: "ar_change", name: "Ad Recall", color: "#006FCF" },
  { id: "ltcs", key: "ltcs", changeKey: "ltcs_change", name: "LTCS", color: "#B4975A" },
  { id: "brand-consideration", key: "bc", changeKey: "bc_change", name: "Brand Consideration", color: "#00175A" },
]

// ─── 地域別Audienceデータ（5カ国対応）──────────────────────────────────────────
const REGION_AUDIENCE: Record<string, { demographics: { label: string; value: string }[]; personas: { name: string; age: string; occupation: string; income: string; interests: string[]; quote: string }[] }> = {
  global: {
    demographics: [
      { label: "平均年齢", value: "42歳" },
      { label: "平均世帯年収", value: "$180K" },
      { label: "男女比", value: "60:40" },
      { label: "都市部居住率", value: "78%" },
    ],
    personas: [
      { name: "Global Executive", age: "45歳", occupation: "経営幹部", income: "$200K+", interests: ["ビジネス旅行", "ゴルフ", "ファインダイニング"], quote: "グローバルで信頼されるカードが必要です" },
      { name: "Affluent Professional", age: "38歳", occupation: "専門職", income: "$150K+", interests: ["旅行", "アート", "ウェルネス"], quote: "プレミアムな体験と特典を重視しています" },
    ],
  },
  jp: {
    demographics: [
      { label: "平均年齢", value: "38歳" },
      { label: "平��世帯年収", value: "1,250万円" },
      { label: "男女比", value: "65:35" },
      { label: "都市部居住率", value: "78%" },
    ],
    personas: [
      { name: "田中 健一", age: "42歳", occupation: "外資系企業 部長", income: "1,500万円+", interests: ["ゴルフ", "高級ダイニング", "海外旅行"], quote: "ステータスと実用性を兼ね備えたカードを求めています" },
      { name: "佐藤 美咲", age: "35歳", occupation: "医師", income: "1,200万円+", interests: ["ワイン", "アート", "ウェルネス"], quote: "特別な体験と手厚いサービスが決め手です" },
    ],
  },
  us: {
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
  uk: {
    demographics: [
      { label: "平均年齢", value: "44歳" },
      { label: "平均世帯年収", value: "£165K" },
      { label: "男女比", value: "62:38" },
      { label: "都市部居住率", value: "75%" },
    ],
    personas: [
      { name: "James Thompson", age: "48歳", occupation: "弁護士", income: "£180K+", interests: ["劇場", "ワイン", "旅行"], quote: "伝統と名声が私には重要です" },
      { name: "Sophie Renard", age: "35歳", occupation: "クリエイティブディレクター", income: "£150K+", interests: ["アート", "ガストロノミー", "旅行"], quote: "AMEXの特典で特別な体験にアクセスできます" },
    ],
  },
  mx: {
    demographics: [
      { label: "平均年齢", value: "40歳" },
      { label: "平均世帯年収", value: "$150K" },
      { label: "男女比", value: "55:45" },
      { label: "都市部居住率", value: "80%" },
    ],
    personas: [
      { name: "Carlos Hernández", age: "42歳", occupation: "企業オーナー", income: "$180K+", interests: ["ビジネス旅行", "ゴルフ", "高級車"], quote: "海外出張が多いのでグローバルな特典が重要です" },
      { name: "María González", age: "36歳", occupation: "外資系マネージャー", income: "$140K+", interests: ["ショッピング", "旅行", "美食"], quote: "プレミアムな体験を大切にしています" },
    ],
  },
  ca: {
    demographics: [
      { label: "平均年齢", value: "41歳" },
      { label: "平均世帯年収", value: "CAD 200K" },
      { label: "男女比", value: "57:43" },
      { label: "都市部居住率", value: "85%" },
    ],
    personas: [
      { name: "David Lee", age: "44歳", occupation: "ファイナンシャルアドバイザー", income: "CAD 220K+", interests: ["スキー", "ワイン", "旅行"], quote: "旅行特典とラウンジアクセスが決め手です" },
      { name: "Emily Brown", age: "37歳", occupation: "テック企業VP", income: "CAD 250K+", interests: ["アウトドア", "ウェルネス", "投資"], quote: "実用的で価値のある特典を求めています" },
    ],
  },
}

// ─── ペルソナ（地域別） ─────────────────────────────────────────────────────────
const PERSONAS: Record<string, { name: string; age: number; role: string; location: string; quote: string; initials: string; color: string }[]> = {
  global: [
    { name: "田中 雅子", age: 42, role: "外資系コンサル パートナー", location: "東京都港区", quote: "出張が月15日以上。ラウンジと優先搭乗は外せません。", initials: "TM", color: "#006FCF" },
    { name: "James Carter", age: 38, role: "Senior VP, Private Banking", location: "New York, USA", quote: "My Centurion card is the first thing clients notice.", initials: "JC", color: "#B4975A" },
    { name: "Sophie Renard", age: 35, role: "Creative Director", location: "Paris, France", quote: "Je voyage pour l'art et la gastronomie.", initials: "SR", color: "#38A169" },
  ],
  jp: [
    { name: "田中 雅子", age: 42, role: "外資系コンサル パートナー", location: "東京都港区", quote: "出張が月15日以上。ラウンジと優先搭乗は外せません。出費は惜しまないけど、それ以上の価値が欲しい。", initials: "TM", color: "#006FCF" },
    { name: "佐藤 健一", age: 48, role: "医療法人 理事長", location: "大阪府豊中市", quote: "患者様への最高のサービス同様、自分へのご褒美も妥協しません。", initials: "SK", color: "#B4975A" },
    { name: "鈴木 美咲", age: 35, role: "IT企業 執行役員", location: "東京都渋谷区", quote: "海外出張とプライベート旅行、どちらも最高の体験を求めています。", initials: "SM", color: "#38A169" },
  ],
  us: [
    { name: "James Carter", age: 38, role: "Senior VP, Private Banking", location: "New York, USA", quote: "My Centurion card is the first thing clients notice. Status matters in my world.", initials: "JC", color: "#B4975A" },
    { name: "Sarah Williams", age: 42, role: "Tech Executive", location: "San Francisco, USA", quote: "From SFO lounges to global conferences, AMEX makes my life seamless.", initials: "SW", color: "#006FCF" },
    { name: "Michael Chen", age: 45, role: "Investment Director", location: "Boston, USA", quote: "Premium travel and exclusive access are non-negotiable for me.", initials: "MC", color: "#38A169" },
  ],
  uk: [
    { name: "William Hughes", age: 44, role: "Barrister", location: "London, UK", quote: "Tradition and prestige matter. AMEX embodies both in every interaction.", initials: "WH", color: "#006FCF" },
    { name: "Charlotte Davies", age: 36, role: "Investment Banker", location: "London, UK", quote: "From Heathrow to Hong Kong, the Centurion service is impeccable.", initials: "CD", color: "#B4975A" },
    { name: "Oliver Smith", age: 50, role: "Private Equity Partner", location: "Edinburgh, UK", quote: "Fine dining, exclusive events - AMEX opens doors others cannot.", initials: "OS", color: "#38A169" },
  ],
  mx: [
    { name: "Carlos Hernández", age: 42, role: "Empresario", location: "Ciudad de México", quote: "Para mis viajes de negocios internacionales, AMEX es indispensable.", initials: "CH", color: "#006FCF" },
    { name: "María González", age: 38, role: "Directora de Marketing", location: "Monterrey, México", quote: "Los beneficios premium hacen que cada viaje sea una experiencia única.", initials: "MG", color: "#B4975A" },
    { name: "Diego Ramírez", age: 45, role: "CEO, Tecnología", location: "Guadalajara, México", quote: "El servicio de conserjería es excepcional para mis eventos corporativos.", initials: "DR", color: "#38A169" },
  ],
  ca: [
    { name: "David Lee", age: 44, role: "Financial Advisor", location: "Toronto, Canada", quote: "From ski trips to business meetings, AMEX delivers exceptional value.", initials: "DL", color: "#006FCF" },
    { name: "Emily Brown", age: 37, role: "Tech VP", location: "Vancouver, Canada", quote: "The travel benefits alone make the annual fee worthwhile.", initials: "EB", color: "#B4975A" },
    { name: "Jean-Pierre Dubois", age: 48, role: "Avocat", location: "Montréal, Canada", quote: "Le service en français et les avantages premium sont incomparables.", initials: "JD", color: "#38A169" },
  ],
}

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

      {/* メインパネル: 地図 + 右サイドバー（サマリー + KPI） */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* 世界地図 */}
        <Card className="lg:col-span-3 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#006FCF]" />
              <CardTitle className="text-sm font-semibold">グローバルマップ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <GlobalMap
              regions={REGIONS}
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
            />
          </CardContent>
        </Card>

        {/* 右サイドバー: サマリー + KPI Tracking (統合) */}
        {(() => {
          const regionId = selected?.id ?? "global"
          const kpi = REGION_KPI[regionId]
          return (
            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    {selected ? `${selected.name} サマリー` : "全世界 サマリー"}
                  </CardTitle>
                  <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* KPI Tracking */}
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">
                    KPI Tracking
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {KPI_METRICS.map((m) => {
                      const value = kpi[m.key as keyof typeof kpi] as number
                      const change = kpi[m.changeKey as keyof typeof kpi] as number
                      return (
                        <div key={m.id} className="rounded-lg border border-border/60 p-2.5 text-center">
                          <p className="text-[10px] text-muted-foreground mb-0.5">{m.name}</p>
                          <p className="text-xl font-bold" style={{ color: m.color }}>{value}%</p>
                          <div className="flex items-center justify-center gap-0.5 mt-0.5">
                            {change >= 0 ? (
                              <TrendingUp className="h-2.5 w-2.5 text-emerald-500" />
                            ) : (
                              <TrendingDown className="h-2.5 w-2.5 text-red-500" />
                            )}
                            <span className={`text-[10px] font-medium ${change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                              {change >= 0 ? "+" : ""}{change}%
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* トレンド */}
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">トレンド</p>
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
                  <ResponsiveContainer width="100%" height={100}>
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
                        tick={{ fontSize: 10, fill: "#111827" }}
                        axisLine={false}
                        tickLine={false}
                        width={60}
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
          )
        })()}
      </div>

      {/* Latest Topics + Audience Profile（常に表示、選択地域または全世界） */}
      {(() => {
        const regionId = selected?.id ?? "global"
        const regionName = selected?.name ?? "全世界"
        const audience = REGION_AUDIENCE[regionId]
        const topics = REGION_TOPICS[regionId] ?? REGION_TOPICS.global
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 左カラム: Latest Topics */}
            <div className="space-y-4">
              {/* Travel / Dining / Entertainment トピックス */}
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#006FCF]" />
                      <CardTitle className="text-sm font-semibold">{regionName} - Latest Topics</CardTitle>
                    </div>
                    <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {TOPIC_CATEGORIES.map((cat) => {
                    const Icon = cat.icon
                    const items = topics[cat.key as keyof typeof topics] ?? []
                    return (
                      <div
                        key={cat.key}
                        className="rounded-xl border border-border/60 p-4 hover:border-border transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${cat.bg} shrink-0`}>
                            <Icon className={`h-4 w-4 ${cat.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-bold text-foreground">{cat.label}</p>
                              <Bookmark className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                            </div>
                            <ul className="space-y-2">
                              {items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-xs text-muted-foreground mt-0.5">•</span>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{item}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* 右カラム: Audience Profile + ペルソナ分析 */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-[#006FCF]" />
                    <CardTitle className="text-sm font-semibold">{regionName} - Audience Profile</CardTitle>
                  </div>
                  <Bookmark className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Demographics */}
                <div className="grid grid-cols-4 gap-2">
                  {audience?.demographics.map((d, i) => (
                    <div key={i} className="text-center p-2 rounded-lg bg-slate-50">
                      <p className="text-[10px] text-muted-foreground">{d.label}</p>
                      <p className="text-sm font-bold text-[#006FCF]">{d.value}</p>
                    </div>
                  ))}
                </div>
                {/* ペルソナ分析（地域別） */}
                <div className="space-y-0 divide-y divide-border/60">
                  {(PERSONAS[regionId] ?? PERSONAS.global).map((p) => (
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
        )
      })()}
    </div>
  )
}
