"use client"

import { useState } from "react"
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
  Clock
} from "lucide-react"
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

// Trends data
const trendsData = [
  {
    id: "retinol-serum",
    name: "レチノール美容液",
    category: "cosmetics",
    categoryLabel: "化粧品",
    socialShare: "0.8%",
    yoyGrowth: "+112%",
    growthType: "up",
    status: "Growing",
    mentions: "210K",
    description: "エイジングケア成分として急成長中。敏感肌向け低刺激処方が人気。",
    popularityScore: 85,
  },
  {
    id: "cica-cream",
    name: "シカクリーム",
    category: "cosmetics",
    categoryLabel: "化粧品",
    socialShare: "1.2%",
    yoyGrowth: "+89%",
    growthType: "up",
    status: "Growing",
    mentions: "320K",
    description: "韓国発の肌鎮静成分。敏感肌・ニキビケアに特化。",
    popularityScore: 92,
  },
  {
    id: "protein-bar",
    name: "プロテインバー",
    category: "food",
    categoryLabel: "食品・飲料",
    socialShare: "2.1%",
    yoyGrowth: "+67%",
    growthType: "up",
    status: "Growing",
    mentions: "450K",
    description: "手軽な高タンパク補給。フレーバー多様化が進む。",
    popularityScore: 88,
  },
  {
    id: "oat-milk",
    name: "オーツミルク",
    category: "food",
    categoryLabel: "食品・飲料",
    socialShare: "1.5%",
    yoyGrowth: "+45%",
    growthType: "up",
    status: "Stable",
    mentions: "280K",
    description: "植物性ミルクの新定番。カフェでの採用拡大。",
    popularityScore: 76,
  },
  {
    id: "cbd-supplement",
    name: "CBDサプリ",
    category: "supplement",
    categoryLabel: "サプリ",
    socialShare: "0.4%",
    yoyGrowth: "+156%",
    growthType: "up",
    status: "Emerging",
    mentions: "95K",
    description: "リラックス・睡眠改善目的で注目。規制緩和の動きも。",
    popularityScore: 72,
  },
  {
    id: "ceramide-moisturizer",
    name: "セラミド保湿",
    category: "cosmetics",
    categoryLabel: "化粧品",
    socialShare: "0.9%",
    yoyGrowth: "+34%",
    growthType: "up",
    status: "Stable",
    mentions: "185K",
    description: "バリア機能強化成分。乾燥肌対策として定着。",
    popularityScore: 79,
  },
  {
    id: "fermented-food",
    name: "発酵食品",
    category: "food",
    categoryLabel: "食品・飲料",
    socialShare: "1.8%",
    yoyGrowth: "-5%",
    growthType: "down",
    status: "Declining",
    mentions: "340K",
    description: "腸活ブームは一服。定番化フェーズへ移行。",
    popularityScore: 65,
  },
  {
    id: "magnesium-supplement",
    name: "マグネシウムサプリ",
    category: "supplement",
    categoryLabel: "サプリ",
    socialShare: "0.6%",
    yoyGrowth: "+78%",
    growthType: "up",
    status: "Growing",
    mentions: "120K",
    description: "睡眠・ストレス対策で注目。グリシネート形態が人気。",
    popularityScore: 81,
  },
]

const categoryColors: Record<string, string> = {
  cosmetics: "bg-rose-100 text-rose-700",
  food: "bg-emerald-100 text-emerald-700",
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

  const filteredTrends = trendsData
    .filter(trend => {
      const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trend.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(trend.category)
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "growth") {
        return parseFloat(b.yoyGrowth) - parseFloat(a.yoyGrowth)
      } else if (sortBy === "mentions") {
        return parseInt(b.mentions.replace("K", "000")) - parseInt(a.mentions.replace("K", "000"))
      } else if (sortBy === "popularity") {
        return b.popularityScore - a.popularityScore
      }
      return 0
    })

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Top Trends</h1>
          <p className="text-sm text-muted-foreground mt-1">
            消費財カテゴリのトレンドを発見・分析
          </p>
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
                  食品・飲料
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">トレンド総数</p>
                <p className="text-xl font-bold">{trendsData.length}</p>
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
                <p className="text-xl font-bold">{trendsData.filter(t => t.status === "Growing").length}</p>
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
                <p className="text-xl font-bold">{trendsData.filter(t => t.status === "Emerging").length}</p>
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
                <p className="text-xl font-bold">{trendsData.filter(t => t.status === "Stable").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTrends.map((trend) => (
            <Link key={trend.id} href="/dashboard/spotlight">
              <Card className="shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={categoryColors[trend.category]}>
                      {trend.categoryLabel}
                    </Badge>
                    <Badge variant="secondary" className={statusColors[trend.status]}>
                      {trend.status}
                    </Badge>
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
                <Link key={trend.id} href="/dashboard/spotlight">
                  <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className={categoryColors[trend.category]}>
                          {trend.categoryLabel}
                        </Badge>
                        <Badge variant="secondary" className={statusColors[trend.status]}>
                          {trend.status}
                        </Badge>
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
