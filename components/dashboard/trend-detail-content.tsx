"use client"

import Link from "next/link"
import { useTrends } from "@/contexts/trends-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Sparkles,
  Loader2,
  Clock,
  ExternalLink,
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
  Cell,
  PieChart,
  Pie,
} from "recharts"

interface TrendDetailContentProps {
  trendId: string
}

// Mock time series data
const timeSeriesData = [
  { month: "Jan 24", value: 2.1 },
  { month: "Apr 24", value: 2.8 },
  { month: "Jul 24", value: 3.5 },
  { month: "Oct 24", value: 4.2 },
  { month: "Jan 25", value: 5.8 },
  { month: "Apr 25", value: 6.5 },
  { month: "Jul 25", value: 5.9 },
  { month: "Oct 25", value: 6.2 },
]

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]

export function TrendDetailContent({ trendId }: TrendDetailContentProps) {
  const { getTrendById } = useTrends()
  const trend = getTrendById(trendId)

  if (!trend) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <div className="text-muted-foreground mb-4">トレンドが見つかりません</div>
        <Button asChild variant="outline">
          <Link href="/dashboard/trends">
            <ArrowLeft className="h-4 w-4 mr-2" />
            トレンド一覧に戻る
          </Link>
        </Button>
      </div>
    )
  }

  // Show loading state for researching trends
  if (trend.researchStatus === "queued" || trend.researchStatus === "researching") {
    return (
      <div className="space-y-6">
        {/* Back link */}
        <Link 
          href="/dashboard/trends" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Top Trends
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{trend.name}</h1>
            <p className="text-muted-foreground mt-1">
              {trend.categoryLabel}カテゴリのトレンド分析
            </p>
          </div>
        </div>

        {/* Image and Research Progress Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max lg:auto-rows-fr">
          {/* Product Image Card */}
          {trend.imageUrl && (
            <Card className="overflow-hidden">
              <CardContent className="p-0 h-full">
                <img 
                  src={trend.imageUrl} 
                  alt={trend.name}
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          )}

          {/* Research Progress Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                {trend.researchStatus === "queued" ? (
                  <>
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">リサーチ待機中</h3>
                    <p className="text-muted-foreground mb-4">
                      キューに追加されました。まもなくディープリサーチを開始します。
                    </p>
                  </>
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">AIディープリサーチ実行中</h3>
                    <p className="text-muted-foreground mb-4">
                      SNSデータ、EC販売データ、検索トレンドを分析しています...
                    </p>
                    <div className="w-full max-w-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>分析進捗</span>
                        <span className="font-medium">{trend.researchProgress || 0}%</span>
                      </div>
                      <Progress value={trend.researchProgress || 0} className="h-2" />
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <ul className="space-y-1">
                        <li className={trend.researchProgress! >= 20 ? "text-foreground" : ""}>
                          {trend.researchProgress! >= 20 ? "✓" : "○"} SNS言及データ収集
                        </li>
                        <li className={trend.researchProgress! >= 40 ? "text-foreground" : ""}>
                          {trend.researchProgress! >= 40 ? "✓" : "○"} 関連キーワード抽出
                        </li>
                        <li className={trend.researchProgress! >= 60 ? "text-foreground" : ""}>
                          {trend.researchProgress! >= 60 ? "✓" : "○"} 成分・原材料分析
                        </li>
                        <li className={trend.researchProgress! >= 80 ? "text-foreground" : ""}>
                          {trend.researchProgress! >= 80 ? "✓" : "○"} デモグラフィック分析
                        </li>
                        <li className={trend.researchProgress! >= 100 ? "text-foreground" : ""}>
                          {trend.researchProgress! >= 100 ? "✓" : "○"} レポート生成
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const researchData = trend.researchData || {
    summary: `${trend.name}は${trend.categoryLabel}カテゴリにおける注目トレンドです。`,
    popularIngredients: [
      { name: "成分A", share: "15%", growth: "+120%" },
      { name: "成分B", share: "12%", growth: "+95%" },
      { name: "成分C", share: "8%", growth: "+78%" },
      { name: "成分D", share: "6%", growth: "+65%" },
      { name: "成分E", share: "5%", growth: "+52%" },
    ],
    trendingIngredients: [
      { name: "新成分1", growth: "+180%" },
      { name: "新成分2", growth: "+145%" },
      { name: "新成分3", growth: "+120%" },
      { name: "新成分4", growth: "+98%" },
      { name: "新成分5", growth: "+85%" },
    ],
    demographics: [
      { age: "20-29歳", percentage: 30 },
      { age: "30-39歳", percentage: 35 },
      { age: "40-49歳", percentage: 25 },
      { age: "50歳以上", percentage: 10 },
    ],
    regions: [
      { name: "関東", percentage: 40 },
      { name: "関西", percentage: 30 },
      { name: "中部", percentage: 18 },
      { name: "その他", percentage: 12 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link 
        href="/dashboard/trends" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Top Trends
        <span className="mx-2 text-border">&gt;</span>
        <span className="text-foreground">{trend.name}</span>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{trend.name}</h1>
          <p className="text-muted-foreground mt-1">{trend.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" className="gap-2">
            <FileText className="h-4 w-4" />
            Create brief
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image and Content Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max lg:auto-rows-fr">
        {/* Left: Product Image */}
        {trend.imageUrl && (
          <Card className="overflow-hidden">
            <CardContent className="p-0 h-full">
              <img 
                src={trend.imageUrl} 
                alt={trend.name}
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>
        )}

        {/* Right: Main Content */}
        <div className="flex flex-col gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Trend Performance</CardTitle>
              <p className="text-2xl font-bold mt-1">How this trend is performing?</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="social" className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-9">
                  <TabsTrigger value="social" className="text-xs">Social Mentions</TabsTrigger>
                  <TabsTrigger value="ec" className="text-xs">In EC</TabsTrigger>
                  <TabsTrigger value="prediction" className="text-xs">Trend prediction</TabsTrigger>
                </TabsList>
                <TabsContent value="social" className="mt-4">
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Social Share</p>
                      <p className="text-xl font-bold">{trend.socialShare}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">YoY Growth</p>
                      <p className={`text-xl font-bold flex items-center gap-1 ${
                        trend.growthType === "up" ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {trend.growthType === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {trend.yoyGrowth}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {researchData.summary}
                  </p>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timeSeriesData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                        <Tooltip 
                          formatter={(value: number) => [`${value}%`, 'Social Share']}
                          contentStyle={{ fontSize: 12 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="ec" className="mt-4">
                  <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                    ECデータ分析中...
                  </div>
                </TabsContent>
                <TabsContent value="prediction" className="mt-4">
                  <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                    トレンド予測分析中...
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Popular Ingredients */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Which ingredients are popular?</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {researchData.popularIngredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-4">{index + 1}</span>
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{ingredient.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Social Share</p>
                      <p className="text-sm font-medium">{ingredient.share}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Trending Ingredients */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Which ingredients are up and coming?</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {researchData.trendingIngredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-4">{index + 1}</span>
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{ingredient.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">YoY Growth</p>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        {ingredient.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row - Demographics & Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={researchData.demographics} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="age" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip formatter={(value: number) => [`${value}%`, '割合']} />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                    {researchData.demographics?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Regional Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="h-[180px] w-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={researchData.regions}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="percentage"
                      nameKey="name"
                    >
                      {researchData.regions?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, '割合']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {researchData.regions?.map((region, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm flex-1">{region.name}</span>
                    <span className="text-sm font-medium">{region.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
