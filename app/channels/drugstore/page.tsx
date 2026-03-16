"use client"

import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  Pill,
  Package,
  Star,
  ArrowUpRight,
  Building2
} from "lucide-react"
import { 
  Bar, 
  BarChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts"

const newProducts = [
  { name: "セラムグロウ 美容液", brand: "花王", category: "スキンケア", date: "2026/03/12", growth: 89 },
  { name: "プロテインバー チョコ", brand: "明治", category: "健康食品", date: "2026/03/10", growth: 76 },
  { name: "敏感肌用洗顔フォーム", brand: "資生堂", category: "洗顔", date: "2026/03/08", growth: 68 },
  { name: "マルチビタミン+鉄", brand: "大塚製薬", category: "サプリ", date: "2026/03/05", growth: 54 },
  { name: "UVミルク SPF50+", brand: "コーセー", category: "日焼け止め", date: "2026/03/03", growth: 45 },
]

const categoryShare = [
  { name: "スキンケア", value: 28, color: "#8b5cf6" },
  { name: "ヘアケア", value: 18, color: "#06b6d4" },
  { name: "サプリメント", value: 22, color: "#f59e0b" },
  { name: "オーラルケア", value: 12, color: "#10b981" },
  { name: "ボディケア", value: 14, color: "#ec4899" },
  { name: "その他", value: 6, color: "#6b7280" },
]

const chainData = [
  { name: "マツキヨ", products: 12450, newProducts: 234 },
  { name: "ウエルシア", products: 11200, newProducts: 198 },
  { name: "ツルハ", products: 10800, newProducts: 187 },
  { name: "スギ薬局", products: 9800, newProducts: 165 },
  { name: "サンドラッグ", products: 8900, newProducts: 143 },
]

export default function DrugstorePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">ドラッグストア分析</h1>
                <p className="text-muted-foreground">
                  ドラッグストアチェーンの新商品・棚割り・PB動向を追跡
                </p>
              </div>
              <Button>
                レポート出力
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">追跡商品数</p>
                      <p className="text-2xl font-bold">53,148</p>
                    </div>
                    <Package className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 先月比 +2,456
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">新商品（今月）</p>
                      <p className="text-2xl font-bold">927</p>
                    </div>
                    <Star className="h-8 w-8 text-amber-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前年同月比 +12%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">PB商品比率</p>
                      <p className="text-2xl font-bold">18.4%</p>
                    </div>
                    <Building2 className="h-8 w-8 text-violet-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前年比 +2.1pt
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">追跡チェーン</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <Pill className="h-8 w-8 text-emerald-500/20" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    主要DgSチェーン
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="products" className="space-y-4">
              <TabsList>
                <TabsTrigger value="products">新商品</TabsTrigger>
                <TabsTrigger value="category">カテゴリ別</TabsTrigger>
                <TabsTrigger value="chains">チェーン別</TabsTrigger>
                <TabsTrigger value="pb">PB動向</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>最新の新商品</CardTitle>
                    <CardDescription>直近投入された注目商品</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {newProducts.map((product) => (
                        <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {product.brand} / {product.category}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-emerald-100 text-emerald-700">
                              SNS +{product.growth}%
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{product.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="category" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>カテゴリ別シェア</CardTitle>
                      <CardDescription>商品数ベースの構成比</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryShare}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                              label={({ name, value }) => `${name} ${value}%`}
                            >
                              {categoryShare.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>カテゴリ別トレンド</CardTitle>
                      <CardDescription>成長カテゴリランキング</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoryShare.slice(0, 5).map((cat, index) => (
                          <div key={cat.name} className="flex items-center gap-3">
                            <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{cat.name}</span>
                                <span className="text-sm text-muted-foreground">{cat.value}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full" 
                                  style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="chains" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>チェーン別商品数</CardTitle>
                    <CardDescription>主要ドラッグストアチェーンの取扱商品数</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chainData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" tick={{ fontSize: 12 }} />
                          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                          <Tooltip />
                          <Bar dataKey="products" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="商品数" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pb" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>PB商品動向</CardTitle>
                    <CardDescription>プライベートブランド商品の分析</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-12">
                      PB商品の詳細分析は準備中です
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <YappiChat />
    </div>
  )
}
