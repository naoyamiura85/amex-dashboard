"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Loader2,
  BarChart3,
  Zap
} from "lucide-react"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts"

interface ConceptScore {
  id: string
  name: string
  description: string
  overallScore: number
  rank: "S" | "A" | "B" | "C" | "D"
  scores: {
    marketFit: number
    trendAlignment: number
    targetReach: number
    competitiveAdvantage: number
  }
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

const sampleConcepts: ConceptScore[] = [
  {
    id: "concept-1",
    name: "高濃度ビタミンC美容液",
    description: "敏感肌にも使える低刺激処方の高濃度ビタミンC誘導体配合美容液",
    overallScore: 87,
    rank: "A",
    scores: {
      marketFit: 92,
      trendAlignment: 88,
      targetReach: 82,
      competitiveAdvantage: 78
    },
    strengths: [
      "ビタミンC市場は成長トレンド（+24% YoY）",
      "敏感肌訴求は差別化ポイントとして有効",
      "20-30代女性の美白ニーズと合致"
    ],
    weaknesses: [
      "競合製品が多く価格競争のリスク",
      "高濃度訴求は効果実感の期待値が高い"
    ],
    recommendations: [
      "独自の安定化技術をアピール",
      "ビフォーアフター訴求でSNS拡散を狙う",
      "敏感肌テスト済みの表記を強調"
    ]
  },
  {
    id: "concept-2",
    name: "腸活プロテインバー",
    description: "乳酸菌と食物繊維を配合した腸活サポート型プロテインバー",
    overallScore: 78,
    rank: "B",
    scores: {
      marketFit: 75,
      trendAlignment: 85,
      targetReach: 78,
      competitiveAdvantage: 72
    },
    strengths: [
      "腸活×プロテインの組み合わせは新規性あり",
      "健康意識の高いミレニアル層にアピール",
      "コンビニ展開との相性が良い"
    ],
    weaknesses: [
      "プロテインバー市場は飽和気味",
      "腸活効果の実感に時間がかかる"
    ],
    recommendations: [
      "朝食代替のポジショニングを検討",
      "ジムやフィットネス施設との連携",
      "定期購入モデルで継続率向上"
    ]
  }
]

export function PopularityScoreContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [conceptName, setConceptName] = useState("")
  const [conceptDescription, setConceptDescription] = useState("")
  const [analyzedConcepts, setAnalyzedConcepts] = useState<ConceptScore[]>(sampleConcepts)
  const [selectedConcept, setSelectedConcept] = useState<ConceptScore | null>(sampleConcepts[0])

