"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Plus, 
  X, 
  TrendingUp, 
  TrendingDown,
  Target,
  Users,
  MessageSquare,
  Star,
  BarChart3,
  Radar,
  Building2
} from "lucide-react"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from "recharts"

// Brand data
const brandsDatabase = [
  { 
    id: "brand-a", 
    name: "ブランドA", 
    category: "化粧品",
    color: "#4f46e5",
    metrics: {
      awareness: 85,
      consideration: 72,
      purchase: 58,
      loyalty: 65,
      advocacy: 48,
      socialShare: 2.3,
      yoyGrowth: 15,
      sentiment: 78,
      avgRating: 4.2,
      reviewCount: 12500
    },
    demographics: { "Z世代": 35, "ミレニアル": 42, "ミドル": 18, "シニア": 5 },
    channels: { "EC": 45, "ドラッグストア": 30, "百貨店": 15, "コンビニ": 10 },
    trends: ["レチノール", "ビタミンC", "ナイアシンアミド"]
  },
  { 
    id: "brand-b", 
    name: "ブランドB", 
    category: "化粧品",
    color: "#06b6d4",
    metrics: {
      awareness: 78,
      consideration: 68,
      purchase: 62,
      loyalty: 70,
      advocacy: 55,
      socialShare: 1.8,
      yoyGrowth: 22,
      sentiment: 82,
      avgRating: 4.4,
      reviewCount: 8900
    },
    demographics: { "Z世代": 48, "ミレニアル": 35, "ミドル": 12, "シニア": 5 },
    channels: { "EC": 55, "ドラッグストア": 25, "百貨店": 10, "コンビニ": 10 },
    trends: ["シカ", "セラミド", "ヒアルロン酸"]
  },
  { 
    id: "brand-c", 
    name: "ブランドC", 
    category: "化粧品",
    color: "#10b981",
    metrics: {
      awareness: 92,
      consideration: 75,
      purchase: 55,
      loyalty: 60,
      advocacy: 42,
      socialShare: 3.1,
      yoyGrowth: 8,
      sentiment: 72,
      avgRating: 4.0,
      reviewCount: 25000
    },
    demographics: { "Z世代": 20, "ミレニアル": 30, "ミドル": 35, "シニア": 15 },
    channels: { "EC": 25, "ドラッグストア": 40, "百貨店": 20, "コンビニ": 15 },
    trends: ["エイジングケア", "美白", "保湿"]
  },
  { 
    id: "brand-d", 
    name: "ブランドD", 
    category: "食品",
    color: "#f59e0b",
    metrics: {
      awareness: 70,
      consideration: 65,
      purchase: 48,
      loyalty: 55,
      advocacy: 38,
      socialShare: 1.5,
      yoyGrowth: 35,
      sentiment: 85,
      avgRating: 4.5,
      reviewCount: 5600
    },
    demographics: { "Z世代": 30, "ミレニアル": 45, "ミドル": 20, "シニア": 5 },
    channels: { "EC": 40, "ドラッグストア": 15, "百貨店": 5, "コンビニ": 40 },
    trends: ["プロテイン", "低糖質", "高タンパク"]
  },
]

