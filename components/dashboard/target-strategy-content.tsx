"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  Users, 
  TrendingUp, 
  ChevronRight,
  Layers,
  Circle,
  Zap,
  Heart,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"

interface TargetSegment {
  id: string
  name: string
  tier: "master" | "core" | "niche"
  description: string
  population: string
  percentage: number
  characteristics: string[]
  mediaTouch: { name: string; percentage: number }[]
  needs: string[]
  score: {
    urgency: number
    fit: number
    continuity: number
    acquisition: number
    replacement: number
    total: number
    rank: "S" | "A" | "B" | "C" | "D"
  }
}

const targetSegments: TargetSegment[] = [
  {
    id: "master",
    name: "健康意識層",
    tier: "master",
    description: "日常的に健康を意識し、予防的な行動を取る層",
    population: "2,450万人",
    percentage: 45,
    characteristics: [
      "健康診断を定期的に受ける",
      "食品の成分表示をチェックする",
      "運動習慣がある（週2回以上）"
    ],
    mediaTouch: [
      { name: "テレビ", percentage: 78 },
      { name: "SNS", percentage: 65 },
      { name: "Web記事", percentage: 58 },
      { name: "雑誌", percentage: 32 }
    ],
    needs: ["エビデンスベースの情報", "手軽に取り入れられる", "コスパの良さ"],
    score: {
      urgency: 4,
      fit: 4,
      continuity: 5,
      acquisition: 3,
      replacement: 3,
      total: 19,
      rank: "A"
    }
  },
  {
    id: "core",
    name: "アクティブミレニアル",
    tier: "core",
    description: "トレンドに敏感で、新しい健康法を積極的に試す層",
    population: "890万人",
    percentage: 30,
    characteristics: [
      "SNSで健康情報を収集",
      "サブスクリプションサービス利用",
      "ジム・ヨガ通いをしている"
    ],
    mediaTouch: [
      { name: "Instagram", percentage: 85 },
      { name: "YouTube", percentage: 78 },
      { name: "TikTok", percentage: 62 },
      { name: "Podcast", percentage: 45 }
    ],
    needs: ["インスタ映え", "最新トレンド", "ライフスタイル提案"],
    score: {
      urgency: 5,
      fit: 5,
      continuity: 4,
      acquisition: 4,
      replacement: 4,
      total: 22,
      rank: "S"
    }
  },
  {
    id: "niche",
    name: "バイオハッカー",
    tier: "niche",
    description: "科学的アプローチで身体機能の最適化を追求する層",
    population: "120万人",
    percentage: 25,
    characteristics: [
      "サプリメントを複数摂取",
      "睡眠・運動データを計測",
      "最新の研究論文をチェック"
    ],
    mediaTouch: [
      { name: "Twitter/X", percentage: 72 },
      { name: "専門ブログ", percentage: 68 },
      { name: "論文サイト", percentage: 55 },
      { name: "Discord", percentage: 48 }
    ],
    needs: ["科学的エビデンス", "高品質・高純度", "定量的な効果"],
    score: {
      urgency: 5,
      fit: 4,
      continuity: 5,
      acquisition: 2,
      replacement: 5,
      total: 21,
      rank: "A"
    }
  }
]

const tierConfig = {
  master: { label: "マスター", color: "bg-blue-100 text-blue-700", bgColor: "#3b82f6" },
  core: { label: "コア", color: "bg-emerald-100 text-emerald-700", bgColor: "#10b981" },
  niche: { label: "ニッチ", color: "bg-amber-100 text-amber-700", bgColor: "#f59e0b" }
}

