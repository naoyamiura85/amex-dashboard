"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp,
  TrendingDown,
  Utensils,
  Sparkles,
  ShoppingBag,
  Pill,
  Leaf,
  ArrowUpRight,
  BarChart3
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

const categories = [
  { id: "food", name: "食品", nameEn: "Food", icon: Utensils, color: "hsl(var(--category-food))", trends: 2456, growth: 12.5 },
  { id: "cosmetics", name: "化粧品", nameEn: "Cosmetics", icon: Sparkles, color: "hsl(var(--category-cosmetics))", trends: 1834, growth: 18.2 },
  { id: "toiletry", name: "トイレタリー", nameEn: "Toiletry", icon: ShoppingBag, color: "hsl(var(--category-toiletry))", trends: 1245, growth: 5.8 },
  { id: "supplement", name: "サプリメント", nameEn: "Supplement", icon: Pill, color: "hsl(var(--category-supplement))", trends: 987, growth: 22.4 },
  { id: "wellness", name: "ウェルネス", nameEn: "Wellness", icon: Leaf, color: "hsl(var(--category-wellness))", trends: 756, growth: 28.1 },
]

const categoryTrendData = [
  { month: "10月", food: 2100, cosmetics: 1500, toiletry: 1100, supplement: 750, wellness: 520 },
  { month: "11月", food: 2200, cosmetics: 1600, toiletry: 1150, supplement: 820, wellness: 580 },
  { month: "12月", food: 2350, cosmetics: 1700, toiletry: 1180, supplement: 880, wellness: 650 },
  { month: "1月", food: 2300, cosmetics: 1720, toiletry: 1200, supplement: 920, wellness: 690 },
  { month: "2月", food: 2400, cosmetics: 1780, toiletry: 1220, supplement: 950, wellness: 720 },
  { month: "3月", food: 2456, cosmetics: 1834, toiletry: 1245, supplement: 987, wellness: 756 },
]

const marketShareData = [
  { name: "食品", value: 34, fill: "hsl(var(--category-food))" },
  { name: "化粧品", value: 25, fill: "hsl(var(--category-cosmetics))" },
  { name: "トイレタリー", value: 17, fill: "hsl(var(--category-toiletry))" },
  { name: "サプリメント", value: 14, fill: "hsl(var(--category-supplement))" },
  { name: "ウェルネス", value: 10, fill: "hsl(var(--category-wellness))" },
]

const topTrendsByCategory = {
  food: [
    { name: "オートミール", growth: 45, volume: 125000 },
    { name: "プラントベース", growth: 38, volume: 98000 },
    { name: "発酵食品", growth: 32, volume: 87000 },
  ],
  cosmetics: [
    { name: "レチノール", growth: 52, volume: 156000 },
    { name: "CICA", growth: 48, volume: 142000 },
    { name: "ナイアシンアミド", growth: 35, volume: 98000 },
  ],
  supplement: [
    { name: "プロテイン", growth: 42, volume: 234000 },
    { name: "NMN", growth: 68, volume: 67000 },
    { name: "MCTオイル", growth: 28, volume: 54000 },
  ],
}

export function CategoryDashboardContent() {
  const [selectedCategory, setSelectedCategory] = useState("food")

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Category Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            カテゴリ別のトレンド分析とパフォーマンス
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BarChart3 className="h-4 w-4 mr-2" />
          レポート出力
        </Button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isSelected = selectedCategory === cat.id
          return (
            <Card 
              key={cat.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary shadow-md' : ''
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.nameEn}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{cat.trends.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{cat.growth}%
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Trend Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">カテゴリ別トレンド推移</CardTitle>
            <CardDescription>過去6ヶ月のトレンド検出数推移</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={categoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="food" name="食品" stroke="hsl(var(--category-food))" fill="hsl(var(--category-food))" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="cosmetics" name="化粧品" stroke="hsl(var(--category-cosmetics))" fill="hsl(var(--category-cosmetics))" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="toiletry" name="トイレタリー" stroke="hsl(var(--category-toiletry))" fill="hsl(var(--category-toiletry))" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="supplement" name="サプリ" stroke="hsl(var(--category-supplement))" fill="hsl(var(--category-supplement))" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="wellness" name="ウェルネス" stroke="hsl(var(--category-wellness))" fill="hsl(var(--category-wellness))" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Share */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">市場シェア</CardTitle>
            <CardDescription>カテゴリ別トレンド構成比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Trends by Category */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="food">食品</TabsTrigger>
          <TabsTrigger value="cosmetics">化粧品</TabsTrigger>
          <TabsTrigger value="supplement">サプリメント</TabsTrigger>
        </TabsList>

        {Object.entries(topTrendsByCategory).map(([catId, trends]) => (
          <TabsContent key={catId} value={catId}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {categories.find(c => c.id === catId)?.name} カテゴリ TOP トレンド
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trends.map((trend, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{trend.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            +{trend.growth}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {(trend.volume / 1000).toFixed(0)}K 検索/月
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        詳細
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
