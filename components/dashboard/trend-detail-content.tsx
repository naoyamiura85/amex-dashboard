"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  TrendingUp,
  Users,
  MessageSquare,
  Share2,
  Bookmark,
  ExternalLink,
  BarChart3,
  Target,
  Lightbulb,
  Globe,
  Calendar,
  Zap,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// トレンドデータ
const trendsData: Record<string, {
  id: string
  name: string
  nameEn: string
  category: string
  status: string
  growth: number
  mentions: string
  description: string
  image: string
  demographics: { label: string; value: number }[]
  monthlyData: { month: string; mentions: number; sentiment: number }[]
  relatedKeywords: string[]
  competitors: { name: string; share: number }[]
  opportunities: string[]
  risks: string[]
}> = {
  "nmn-supplement": {
    id: "nmn-supplement",
    name: "NMNサプリ",
    nameEn: "NMN Supplement",
    category: "サプリメント",
    status: "Emerging",
    growth: 210,
    mentions: "85K",
    description: "アンチエイジング成分。NAD+前駆体として注目。細胞のエネルギー代謝を促進し、長寿遺伝子の活性化に関与するとされる。",
    image: "/images/trends/nmn.jpg",
    demographics: [
      { label: "40-50代", value: 35 },
      { label: "30-40代", value: 28 },
      { label: "50-60代", value: 22 },
      { label: "20-30代", value: 15 },
    ],
    monthlyData: [
      { month: "1月", mentions: 12000, sentiment: 72 },
      { month: "2月", mentions: 18000, sentiment: 74 },
      { month: "3月", mentions: 25000, sentiment: 75 },
      { month: "4月", mentions: 35000, sentiment: 78 },
      { month: "5月", mentions: 52000, sentiment: 80 },
      { month: "6月", mentions: 85000, sentiment: 82 },
    ],
    relatedKeywords: ["NAD+", "長寿", "アンチエイジング", "細胞活性化", "ミトコンドリア", "サーチュイン"],
    competitors: [
      { name: "DHC", share: 25 },
      { name: "ファンケル", share: 20 },
      { name: "アサヒ", share: 15 },
      { name: "その他", share: 40 },
    ],
    opportunities: [
      "40-50代の健康意識の高いターゲット層へのアプローチ",
      "エビデンスベースのマーケティングで信頼性向上",
      "定期購入モデルによるLTV最大化",
    ],
    risks: [
      "価格競争の激化",
      "エビデンス不足による信頼性低下リスク",
      "規制強化の可能性",
    ],
  },
  "cbd-supplement": {
    id: "cbd-supplement",
    name: "CBDサプリ",
    nameEn: "CBD Supplement",
    category: "サプリメント",
    status: "Emerging",
    growth: 156,
    mentions: "95K",
    description: "リラックス・睡眠改善目的で注目。規制緩和の動きも。ストレス社会における自然由来のソリューションとして需要増加。",
    image: "/images/trends/cbd.jpg",
    demographics: [
      { label: "30-40代", value: 32 },
      { label: "20-30代", value: 28 },
      { label: "40-50代", value: 25 },
      { label: "50代以上", value: 15 },
    ],
    monthlyData: [
      { month: "1月", mentions: 20000, sentiment: 68 },
      { month: "2月", mentions: 28000, sentiment: 70 },
      { month: "3月", mentions: 38000, sentiment: 72 },
      { month: "4月", mentions: 52000, sentiment: 74 },
      { month: "5月", mentions: 72000, sentiment: 76 },
      { month: "6月", mentions: 95000, sentiment: 78 },
    ],
    relatedKeywords: ["リラックス", "睡眠", "ストレス", "カンナビジオール", "自然由来", "ウェルネス"],
    competitors: [
      { name: "エリクシノール", share: 22 },
      { name: "ヘンプメッズ", share: 18 },
      { name: "CBDfx", share: 15 },
      { name: "その他", share: 45 },
    ],
    opportunities: [
      "睡眠市場との連携による新規顧客獲得",
      "ストレスケア市場での差別化",
      "品質認証による信頼性確保",
    ],
    risks: [
      "法規制の変動リスク",
      "品質管理の課題",
      "消費者教育の必要性",
    ],
  },
}

