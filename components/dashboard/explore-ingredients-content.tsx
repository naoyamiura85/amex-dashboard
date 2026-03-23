"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  FlaskConical,
  Eye,
  Database,
  Sparkles
} from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type LifecycleStage = "emerging" | "growing" | "peaking" | "declining"

interface Ingredient {
  id: string
  name: string
  nameEn: string
  category: string
  mentionVolume: string
  growthRate: number
  lifecycleStage: LifecycleStage
  topProducts: string[]
  relatedNeeds: string[]
}

const ingredients: Ingredient[] = [
  {
    id: "1",
    name: "レチノール",
    nameEn: "Retinol",
    category: "化粧品",
    mentionVolume: "1.2M",
    growthRate: 67,
    lifecycleStage: "growing",
    topProducts: ["美容液", "クリーム", "アイケア"],
    relatedNeeds: ["エイジングケア", "シワ改善", "毛穴ケア"],
  },
  {
    id: "2",
    name: "ナイアシンアミド",
    nameEn: "Niacinamide",
    category: "化粧品",
    mentionVolume: "890K",
    growthRate: 56,
    lifecycleStage: "growing",
    topProducts: ["化粧水", "美容液", "クリーム"],
    relatedNeeds: ["毛穴ケア", "美白", "皮脂コントロール"],
  },
  {
    id: "3",
    name: "CICA（シカ）",
    nameEn: "Centella Asiatica",
    category: "化粧品",
    mentionVolume: "2.1M",
    growthRate: 23,
    lifecycleStage: "peaking",
    topProducts: ["クリーム", "パック", "化粧水"],
    relatedNeeds: ["敏感肌ケア", "肌荒れ", "鎮静"],
  },
  {
    id: "4",
    name: "乳酸菌",
    nameEn: "Lactobacillus",
    category: "食品",
    mentionVolume: "3.5M",
    growthRate: 18,
    lifecycleStage: "peaking",
    topProducts: ["ヨーグルト", "飲料", "サプリ"],
    relatedNeeds: ["腸活", "免疫", "美肌"],
  },
  {
    id: "5",
    name: "NMN",
    nameEn: "Nicotinamide Mononucleotide",
    category: "サプリ",
    mentionVolume: "340K",
    growthRate: 89,
    lifecycleStage: "emerging",
    topProducts: ["カプセル", "パウダー", "ドリンク"],
    relatedNeeds: ["アンチエイジング", "エネルギー", "睡眠"],
  },
  {
    id: "6",
    name: "CBD",
    nameEn: "Cannabidiol",
    category: "ウェルネス",
    mentionVolume: "180K",
    growthRate: 112,
    lifecycleStage: "emerging",
    topProducts: ["オイル", "グミ", "クリーム"],
    relatedNeeds: ["リラックス", "睡眠", "ストレス"],
  },
  {
    id: "7",
    name: "ビタミンC",
    nameEn: "Vitamin C",
    category: "化粧品",
    mentionVolume: "4.2M",
    growthRate: 8,
    lifecycleStage: "peaking",
    topProducts: ["美容液", "化粧水", "サプリ"],
    relatedNeeds: ["美白", "抗酸化", "毛穴ケア"],
  },
  {
    id: "8",
    name: "プロテイン",
    nameEn: "Protein",
    category: "食品",
    mentionVolume: "5.8M",
    growthRate: 32,
    lifecycleStage: "growing",
    topProducts: ["パウダー", "バー", "ドリンク"],
    relatedNeeds: ["筋肉増強", "ダイエット", "美容"],
  },
]

