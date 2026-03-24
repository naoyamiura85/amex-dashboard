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
  Legend,
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

const TRENDING_INGREDIENT_CLUSTERS = [
  {
    name: "バクチオール",
    growth: "+180%",
    clusters: [
      { label: "20-29歳 女性", color: "#6366f1" },
      { label: "敏感肌ケア層", color: "#22c55e" },
      { label: "ナチュラル志向", color: "#f59e0b" },
    ],
  },
  {
    name: "レチナール",
    growth: "+145%",
    clusters: [
      { label: "30-39歳 女性", color: "#6366f1" },
      { label: "エイジングケア層", color: "#ef4444" },
      { label: "美容上級者", color: "#8b5cf6" },
    ],
  },
  {
    name: "エクトイン",
    growth: "+120%",
    clusters: [
      { label: "20-39歳", color: "#6366f1" },
      { label: "乾燥肌ケア層", color: "#0ea5e9" },
      { label: "インナーケア層", color: "#22c55e" },
    ],
  },
  {
    name: "CICA",
    growth: "+98%",
    clusters: [
      { label: "10-20代", color: "#f59e0b" },
      { label: "ニキビ肌ケア層", color: "#ef4444" },
      { label: "韓国コスメ愛好層", color: "#ec4899" },
    ],
  },
  {
    name: "グルタチオン",
    growth: "+85%",
    clusters: [
      { label: "30-49歳", color: "#6366f1" },
      { label: "美白・透明感重視層", color: "#0ea5e9" },
      { label: "サプリ併用層", color: "#22c55e" },
    ],
  },
]

// 成分×年代相関データ (mock)
const ingredientUserCorrelationData = [
  { ingredient: "バクチオール", "10-19歳": 8, "20-29歳": 42, "30-39歳": 28, "40-49歳": 14, "50歳以上": 8 },
  { ingredient: "レチナール",  "10-19歳": 5, "20-29歳": 30, "30-39歳": 38, "40-49歳": 20, "50歳以上": 7 },
  { ingredient: "エクトイン",  "10-19歳": 6, "20-29歳": 28, "30-39歳": 32, "40-49歳": 24, "50歳以上": 10 },
  { ingredient: "CICA",       "10-19歳": 15,"20-29歳": 45, "30-39歳": 22, "40-49歳": 12, "50歳以上": 6 },
  { ingredient: "グルタチオン","10-19歳": 10,"20-29歳": 35, "30-39歳": 30, "40-49歳": 18, "50歳以上": 7 },
]
const AGE_COLORS: Record<string, string> = {
  "10-19歳": "#a78bfa",
  "20-29歳": "#6366f1",
  "30-39歳": "#22c55e",
  "40-49歳": "#f59e0b",
  "50歳以上": "#94a3b8",
}

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
                          {trend.researchProgress! >= 60 ? "✓" : "○"} 成分・原���料分析
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
      { name: "ヒアルロン酸", share: "15%", growth: "+45%" },
      { name: "ビタミンC誘導体", share: "12%", growth: "+38%" },
      { name: "ナイアシンアミド", share: "8%", growth: "+62%" },
      { name: "セラミド", share: "6%", growth: "+28%" },
      { name: "コラーゲン", share: "5%", growth: "+22%" },
    ],
    trendingIngredients: [
      { name: "バクチオール", growth: "+180%" },
      { name: "レチナール", growth: "+145%" },
      { name: "エクトイン", growth: "+120%" },
      { name: "CICA", growth: "+98%" },
      { name: "グルタチオン", growth: "+85%" },
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
    <div className="space-y-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max lg:auto-rows-fr">
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
        <div className="flex flex-col gap-4">
          {/* Product Overview Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">商品概要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {researchData.summary && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">トレンド概要</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {researchData.summary}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">トレンドパフォーマンス</CardTitle>
              <p className="text-xl font-bold mt-1">このトレンドの動向</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="social" className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-9">
                  <TabsTrigger value="social" className="text-xs">SNS言及</TabsTrigger>
                  <TabsTrigger value="ec" className="text-xs">EC動向</TabsTrigger>
                  <TabsTrigger value="prediction" className="text-xs">トレンド予測</TabsTrigger>
                </TabsList>
                <TabsContent value="social" className="mt-4">
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">SNSシェア</p>
                      <p className="text-xl font-bold">{trend.socialShare}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">前年比</p>
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
                          formatter={(value: number) => [`${value}%`, 'SNSシェア']}
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
                <CardTitle className="text-base font-medium">人気の成分は？</CardTitle>
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
                      <p className="text-xs text-muted-foreground">SNSシェア</p>
                      <p className="text-sm font-medium">{ingredient.share}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Trending Ingredients x User Clusters */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">急上昇中の成分</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">関心の高いユーザークラスター</p>
                </div>
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
            <CardContent className="space-y-3">
              {TRENDING_INGREDIENT_CLUSTERS.map((item, index) => (
                <div key={index} className="p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                      <div className="h-7 w-7 rounded-md bg-emerald-100 flex items-center justify-center">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">
                      {item.growth}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-9">
                    {item.clusters.map((cluster, ci) => (
                      <span
                        key={ci}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: cluster.color + "22", color: cluster.color }}
                      >
                        {cluster.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ingredient x User Correlation */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">成分 × ユーザー相関</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">各成分への関心が高い年代の分布</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {Object.entries(AGE_COLORS).map(([age, color]) => (
                <div key={age} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-muted-foreground">{age}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ingredientUserCorrelationData}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                barCategoryGap="28%"
                barGap={2}
              >
                <XAxis
                  type="number"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="ingredient"
                  tick={{ fontSize: 11 }}
                  width={88}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{ fontSize: 12 }}
                />
                {Object.entries(AGE_COLORS).map(([age, color]) => (
                  <Bar key={age} dataKey={age} stackId="a" fill={color} radius={age === "50歳以上" ? [0, 4, 4, 0] : [0, 0, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Insight chips */}
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-3">
              <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-1">最多年代</p>
              <p className="text-sm font-bold text-foreground">20-29歳</p>
              <p className="text-xs text-muted-foreground">全成分で最多シェア</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">急成長年代</p>
              <p className="text-sm font-bold text-foreground">10-19歳</p>
              <p className="text-xs text-muted-foreground">CICAで前年比+62%</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">成分リーチ</p>
              <p className="text-sm font-bold text-foreground">CICA</p>
              <p className="text-xs text-muted-foreground">最も幅広い年代に支持</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row - Demographics & Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

      {/* Related Products Grid */}
      {trend.relatedProducts && trend.relatedProducts.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-foreground mb-3">関連製品</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {trend.relatedProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
