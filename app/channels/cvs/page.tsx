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
  ShoppingBag,
  Package,
  Star,
  ArrowUpRight,
  Clock
} from "lucide-react"
import { 
  Area,
  AreaChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts"

const weeklyNewProducts = [
  { week: "W1", seven: 45, lawson: 38, family: 42 },
  { week: "W2", seven: 52, lawson: 44, family: 48 },
  { week: "W3", seven: 48, lawson: 51, family: 39 },
  { week: "W4", seven: 56, lawson: 47, family: 53 },
]

const newProducts = [
  { name: "抹茶ティラミス", chain: "セブンイレブン", category: "スイーツ", date: "2026/03/15", status: "新発売" },
  { name: "台湾風ルーロー飯", chain: "ローソン", category: "弁当", date: "2026/03/14", status: "新発売" },
  { name: "プロテインサラダチキン", chain: "ファミリーマート", category: "惣菜", date: "2026/03/13", status: "新発売" },
  { name: "韓国風キンパ", chain: "セブンイレブン", category: "おにぎり", date: "2026/03/12", status: "新発売" },
  { name: "フルーツサンド いちご", chain: "ローソン", category: "サンドイッチ", date: "2026/03/11", status: "期間限定" },
]

const limitedItems = [
  { name: "桜スイーツフェア", chain: "全チェーン", period: "3/1-4/15", items: 24 },
  { name: "韓国グルメフェア", chain: "セブンイレブン", period: "3/5-3/31", items: 12 },
  { name: "いちごフェスタ", chain: "ローソン", period: "2/15-4/10", items: 18 },
  { name: "台湾屋台シリーズ", chain: "ファミリーマート", period: "3/10-4/20", items: 8 },
]

export default function CVSPage() {
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
                <h1 className="text-2xl font-bold text-foreground">コンビニ分析</h1>
                <p className="text-muted-foreground">
                  セブンイレブン・ローソン・ファミリーマートの新商品・限定品を追跡
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
                      <p className="text-2xl font-bold">18,432</p>
                    </div>
                    <Package className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 先月比 +892
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">新商品（今週）</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                    <Star className="h-8 w-8 text-amber-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前週比 +23
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">期間限定商品</p>
                      <p className="text-2xl font-bold">62</p>
                    </div>
                    <Clock className="h-8 w-8 text-violet-500/20" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    現在販売中
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">平均入替サイクル</p>
                      <p className="text-2xl font-bold">2.4週</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-emerald-500/20" />
                  </div>
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 短縮傾向
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="new" className="space-y-4">
              <TabsList>
                <TabsTrigger value="new">新商品</TabsTrigger>
                <TabsTrigger value="limited">期間限定</TabsTrigger>
                <TabsTrigger value="trend">トレンド</TabsTrigger>
                <TabsTrigger value="compare">チェーン比較</TabsTrigger>
              </TabsList>

              <TabsContent value="new" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>週別新商品投入数</CardTitle>
                      <CardDescription>チェーン別の新商品投入推移</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={weeklyNewProducts}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="seven" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="セブンイレブン" />
                            <Area type="monotone" dataKey="lawson" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="ローソン" />
                            <Area type="monotone" dataKey="family" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="ファミマ" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>最新の新商品</CardTitle>
                      <CardDescription>直近投入された商品</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {newProducts.map((product) => (
                          <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {product.chain} / {product.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant={product.status === "期間限定" ? "secondary" : "default"}>
                                {product.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">{product.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="limited" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>開催中のフェア・限定商品</CardTitle>
                    <CardDescription>期間限定キャンペーン一覧</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {limitedItems.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.chain}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{item.items}商品</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{item.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trend" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>カテゴリトレンド</CardTitle>
                    <CardDescription>注目の商品カテゴリ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "韓国グルメ", growth: "+156%", status: "急上昇" },
                        { name: "プロテイン", growth: "+89%", status: "成長中" },
                        { name: "ご褒美スイーツ", growth: "+67%", status: "成長中" },
                        { name: "時短おにぎり", growth: "+45%", status: "安定成長" },
                      ].map((cat) => (
                        <Card key={cat.name}>
                          <CardContent className="pt-4">
                            <p className="font-medium">{cat.name}</p>
                            <p className="text-2xl font-bold text-emerald-600">{cat.growth}</p>
                            <Badge variant="secondary" className="mt-2">{cat.status}</Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compare" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>チェーン比較分析</CardTitle>
                    <CardDescription>3大コンビニの戦略比較</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-12">
                      チェーン比較の詳細分析は準備中です
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
