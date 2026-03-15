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
  TrendingDown,
  Globe,
  Star,
  ArrowUpRight,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { 
  Line,
  LineChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts"

const rankingTrend = [
  { date: "3/10", amazon: 5, rakuten: 8, yahoo: 12 },
  { date: "3/11", amazon: 4, rakuten: 6, yahoo: 10 },
  { date: "3/12", amazon: 3, rakuten: 5, yahoo: 8 },
  { date: "3/13", amazon: 2, rakuten: 4, yahoo: 7 },
  { date: "3/14", amazon: 1, rakuten: 3, yahoo: 5 },
  { date: "3/15", amazon: 1, rakuten: 2, yahoo: 4 },
]

const topProducts = [
  { 
    name: "セラミド配合 高保湿クリーム", 
    brand: "キュレル", 
    rank: 1, 
    change: 2, 
    reviews: 4523, 
    rating: 4.6,
    sentiment: 92 
  },
  { 
    name: "ビタミンC美容液 10%", 
    brand: "メラノCC", 
    rank: 2, 
    change: -1, 
    reviews: 3891, 
    rating: 4.4,
    sentiment: 88 
  },
  { 
    name: "プロテインパウダー チョコ味", 
    brand: "ザバス", 
    rank: 3, 
    change: 0, 
    reviews: 5672, 
    rating: 4.5,
    sentiment: 91 
  },
  { 
    name: "マルチビタミン 90日分", 
    brand: "DHC", 
    rank: 4, 
    change: 3, 
    reviews: 8934, 
    rating: 4.3,
    sentiment: 85 
  },
  { 
    name: "ナイアシンアミド セラム", 
    brand: "SKIN1004", 
    rank: 5, 
    change: 5, 
    reviews: 2156, 
    rating: 4.7,
    sentiment: 94 
  },
]

const sentimentKeywords = {
  positive: ["保湿力抜群", "コスパ最高", "肌荒れ改善", "リピート確定", "効果実感"],
  negative: ["べたつく", "効果なし", "価格が高い", "香りが苦手", "容器使いにくい"]
}

export default function ECPage() {
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
                <h1 className="text-2xl font-bold text-foreground">EC分析</h1>
                <p className="text-muted-foreground">
                  Amazon・楽天・Yahoo!・iHerbの売れ筋・レビュー分析
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
                      <p className="text-2xl font-bold">124,567</p>
                    </div>
                    <Globe className="h-8 w-8 text-primary/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 先月比 +5,234
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">分析レビュー数</p>
                      <p className="text-2xl font-bold">2.4M</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-amber-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 今月 +124K
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">平均センチメント</p>
                      <p className="text-2xl font-bold">78%</p>
                    </div>
                    <ThumbsUp className="h-8 w-8 text-emerald-500/20" />
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 前月比 +2pt
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">価格変動商品</p>
                      <p className="text-2xl font-bold">1,234</p>
                    </div>
                    <Star className="h-8 w-8 text-violet-500/20" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    今週の価格変動
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="ranking" className="space-y-4">
              <TabsList>
                <TabsTrigger value="ranking">売れ筋ランキング</TabsTrigger>
                <TabsTrigger value="reviews">レビュー分析</TabsTrigger>
                <TabsTrigger value="price">価格変動</TabsTrigger>
                <TabsTrigger value="compare">モール比較</TabsTrigger>
              </TabsList>

              <TabsContent value="ranking" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ランキング推移</CardTitle>
                      <CardDescription>主要モール別のランキング変動</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={rankingTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis reversed tick={{ fontSize: 12 }} domain={[1, 15]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="amazon" stroke="#f59e0b" strokeWidth={2} name="Amazon" />
                            <Line type="monotone" dataKey="rakuten" stroke="#ef4444" strokeWidth={2} name="楽天" />
                            <Line type="monotone" dataKey="yahoo" stroke="#8b5cf6" strokeWidth={2} name="Yahoo!" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>売れ筋TOP5</CardTitle>
                      <CardDescription>スキンケアカテゴリ</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {topProducts.map((product) => (
                          <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-primary w-6">{product.rank}</span>
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.brand}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-medium">{product.rating}</span>
                                {product.change > 0 ? (
                                  <Badge className="ml-2 bg-emerald-100 text-emerald-700 text-xs">
                                    <TrendingUp className="h-3 w-3 mr-1" />+{product.change}
                                  </Badge>
                                ) : product.change < 0 ? (
                                  <Badge className="ml-2 bg-red-100 text-red-700 text-xs">
                                    <TrendingDown className="h-3 w-3 mr-1" />{product.change}
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="ml-2 text-xs">-</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {product.reviews.toLocaleString()}件
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-emerald-500" />
                        ポジティブキーワード
                      </CardTitle>
                      <CardDescription>よく言及される肯定的な表現</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sentimentKeywords.positive.map((keyword) => (
                          <Badge key={keyword} className="bg-emerald-100 text-emerald-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ThumbsDown className="h-5 w-5 text-red-500" />
                        ネガティブキーワード
                      </CardTitle>
                      <CardDescription>よく言及される否定的な表現</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sentimentKeywords.negative.map((keyword) => (
                          <Badge key={keyword} className="bg-red-100 text-red-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="price" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>価格変動アラート</CardTitle>
                    <CardDescription>直近の価格変動商品</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-12">
                      価格変動の詳細分析は準備中です
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compare" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>ECモール比較</CardTitle>
                    <CardDescription>Amazon vs 楽天 vs Yahoo!の比較分析</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-12">
                      モール比較の詳細分析は準備中です
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