export function TargetStrategyContent() {
  const [selectedSegment, setSelectedSegment] = useState<TargetSegment>(targetSegments[1])

  const pieData = targetSegments.map(seg => ({
    name: seg.name,
    value: seg.percentage,
    tier: seg.tier
  }))

  const scoreData = [
    { name: "切実度", master: targetSegments[0].score.urgency, core: targetSegments[1].score.urgency, niche: targetSegments[2].score.urgency },
    { name: "適合度", master: targetSegments[0].score.fit, core: targetSegments[1].score.fit, niche: targetSegments[2].score.fit },
    { name: "継続性", master: targetSegments[0].score.continuity, core: targetSegments[1].score.continuity, niche: targetSegments[2].score.continuity },
    { name: "獲得容易性", master: targetSegments[0].score.acquisition, core: targetSegments[1].score.acquisition, niche: targetSegments[2].score.acquisition },
    { name: "置換容易性", master: targetSegments[0].score.replacement, core: targetSegments[1].score.replacement, niche: targetSegments[2].score.replacement },
  ]

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S": return "bg-amber-100 text-amber-700 border-amber-300"
      case "A": return "bg-emerald-100 text-emerald-700 border-emerald-300"
      case "B": return "bg-blue-100 text-blue-700 border-blue-300"
      case "C": return "bg-orange-100 text-orange-700 border-orange-300"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">3段階ターゲット戦略</h1>
          <p className="text-muted-foreground mt-1">
            マスター → コア → ニッチの3層構造でターゲットを設計
          </p>
        </div>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          戦略レポート生成
        </Button>
      </div>

      {/* Strategy Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            ターゲット階層構造
          </CardTitle>
          <CardDescription>
            広範なマスター層から、狙い撃ちのニッチ層まで3段階で設計
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8">
            {/* Funnel Visualization */}
            <div className="flex flex-col items-center gap-2">
              {targetSegments.map((segment, index) => {
                const width = 100 - index * 25
                const config = tierConfig[segment.tier]
                const isSelected = selectedSegment.id === segment.id
                return (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedSegment(segment)}
                    className={`relative transition-all ${isSelected ? "scale-105" : "hover:scale-102"}`}
                    style={{ width: `${width}%` }}
                  >
                    <div 
                      className={`py-4 px-6 rounded-lg text-center ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      style={{ backgroundColor: config.bgColor + "20", borderColor: config.bgColor, borderWidth: 2 }}
                    >
                      <Badge className={config.color}>{config.label}</Badge>
                      <p className="font-semibold mt-2">{segment.name}</p>
                      <p className="text-sm text-muted-foreground">{segment.population}</p>
                    </div>
                    {index < targetSegments.length - 1 && (
                      <div className="flex justify-center my-1">
                        <ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Pie Chart */}
            <div className="w-64">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={tierConfig[entry.tier as keyof typeof tierConfig].bgColor} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Segment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Segment Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Badge className={tierConfig[selectedSegment.tier].color}>
                  {tierConfig[selectedSegment.tier].label}ターゲット
                </Badge>
                <CardTitle className="text-xl mt-2">{selectedSegment.name}</CardTitle>
                <CardDescription>{selectedSegment.description}</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">推定人口</p>
                <p className="text-2xl font-bold">{selectedSegment.population}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="characteristics" className="space-y-4">
              <TabsList>
                <TabsTrigger value="characteristics">特徴</TabsTrigger>
                <TabsTrigger value="media">メディア接触</TabsTrigger>
                <TabsTrigger value="needs">ニーズ</TabsTrigger>
              </TabsList>

              <TabsContent value="characteristics">
                <div className="space-y-3">
                  {selectedSegment.characteristics.map((char, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span>{char}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="space-y-3">
                  {selectedSegment.mediaTouch.map((media, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{media.name}</span>
                        <span className="text-sm font-medium">{media.percentage}%</span>
                      </div>
                      <Progress value={media.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="needs">
                <div className="flex flex-wrap gap-2">
                  {selectedSegment.needs.map((need, i) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2">
                      {need}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Segment Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">セグメントスコア</CardTitle>
            <CardDescription>5軸25点評価</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${getRankColor(selectedSegment.score.rank)}`}>
                {selectedSegment.score.rank}
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold">{selectedSegment.score.total}<span className="text-sm font-normal text-muted-foreground">/25</span></p>
            </div>
            <div className="space-y-3">
              {[
                { key: "urgency", label: "切実度", icon: Zap, description: "ニーズの切実さ" },
                { key: "fit", label: "適合度", icon: Target, description: "商品との適合性" },
                { key: "continuity", label: "継続性", icon: Clock, description: "継続購入可能性" },
                { key: "acquisition", label: "獲得容易性", icon: Users, description: "顧客獲得の難易度" },
                { key: "replacement", label: "置換容易性", icon: ArrowRight, description: "競合からの乗換え" },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm flex-1">{label}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Circle
                        key={n}
                        className={`h-4 w-4 ${
                          n <= selectedSegment.score[key as keyof typeof selectedSegment.score]
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cross-Segment Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">セグメント横断比較</CardTitle>
          <CardDescription>3階層のスコア比較</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="master" name="マスター" fill="#3b82f6" />
              <Bar dataKey="core" name="コア" fill="#10b981" />
              <Bar dataKey="niche" name="ニッチ" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Strategy Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {targetSegments.map((segment) => {
          const config = tierConfig[segment.tier]
          return (
            <Card key={segment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Badge className={config.color}>{config.label}</Badge>
                <CardTitle className="text-base mt-2">{segment.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{segment.population}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>スコア: {segment.score.total}/25 ({segment.score.rank})</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
                  詳細を見る
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
