"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Grid3X3,
  List,
  ArrowUpRight,
  Flame,
  Clock,
  Loader2,
  Brain,
  Zap,
  Download,
  BarChart3,
  Globe,
  Bell,
} from "lucide-react"
import { useCategoryMode, categoryModeConfig } from "@/contexts/category-mode-context"
import { useTrends } from "@/contexts/trends-context"
import { AddTrendDialog } from "./add-trend-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts"

// Category mapping for mode filter
const categoryModeMapping: Record<string, string[]> = {
  all: [],
  food: ["food"],
  beverage: ["beverage"],
  cosmetics: ["cosmetics"],
  supplement: ["supplement"],
  toiletry: ["toiletry"],
  wellness: ["wellness"],
}

const categoryColors: Record<string, string> = {
  cosmetics: "bg-rose-100 text-rose-700",
  food: "bg-emerald-100 text-emerald-700",
  beverage: "bg-sky-100 text-sky-700",
  supplement: "bg-amber-100 text-amber-700",
  toiletry: "bg-blue-100 text-blue-700",
  wellness: "bg-violet-100 text-violet-700",
}

const statusColors: Record<string, string> = {
  Growing: "bg-emerald-100 text-emerald-700",
  Stable: "bg-blue-100 text-blue-700",
  Emerging: "bg-amber-100 text-amber-700",
  Declining: "bg-red-100 text-red-700",
}

// 相関発見データ
const crossCategoryCorrelations = [
  { title: "睡眠サプリ × スキンケア", correlation: 87, image: "/images/correlations/sleep-skincare.jpg", insight: "睡眠の質向上と美肌効果の相乗効果" },
  { title: "アンチエイジング × 睡眠", correlation: 82, image: "/images/correlations/antiaging-sleep.jpg", insight: "夜間ケアと睡眠促進の組み合わせ需要" },
  { title: "美肌 × 栄養補助食品", correlation: 79, image: "/images/correlations/beauty-supplements.jpg", insight: "インナービューティー市場の拡大" },
]

const materialSynergies = [
  { title: "ビタミンC + ヒアルロン酸", boost: 143, image: "/images/correlations/vitaminc-hyaluronic.jpg", insight: "保湿×美白の定番コンビ" },
  { title: "レチノール + ペプチド", boost: 128, image: "/images/correlations/retinol-peptide.jpg", insight: "エイジングケアの最強タッグ" },
  { title: "ナイアシンアミド + セラミド", boost: 115, image: "/images/correlations/niacinamide-ceramide.jpg", insight: "バリア機能強化の新定番" },
]

// トレンド予測データ
const trendArrivalData = [
  { trend: "ポストバイオティクス", origin: "米国", arrivalMonth: "2025年7月", confidence: 92, growth: "+180%", status: "到来直前" },
  { trend: "クリーンビューティー2.0", origin: "欧州", arrivalMonth: "2025年9月", confidence: 87, growth: "+145%", status: "準備期" },
  { trend: "バイオミメティクス成分", origin: "韓国", arrivalMonth: "2025年5月", confidence: 94, growth: "+210%", status: "到来直前" },
]

const trendLifecycleData = [
  {
    name: "バクチオール",
    data: [
      { month: "24/01", value: 20 }, { month: "24/04", value: 45 }, { month: "24/07", value: 72 },
      { month: "24/10", value: 88 }, { month: "25/01", value: 95 }, { month: "25/04", value: 91 },
    ],
    phase: "成熟",
    color: "#3700FF",
  },
  {
    name: "ポストバイオティクス",
    data: [
      { month: "24/01", value: 5 }, { month: "24/04", value: 8 }, { month: "24/07", value: 15 },
      { month: "24/10", value: 28 }, { month: "25/01", value: 42 }, { month: "25/04", value: 61 },
    ],
    phase: "急成長",
    color: "#C8FF00",
  },
]

const phaseColors: Record<string, string> = {
  急成長: "bg-emerald-100 text-emerald-700",
  成熟: "bg-blue-100 text-blue-700",
  衰退: "bg-gray-100 text-gray-600",
  到来直前: "bg-red-100 text-red-700",
  準備期: "bg-orange-100 text-orange-700",
}

const allLifecyclePoints = trendLifecycleData[0].data.map((d) => {
  const result: Record<string, string | number> = { month: d.month }
  trendLifecycleData.forEach((t) => {
    const point = t.data.find((p) => p.month === d.month)
    if (point) result[t.name] = point.value
  })
  return result
})