export function BrandComparisonContent() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["brand-a", "brand-b"])
  const [searchQuery, setSearchQuery] = useState("")
  const [showBrandSelector, setShowBrandSelector] = useState(false)

  const selectedBrandData = brandsDatabase.filter(b => selectedBrands.includes(b.id))
  
  const addBrand = (brandId: string) => {
    if (selectedBrands.length < 4 && !selectedBrands.includes(brandId)) {
      setSelectedBrands([...selectedBrands, brandId])
    }
    setShowBrandSelector(false)
  }

  const removeBrand = (brandId: string) => {
    setSelectedBrands(selectedBrands.filter(id => id !== brandId))
  }

  // Prepare radar chart data
  const radarData = [
    { metric: "認知度", ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.metrics.awareness])) },
    { metric: "検討率", ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.metrics.consideration])) },
    { metric: "購買率", ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.metrics.purchase])) },
    { metric: "ロイヤリティ", ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.metrics.loyalty])) },
    { metric: "推奨意向", ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.metrics.advocacy])) },
  ]

  // Prepare demographics comparison
  const demographicsData = ["Z世代", "ミレニアル", "ミドル", "シニア"].map(demo => ({
    name: demo,
    ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.demographics[demo as keyof typeof b.demographics]]))
  }))

  // Prepare channels comparison
  const channelsData = ["EC", "ドラッグストア", "百貨店", "コンビニ"].map(ch => ({
    name: ch,
    ...Object.fromEntries(selectedBrandData.map(b => [b.name, b.channels[ch as keyof typeof b.channels]]))
  }))

  // Trend timeline mock data
  const trendTimeline = [
    { month: "Jan", ...Object.fromEntries(selectedBrandData.map(b => [b.name, Math.random() * 30 + 50])) },
    { month: "Feb", ...Object.fromEntries(selectedBrandData.map(b => [b.name, Math.random() * 30 + 55])) },
    { month: "Mar", ...Object.fromEntries(selectedBrandData.map(b => [b.name, Math.random() * 30 + 60])) },
    { month: "Apr", ...Object.fromEntries(selectedBrandData.map(b => [b.name, Math.random() * 30 + 58])) },
    { month: "May", ...Object.fromEntries(selectedBrandData.map(b => [b.name, Math.random() * 30 + 65])) },
    { month: "Jun", ...Object.fromEntries(selectedBrandData.map(b => [b.name, Math.random() * 30 + 70])) },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Brand Comparison</h1>
          <p className="text-muted-foreground mt-1">
            競合ブランドのパフォーマンスを多角的に比較分析
          </p>
        </div>
      </div>

      {/* Brand Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            比較ブランド選択
          </CardTitle>
          <CardDescription>最大4ブランドまで選択できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 flex-wrap">
            {selectedBrandData.map(brand => (
              <Badge 
                key={brand.id} 
                variant="secondary" 
                className="px-3 py-2 text-sm gap-2"
                style={{ borderColor: brand.color, borderWidth: 2 }}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
                {brand.name}
                <button onClick={() => removeBrand(brand.id)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedBrands.length < 4 && (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setShowBrandSelector(!showBrandSelector)}
                >
                  <Plus className="h-4 w-4" />
                  ブランドを追加
                </Button>
                {showBrandSelector && (
                  <Card className="absolute top-full left-0 mt-2 z-10 w-64 shadow-lg">
                    <CardContent className="p-2">
                      <Input 
                        placeholder="ブランドを検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-2"
                      />
                      <div className="space-y-1 max-h-48 overflow-auto">
                        {brandsDatabase
                          .filter(b => !selectedBrands.includes(b.id))
                          .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map(brand => (
                            <button
                              key={brand.id}
                              onClick={() => addBrand(brand.id)}
                              className="w-full text-left px-3 py-2 rounded-md hover:bg-muted flex items-center justify-between"
                            >
                              <span>{brand.name}</span>
                              <Badge variant="outline" className="text-xs">{brand.category}</Badge>
                            </button>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Radar className="h-4 w-4" />
            総合比較
          </TabsTrigger>
          <TabsTrigger value="metrics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            指標詳細
          </TabsTrigger>
          <TabsTrigger value="demographics" className="gap-2">
            <Users className="h-4 w-4" />
            顧客層
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            トレンド
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ブランド力レーダーチャート</CardTitle>
                <CardDescription>認知から推奨までのファネル比較</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    {selectedBrandData.map(brand => (
                      <RechartsRadar
                        key={brand.id}
                        name={brand.name}
                        dataKey={brand.name}
                        stroke={brand.color}
                        fill={brand.color}
                        fillOpacity={0.2}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Key Metrics Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">主要指標サマリー</CardTitle>
                <CardDescription>各ブランドのパフォーマンス概要</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedBrandData.map(brand => (
                    <div key={brand.id} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
                        <span className="font-semibold">{brand.name}</span>
                        <Badge variant="outline">{brand.category}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">SNSシェア</p>
                          <p className="font-semibold">{brand.metrics.socialShare}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">YoY成長</p>
                          <p className={`font-semibold flex items-center gap-1 ${brand.metrics.yoyGrowth > 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {brand.metrics.yoyGrowth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {brand.metrics.yoyGrowth}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">評価</p>
                          <p className="font-semibold flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            {brand.metrics.avgRating}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">口コミ数</p>
                          <p className="font-semibold">{(brand.metrics.reviewCount / 1000).toFixed(1)}K</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">SNS言及トレンド推移</CardTitle>
              <CardDescription>過去6ヶ月のソーシャルメンション推移</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedBrandData.map(brand => (
                    <Line
                      key={brand.id}
                      type="monotone"
                      dataKey={brand.name}
                      stroke={brand.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Detailed Metrics Table */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-base">詳細指標比較</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">指標</th>
                        {selectedBrandData.map(brand => (
                          <th key={brand.id} className="text-center py-3 font-medium">
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brand.color }} />
                              {brand.name}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { key: "awareness", label: "認知度" },
                        { key: "consideration", label: "検討率" },
                        { key: "purchase", label: "購買率" },
                        { key: "loyalty", label: "ロイヤリティ" },
                        { key: "advocacy", label: "推奨意向" },
                        { key: "sentiment", label: "センチメント" },
                      ].map(({ key, label }) => (
                        <tr key={key} className="border-b">
                          <td className="py-3">{label}</td>
                          {selectedBrandData.map(brand => {
                            const value = brand.metrics[key as keyof typeof brand.metrics] as number
                            const maxValue = Math.max(...selectedBrandData.map(b => b.metrics[key as keyof typeof b.metrics] as number))
                            const isMax = value === maxValue
                            return (
                              <td key={brand.id} className="text-center py-3">
                                <div className="flex items-center justify-center gap-2">
                                  <span className={isMax ? "font-bold text-primary" : ""}>{value}%</span>
                                  {isMax && <Badge variant="secondary" className="text-xs">最高</Badge>}
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Demographics Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">世代別顧客構成比</CardTitle>
                <CardDescription>各ブランドの顧客世代分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demographicsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedBrandData.map(brand => (
                      <Bar key={brand.id} dataKey={brand.name} fill={brand.color} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Channels Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">チャネル別売上構成比</CardTitle>
                <CardDescription>各ブランドの販売チャネル分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedBrandData.map(brand => (
                      <Bar key={brand.id} dataKey={brand.name} fill={brand.color} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">関連トレンドキーワード</CardTitle>
              <CardDescription>各ブランドに関連するトレンドキーワード</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedBrandData.map(brand => (
                  <div key={brand.id} className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
                      <span className="font-semibold">{brand.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {brand.trends.map(trend => (
                        <Badge key={trend} variant="secondary">{trend}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
