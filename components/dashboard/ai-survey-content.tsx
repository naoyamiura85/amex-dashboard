"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  MessageSquare, 
  BarChart3,
  Loader2,
  Play,
  CheckCircle,
  FileText,
  Download,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Clock
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

interface SurveyResult {
  id: string
  question: string
  type: "single" | "multiple" | "scale" | "open"
  responses: { label: string; value: number; percentage: number }[]
  insights: string[]
}

interface PersonaResponse {
  personaId: string
  personaName: string
  age: string
  occupation: string
  avatar: string
  response: string
  sentiment: "positive" | "neutral" | "negative"
  keyPoints: string[]
}

const sampleResults: SurveyResult[] = [
  {
    id: "q1",
    question: "この商品コンセプトに興味がありますか？",
    type: "single",
    responses: [
      { label: "非常に興味がある", value: 145, percentage: 29 },
      { label: "やや興味がある", value: 210, percentage: 42 },
      { label: "どちらとも言えない", value: 85, percentage: 17 },
      { label: "あまり興味がない", value: 45, percentage: 9 },
      { label: "全く興味がない", value: 15, percentage: 3 },
    ],
    insights: [
      "71%が興味ありと回答 - 市場ポテンシャルは高い",
      "20-30代女性の興味度が特に高い（82%）"
    ]
  },
  {
    id: "q2",
    question: "この商品を購入する場合、許容できる価格帯は？",
    type: "single",
    responses: [
      { label: "1,000円未満", value: 50, percentage: 10 },
      { label: "1,000-2,000円", value: 180, percentage: 36 },
      { label: "2,000-3,000円", value: 165, percentage: 33 },
      { label: "3,000-5,000円", value: 80, percentage: 16 },
      { label: "5,000円以上", value: 25, percentage: 5 },
    ],
    insights: [
      "最頻価格帯は1,000-2,000円（36%）",
      "69%が3,000円以下を希望 - 価格設定の目安に"
    ]
  }
]

const samplePersonaResponses: PersonaResponse[] = [
  {
    personaId: "p1",
    personaName: "健康志向OL 美咲",
    age: "28歳",
    occupation: "IT企業勤務",
    avatar: "M",
    response: "毎日の通勤で疲れているので、手軽に栄養補給できる商品は魅力的です。ただ、人工甘味料が入っていないか気になります。オフィスでも飲みやすいパッケージだと嬉しいです。",
    sentiment: "positive",
    keyPoints: ["手軽さを重視", "成分への関心高い", "パッケージデザイン重要"]
  },
  {
    personaId: "p2",
    personaName: "筋トレ男子 翔太",
    age: "25歳",
    occupation: "営業職",
    avatar: "S",
    response: "タンパク質含有量が気になります。トレーニング後に飲むなら、最低でも20g以上は欲しいですね。味のバリエーションも重要。プレーンだけだと飽きちゃうので。",
    sentiment: "neutral",
    keyPoints: ["タンパク質量重視", "味のバリエーション要望", "トレーニング後の利用想定"]
  },
  {
    personaId: "p3",
    personaName: "子育てママ 由美",
    age: "35歳",
    occupation: "専業主婦",
    avatar: "Y",
    response: "子供と一緒に食べられるかどうかが重要です。アレルギー表示がしっかりしていれば安心。価格は少し高くても、家族の健康のためなら検討します。",
    sentiment: "positive",
    keyPoints: ["家族での利用想定", "アレルギー表示重視", "価格よりも安全性"]
  }
]

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