export function TrendsListContent() {
  const [activeTab, setActiveTab] = useState("trends")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("growth")
  const { mode, modeLabel } = useCategoryMode()
  const modeConfig = categoryModeConfig[mode]
  const { trends } = useTrends()

  // First filter by category mode, then by additional filters
  const filteredTrends = useMemo(() => {
    return trends
      .filter(trend => {
        // Apply category mode filter first
        const modeCategories = categoryModeMapping[mode]
        const matchesMode = modeCategories.length === 0 || modeCategories.includes(trend.category)
        
        // Then apply search filter
        const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             trend.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Then apply additional category filter (only if mode is "all")
        const matchesCategory = mode !== "all" || selectedCategories.length === 0 || selectedCategories.includes(trend.category)
        
        return matchesMode && matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === "growth") {
          const aGrowth = parseFloat(a.yoyGrowth.replace(/[^-\d.]/g, '')) || 0
          const bGrowth = parseFloat(b.yoyGrowth.replace(/[^-\d.]/g, '')) || 0
          return bGrowth - aGrowth
        } else if (sortBy === "mentions") {
          const aMentions = parseInt(a.mentions.replace(/[^\d]/g, '')) || 0
          const bMentions = parseInt(b.mentions.replace(/[^\d]/g, '')) || 0
          return bMentions - aMentions
        } else if (sortBy === "popularity") {
          return b.popularityScore - a.popularityScore
        }
        return 0
      })
  }, [trends, mode, searchQuery, selectedCategories, sortBy])

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* メインタブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-10 w-fit">
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            トレンド一覧
          </TabsTrigger>
          <TabsTrigger value="correlations" className="gap-2">
            <Brain className="h-4 w-4" />
            相関発見
          </TabsTrigger>
          <TabsTrigger value="predictions" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            トレンド予測
          </TabsTrigger>
        </TabsList>

        {/* トレンド一覧タブ */}
        <TabsContent value="trends" className="mt-6 space-y-6">
          {/* Filters Row */}
          <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode !== "all" && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${modeConfig.bgColor} ${modeConfig.color}`}>
                {modeLabel}モード
              </span>
            )}
          </div>
          <AddTrendDialog />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="トレンドを検索..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {mode === "all" && (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  カテゴリ
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.includes("cosmetics")}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev => 
                      checked ? [...prev, "cosmetics"] : prev.filter(c => c !== "cosmetics")
                    )
                  }}
                >
                  化粧品
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.includes("food")}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev => 
                      checked ? [...prev, "food"] : prev.filter(c => c !== "food")
                    )
                  }}
                >
                  食品
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.includes("beverage")}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev => 
                      checked ? [...prev, "beverage"] : prev.filter(c => c !== "beverage")
                    )
                  }}
                >
                  飲料
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.includes("supplement")}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev => 
                      checked ? [...prev, "supplement"] : prev.filter(c => c !== "supplement")
                    )
                  }}
                >
                  サプリ
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.includes("toiletry")}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev => 
                      checked ? [...prev, "toiletry"] : prev.filter(c => c !== "toiletry")
                    )
                  }}
                >
                  トイレタリー
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.includes("wellness")}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev => 
                      checked ? [...prev, "wellness"] : prev.filter(c => c !== "wellness")
                    )
                  }}
                >
                  ウェルネス
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )}

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">成長率順</SelectItem>
                <SelectItem value="mentions">言及量順</SelectItem>
                <SelectItem value="popularity">人気度順</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="px-2">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-2">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Trends Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTrends.map((trend) => (
            <Link key={trend.id} href={`/dashboard/trends/${trend.id}`}>
              <Card className={`shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group h-full overflow-hidden ${
                trend.researchStatus === "researching" ? "border-primary/50 animate-pulse" : ""
              } ${trend.researchStatus === "queued" ? "opacity-70" : ""}`}>
                {/* Image */}
                {trend.imageUrl && (
                  <div className="h-32 bg-muted overflow-hidden relative">
                    <img 
                      src={trend.imageUrl} 
                      alt={trend.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={categoryColors[trend.category]}>
                      {trend.categoryLabel}
                    </Badge>
                    {trend.researchStatus === "researching" ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        分析中
                      </Badge>
                    ) : trend.researchStatus === "queued" ? (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 gap-1">
                        <Clock className="h-3 w-3" />
                        待機中
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className={statusColors[trend.status]}>
                        {trend.status}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-semibold mt-2 group-hover:text-primary transition-colors flex items-center gap-1">
                    {trend.name}
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {trend.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">YoY Growth</p>
                      <p className={`text-sm font-semibold flex items-center gap-1 ${
                        trend.growthType === "up" ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {trend.growthType === "up" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {trend.yoyGrowth}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Mentions</p>
                      <p className="text-sm font-semibold">{trend.mentions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredTrends.map((trend) => (
                <Link key={trend.id} href={`/dashboard/trends/${trend.id}`}>
                  <div className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group ${
                    trend.researchStatus === "researching" ? "bg-primary/5" : ""
                  } ${trend.researchStatus === "queued" ? "opacity-70" : ""}`}>
                    {/* Image Thumbnail */}
                    {trend.imageUrl && (
                      <div className="h-16 w-16 rounded-lg bg-muted shrink-0 overflow-hidden">
                        <img 
                          src={trend.imageUrl} 
                          alt={trend.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className={categoryColors[trend.category]}>
                          {trend.categoryLabel}
                        </Badge>
                        {trend.researchStatus === "researching" ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            分析中
                          </Badge>
                        ) : trend.researchStatus === "queued" ? (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 gap-1">
                            <Clock className="h-3 w-3" />
                            待機中
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className={statusColors[trend.status]}>
                            {trend.status}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {trend.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{trend.description}</p>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div>
                        <p className="text-xs text-muted-foreground">YoY Growth</p>
                        <p className={`text-sm font-semibold flex items-center gap-1 ${
                          trend.growthType === "up" ? "text-emerald-600" : "text-red-600"
                        }`}>
                          {trend.growthType === "up" ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {trend.yoyGrowth}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mentions</p>
                        <p className="text-sm font-semibold">{trend.mentions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Social Share</p>
                        <p className="text-sm font-semibold">{trend.socialShare}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </TabsContent>

        {/* 相関発見タブ */}
        <TabsContent value="correlations" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI相関発見エンジン
              </h2>
              <p className="text-sm text-muted-foreground mt-1">クロスカテゴリー相関・素材シナジーの自動検出</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              エクスポート
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* クロスカテゴリー相関 */}
            <Card className="rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
                  クロスカテゴリー相関
                </CardTitle>
                <p className="text-sm text-muted-foreground">異なるカテゴリ間のトレンド相関を自動発見</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {crossCategoryCorrelations.map((item) => (
                  <div key={item.title} className="group flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.title}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-primary">{item.correlation}%</span>
                          <ArrowUpRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{item.insight}</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full gap-2 mt-2">
                  <Zap className="h-4 w-4" />
                  詳細を見る
                </Button>
              </CardContent>
            </Card>

            {/* 素材シナジー発見 */}
            <Card className="rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
                  素材シナジー発見
                </CardTitle>
                <p className="text-sm text-muted-foreground">組み合わせで効果が高まる素材ペアを提案</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {materialSynergies.map((item) => (
                  <div key={item.title} className="group flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.title}</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-lg font-bold">+{item.boost}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{item.insight}</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full gap-2 mt-2">
                  <Zap className="h-4 w-4" />
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* トレンド予測タブ */}
        <TabsContent value="predictions" className="mt-6 space-y-6">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-base font-bold">トレンド予測エンジン</h2>
              <p className="text-sm text-muted-foreground">海外トレンドの到来予測・寿命予測でビジネス判断を先読み</p>
            </div>
          </div>

          {/* 海外トレンド到来予測 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-base">海外トレンド到来予測</CardTitle>
              <p className="text-xs text-muted-foreground">海外市場データから日本への到来時期をAIが予測</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendArrivalData.map((t, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{t.trend}</p>
                      <Badge className={`text-[10px] ${phaseColors[t.status] || "bg-gray-100 text-gray-600"}`}>{t.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">発祥: {t.origin}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">日本到来予測</p>
                      <p className="text-sm font-bold">{t.arrivalMonth}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">確信度</p>
                      <p className="text-lg font-bold text-primary">{t.confidence}%</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{t.growth}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* トレンド寿命予測 */}
          <Card className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">トレンド寿命マップ</CardTitle>
              <p className="text-xs text-muted-foreground">各トレンドの成長→成熟→衰退フェーズをAIが予測</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                {trendLifecycleData.map((t) => (
                  <div key={t.name} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: t.color }} />
                    <span className="text-xs text-muted-foreground">{t.name}</span>
                    <Badge className={`text-[10px] ${phaseColors[t.phase] || ""}`}>{t.phase}</Badge>
                  </div>
                ))}
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={allLifecyclePoints} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 12 }} />
                    <ReferenceLine x="25/04" stroke="#e5e7eb" strokeDasharray="4 4" label={{ value: "現在", fontSize: 10 }} />
                    {trendLifecycleData.map((t) => (
                      <Line key={t.name} type="monotone" dataKey={t.name} stroke={t.color} strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