const lifecycleConfig: Record<LifecycleStage, { label: string; className: string }> = {
  emerging: { label: "Emerging", className: "bg-blue-100 text-blue-700 border-blue-200" },
  growing: { label: "Growing", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  peaking: { label: "Peaking", className: "bg-amber-100 text-amber-700 border-amber-200" },
  declining: { label: "Declining", className: "bg-rose-100 text-rose-700 border-rose-200" },
}

const categoryColors: Record<string, string> = {
  "化粧品": "bg-pink-500",
  "食品": "bg-emerald-500",
  "サプリ": "bg-orange-500",
  "ウェルネス": "bg-violet-500",
  "トイレタリー": "bg-blue-500",
}

export function ExploreIngredientsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [lifecycleFilter, setLifecycleFilter] = useState("all")

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ingredient.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || ingredient.category === categoryFilter
    const matchesLifecycle = lifecycleFilter === "all" || ingredient.lifecycleStage === lifecycleFilter
    return matchesSearch && matchesCategory && matchesLifecycle
  })

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* Observed Data Banner */}
      <Card className="bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">成分・原材料トレンド分析</h3>
                <p className="text-xs text-muted-foreground">SNS・レシピ・EC・検索データから成分の需要シグナルを自動検出</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-muted-foreground">データソース: <strong className="text-foreground">12種</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-muted-foreground">AI分析: <strong className="text-foreground">リアルタイム</strong></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="成分名で検索..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="カテゴリ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全カテゴリ</SelectItem>
                  <SelectItem value="化粧品">化粧品</SelectItem>
                  <SelectItem value="食品">食品</SelectItem>
                  <SelectItem value="サプリ">サプリ</SelectItem>
                  <SelectItem value="ウェルネス">ウェルネス</SelectItem>
                  <SelectItem value="トイレタリー">トイレタリー</SelectItem>
                </SelectContent>
              </Select>
              <Select value={lifecycleFilter} onValueChange={setLifecycleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Lifecycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全ステージ</SelectItem>
                  <SelectItem value="emerging">Emerging</SelectItem>
                  <SelectItem value="growing">Growing</SelectItem>
                  <SelectItem value="peaking">Peaking</SelectItem>
                  <SelectItem value="declining">Declining</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{filteredIngredients.length}</p>
                <p className="text-xs text-muted-foreground">検索結果</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {filteredIngredients.filter(i => i.lifecycleStage === "growing" || i.lifecycleStage === "emerging").length}
                </p>
                <p className="text-xs text-muted-foreground">成長中</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {filteredIngredients.filter(i => i.lifecycleStage === "emerging").length}
                </p>
                <p className="text-xs text-muted-foreground">Emerging</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {filteredIngredients.filter(i => i.lifecycleStage === "peaking").length}
                </p>
                <p className="text-xs text-muted-foreground">Peaking</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ingredients Table */}
      <Card>
        <CardHeader>
          <CardTitle>成分一覧</CardTitle>
          <CardDescription>カテゴリ横断で成分・原材料のトレンドを分析</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>成分名</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>言及量</TableHead>
                <TableHead>成長率</TableHead>
                <TableHead>Lifecycle</TableHead>
                <TableHead>主な商品タイプ</TableHead>
                <TableHead>関連ニーズ</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => {
                const lifecycle = lifecycleConfig[ingredient.lifecycleStage]
                const GrowthIcon = ingredient.growthRate >= 0 ? TrendingUp : TrendingDown
                const growthColor = ingredient.growthRate > 0 ? "text-emerald-600" : ingredient.growthRate < 0 ? "text-rose-600" : "text-muted-foreground"
                
                return (
                  <TableRow key={ingredient.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{ingredient.name}</p>
                        <p className="text-xs text-muted-foreground">{ingredient.nameEn}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${categoryColors[ingredient.category] || "bg-gray-500"}`} />
                        <span className="text-sm">{ingredient.category}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ingredient.mentionVolume}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${growthColor}`}>
                        <GrowthIcon className="h-4 w-4" />
                        <span className="font-medium">
                          {ingredient.growthRate > 0 ? "+" : ""}{ingredient.growthRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${lifecycle.className} text-xs`}>
                        {lifecycle.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.topProducts.slice(0, 2).map((product) => (
                          <Badge key={product} variant="secondary" className="text-[10px]">
                            {product}
                          </Badge>
                        ))}
                        {ingredient.topProducts.length > 2 && (
                          <Badge variant="secondary" className="text-[10px]">
                            +{ingredient.topProducts.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.relatedNeeds.slice(0, 2).map((need) => (
                          <Badge key={need} variant="outline" className="text-[10px]">
                            {need}
                          </Badge>
                        ))}
                        {ingredient.relatedNeeds.length > 2 && (
                          <Badge variant="outline" className="text-[10px]">
                            +{ingredient.relatedNeeds.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
