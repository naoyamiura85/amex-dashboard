"use client"

import { useState } from "react"
import { 
  TrendingUp, 
  Share2, 
  Download, 
  Bookmark,
  FileText,
  ChevronRight,
  Copy,
  Users,
  Clock,
  Flame,
  Utensils
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import Image from "next/image"
import Link from "next/link"

// Time series data - matching Tastewise style
const timeSeriesData = [
  { month: "Jan 24", value: 0.02 },
  { month: "Apr 24", value: 0.025 },
  { month: "Jul 24", value: 0.035 },
  { month: "Jan 25", value: 0.06 },
  { month: "Apr 25", value: 0.055 },
  { month: "Jul 25", value: 0.04 },
  { month: "Oct 25", value: 0.02 },
]

// Popular ingredients
const popularIngredients = [
  { rank: 1, name: "ヒアルロン酸", image: "/placeholder.svg?height=40&width=40", socialShare: "15%", color: "bg-blue-100" },
  { rank: 2, name: "ビタミンC", image: "/placeholder.svg?height=40&width=40", socialShare: "12%", color: "bg-orange-100" },
  { rank: 3, name: "ナイアシンアミド", image: "/placeholder.svg?height=40&width=40", socialShare: "6.9%", color: "bg-pink-100" },
  { rank: 4, name: "セラミド", image: "/placeholder.svg?height=40&width=40", socialShare: "5.7%", color: "bg-purple-100" },
  { rank: 5, name: "ペプチド", image: "/placeholder.svg?height=40&width=40", socialShare: "4.9%", color: "bg-green-100" },
]

// Trending ingredients
const trendingIngredients = [
  { rank: 1, name: "バクチオール", yoyGrowth: "+142%", color: "bg-emerald-500" },
  { rank: 2, name: "レチナール", yoyGrowth: "+108%", color: "bg-emerald-500" },
  { rank: 3, name: "エクトイン", yoyGrowth: "+100%", color: "bg-emerald-500" },
  { rank: 4, name: "CICA", yoyGrowth: "+80%", color: "bg-emerald-500" },
  { rank: 5, name: "グルタチオン", yoyGrowth: "+78%", color: "bg-emerald-500" },
]

export function TrendSpotlightContent() {
  const [savedState, setSavedState] = useState(false)

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard/trends" className="hover:text-foreground transition-colors">
          Top Trends
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">レチノール美容液</span>
      </div>

      {/* Header Section - Tastewise Style */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">レチノール美容液</h1>
          <p className="text-sm text-muted-foreground max-w-md">
            化粧品インサイトでより早く、より賢く意思決定
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Create brief
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={savedState ? "default" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setSavedState(!savedState)}
              >
                <Bookmark className={`h-4 w-4 ${savedState ? "fill-current" : ""}`} />
                Save
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Bookmark className="h-4 w-4 mr-2" />
                マイリストに保存
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                共有リンクを作成
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                レポートに追加
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Grid - Tastewise Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Performance - Left Section */}
        <Card className="lg:col-span-5 shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Trend Performance</CardTitle>
            <h3 className="text-lg font-semibold">How this trend is performing?</h3>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="mb-4 h-9">
                <TabsTrigger value="social" className="text-xs">Social Mentions</TabsTrigger>
                <TabsTrigger value="ec" className="text-xs">In EC</TabsTrigger>
                <TabsTrigger value="pos" className="text-xs">In POS</TabsTrigger>
                <TabsTrigger value="prediction" className="text-xs">Trend prediction</TabsTrigger>
              </TabsList>
              <TabsContent value="social">
                {/* Stats Row */}
                <div className="flex items-center gap-6 mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Social Share</span>
                    <span className="text-lg font-bold">0.0%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">YoY Growth</span>
                    <span className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      112%
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-4">
                  レチノール美容液のSNS言及は着実に増加し、その後最近減少しました。
                </p>
                
                {/* Chart */}
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 10, fill: '#9ca3af' }} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        tick={{ fontSize: 10, fill: '#9ca3af' }} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
                        domain={[0, 0.08]}
                      />
                      <Tooltip 
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                        formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, "Social Share"]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#F59E0B" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="ec">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  EC販売データを表示
                </div>
              </TabsContent>
              <TabsContent value="pos">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  POS販売データを表示
                </div>
              </TabsContent>
              <TabsContent value="prediction">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  トレンド予測を表示
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Popular Ingredients - Middle Section */}
        <Card className="lg:col-span-3 shadow-sm border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Which ingredients are popular?</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularIngredients.map((ingredient) => (
              <div 
                key={ingredient.rank} 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-muted-foreground w-4">{ingredient.rank}</span>
                <div className={`h-10 w-10 rounded-lg ${ingredient.color} flex items-center justify-center`}>
                  <Flame className="h-5 w-5 text-muted-foreground/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{ingredient.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Social Share</p>
                  <p className="text-sm font-semibold">{ingredient.socialShare}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Ingredients - Right Section */}
        <Card className="lg:col-span-4 shadow-sm border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Which ingredients are up and coming?</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingIngredients.map((ingredient) => (
              <div 
                key={ingredient.rank} 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-muted-foreground w-4">{ingredient.rank}</span>
                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{ingredient.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">YoY Growth</p>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 font-semibold">
                    {ingredient.yoyGrowth}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - AI Recipe Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Generated Product Concept */}
        <Card className="lg:col-span-5 shadow-sm border-border overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">AI Recipe</Badge>
            </div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xl">✨</span>
              レチノール美容液
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="text-sm font-medium">30代女性</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="text-sm font-medium">Medium</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">45 Min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Projected Engagement</p>
                  <p className="text-sm font-medium">$3,343</p>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline" size="sm">
              詳細を見る
            </Button>
          </CardContent>
        </Card>

        {/* Product Image Placeholder */}
        <Card className="lg:col-span-7 shadow-sm border-border overflow-hidden">
          <div className="relative h-full min-h-[250px] bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
            <div className="text-center">
              <div className="h-32 w-32 mx-auto rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shadow-lg">
                <Image 
                  src="/placeholder.svg?height=100&width=100"
                  alt="Product concept"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">AI Generated Product Concept</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
