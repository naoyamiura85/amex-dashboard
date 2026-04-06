"use client"

import { useState } from "react"
import {
  Plane, Utensils, Music, Heart, Gem, Waves, Mountain, Bike, Camera,
  Trophy, Wine, Palette, Fish, Mic2, Shirt, Dumbbell, Tent, Sailboat,
  Coffee, Flower2, Car, Star, Globe, ShoppingBag, Sunrise, Flame,
  Soup, Drumstick, IceCream, Beer, ChefHat, Ticket, Theater,
  BookOpen, Gamepad2, Leaf, Anchor, Zap, Navigation, TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ---- 型定義 ----
type ActivityCategory = "トラベル" | "ダイニング" | "エンターテイメント" | "スポーツ" | "ウェルネス" | "ショッピング"

interface Activity {
  id: string
  name: string
  icon: React.ElementType
  category: ActivityCategory
  growth: number   // YoY %
  hot: boolean     // 急上昇フラグ
}

interface Country {
  code: string
  name: string
  flag: string
  activities: Activity[]
}

// ---- カテゴリ定義 ----
const CATEGORIES: { key: ActivityCategory | "all"; label: string; color: string }[] = [
  { key: "all",               label: "すべて",               color: "text-slate-600" },
  { key: "トラベル",           label: "トラベル",              color: "text-[#006FCF]" },
  { key: "ダイニング",          label: "ダイニング",            color: "text-[#B4975A]" },
  { key: "エンターテイメント",   label: "エンターテイメント",    color: "text-[#9B2335]" },
  { key: "スポーツ",            label: "スポーツ",              color: "text-emerald-600" },
  { key: "ウェルネス",          label: "ウェルネス",            color: "text-teal-600" },
  { key: "ショッピング",         label: "ショッピング",          color: "text-purple-600" },
]

const CATEGORY_BG: Record<ActivityCategory, string> = {
  "トラベル":          "bg-[#006FCF]/10 border-[#006FCF]/20 hover:bg-[#006FCF]/20",
  "ダイニング":         "bg-[#B4975A]/10 border-[#B4975A]/20 hover:bg-[#B4975A]/20",
  "エンターテイメント": "bg-[#9B2335]/10 border-[#9B2335]/20 hover:bg-[#9B2335]/20",
  "スポーツ":           "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  "ウェルネス":         "bg-teal-50 border-teal-200 hover:bg-teal-100",
  "ショッピング":        "bg-purple-50 border-purple-200 hover:bg-purple-100",
}

const CATEGORY_ICON_COLOR: Record<ActivityCategory, string> = {
  "トラベル":          "text-[#006FCF]",
  "ダイニング":         "text-[#B4975A]",
  "エンターテイメント": "text-[#9B2335]",
  "スポーツ":           "text-emerald-600",
  "ウェルネス":         "text-teal-600",
  "ショッピング":        "text-purple-600",
}

// ---- 国別データ ----
const COUNTRIES: Country[] = [
  {
    code: "JP", name: "日本", flag: "🇯🇵",
    activities: [
      { id: "jp-01", name: "温泉旅行",       icon: Waves,       category: "トラベル",          growth: 34, hot: true  },
      { id: "jp-02", name: "ラグジュアリー旅館", icon: Sunrise,  category: "トラベル",          growth: 28, hot: false },
      { id: "jp-03", name: "ハイキング",      icon: Mountain,    category: "スポーツ",           growth: 41, hot: true  },
      { id: "jp-04", name: "サイクリング",    icon: Bike,        category: "スポーツ",           growth: 38, hot: true  },
      { id: "jp-05", name: "美食ツアー",      icon: ChefHat,     category: "ダイニング",         growth: 52, hot: true  },
      { id: "jp-06", name: "日本酒テイスティング", icon: Wine,   category: "ダイニング",         growth: 44, hot: true  },
      { id: "jp-07", name: "茶道体験",        icon: Coffee,      category: "ウェルネス",         growth: 29, hot: false },
      { id: "jp-08", name: "能・歌舞伎鑑賞",  icon: Theater,     category: "エンターテイメント", growth: 22, hot: false },
      { id: "jp-09", name: "現代アート",      icon: Palette,     category: "エンターテイメント", growth: 35, hot: true  },
      { id: "jp-10", name: "ラグジュアリーSPA", icon: Flower2,  category: "ウェルネス",         growth: 48, hot: true  },
      { id: "jp-11", name: "アウトドアキャンプ", icon: Tent,    category: "スポーツ",           growth: 56, hot: true  },
      { id: "jp-12", name: "ブランドショッピング", icon: ShoppingBag, category: "ショッピング", growth: 19, hot: false },
      { id: "jp-13", name: "釣り",            icon: Fish,        category: "スポーツ",           growth: 27, hot: false },
      { id: "jp-14", name: "写真撮影ツアー",  icon: Camera,      category: "トラベル",          growth: 31, hot: false },
      { id: "jp-15", name: "ヨガ・瞑想リトリート", icon: Leaf,  category: "ウェルネス",         growth: 43, hot: true  },
    ],
  },
  {
    code: "US", name: "アメリカ", flag: "🇺🇸",
    activities: [
      { id: "us-01", name: "プライベートジェット", icon: Plane,  category: "トラベル",          growth: 62, hot: true  },
      { id: "us-02", name: "ロードトリップ",   icon: Car,        category: "トラベル",          growth: 38, hot: true  },
      { id: "us-03", name: "ゴルフ",           icon: Trophy,     category: "スポーツ",           growth: 24, hot: false },
      { id: "us-04", name: "フィットネス",     icon: Dumbbell,   category: "スポーツ",           growth: 45, hot: true  },
      { id: "us-05", name: "高級ステーキ",     icon: Drumstick,  category: "ダイニング",         growth: 31, hot: false },
      { id: "us-06", name: "ワイナリー訪問",   icon: Wine,       category: "ダイニング",         growth: 49, hot: true  },
      { id: "us-07", name: "ライブコンサート", icon: Mic2,       category: "エンターテイメント", growth: 58, hot: true  },
      { id: "us-08", name: "スポーツ観戦VIP",  icon: Ticket,     category: "エンターテイメント", growth: 67, hot: true  },
      { id: "us-09", name: "ラグジュアリーSPA", icon: Flower2,  category: "ウェルネス",         growth: 41, hot: true  },
      { id: "us-10", name: "ハイキング",       icon: Mountain,   category: "スポーツ",           growth: 53, hot: true  },
      { id: "us-11", name: "ブランドショッピング", icon: ShoppingBag, category: "ショッピング", growth: 28, hot: false },
      { id: "us-12", name: "クラフトビール",   icon: Beer,       category: "ダイニング",         growth: 36, hot: true  },
      { id: "us-13", name: "アウトドアキャンプ", icon: Tent,    category: "スポーツ",           growth: 44, hot: true  },
      { id: "us-14", name: "マリンスポーツ",   icon: Anchor,     category: "スポーツ",           growth: 32, hot: false },
      { id: "us-15", name: "ファッションウィーク", icon: Shirt,  category: "ショッピング",       growth: 23, hot: false },
    ],
  },
  {
    code: "FR", name: "フランス", flag: "🇫🇷",
    activities: [
      { id: "fr-01", name: "ワインツーリズム", icon: Wine,       category: "トラベル",          growth: 55, hot: true  },
      { id: "fr-02", name: "プロヴァンス旅行", icon: Sunrise,    category: "トラベル",          growth: 42, hot: true  },
      { id: "fr-03", name: "ミシュランダイニング", icon: ChefHat, category: "ダイニング",        growth: 61, hot: true  },
      { id: "fr-04", name: "チーズテイスティング", icon: Utensils, category: "ダイニング",      growth: 38, hot: false },
      { id: "fr-05", name: "美術館巡り",       icon: Palette,    category: "エンターテイメント", growth: 29, hot: false },
      { id: "fr-06", name: "オペラ観劇",       icon: Theater,    category: "エンターテイメント", growth: 24, hot: false },
      { id: "fr-07", name: "サイクリング",     icon: Bike,       category: "スポーツ",           growth: 47, hot: true  },
      { id: "fr-08", name: "ラグジュアリーSPA", icon: Flower2,  category: "ウェルネス",         growth: 53, hot: true  },
      { id: "fr-09", name: "ファッション",     icon: Shirt,      category: "ショッピング",       growth: 33, hot: false },
      { id: "fr-10", name: "ラグジュアリーホテル", icon: Star,   category: "トラベル",          growth: 44, hot: true  },
      { id: "fr-11", name: "アイスクリーム巡り", icon: IceCream, category: "ダイニング",         growth: 27, hot: false },
      { id: "fr-12", name: "スキー",           icon: Mountain,   category: "スポーツ",           growth: 31, hot: false },
      { id: "fr-13", name: "ジュエリー",       icon: Gem,        category: "ショッピング",       growth: 36, hot: true  },
      { id: "fr-14", name: "ヨット",           icon: Sailboat,   category: "スポーツ",           growth: 41, hot: true  },
      { id: "fr-15", name: "ヨガ・瞑想",       icon: Leaf,       category: "ウェルネス",         growth: 48, hot: true  },
    ],
  },
  {
    code: "IT", name: "イタリア", flag: "🇮🇹",
    activities: [
      { id: "it-01", name: "食の世界遺産巡り", icon: Soup,       category: "ダイニング",         growth: 66, hot: true  },
      { id: "it-02", name: "ワイナリー訪問",   icon: Wine,       category: "ダイニング",         growth: 54, hot: true  },
      { id: "it-03", name: "アマルフィ旅行",   icon: Navigation, category: "トラベル",          growth: 49, hot: true  },
      { id: "it-04", name: "古代遺跡ツアー",   icon: BookOpen,   category: "トラベル",          growth: 33, hot: false },
      { id: "it-05", name: "オペラ",           icon: Music,      category: "エンターテイメント", growth: 28, hot: false },
      { id: "it-06", name: "現代アート",       icon: Palette,    category: "エンターテイメント", growth: 37, hot: true  },
      { id: "it-07", name: "ラグジュアリーカー", icon: Car,      category: "スポーツ",           growth: 58, hot: true  },
      { id: "it-08", name: "サイクリング",     icon: Bike,       category: "スポーツ",           growth: 42, hot: true  },
      { id: "it-09", name: "ラグジュアリーSPA", icon: Flower2,  category: "ウェルネス",         growth: 44, hot: true  },
      { id: "it-10", name: "ファッション",     icon: Shirt,      category: "ショッピング",       growth: 31, hot: false },
      { id: "it-11", name: "ジュエリー",       icon: Gem,        category: "ショッピング",       growth: 39, hot: true  },
      { id: "it-12", name: "ヨット",           icon: Sailboat,   category: "スポーツ",           growth: 47, hot: true  },
      { id: "it-13", name: "ピッツァ職人体験", icon: ChefHat,   category: "ダイニング",         growth: 22, hot: false },
      { id: "it-14", name: "コーヒー文化",     icon: Coffee,     category: "ダイニング",         growth: 29, hot: false },
      { id: "it-15", name: "ハイキング",       icon: Mountain,   category: "スポーツ",           growth: 35, hot: false },
    ],
  },
  {
    code: "GB", name: "イギリス", flag: "🇬🇧",
    activities: [
      { id: "gb-01", name: "カントリーハウス旅行", icon: Sunrise, category: "トラベル",         growth: 38, hot: false },
      { id: "gb-02", name: "スコットランド巡り", icon: Globe,    category: "トラベル",          growth: 44, hot: true  },
      { id: "gb-03", name: "ウィスキー",        icon: Wine,      category: "ダイニング",         growth: 57, hot: true  },
      { id: "gb-04", name: "アフタヌーンティー", icon: Coffee,   category: "ダイニング",         growth: 34, hot: false },
      { id: "gb-05", name: "フィッシュ&チップス", icon: Fish,    category: "ダイニング",         growth: 19, hot: false },
      { id: "gb-06", name: "ウエストエンド観劇", icon: Theater,  category: "エンターテイメント", growth: 52, hot: true  },
      { id: "gb-07", name: "クラシックコンサート", icon: Music,  category: "エンターテイメント", growth: 31, hot: false },
      { id: "gb-08", name: "ゴルフ（セントアンドルーズ）", icon: Trophy, category: "スポーツ", growth: 46, hot: true  },
      { id: "gb-09", name: "ポロ",              icon: Zap,       category: "スポーツ",           growth: 29, hot: false },
      { id: "gb-10", name: "ラグジュアリーSPA", icon: Flower2,  category: "ウェルネス",         growth: 41, hot: true  },
      { id: "gb-11", name: "ハイキング",        icon: Mountain,  category: "スポーツ",           growth: 48, hot: true  },
      { id: "gb-12", name: "ブランドショッピング（ロンドン）", icon: ShoppingBag, category: "ショッピング", growth: 26, hot: false },
      { id: "gb-13", name: "ジュエリー",        icon: Gem,       category: "ショッピング",       growth: 33, hot: false },
      { id: "gb-14", name: "マリンスポーツ",    icon: Waves,     category: "スポーツ",           growth: 37, hot: true  },
      { id: "gb-15", name: "乗馬",              icon: Flame,     category: "スポーツ",           growth: 22, hot: false },
    ],
  },
  {
    code: "SG", name: "シンガポール", flag: "🇸🇬",
    activities: [
      { id: "sg-01", name: "マリーナリゾート",  icon: Anchor,    category: "トラベル",          growth: 53, hot: true  },
      { id: "sg-02", name: "アジア周遊クルーズ", icon: Sailboat,  category: "トラベル",          growth: 48, hot: true  },
      { id: "sg-03", name: "ホーカーズ食文化",  icon: Soup,      category: "ダイニング",         growth: 41, hot: true  },
      { id: "sg-04", name: "ミシュランダイニング", icon: ChefHat, category: "ダイニング",        growth: 59, hot: true  },
      { id: "sg-05", name: "ガーデンズバイザベイ", icon: Leaf,   category: "トラベル",          growth: 36, hot: false },
      { id: "sg-06", name: "Eスポーツ観戦",     icon: Gamepad2,  category: "エンターテイメント", growth: 74, hot: true  },
      { id: "sg-07", name: "ショッピングモール", icon: ShoppingBag, category: "ショッピング",    growth: 28, hot: false },
      { id: "sg-08", name: "ラグジュアリーSPA", icon: Flower2,  category: "ウェルネス",         growth: 46, hot: true  },
      { id: "sg-09", name: "ヨット",            icon: Sailboat,  category: "スポーツ",           growth: 39, hot: true  },
      { id: "sg-10", name: "マリンスポーツ",    icon: Waves,     category: "スポーツ",           growth: 44, hot: true  },
      { id: "sg-11", name: "アートウィーク",    icon: Palette,   category: "エンターテイメント", growth: 33, hot: false },
      { id: "sg-12", name: "グローバルジュエリー", icon: Gem,    category: "ショッピング",       growth: 37, hot: true  },
      { id: "sg-13", name: "ラグジュアリーホテル", icon: Star,   category: "トラベル",          growth: 51, hot: true  },
      { id: "sg-14", name: "フィットネス",      icon: Dumbbell,  category: "スポーツ",           growth: 42, hot: true  },
      { id: "sg-15", name: "バラエティグルメ",  icon: Utensils,  category: "ダイニング",         growth: 31, hot: false },
    ],
  },
]

// ---- コンポーネント ----
export function AmexTrendsContent() {
  const [selectedCountry, setSelectedCountry] = useState<string>("JP")
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | "all">("all")

  const country = COUNTRIES.find(c => c.code === selectedCountry)!

  const filtered = country.activities.filter(a =>
    selectedCategory === "all" || a.category === selectedCategory
  )

  // カテゴリ別にグループ化
  const grouped = CATEGORIES.filter(c => c.key !== "all").reduce<Record<string, Activity[]>>((acc, cat) => {
    const acts = filtered.filter(a => a.category === cat.key)
    if (acts.length > 0) acc[cat.key] = acts
    return acc
  }, {})

  return (
    <div className="space-y-6 pb-8">

      {/* 国タブ */}
      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map(c => (
          <button
            key={c.code}
            onClick={() => setSelectedCountry(c.code)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all",
              selectedCountry === c.code
                ? "bg-[#006FCF] text-white border-[#006FCF] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#006FCF]/50 hover:text-[#006FCF]"
            )}
          >
            <span className="text-base">{c.flag}</span>
            {c.name}
          </button>
        ))}
      </div>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
              selectedCategory === cat.key
                ? "bg-slate-800 text-white border-slate-800"
                : `border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700`
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* カテゴリ別グループ */}
      {Object.entries(grouped).map(([catKey, acts]) => {
        const catMeta = CATEGORIES.find(c => c.key === catKey)!
        return (
          <div key={catKey}>
            <div className="flex items-center gap-2 mb-3">
              <h3 className={cn("text-sm font-bold", catMeta.color)}>{catKey}</h3>
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs text-slate-400">{acts.length}件</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
              {acts.map(act => {
                const Icon = act.icon
                const bg   = CATEGORY_BG[act.category]
                const ic   = CATEGORY_ICON_COLOR[act.category]
                return (
                  <button
                    key={act.id}
                    className={cn(
                      "group flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer text-center",
                      bg
                    )}
                  >
                    <div className="relative">
                      <Icon className={cn("h-7 w-7", ic)} />
                      {act.hot && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight line-clamp-2">
                      {act.name}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <TrendingUp className="h-2.5 w-2.5 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-600">+{act.growth}%</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* 凡例 */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-flex h-3 w-3 rounded-full bg-red-500" />
          急上昇トレンド
        </div>
        {CATEGORIES.filter(c => c.key !== "all").map(cat => (
          <div key={cat.key} className="flex items-center gap-1.5 text-xs">
            <div className={cn("w-2.5 h-2.5 rounded-sm", CATEGORY_BG[cat.key as ActivityCategory].split(" ")[0])} />
            <span className={cn("font-medium", cat.color)}>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
