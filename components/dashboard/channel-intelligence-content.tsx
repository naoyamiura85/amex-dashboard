"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ShoppingCart, 
  Star, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Store,
  BarChart3,
  Package,
  Eye
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts"

const channels = [
  { id: "amazon", name: "Amazon", icon: ShoppingCart, color: "bg-orange-500" },
  { id: "rakuten", name: "楽天市場", icon: Store, color: "bg-red-500" },
  { id: "atcosme", name: "@cosme", icon: Star, color: "bg-pink-500" },
  { id: "lohaco", name: "LOHACO", icon: Package, color: "bg-blue-500" },
]

const channelTrendData = [
  { month: "Oct", amazon: 4200, rakuten: 3800, atcosme: 2900, lohaco: 1800 },
  { month: "Nov", amazon: 4800, rakuten: 4200, atcosme: 3100, lohaco: 2100 },
  { month: "Dec", amazon: 5600, rakuten: 4900, atcosme: 3400, lohaco: 2400 },
  { month: "Jan", amazon: 4900, rakuten: 4400, atcosme: 3200, lohaco: 2000 },
  { month: "Feb", amazon: 5200, rakuten: 4600, atcosme: 3500, lohaco: 2200 },
  { month: "Mar", amazon: 5800, rakuten: 5100, atcosme: 3800, lohaco: 2500 },
]

const topProducts = [
  {
    channel: "Amazon",
    products: [
      { rank: 1, name: "オートミール プロテイン 1kg", brand: "日清シスコ", category: "食品", change: 12, reviews: 4523 },
      { rank: 2, name: "MCTオイル 450g", brand: "仙台勝山館", category: "サプリ", change: 8, reviews: 3821 },
      { rank: 3, name: "グルテンフリー パスタ", brand: "Barilla", category: "食品", change: -3, reviews: 2145 },
    ]
  },
  {
    channel: "楽天市場",
    products: [
      { rank: 1, name: "国産 もち麦 1kg", brand: "はくばく", category: "食品", change: 18, reviews: 8932 },
      { rank: 2, name: "プロテインバー 12本入", brand: "Quest", category: "サプリ", change: 15, reviews: 4521 },
      { rank: 3, name: "オーガニック アガベシロップ", brand: "Brown Sugar 1st", category: "食品", change: 5, reviews: 1823 },
    ]
  },
  {
    channel: "@cosme",
    products: [
      { rank: 1, name: "CICA セラム 30ml", brand: "Dr.Jart+", category: "化粧品", change: 25, reviews: 12453 },
      { rank: 2, name: "レチノール クリーム", brand: "CERAVE", category: "化粧品", change: 22, reviews: 8721 },
      { rank: 3, name: "ナイアシンアミド 美容液", brand: "The Ordinary", category: "化粧品", change: 18, reviews: 6234 },
    ]
  },
]

const reviewSentiment = [
  { aspect: "効果実感", positive: 78, neutral: 15, negative: 7 },
  { aspect: "コスパ", positive: 65, neutral: 22, negative: 13 },
  { aspect: "使用感", positive: 82, neutral: 12, negative: 6 },
  { aspect: "パッケージ", positive: 70, neutral: 24, negative: 6 },
  { aspect: "配送・対応", positive: 88, neutral: 8, negative: 4 },
]

const crossChannelInsights = [
  {
    title: "プロテイン関連商品",
    insight: "Amazonでは価格訴求が強く、楽天では国産・品質訴求が売れ筋",
    channels: ["Amazon", "楽天市場"],
    trend: "up"
  },
  {
    title: "韓国コスメ",
    insight: "@cosmeでの口コミ評価がAmazon売上に強く相関（r=0.82）",
    channels: ["@cosme", "Amazon"],
    trend: "up"
  },
  {
    title: "グルテンフリー食品",
    insight: "LOHACOでは健康意識層、Amazonでは価格重視層に訴求",
    channels: ["LOHACO", "Amazon"],
    trend: "stable"
  },
]

export function ChannelIntelligenceContent() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="space-y-6">
      {/* フィルターバー */}
      <div className="flex items-center gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="カテゴリ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全カテゴリ</SelectItem>
            <SelectItem value="food">食品</SelectItem>
            <SelectItem value="cosmetics">化粧品</SelectItem>
            <SelectItem value="supplement">サプリメント</SelectItem>
            <SelectItem value="toiletry">日用品</SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="期間" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">過去1ヶ月</SelectItem>
            <SelectItem value="3m">過去3ヶ月</SelectItem>
            <SelectItem value="6m">過去6ヶ月</SelectItem>
            <SelectItem value="1y">過去1年</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* チャネル概要カード */}
      <div className="grid grid-cols-4 gap-4">
        {channels.map((channel) => {
          const Icon = channel.icon
          return (
            <Card key={channel.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${channel.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">{channel.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">トレンド数</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">前月比</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +12.5%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* メインコンテンツ */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">トレンド比較</TabsTrigger>
          <TabsTrigger value="products">売れ筋商品</TabsTrigger>
          <TabsTrigger value="reviews">レビュー分析</TabsTrigger>
          <TabsTrigger value="insights">クロスチャネル洞察</TabsTrigger>
        </TabsList>

        {/* トレンド比較タブ */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                チャネル別トレンド推移
              </CardTitle>
              <CardDescription>
                各チャネルでのトレンド言及数の推移
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={channelTrendData}>
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
                    <Area type="monotone" dataKey="amazon" name="Amazon" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="rakuten" name="楽天市場" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="atcosme" name="@cosme" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="lohaco" name="LOHACO" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 売れ筋商品タブ */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {topProducts.map((channelData) => (
              <Card key={channelData.channel}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{channelData.channel} TOP 3</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {channelData.products.map((product) => (
                    <div key={product.rank} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {product.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className={`text-xs flex items-center gap-0.5 ${product.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {product.change >= 0 ? '+' : ''}{product.change}%
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Eye className="h-3 w-3" />
                            {product.reviews.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* レビュー分析タブ */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>レビュー感情分析</CardTitle>
              <CardDescription>各観点におけるレビューのセンチメント分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reviewSentiment} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="aspect" type="category" width={80} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="positive" name="ポジティブ" stackId="a" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="neutral" name="ニュートラル" stackId="a" fill="hsl(var(--muted))" />
                    <Bar dataKey="negative" name="ネガティブ" stackId="a" fill="hsl(var(--destructive))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* クロスチャネル洞察タブ */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {crossChannelInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        {insight.trend === "up" && (
                          <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            上昇トレンド
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{insight.insight}</p>
                      <div className="flex items-center gap-2">
                        {insight.channels.map((ch) => (
                          <Badge key={ch} variant="outline">{ch}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      詳細を見る
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
