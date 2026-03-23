"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Sparkles,
  Leaf,
  Shield,
  Zap,
  Moon,
  Sun,
  Droplets,
  Target,
  ArrowRight,
  Filter,
  Eye,
  Database,
  MessageSquare
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Treemap,
  ResponsiveContainer,
  Tooltip
} from "recharts"

type Need = {
  id: number
  name: string
  nameJa: string
  category: string
  volume: number
  growth: number
  trend: "up" | "down" | "stable"
  relatedKeywords: string[]
  icon: React.ReactNode
}

const needs: Need[] = [
  { 
    id: 1, 
    name: "Anti-Aging", 
    nameJa: "エイジングケア",
    category: "Beauty", 
    volume: 245000, 
    growth: 18.5, 
    trend: "up",
    relatedKeywords: ["collagen", "retinol", "wrinkles", "firmness"],
    icon: <Sparkles className="h-5 w-5" />
  },
  { 
    id: 2, 
    name: "Gut Health", 
    nameJa: "腸活",
    category: "Wellness", 
    volume: 198000, 
    growth: 32.1, 
    trend: "up",
    relatedKeywords: ["probiotics", "fermented", "microbiome", "digestion"],
    icon: <Heart className="h-5 w-5" />
  },
  { 
    id: 3, 
    name: "Natural / Organic", 
    nameJa: "ナチュラル・オーガニック",
    category: "Lifestyle", 
    volume: 176000, 
    growth: 15.2, 
    trend: "up",
    relatedKeywords: ["chemical-free", "plant-based", "sustainable", "clean"],
    icon: <Leaf className="h-5 w-5" />
  },
  { 
    id: 4, 
    name: "Immunity Support", 
    nameJa: "免疫サポート",
    category: "Health", 
    volume: 154000, 
    growth: 8.7, 
    trend: "up",
    relatedKeywords: ["vitamin C", "zinc", "elderberry", "defense"],
    icon: <Shield className="h-5 w-5" />
  },
  { 
    id: 5, 
    name: "Energy Boost", 
    nameJa: "エナジーブースト",
    category: "Performance", 
    volume: 132000, 
    growth: 12.4, 
    trend: "up",
    relatedKeywords: ["caffeine", "B vitamins", "fatigue", "vitality"],
    icon: <Zap className="h-5 w-5" />
  },
  { 
    id: 6, 
    name: "Sleep Quality", 
    nameJa: "睡眠の質",
    category: "Wellness", 
    volume: 118000, 
    growth: 24.8, 
    trend: "up",
    relatedKeywords: ["melatonin", "GABA", "relaxation", "deep sleep"],
    icon: <Moon className="h-5 w-5" />
  },
  { 
    id: 7, 
    name: "Sun Protection", 
    nameJa: "紫外線対策",
    category: "Beauty", 
    volume: 98000, 
    growth: 5.2, 
    trend: "stable",
    relatedKeywords: ["SPF", "UV care", "whitening", "photoaging"],
    icon: <Sun className="h-5 w-5" />
  },
  { 
    id: 8, 
    name: "Hydration", 
    nameJa: "保湿・うるおい",
    category: "Beauty", 
    volume: 145000, 
    growth: -2.1, 
    trend: "down",
    relatedKeywords: ["hyaluronic acid", "ceramide", "moisture", "barrier"],
    icon: <Droplets className="h-5 w-5" />
  },
  { 
    id: 9, 
    name: "Weight Management", 
    nameJa: "体重管理",
    category: "Health", 
    volume: 89000, 
    growth: 6.8, 
    trend: "up",
    relatedKeywords: ["metabolism", "appetite", "fat burning", "diet"],
    icon: <Target className="h-5 w-5" />
  },
]

