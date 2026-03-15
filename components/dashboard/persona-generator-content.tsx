"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Sparkles, 
  Users, 
  Target, 
  TrendingUp, 
  Package,
  BarChart3,
  ArrowRight,
  Star,
  Lightbulb,
  Zap,
  ChevronRight
} from "lucide-react"

// Mock persona data
const mockPersonas = [
  {
    id: 1,
    name: "腸活したいのに何すれば迷子な人",
    approach: "product",
    tier: "S",
    score: 23,
    features: "健康意識は高いが情報過多で行動に移せない。手軽さと効果実感を重視。",
    evidence: "腸活、発酵食品、プロバイオティクス",
    scores: { urgency: 5, fit: 5, habit: 4, reach: 5, switch: 4 }
  },
  {
    id: 2,
    name: "甘い炭酸を我慢してる罪悪感リセット民",
    approach: "product",
    tier: "S",
    score: 22,
    features: "炭酸飲料が好きだが健康面で罪悪感。罪悪感なく楽しめる代替品を探している。",
    evidence: "炭酸飲料、ゼロカロリー、罪悪感フリー",
    scores: { urgency: 5, fit: 4, habit: 5, reach: 4, switch: 4 }
  },
  {
    id: 3,
    name: "推し活でなんとか心を保っている層",
    approach: "market",
    tier: "A",
    score: 20,
    features: "推し活がメンタルの支え。推し活に関連した消費意欲が高い。",
    evidence: "推し活、メンタルヘルス、セルフケア",
    scores: { urgency: 4, fit: 4, habit: 4, reach: 4, switch: 4 }
  },
  {
    id: 4,
    name: "がんばるセルフケアで逆に疲れる層",
    approach: "market",
    tier: "A",
    score: 21,
    features: "健康・美容への意識が高すぎて疲弊。シンプルで続けやすいものを求める。",
    evidence: "セルフケア疲れ、ミニマルスキンケア、時短",
    scores: { urgency: 5, fit: 4, habit: 4, reach: 4, switch: 4 }
  },
  {
    id: 5,
    name: "朝のルーティン最適化オタク",
    approach: "product",
    tier: "B",
    score: 18,
    features: "朝の時間を最大限有効活用したい。効率的なルーティンを常に模索。",
    evidence: "モーニングルーティン、朝活、生産性",
    scores: { urgency: 4, fit: 4, habit: 3, reach: 4, switch: 3 }
  },
  {
    id: 6,
    name: "サウナ後の整い追求派",
    approach: "market",
    tier: "B",
    score: 19,
    features: "サウナでの整い体験を最大化したい。サウナ後の水分・栄養補給にこだわる。",
    evidence: "サウナ、整う、リカバリー",
    scores: { urgency: 4, fit: 4, habit: 4, reach: 3, switch: 4 }
  },
]

const tierColors: Record<string, string> = {
  S: "bg-violet-500 text-white",
  A: "bg-violet-400 text-white",
  B: "bg-violet-300 text-violet-900",
  C: "bg-gray-300 text-gray-700",
  D: "bg-gray-200 text-gray-600",
}

const tierDescriptions: Record<string, string> = {
  S: "最優先ターゲット",
  A: "有力ターゲット",
  B: "拡張ターゲット",
  C: "条件付きターゲット",
  D: "長期育成ターゲット",
}

