"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Grid3X3,
  List,
  ArrowUpRight,
  Flame,
  Sparkles,
  Clock,
  Loader2,
  Database,
  MessageSquare,
  Utensils,
  ShoppingCart,
  Eye,
  Zap,
  CheckCircle2
} from "lucide-react"
import { useCategoryMode, categoryModeConfig } from "@/contexts/category-mode-context"
import { useTrends } from "@/contexts/trends-context"
import { AddTrendDialog } from "./add-trend-dialog"
import { ResearchQueue } from "./research-queue"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export function TrendsListContent() {
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
      {/* Observed Data Hero Banner */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Observed Data Approach</span>
              </div>
              <h2 className="text-lg font-bold text-foreground leading-tight">
                「消費者に聞く」ではなく「消費者を観察する」
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                SNS投稿・レシピ・メニュー・EC・検索データをリアルタイム解析。
                バイアスのない観察データで、新商品の失敗率90%という業界課題に挑みます。
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-background/60 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground">750億+</p>
                <p className="text-[10px] text-muted-foreground">SNS投稿</p>
              </div>
              <div className="text-center p-3 bg-background/60 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Utensils className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground">1兆+</p>
                <p className="text-[10px] text-muted-foreground">レシピデータ</p>
              </div>
              <div className="text-center p-3 bg-background/60 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground">9,500万</p>
                <p className="text-[10px] text-muted-foreground">メニューデータ</p>
              </div>
              <div className="text-center p-3 bg-background/60 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground">リアルタイム</p>
                <p className="text-[10px] text-muted-foreground">更新頻度</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-foreground">トップトレンド</h1>
              {mode !== "all" && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${modeConfig.bgColor} ${modeConfig.color}`}>
                  {modeLabel}モード
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {mode === "all" 
                ? "AIが検出した消費財カテゴリの成長トレンド" 
                : `${modeLabel}カテゴリのトレンドを表示中（${filteredTrends.length}件）`}
            </p>
          </div>
          <AddTrendDialog />
        </div>

        {/* Filters Row */}
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

      {/* Summary Stats - based on filtered data */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">トレンド総数</p>
                <p className="text-xl font-bold">{filteredTrends.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">成長中</p>
                <p className="text-xl font-bold">{filteredTrends.filter(t => t.status === "Growing").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">新興</p>
                <p className="text-xl font-bold">{filteredTrends.filter(t => t.status === "Emerging").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">安定</p>
                <p className="text-xl font-bold">{filteredTrends.filter(t => t.status === "Stable").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Queue */}
      <ResearchQueue />

      {/* Success Stories - Collapsible */}
      <Card className="shadow-sm border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              活用事例：データドリブンな商品開発
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                <span className="font-semibold text-sm">海藻スナック新商品</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                海藻関連の消費関心急上昇を検出し、R&Dが着想して12ヶ月未満で商品化
              </p>
              <Badge variant="outline" className="text-[10px]">食品メーカーA社</Badge>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">2</span>
                <span className="font-semibold text-sm">免疫系ドリンク</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                パンデミック時に「免疫」への関心スパイクを検知。6ヶ月で市場投入
              </p>
              <Badge variant="outline" className="text-[10px]">飲料メーカーB社</Badge>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">3</span>
                <span className="font-semibold text-sm">砂糖フリー炭酸水</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                健康志向の砂糖フリー需要を特定。フレーバー・ブランディングをAIで作成し2ヶ月で新ブランド創出
              </p>
              <Badge variant="outline" className="text-[10px]">飲料メーカーC社</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </main>
  )
}