  const handleAnalyze = () => {
    if (!conceptName || !conceptDescription) return
    
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      const newConcept: ConceptScore = {
        id: `concept-${Date.now()}`,
        name: conceptName,
        description: conceptDescription,
        overallScore: Math.floor(Math.random() * 30) + 60,
        rank: ["A", "B", "C"][Math.floor(Math.random() * 3)] as "A" | "B" | "C",
        scores: {
          marketFit: Math.floor(Math.random() * 30) + 60,
          trendAlignment: Math.floor(Math.random() * 30) + 60,
          targetReach: Math.floor(Math.random() * 30) + 60,
          competitiveAdvantage: Math.floor(Math.random() * 30) + 60
        },
        strengths: [
          "市場トレンドとの適合性が高い",
          "ターゲット層のニーズに合致",
          "差別化ポイントが明確"
        ],
        weaknesses: [
          "競合との差別化をさらに強化する必要あり"
        ],
        recommendations: [
          "SNSマーケティングを強化",
          "インフルエンサー施策を検討"
        ]
      }
      
      setAnalyzedConcepts([newConcept, ...analyzedConcepts])
      setSelectedConcept(newConcept)
      setConceptName("")
      setConceptDescription("")
      setIsAnalyzing(false)
    }, 2000)
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S": return "bg-amber-100 text-amber-700 border-amber-300"
      case "A": return "bg-emerald-100 text-emerald-700 border-emerald-300"
      case "B": return "bg-blue-100 text-blue-700 border-blue-300"
      case "C": return "bg-orange-100 text-orange-700 border-orange-300"
      case "D": return "bg-red-100 text-red-700 border-red-300"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const radarData = selectedConcept ? [
    { metric: "市場適合性", value: selectedConcept.scores.marketFit },
    { metric: "トレンド整合性", value: selectedConcept.scores.trendAlignment },
    { metric: "ターゲット到達性", value: selectedConcept.scores.targetReach },
    { metric: "競争優位性", value: selectedConcept.scores.competitiveAdvantage },
  ] : []

  const comparisonData = analyzedConcepts.slice(0, 5).map(c => ({
    name: c.name.length > 10 ? c.name.substring(0, 10) + "..." : c.name,
    score: c.overallScore,
    rank: c.rank
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Popularity Score</h1>
          <p className="text-muted-foreground mt-1">
            商品コンセプトの市場成功可能性をAIがスコアリング
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                コンセプト入力
              </CardTitle>
              <CardDescription>
                分析したい商品コンセプトを入力してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">商品名・コンセプト名</label>
                <Input 
                  placeholder="例: 高濃度ビタミンC美容液"
                  value={conceptName}
                  onChange={(e) => setConceptName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">コンセプト説明</label>
                <Textarea 
                  placeholder="例: 敏感肌にも使える低刺激処方の高濃度ビタミンC誘導体配合美容液。朝晩のスキンケアに使用し、シミ・くすみケアを実現..."
                  className="min-h-[120px]"
                  value={conceptDescription}
                  onChange={(e) => setConceptDescription(e.target.value)}
                />
              </div>
              <Button 
                className="w-full gap-2" 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !conceptName || !conceptDescription}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    スコア分析を実行
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analyzed Concepts List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">分析済みコンセプト</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {analyzedConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConcept(concept)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConcept?.id === concept.id ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{concept.name}</p>
                        <p className="text-xs text-muted-foreground">スコア: {concept.overallScore}</p>
                      </div>
                      <Badge className={`${getRankColor(concept.rank)} border`}>
                        {concept.rank}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          {selectedConcept ? (
            <>
              {/* Overall Score Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${getRankColor(selectedConcept.rank)}`}>
                        {selectedConcept.rank}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">総合ランク</p>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">{selectedConcept.name}</h2>
                      <p className="text-muted-foreground text-sm mb-4">{selectedConcept.description}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">総合スコア</p>
                          <p className="text-2xl font-bold text-primary">{selectedConcept.overallScore}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
                        </div>
                        <Progress value={selectedConcept.overallScore} className="flex-1 h-3" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">詳細スコア</TabsTrigger>
                  <TabsTrigger value="analysis">分析結果</TabsTrigger>
                  <TabsTrigger value="comparison">比較</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Radar Chart */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">4軸スコア分析</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar
                              name="スコア"
                              dataKey="value"
                              stroke="#4f46e5"
                              fill="#4f46e5"
                              fillOpacity={0.3}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Score Breakdown */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">スコア内訳</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { key: "marketFit", label: "市場適合性", icon: Target, description: "市場規模・成長性との整合性" },
                          { key: "trendAlignment", label: "トレンド整合性", icon: TrendingUp, description: "現在のトレンドとの合致度" },
                          { key: "targetReach", label: "ターゲット到達性", icon: Users, description: "ターゲット層へのリーチ可能性" },
                          { key: "competitiveAdvantage", label: "競争優位性", icon: Zap, description: "競合との差別化ポテンシャル" },
                        ].map(({ key, label, icon: Icon, description }) => {
                          const score = selectedConcept.scores[key as keyof typeof selectedConcept.scores]
                          return (
                            <div key={key}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">{label}</span>
                                </div>
                                <span className="text-sm font-bold">{score}</span>
                              </div>
                              <Progress value={score} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">{description}</p>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-emerald-600">
                          <CheckCircle className="h-5 w-5" />
                          強み
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedConcept.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Weaknesses */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-amber-600">
                          <AlertTriangle className="h-5 w-5" />
                          課題・リスク
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedConcept.weaknesses.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2 text-primary">
                        <Lightbulb className="h-5 w-5" />
                        AIレコメンデーション
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedConcept.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm p-2 bg-primary/5 rounded-lg">
                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                              {i + 1}
                            </span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comparison">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">コンセプト比較</CardTitle>
                      <CardDescription>分析済みコンセプトのスコア比較</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={comparisonData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#4f46e5">
                            {comparisonData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.rank === "S" ? "#f59e0b" : entry.rank === "A" ? "#10b981" : entry.rank === "B" ? "#3b82f6" : "#f97316"} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">コンセプトを入力して分析を開始してください</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