const treemapData = [
  { name: "Anti-Aging", size: 245, fill: "hsl(var(--chart-1))" },
  { name: "Gut Health", size: 198, fill: "hsl(var(--chart-2))" },
  { name: "Natural", size: 176, fill: "hsl(var(--chart-3))" },
  { name: "Immunity", size: 154, fill: "hsl(var(--chart-4))" },
  { name: "Hydration", size: 145, fill: "hsl(var(--chart-5))" },
  { name: "Energy", size: 132, fill: "hsl(var(--chart-1))" },
  { name: "Sleep", size: 118, fill: "hsl(var(--chart-2))" },
  { name: "Sun Care", size: 98, fill: "hsl(var(--chart-3))" },
  { name: "Weight", size: 89, fill: "hsl(var(--chart-4))" },
]

const categories = ["All", "Beauty", "Wellness", "Health", "Lifestyle", "Performance"]

export function ExploreNeedsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("volume")

  const filteredNeeds = needs
    .filter(need => {
      const matchesSearch = need.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           need.nameJa.includes(searchQuery)
      const matchesCategory = selectedCategory === "All" || need.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "volume") return b.volume - a.volume
      if (sortBy === "growth") return b.growth - a.growth
      return a.name.localeCompare(b.name)
    })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beauty": return "bg-pink-100 text-pink-700"
      case "Wellness": return "bg-purple-100 text-purple-700"
      case "Health": return "bg-green-100 text-green-700"
      case "Lifestyle": return "bg-amber-100 text-amber-700"
      case "Performance": return "bg-blue-100 text-blue-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-muted/30">
      {/* Observed Data Banner */}
      <Card className="bg-gradient-to-r from-violet-500/5 via-violet-500/10 to-violet-500/5 border-violet-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">消費者ニーズ分析</h3>
                <p className="text-xs text-muted-foreground">「なぜ買うのか」をSNS・検索・レビューから自動抽出</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-violet-600" />
                <span className="text-muted-foreground">分析対象: <strong className="text-foreground">750億+投稿</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-violet-600" />
                <span className="text-muted-foreground">需要シグナル: <strong className="text-foreground">自動検出</strong></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">消費者ニーズ分析</h1>
          <p className="text-sm text-muted-foreground mt-1">
            消費者の隠れた需要パターンを発見
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          レポート作成
        </Button>
      </div>

      {/* Needs Treemap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Needs Volume Overview</CardTitle>
          <CardDescription>Relative search volume by consumer need</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="hsl(var(--primary))"
              >
                <Tooltip 
                  formatter={(value) => [`${value}K searches`, "Volume"]}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search needs by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume">By Volume</SelectItem>
            <SelectItem value="growth">By Growth</SelectItem>
            <SelectItem value="name">By Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Needs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNeeds.map((need) => (
          <Card key={need.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {need.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{need.name}</h3>
                    <p className="text-sm text-muted-foreground">{need.nameJa}</p>
                  </div>
                </div>
                <Badge className={getCategoryColor(need.category)}>
                  {need.category}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Search Volume</p>
                  <p className="text-lg font-semibold">{(need.volume / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Growth</p>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(need.trend)}
                    <span className={`text-lg font-semibold ${
                      need.growth > 0 ? "text-green-600" : need.growth < 0 ? "text-red-600" : ""
                    }`}>
                      {need.growth > 0 ? "+" : ""}{need.growth}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {need.relatedKeywords.slice(0, 3).map((keyword, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
                {need.relatedKeywords.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{need.relatedKeywords.length - 3}
                  </Badge>
                )}
              </div>

              <Button 
                variant="ghost" 
                className="w-full justify-between text-primary group-hover:bg-primary/5"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Needs Tracked</p>
            <p className="text-2xl font-semibold mt-1">{needs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg. Growth Rate</p>
            <p className="text-2xl font-semibold mt-1 text-green-600">
              +{(needs.reduce((acc, n) => acc + n.growth, 0) / needs.length).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Trending Up</p>
            <p className="text-2xl font-semibold mt-1">{needs.filter(n => n.trend === "up").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Search Volume</p>
            <p className="text-2xl font-semibold mt-1">
              {(needs.reduce((acc, n) => acc + n.volume, 0) / 1000000).toFixed(2)}M
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
