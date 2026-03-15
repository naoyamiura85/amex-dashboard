"use client"

import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  ShoppingCart,
  Package,
  Store,
  ArrowUpRight,
  Tag
} from "lucide-react"
import { 
  Bar,
  BarChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts"

const categoryGrowth = [
  { category: "冷凍食品", growth: 28 },
  { category: "惣菜", growth: 22 },
  { category: "オーガニック", growth: 18 },
  { category: "プロテイン", growth: 15 },
  { category: "輸入食品", growth: 12 },
  { category: "時短食品", growth: 10 },
]

const chainData = [
  { name: "イオン", stores: 2450, share: 28 },
  { name: "イトーヨーカドー", stores: 1820, share: 22 },
  { name: "西友", stores: 980, share: 12 },
  { name: "ライフ", stores: 890, share: 10 },
  { name: "マックスバリュ", stores: 760, share: 9 },
]

const promotions = [
  { name: "春の新生活応援フェア", chain: "イオン", period: "3/1-4/15", discount: "最大30%OFF" },
  { name: "韓国フェア", chain: "イトーヨーカドー", period: "3/10-3/31", discount: "特別価格" },
  { name: "オーガニック特集", chain: "西友", period: "3/5-3/25", discount: "2割引" },
  { name: "冷凍食品まとめ買い", chain: "ライフ", period: "3/15-3/31", discount: "3点で10%OFF" },
]

export default function GMSPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">GMS/スーパー分析</h1>
                <p className="text-muted-foreground">
                  イオン・イトーヨーカドー・西友などのカテゴリ・プロモーション分析
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
                      <p className="text-sm text-muted-foreground">追跡店舗数</p>
                      <p className="text-2xl font-bold">6,900</p>
                    </div>
                    <Store className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    全国主要チェーン
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">追跡商品数</p>
                      <p className="text-2xl font-bold">89,234</p>
                    </div>
                    <Package className="h-8 w-8 text-amber-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 先月比 +3,456
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">開催中プロモ</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                    <Tag className="h-8 w-8 text-violet-500/20" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    全チェーン合計
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">PB比率</p>
                      <p className="text-2xl font-bold">24.5%</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-emerald-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前年比 +1.8pt
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="category" className="space-y-4">
              <TabsList>
                <TabsTrigger value="category">カテゴリ分析</TabsTrigger>
                <TabsTrigger value="chains">チェーン別</TabsTrigger>
                <TabsTrigger value="promo">プロモーション</TabsTrigger>
                <TabsTrigger value="shelf">棚割り</TabsTrigger>
              </TabsList>

              <TabsContent value="category" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>成長カテゴリランキング</CardTitle>
                    <CardDescription>前年同月比の成長率TOP6</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryGrowth} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" tick={{ fontSize: 12 }} unit="%" />
                          <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} width={100} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Bar dataKey="growth" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="成長率" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chains" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>主要チェーン一覧</CardTitle>
                    <CardDescription>店舗数とシェア</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {chainData.map((chain, index) => (
                        <div key={chain.name} className="flex items-center gap-4">
                          <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{chain.name}</span>
                              <span className="text-sm text-muted-foreground">{chain.stores}店舗</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${chain.share}%` }}
                              />
                            </div>
                          </div>
                          <Badge variant="secondary">{chain.share}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="promo" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>開催中のプロモーション</CardTitle>
                    <CardDescription>主要チェーンのキャンペーン</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {promotions.map((promo) => (
                        <div key={promo.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{promo.name}</p>
                            <p className="text-sm text-muted-foreground">{promo.chain}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-amber-100 text-amber-700">{promo.discount}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{promo.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shelf" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>棚割り分析</CardTitle>
                    <CardDescription>カテゴリ別の棚構成変化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-12">
                      棚割りの詳細分析は準備中です
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
