"use client"

import { useState } from "react"
import {
  Plane, Utensils, Music, Heart, Gem, Waves, Mountain, Bike, Camera,
  Trophy, Wine, Palette, Fish, Mic2, Shirt, Dumbbell, Tent, Sailboat,
  Coffee, Flower2, Car, Star, Globe, ShoppingBag, Sunrise, Flame,
  Drumstick, IceCream, Beer, ChefHat, Ticket, Theater,
  BookOpen, Leaf, Anchor, Zap, TrendingUp,
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

// ---- メインタブ定義 ----
const MAIN_TABS: { key: "travel" | "dining" | "entertainment"; label: string; color: string; categories: ActivityCategory[] }[] = [
  { key: "travel",        label: "Travel",        color: "text-[#006FCF]", categories: ["トラベル", "スポーツ", "ウェルネス"] },
  { key: "dining",        label: "Dining",        color: "text-[#B4975A]", categories: ["ダイニング"] },
  { key: "entertainment", label: "Entertainment", color: "text-[#9B2335]", categories: ["エンターテイメント", "ショッピング"] },
]

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
    code: "MX", name: "メキシコ", flag: "🇲🇽",
    activities: [
      { id: "mx-01", name: "リゾートビーチ",        icon: Waves,       category: "トラベル",          growth: 58, hot: true  },
      { id: "mx-02", name: "テキーラ蒸留所ツアー",   icon: Wine,        category: "ダイニング",         growth: 51, hot: true  },
      { id: "mx-03", name: "マヤ遺跡探訪",          icon: BookOpen,    category: "トラベル",          growth: 44, hot: true  },
      { id: "mx-04", name: "高級メキシカン料理",     icon: ChefHat,     category: "ダイニング",         growth: 62, hot: true  },
      { id: "mx-05", name: "セノーテダイビング",     icon: Anchor,      category: "スポーツ",           growth: 49, hot: true  },
      { id: "mx-06", name: "ルチャリブレ観戦",       icon: Ticket,      category: "エンターテイメント", growth: 33, hot: false },
      { id: "mx-07", name: "現代アートギャラリー",   icon: Palette,     category: "エンターテイメント", growth: 38, hot: true  },
      { id: "mx-08", name: "ラグジュアリーSPA",      icon: Flower2,     category: "ウェルネス",         growth: 47, hot: true  },
      { id: "mx-09", name: "ブランドショッピング",    icon: ShoppingBag, category: "ショッピング",       growth: 25, hot: false },
      { id: "mx-10", name: "ゴルフ（カンクン）",     icon: Trophy,      category: "スポーツ",           growth: 31, hot: false },
      { id: "mx-11", name: "サーフィン",             icon: Waves,       category: "スポーツ",           growth: 55, hot: true  },
      { id: "mx-12", name: "カクテル体験",           icon: IceCream,    category: "ダイニング",         growth: 28, hot: false },
      { id: "mx-13", name: "カルチャーフェスティバル", icon: Music,     category: "エンターテイメント", growth: 41, hot: true  },
      { id: "mx-14", name: "ヨガ・瞑想リトリート",   icon: Leaf,        category: "ウェルネス",         growth: 46, hot: true  },
      { id: "mx-15", name: "写真撮影ツアー",         icon: Camera,      category: "トラベル",          growth: 34, hot: false },
    ],
  },
  {
    code: "CA", name: "カナダ", flag: "🇨🇦",
    activities: [
      { id: "ca-01", name: "スキーリゾート（ウィスラー）", icon: Mountain, category: "スポーツ",        growth: 61, hot: true  },
      { id: "ca-02", name: "ロッキー山脈ハイキング",      icon: Mountain, category: "スポーツ",         growth: 54, hot: true  },
      { id: "ca-03", name: "アイスワイン体験",            icon: Wine,     category: "ダイニング",        growth: 42, hot: true  },
      { id: "ca-04", name: "ラグジュアリーロッジ滞在",    icon: Star,     category: "トラベル",         growth: 49, hot: true  },
      { id: "ca-05", name: "カナディアンロブスター",      icon: Fish,     category: "ダイニング",        growth: 38, hot: true  },
      { id: "ca-06", name: "ミシュランダイニング",        icon: ChefHat,  category: "ダイニング",        growth: 55, hot: true  },
      { id: "ca-07", name: "カヤック・カヌー",            icon: Sailboat, category: "スポーツ",          growth: 46, hot: true  },
      { id: "ca-08", name: "ラグジュアリーSPA",           icon: Flower2,  category: "ウェルネス",        growth: 43, hot: true  },
      { id: "ca-09", name: "NHL観戦VIP",                 icon: Ticket,   category: "エンターテイメント", growth: 67, hot: true  },
      { id: "ca-10", name: "ブランドショッピング",         icon: ShoppingBag, category: "ショッピング",  growth: 22, hot: false },
      { id: "ca-11", name: "ナイアガラ旅行",             icon: Sunrise,  category: "トラベル",          growth: 33, hot: false },
      { id: "ca-12", name: "ヨガ・瞑想リトリート",        icon: Leaf,     category: "ウェルネス",        growth: 48, hot: true  },
      { id: "ca-13", name: "アートフェスティバル",        icon: Palette,  category: "エンターテイメント", growth: 31, hot: false },
      { id: "ca-14", name: "アウトドアキャンプ",          icon: Tent,     category: "スポーツ",          growth: 58, hot: true  },
      { id: "ca-15", name: "マプルシロップ体験",          icon: Coffee,   category: "ダイニング",        growth: 26, hot: false },
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
]

// ---- コンポーネント ----
export function AmexTrendsContent() {
  const [selectedCountry, setSelectedCountry] = useState<string>("JP")
  const [selectedTab, setSelectedTab] = useState<"travel" | "dining" | "entertainment">("travel")

  const country = COUNTRIES.find(c => c.code === selectedCountry)!
  const currentTabConfig = MAIN_TABS.find(t => t.key === selectedTab)!

  // 選択されたタブに属するカテゴリのアクティビティをフィルタ
  const filtered = country.activities.filter(a =>
    currentTabConfig.categories.includes(a.category)
  )

  // カテゴリ別にグループ化
  const grouped = currentTabConfig.categories.reduce<Record<string, Activity[]>>((acc, catKey) => {
    const acts = filtered.filter(a => a.category === catKey)
    if (acts.length > 0) acc[catKey] = acts
    return acc
  }, {})

  return (
    <div className="space-y-6 pb-8">

      {/* メインタブ: Travel / Dining / Entertainment */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
        {MAIN_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-semibold transition-all",
              selectedTab === tab.key
                ? "bg-white text-[#006FCF] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
        {currentTabConfig.categories.map(catKey => {
          const cat = CATEGORIES.find(c => c.key === catKey)!
          return (
            <div key={catKey} className="flex items-center gap-1.5 text-xs">
              <div className={cn("w-2.5 h-2.5 rounded-sm", CATEGORY_BG[catKey].split(" ")[0])} />
              <span className={cn("font-medium", cat.color)}>{cat.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