// デフォルトデータ
const defaultTrend = {
  id: "default",
  name: "トレンド",
  nameEn: "Trend",
  category: "カテゴリ",
  status: "Growing",
  growth: 100,
  mentions: "50K",
  description: "このトレンドの詳細情報はまだ登録されていません。",
  image: "/images/trends/default.jpg",
  demographics: [
    { label: "30-40代", value: 30 },
    { label: "40-50代", value: 25 },
    { label: "20-30代", value: 25 },
    { label: "50代以上", value: 20 },
  ],
  monthlyData: [
    { month: "1月", mentions: 10000, sentiment: 70 },
    { month: "2月", mentions: 15000, sentiment: 72 },
    { month: "3月", mentions: 22000, sentiment: 74 },
    { month: "4月", mentions: 30000, sentiment: 76 },
    { month: "5月", mentions: 40000, sentiment: 78 },
    { month: "6月", mentions: 50000, sentiment: 80 },
  ],
  relatedKeywords: ["健康", "ウェルネス", "ライフスタイル"],
  competitors: [
    { name: "競合A", share: 30 },
    { name: "競合B", share: 25 },
    { name: "その他", share: 45 },
  ],
  opportunities: ["市場成長のポテンシャル", "新規顧客獲得の機会"],
  risks: ["競合の参入", "市場変動リスク"],
}

const COLORS = ["#00A0D2", "#0EA5E9", "#38BDF8", "#7DD3FC", "#BAE6FD"]

interface TrendDetailContentProps {
  trendId: string
}

export function TrendDetailContent({ trendId }: TrendDetailContentProps) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const trend = trendsData[trendId] || { ...defaultTrend, id: trendId, name: trendId.replace(/-/g, " ") }

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          トレンド一覧に戻る
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            共有
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`gap-2 ${isBookmarked ? "text-primary" : ""}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            保存
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="aspect-video rounded-xl overflow-hidden bg-muted">
            <Image
              src={trend.image}
              alt={trend.name}
              width={400}
              height={225}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=225&fit=crop"
              }}
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline">{trend.category}</Badge>
                <Badge className={trend.status === "Emerging" ? "bg-emerald-500" : "bg-blue-500"}>
                  {trend.status}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{trend.name}</h1>
              <p className="text-muted-foreground">{trend.nameEn}</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{trend.description}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span className="text-2xl font-bold text-emerald-500">+{trend.growth}%</span>
              <span className="text-sm text-muted-foreground">YoY成長</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{trend.mentions}</span>
              <span className="text-sm text-muted-foreground">メンション</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="demographics">ターゲット層</TabsTrigger>
          <TabsTrigger value="competitive">競合分析</TabsTrigger>
          <TabsTrigger value="opportunities">機会・リスク</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mentions Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  メンション推移
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E6E7E4" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#888" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#888" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="mentions"
                        stroke="#00A0D2"
                        fill="#00A0D2"
                        fillOpacity={0.2}
                        name="メンション数"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  センチメント推移
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trend.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E6E7E4" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#888" />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} stroke="#888" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sentiment"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="ポジティブ率"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                関連キーワード
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trend.relatedKeywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="px-3 py-1">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  年代別分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trend.demographics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="label"
                        label={({ label, value }) => `${label}: ${value}%`}
                      >
                        {trend.demographics.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <CardTitle>年代別詳細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trend.demographics.map((demo, index) => (
                  <div key={demo.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{demo.label}</span>
                      <span className="font-medium">{demo.value}%</span>
                    </div>
                    <Progress value={demo.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                市場シェア
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trend.competitors}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="share"
                        nameKey="name"
                      >
                        {trend.competitors.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {trend.competitors.map((competitor, index) => (
                    <div key={competitor.name} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="flex-1">{competitor.name}</span>
                      <span className="font-bold">{competitor.share}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <Lightbulb className="h-5 w-5" />
                  機会
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {trend.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-emerald-600">{index + 1}</span>
                      </div>
                      <span className="text-sm">{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Calendar className="h-5 w-5" />
                  リスク
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {trend.risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-red-600">{index + 1}</span>
                      </div>
                      <span className="text-sm">{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
