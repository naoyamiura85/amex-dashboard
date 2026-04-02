"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { 
  TrendingUp, 
  Search,
  Grid3X3,
  List,
  Sparkles,
  Crown,
  Plane,
  Utensils,
  Music,
  Heart,
  Gem,
  Smartphone,
} from "lucide-react"
import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

const categoryIcons: Record<string, React.ElementType> = {
  "トラベル": Plane,
  "ダイニング": Utensils,
  "エンターテイメント": Music,
  "ウェルネス": Heart,
  "ラグジュアリー": Gem,
  "デジタル体験": Smartphone,
}

const statusColors: Record<string, string> = {
  Emerging: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Growing: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Mature: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Declining: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function AmexTrendsContent() {
  const { data, brand } = useClient()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("growth")

  const trends = data.trends || []
  const categories = data.trendCategories || []

  const filteredTrends = useMemo(() => {
    return trends
      .filter(trend => {
        const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             trend.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || trend.category === categories.find(c => c.id === selectedCategory)?.name
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === "growth") return b.growth - a.growth
        if (sortBy === "mentions") return b.mentions - a.mentions
        return 0
      })
  }, [trends, searchQuery, selectedCategory, sortBy, categories])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
            <Crown className="h-7 w-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.trendTitle || "ブランド体験トレンド"}</h1>
            <p className="text-muted-foreground">{data.trendDescription || "会員の興味関心から検出したプレミアム体験のトレンド"}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="体験トレンドを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px] bg-background/50">
                <SelectValue placeholder="カテゴリ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-background/50">
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">成長率順</SelectItem>
                <SelectItem value="mentions">話題度順</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 border rounded-lg p-1 bg-background/50">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Grid */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        : "space-y-3"
      }>
        {filteredTrends.map((trend) => {
          const CategoryIcon = categoryIcons[trend.category] || Sparkles
          
          return viewMode === "grid" ? (
            <Card 
              key={trend.id}
              className="group overflow-hidden border-border/50 bg-card/80 backdrop-blur hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon className="h-16 w-16 text-muted-foreground/30" />
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur text-xs">
                    {trend.category}
                  </Badge>
                  <Badge variant="outline" className={`${statusColors[trend.status]} text-xs`}>
                    {trend.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {trend.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {trend.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">+{trend.growth}%</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(trend.mentions / 1000).toFixed(1)}K mentions
                  </span>
                </div>
                {trend.tags && trend.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/50">
                    {trend.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card 
              key={trend.id}
              className="group border-border/50 bg-card/80 backdrop-blur hover:border-primary/50 transition-all cursor-pointer"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center flex-shrink-0">
                  <CategoryIcon className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {trend.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">{trend.category}</Badge>
                    <Badge variant="outline" className={`${statusColors[trend.status]} text-xs`}>
                      {trend.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {trend.description}
                  </p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <TrendingUp className="h-4 w-4" />
                      +{trend.growth}%
                    </div>
                    <span className="text-xs text-muted-foreground">YoY Growth</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{(trend.mentions / 1000).toFixed(1)}K</div>
                    <span className="text-xs text-muted-foreground">Mentions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTrends.length === 0 && (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-12 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">トレンドが見つかりません</h3>
            <p className="text-sm text-muted-foreground">検索条件を変更してください</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