export function AISurveyContent() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [surveyComplete, setSurveyComplete] = useState(false)
  const [conceptName, setConceptName] = useState("")
  const [conceptDescription, setConceptDescription] = useState("")
  const [targetPersona, setTargetPersona] = useState("")
  const [sampleSize, setSampleSize] = useState("500")

  const runSurvey = () => {
    if (!conceptName || !conceptDescription) return
    
    setIsRunning(true)
    setProgress(0)
    setSurveyComplete(false)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          setSurveyComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Survey Agency</h1>
          <p className="text-muted-foreground mt-1">
            AIペルソナによる商品コンセプト調査をシミュレーション
          </p>
        </div>
      </div>

      {!surveyComplete ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Survey Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                調査設定
              </CardTitle>
              <CardDescription>調査対象の商品コンセプトを入力</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">商品・コンセプト名</label>
                <Input 
                  placeholder="例: 腸活プロテインドリンク"
                  value={conceptName}
                  onChange={(e) => setConceptName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">コンセプト説明</label>
                <Textarea 
                  placeholder="調査対象のコンセプトを詳しく説明してください..."
                  className="min-h-[100px]"
                  value={conceptDescription}
                  onChange={(e) => setConceptDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">ターゲットペルソナ</label>
                <Select value={targetPersona} onValueChange={setTargetPersona}>
                  <SelectTrigger>
                    <SelectValue placeholder="ペルソナを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health-conscious">健康意識層</SelectItem>
                    <SelectItem value="millennials">アクティブミレニアル</SelectItem>
                    <SelectItem value="biohacker">バイオハッカー</SelectItem>
                    <SelectItem value="all">全セグメント</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">サンプルサイズ</label>
                <Select value={sampleSize} onValueChange={setSampleSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100名</SelectItem>
                    <SelectItem value="300">300名</SelectItem>
                    <SelectItem value="500">500名</SelectItem>
                    <SelectItem value="1000">1,000名</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full gap-2" 
                onClick={runSurvey}
                disabled={isRunning || !conceptName || !conceptDescription}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    調査実行中...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    AI調査を開始
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Progress or Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                調査プロセス
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isRunning ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <p className="font-medium">AIペルソナ調査を実行中...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sampleSize}名のAIペルソナがコンセプトを評価しています
                    </p>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center gap-2 ${progress >= 20 ? "text-foreground" : "text-muted-foreground"}`}>
                      {progress >= 20 ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4" />}
                      ペルソナプロファイル生成
                    </div>
                    <div className={`flex items-center gap-2 ${progress >= 40 ? "text-foreground" : "text-muted-foreground"}`}>
                      {progress >= 40 ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4" />}
                      コンセプト理解・評価
                    </div>
                    <div className={`flex items-center gap-2 ${progress >= 60 ? "text-foreground" : "text-muted-foreground"}`}>
                      {progress >= 60 ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4" />}
                      購買意向調査
                    </div>
                    <div className={`flex items-center gap-2 ${progress >= 80 ? "text-foreground" : "text-muted-foreground"}`}>
                      {progress >= 80 ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4" />}
                      フリーコメント生成
                    </div>
                    <div className={`flex items-center gap-2 ${progress >= 100 ? "text-foreground" : "text-muted-foreground"}`}>
                      {progress >= 100 ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4" />}
                      結果集計・インサイト抽出
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    AI Survey Agencyは、AIペルソナを使用して商品コンセプトの市場調査をシミュレーションします。
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
                      <div>
                        <p className="font-medium text-sm">ペルソナ生成</p>
                        <p className="text-xs text-muted-foreground">ターゲット層に基づくAIペルソナを生成</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</div>
                      <div>
                        <p className="font-medium text-sm">調査実施</p>
                        <p className="text-xs text-muted-foreground">各ペルソナがコンセプトを評価</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</div>
                      <div>
                        <p className="font-medium text-sm">インサイト抽出</p>
                        <p className="text-xs text-muted-foreground">結果を分析し実用的な洞察を提供</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        // Survey Results
        <div className="space-y-6">
          {/* Summary */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-900">調査完了</h3>
                  <p className="text-sm text-emerald-700">{sampleSize}名のAIペルソナによる調査が完了しました</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  レポートをダウンロード
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="quantitative" className="space-y-4">
            <TabsList>
              <TabsTrigger value="quantitative" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                定量結果
              </TabsTrigger>
              <TabsTrigger value="qualitative" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                定性コメント
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AIインサイト
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quantitative" className="space-y-6">
              {sampleResults.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{result.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={result.responses}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="label"
                          >
                            {result.responses.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2">
                        {result.responses.map((response, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="text-sm flex-1">{response.label}</span>
                            <span className="text-sm font-medium">{response.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-2">AIインサイト</p>
                      <ul className="text-sm space-y-1">
                        {result.insights.map((insight, i) => (
                          <li key={i}>• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="qualitative" className="space-y-4">
              {samplePersonaResponses.map((persona) => (
                <Card key={persona.personaId}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {persona.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{persona.personaName}</span>
                          <Badge variant="outline">{persona.age} / {persona.occupation}</Badge>
                          {persona.sentiment === "positive" ? (
                            <ThumbsUp className="h-4 w-4 text-emerald-600" />
                          ) : persona.sentiment === "negative" ? (
                            <ThumbsDown className="h-4 w-4 text-red-600" />
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{persona.response}</p>
                        <div className="flex flex-wrap gap-2">
                          {persona.keyPoints.map((point, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{point}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="insights">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AIサマリーインサイト
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-800 mb-2">ポジティブシグナル</h4>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• 71%が商品コンセプトに興味を示している</li>
                      <li>• 手軽さ・利便性への評価が高い</li>
                      <li>• 20-30代女性の反応が特に良好</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">改善ポイント</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• 成分表示の明確化（人工甘味料への懸念）</li>
                      <li>• 価格帯は2,000円以下が望ましい</li>
                      <li>• 味のバリエーション展開を検討</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">推奨アクション</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• ナチュラル訴求を強化したコミュニケーション設計</li>
                      <li>• SNSでの口コミ創出施策の実施</li>
                      <li>• 初回購入ハードルを下げるお試しサイズの展開</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button variant="outline" onClick={() => setSurveyComplete(false)} className="gap-2">
            新しい調査を開始
          </Button>
        </div>
      )}
    </div>
  )
}