export function PersonaGeneratorContent() {
  const [productConcept, setProductConcept] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [personas, setPersonas] = useState<typeof mockPersonas>([])
  const [selectedPersona, setSelectedPersona] = useState<typeof mockPersonas[0] | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setPersonas(mockPersonas)
      setIsGenerating(false)
    }, 2000)
  }

  const productApproachPersonas = personas.filter(p => p.approach === "product")
  const marketApproachPersonas = personas.filter(p => p.approach === "market")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Target Persona Generation</h1>
        <p className="text-muted-foreground mt-1">
          商品コンセプトからAIがターゲットペルソナを自動生成・評価します
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            商品コンセプト入力
          </CardTitle>
          <CardDescription>
            商品の特徴・提供価値・成分などを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">商品名・コンセプト</label>
            <Input 
              placeholder="例: 腸活炭酸飲料、敏感肌美容液"
              value={productConcept}
              onChange={(e) => setProductConcept(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">商品詳細（任意）</label>
            <Textarea 
              placeholder="商品の特徴、ターゲット層、主要成分、提供価値などを記述..."
              rows={4}
            />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleGenerate}
            disabled={isGenerating || !productConcept}
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                ペルソナ生成中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                ペルソナを生成する
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generation Approach Explanation */}
      {personas.length === 0 && !isGenerating && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                商品寄せ型（プロダクトアウト）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                商品の特徴・提供価値・成分に合致するトレンドトピックを特定し、
                そこに該当するペルソナ像を生成。商品との適合性が高い「確度の高い」ターゲットが得られます。
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                市場寄せ型（マーケットイン）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                市場トレンドが強いトピック・キーワードから発想するペルソナ像を生成。
                商品起点では思いつかない「意外な」ターゲットを発見できます。
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Sparkles className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <p className="font-medium">AIがペルソナを生成中...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  トレンドデータ × 消費者インサイトを分析しています
                </p>
              </div>
              <Progress value={66} className="w-64" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {personas.length > 0 && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["S", "A", "B", "C", "D"].map((tier) => {
              const count = personas.filter(p => p.tier === tier).length
              return (
                <Card key={tier} className={count > 0 ? "" : "opacity-50"}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <Badge className={tierColors[tier]}>{tier}</Badge>
                      <span className="text-2xl font-bold">{count}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {tierDescriptions[tier]}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Tabs for Approaches */}
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                すべて ({personas.length})
              </TabsTrigger>
              <TabsTrigger value="product">
                <Target className="h-4 w-4 mr-1" />
                商品寄せ型 ({productApproachPersonas.length})
              </TabsTrigger>
              <TabsTrigger value="market">
                <TrendingUp className="h-4 w-4 mr-1" />
                市場寄せ型 ({marketApproachPersonas.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {personas.map((persona) => (
                  <PersonaCard 
                    key={persona.id} 
                    persona={persona} 
                    onSelect={() => setSelectedPersona(persona)}
                    isSelected={selectedPersona?.id === persona.id}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="product" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {productApproachPersonas.map((persona) => (
                  <PersonaCard 
                    key={persona.id} 
                    persona={persona}
                    onSelect={() => setSelectedPersona(persona)}
                    isSelected={selectedPersona?.id === persona.id}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="market" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {marketApproachPersonas.map((persona) => (
                  <PersonaCard 
                    key={persona.id} 
                    persona={persona}
                    onSelect={() => setSelectedPersona(persona)}
                    isSelected={selectedPersona?.id === persona.id}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Selected Persona Detail */}
          {selectedPersona && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    ペルソナ詳細分析
                  </CardTitle>
                  <Badge className={tierColors[selectedPersona.tier]}>
                    Tier {selectedPersona.tier} ({selectedPersona.score}点)
                  </Badge>
                </div>
                <CardDescription>{selectedPersona.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Scoring Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      5軸スコア内訳
                    </h4>
                    <div className="space-y-3">
                      {[
                        { key: "urgency", label: "切実度", desc: "痛みの強さ・頻度" },
                        { key: "fit", label: "商品適合", desc: "商品特性とのハマり" },
                        { key: "habit", label: "継続化", desc: "習慣化できる構造" },
                        { key: "reach", label: "獲得容易性", desc: "到達しやすさ×接点" },
                        { key: "switch", label: "置換容易性", desc: "現状からの乗り換え" },
                      ].map((axis) => (
                        <div key={axis.key} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{axis.label}</span>
                            <span className="font-medium">
                              {selectedPersona.scores[axis.key as keyof typeof selectedPersona.scores]}/5
                            </span>
                          </div>
                          <Progress 
                            value={selectedPersona.scores[axis.key as keyof typeof selectedPersona.scores] * 20} 
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground">{axis.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      次のアクション
                    </h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          コンセプト案を生成
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          AI Surveyで検証
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          3段階戦略に追加
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

function PersonaCard({ 
  persona, 
  onSelect,
  isSelected 
}: { 
  persona: typeof mockPersonas[0]
  onSelect: () => void
  isSelected: boolean
}) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={tierColors[persona.tier]}>
              {persona.tier}
            </Badge>
            <Badge variant="outline">
              {persona.approach === "product" ? (
                <><Target className="h-3 w-3 mr-1" />商品寄せ</>
              ) : (
                <><TrendingUp className="h-3 w-3 mr-1" />市場寄せ</>
              )}
            </Badge>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {persona.score}/25点
          </span>
        </div>
        <h3 className="font-semibold text-foreground mb-2">
          {persona.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {persona.features}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lightbulb className="h-3 w-3" />
          <span>根拠: {persona.evidence}</span>
        </div>
      </CardContent>
    </Card>
  )
}
