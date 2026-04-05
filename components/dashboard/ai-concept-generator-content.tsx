"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Target,
  Lightbulb,
  Plane,
  Utensils,
  Smartphone,
  Globe,
  CreditCard,
  Hotel,
  Music,
  ShieldCheck,
  RefreshCw,
  Check,
  ChevronRight,
  TrendingUp,
  Gem,
} from "lucide-react"

// 特典カテゴリ
const benefitCategories = [
  { id: "travel", name: "トラベル", icon: Plane },
  { id: "dining", name: "ダイニング", icon: Utensils },
  { id: "digital", name: "デジタル", icon: Smartphone },
  { id: "global", name: "グローバル", icon: Globe },
  { id: "hotel", name: "ホテル", icon: Hotel },
  { id: "entertainment", name: "エンタメ", icon: Music },
  { id: "insurance", name: "保険・補償", icon: ShieldCheck },
  { id: "luxury", name: "ラグジュアリー", icon: Gem },
]

// ターゲットペルソナ
const targetPersonas = [
  { id: "1", name: "田中 誠一", age: 48, segment: "エグゼクティブ層", initials: "TS" },
  { id: "2", name: "山田 奈緒", age: 36, segment: "富裕層女性", initials: "YN" },
  { id: "3", name: "佐藤 健二", age: 55, segment: "経営者層", initials: "SK" },
  { id: "4", name: "鈴木 彩", age: 29, segment: "アッパーミドル", initials: "SA" },
]

// 生成されたカードコンセプト例
const generatedConcept = {
  name: "AMEX エグゼクティブ プレミア カード",
  tagline: "ビジネスとプライベートの境界を超えた、究極のラグジュアリー体験",
  targetSegment: "エグゼクティブ層・富裕層",
  annualFee: "¥165,000",
  keyBenefits: [
    { icon: Plane, label: "無制限国内外空港ラウンジ利用", score: 96 },
    { icon: Hotel, label: "ファイブスターホテル年12泊無料", score: 91 },
    { icon: Utensils, label: "ミシュラン掲載店専用テーブル確保", score: 88 },
    { icon: ShieldCheck, label: "海外旅行保険最高1億円補償", score: 85 },
    { icon: Gem, label: "専属コンシェルジュ24時間対応", score: 94 },
  ],
  targetScore: 89,
  differentiationScore: 82,
  ltv: "2,840万円",
}

export function AIConceptGeneratorContent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["travel", "dining", "luxury"])
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(["1", "2"])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const togglePersona = (id: string) => {
    setSelectedPersonas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const runGeneration = () => {
    setIsGenerating(true)
    setIsGenerated(false)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2200)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          カード特典コンセプトジェネレーター
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          ターゲット会員×特典カテゴリからAIがプレミアムカードコンセプトを自動生成
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 特典カテゴリ選択 */}
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4 text-primary" />
              強化する特典カテゴリ
            </CardTitle>
            <p className="text-xs text-muted-foreground">複数選択可。選んだカテゴリに基づいてコンセプトを生成</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {benefitCategories.map((cat) => {
                const selected = selectedCategories.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/30 text-foreground border-border hover:border-primary/50 hover:bg-muted/60"
                    }`}
                  >
                    <cat.icon className="h-4 w-4 shrink-0" />
                    <span className="text-xs">{cat.name}</span>
                    {selected && <Check className="h-3.5 w-3.5 ml-auto shrink-0" />}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* ターゲットペルソナ選択 */}
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-primary" />
              ターゲット会員セグメント
            </CardTitle>
            <p className="text-xs text-muted-foreground">コンセプトを届けたいペルソナを選択</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {targetPersonas.map((persona) => {
                const selected = selectedPersonas.includes(persona.id)
                return (
                  <button
                    key={persona.id}
                    onClick={() => togglePersona(persona.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selected
                        ? "bg-primary/8 border-primary text-foreground"
                        : "bg-muted/30 border-border hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <Avatar className={`h-9 w-9 shrink-0 ${selected ? "ring-2 ring-primary" : ""}`}>
                      <AvatarFallback className={`text-xs font-bold ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {persona.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{persona.name}</p>
                      <p className="text-xs text-muted-foreground">{persona.age}歳 · {persona.segment}</p>
                    </div>
                    {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 生成ボタン */}
      <div className="flex justify-center">
        <Button
          size="lg"
          className="gap-3 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          onClick={runGeneration}
          disabled={isGenerating || selectedCategories.length === 0 || selectedPersonas.length === 0}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              AIがコンセプト生成中...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              カードコンセプトを生成
            </>
          )}
        </Button>
      </div>

      {/* 生成結果 */}
      {isGenerated && (
        <Card className="rounded-xl border-primary/40 bg-primary/3">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-primary/15 text-primary border-0 mb-2">AI生成コンセプト</Badge>
                <CardTitle className="text-xl text-foreground">{generatedConcept.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 italic">{generatedConcept.tagline}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs text-muted-foreground">年会費</p>
                <p className="text-2xl font-bold text-foreground">{generatedConcept.annualFee}</p>
                <p className="text-xs text-muted-foreground mt-0.5">想定LTV: {generatedConcept.ltv}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">主要ベネフィット</p>
              <div className="space-y-3">
                {generatedConcept.keyBenefits.map((benefit) => (
                  <div key={benefit.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground font-medium">{benefit.label}</span>
                        <span className="text-xs font-bold text-primary ml-2 shrink-0">{benefit.score}</span>
                      </div>
                      <Progress value={benefit.score} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1 p-3 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">ターゲット適合度</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{generatedConcept.targetScore}<span className="text-sm text-muted-foreground">/100</span></p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-muted-foreground">差別化スコア</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{generatedConcept.differentiationScore}<span className="text-sm text-muted-foreground">/100</span></p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1 gap-2">
                <Lightbulb className="h-4 w-4" />
                詳細プランを作成
              </Button>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                再生成
              </Button>
              <Button variant="outline" className="gap-2">
                <ChevronRight className="h-4 w-4" />
                保存
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
