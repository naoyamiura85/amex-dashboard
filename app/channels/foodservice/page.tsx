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
  TrendingDown,
  Clock,
  Utensils,
  DollarSign,
  Star,
  ArrowUpRight
} from "lucide-react"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid 
} from "recharts"

const menuTrendData = [
  { month: "10月", adoptions: 245, mentions: 12400 },
  { month: "11月", adoptions: 312, mentions: 15800 },
  { month: "12月", adoptions: 398, mentions: 21200 },
  { month: "1月", adoptions: 456, mentions: 28900 },
  { month: "2月", adoptions: 534, mentions: 35600 },
  { month: "3月", adoptions: 612, mentions: 42300 },
]

const trendingMenus = [
  { name: "スンドゥブチゲ", growth: 156, category: "韓国料理", price: "980-1,480", adoptions: 1245 },
  { name: "台湾カステラ", growth: 124, category: "デザート", price: "380-580", adoptions: 892 },
  { name: "ルーロー飯", growth: 98, category: "台湾料理", price: "880-1,280", adoptions: 756 },
  { name: "ビリヤニ", growth: 87, category: "インド料理", price: "1,080-1,580", adoptions: 623 },
  { name: "シュクメルリ", growth: 76, category: "ジョージア料理", price: "1,180-1,680", adoptions: 534 },
]

const ltoItems = [
  { name: "春の桜メニュー", chain: "スターバックス", period: "3/1-4/15", status: "開催中" },
  { name: "韓国フェア", chain: "松屋", period: "3/5-4/30", status: "開催中" },
  { name: "いちごフェスタ", chain: "デニーズ", period: "2/15-4/10", status: "開催中" },
  { name: "台湾祭り", chain: "すき家", period: "3/10-4/20", status: "開催中" },
]

const priceDistribution = [
  { range: "~500円", count: 2340 },
  { range: "500-800円", count: 4560 },
  { range: "800-1200円", count: 3890 },
  { range: "1200-1500円", count: 2120 },
  { range: "1500円~", count: 980 },
]

export default function FoodservicePage() {
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
                <h1 className="text-2xl font-bold text-foreground">外食メニュー分析</h1>
                <p className="text-muted-foreground">
                  レストラン・カフェ・ファストフードのメニュートレンドを追跡
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
                      <p className="text-sm text-muted-foreground">追跡メニュー数</p>
                      <p className="text-2xl font-bold">24,567</p>
                    </div>
                    <Utensils className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 先月比 +1,234
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">新規メニュー（今月）</p>
                      <p className="text-2xl font-bold">892</p>
                    </div>
                    <Star className="h-8 w-8 text-amber-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前年同月比 +18%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">平均価格</p>
                      <p className="text-2xl font-bold">¥1,124</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-emerald-500/20" />
                  </div>
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前年比 +8.2%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">開催中LTO</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                    <Clock className="h-8 w-8 text-violet-500/20" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    期間限定メニュー
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="trends" className="space-y-4">
              <TabsList>
                <TabsTrigger value="trends">トレンドメニュー</TabsTrigger>
                <TabsTrigger value="lto">期間限定（LTO）</TabsTrigger>
                <TabsTrigger value="price">価格分析</TabsTrigger>
                <TabsTrigger value="chains">チェーン別</TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Trend Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>メニュー採用トレンド</CardTitle>
                      <CardDescription>過去6ヶ月のメニュー採用数推移</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={menuTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area 
                              type="monotone" 
                              dataKey="adoptions" 
                              stroke="hsl(var(--primary))" 
                              fill="hsl(var(--primary))" 
                              fillOpacity={0.2}
                              name="採用店舗数"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trending Menus */}
                  <Card>
                    <CardHeader>
                      <CardTitle>急上昇メニュー</CardTitle>
                      <CardDescription>成長率TOP5</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trendingMenus.map((menu, index) => (
                          <div key={menu.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-muted-foreground w-6">
                                {index + 1}
                              </span>
                              <div>
                                <p className="font-medium">{menu.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {menu.category} / {menu.price}円
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-emerald-100 text-emerald-700">
                                +{menu.growth}%
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {menu.adoptions}店舗
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="lto" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>開催中の期間限定メニュー</CardTitle>
                    <CardDescription>主要チェーンのLTOキャンペーン</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ltoItems.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.chain}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              {item.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{item.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="price" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>価格帯分布</CardTitle>
                    <CardDescription>メニュー数の価格帯別分布</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priceDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar 
                            dataKey="count" 
                            fill="hsl(var(--primary))" 
                            radius={[4, 4, 0, 0]}
                            name="メニュー数"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chains" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>チェーン別分析</CardTitle>
                    <CardDescription>主要チェーンのメニュー動向</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-12">
                      チェーン別の詳細分析は準備中です
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
