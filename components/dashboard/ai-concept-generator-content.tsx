"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, Sparkles, Copy, RefreshCw, ChevronRight, Users, FlaskConical, Tag } from "lucide-react"

const generatedConcepts = [
  {
    id: 1,
    name: "ナイトリペア バクチオールセラム",
    tagline: "眠っている間に、肌が変わる",
    description: "バクチオール×エクトインの相乗効果で、敏感肌でも使えるレチノール代替美容液。睡眠中の肌再生メカニズムにアプローチ。",
    target: "30-40代 敏感肌の女性",
    category: "スキンケア",
    ingredients: ["バクチオール", "エクトイン", "ナイアシンアミド"],
    marketScore: 91,
    namingOptions: ["スリープリペア エッセンス", "ナイトバイオ セラム", "バクチ コンセントレート"],
    tags: ["エイジングケア", "敏感肌対応", "ナチュラル"],
  },
  {
    id: 2,
    name: "インナーグロウ グルタチオンドリンク",
    tagline: "飲む透明感、毎日の習慣に",
    description: "グルタチオン×ビタミンC誘導体の相乗効果を最大化した美白ドリンク。腸からのインナーケアで、外用美容の効果を倍増。",
    target: "20-40代 美白・透明感重視の女性",
    category: "美容飲料",
    ingredients: ["グルタチオン", "ビタミンC誘導体", "コラーゲンペプチド"],
    marketScore: 87,
    namingOptions: ["クリアグロウ ドリンク", "ホワイトインナー", "グルタセラ ビューティー"],
    tags: ["美白", "インナーケア", "機能性飲料"],
  },
  {
    id: 3,
    name: "リカバリーアスリート スキンジェル",
    tagline: "運動後の肌疲れを、即リセット",
    description: "スポーツ後の酸化ストレス・炎症に着目したスキンケアジェル。CICA×抗酸化成分でアクティブ女性の隠れニーズに対応。",
    target: "20-30代 アクティブ女性",
    category: "スキンケア",
    ingredients: ["CICA", "CoQ10", "グリーンティーエキス"],
    marketScore: 83,
    namingOptions: ["アクティブリカバー ジェル", "スポーツスキン", "ランナーズグロウ"],
    tags: ["スポーツ美容", "リカバリー", "未充足ニーズ"],
  },
]

export function ConceptGeneratorContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null)
  const [prompt, setPrompt] = useState("")
  const [category, setCategory] = useState("")
  const [target, setTarget] = useState("")

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2500)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Input Panel */}
      <Card className="rounded-xl border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Lightbulb className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">AIコンセプト生成</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">トレンド×素材×ターゲットから商品コンセプトを自動生成します</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">カテゴリ</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skincare">スキンケア</SelectItem>
                  <SelectItem value="supplement">サプリメント</SelectItem>
                  <SelectItem value="beverage">機能性飲料</SelectItem>
                  <SelectItem value="food">機能性食品</SelectItem>
                  <SelectItem value="haircare">ヘアケア</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">ターゲット</label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="ターゲット層を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20f">20代女性</SelectItem>
                  <SelectItem value="30f">30代女性</SelectItem>
                  <SelectItem value="40f">40-50代女性</SelectItem>
                  <SelectItem value="20m">20-30代男性</SelectItem>
                  <SelectItem value="active">アクティブ女性</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">追加の要件・コンセプト方向性（任意）</label>
            <Textarea
              placeholder="例：敏感肌でも使えるエイジングケア。ナチュラル成分にこだわり、睡眠中の肌再生にアプローチしたい..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none text-sm"
              rows={3}
            />
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2">
            <Sparkles className={`h-4 w-4 ${isGenerating ? "animate-pulse" : ""}`} />
            {isGenerating ? "AIがコンセプトを生成中..." : "コンセプトを生成する"}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Concepts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">生成されたコンセプト</h3>
          <Badge variant="secondary" className="text-xs">{generatedConcepts.length}件</Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {generatedConcepts.map((concept) => (
            <Card
              key={concept.id}
              className={`rounded-xl cursor-pointer transition-all ${
                selectedConcept === concept.id ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40"
              }`}
              onClick={() => setSelectedConcept(selectedConcept === concept.id ? null : concept.id)}
            >
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold leading-snug">{concept.name}</p>
                    <p className="text-xs text-primary italic mt-0.5">{concept.tagline}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">市場スコア</p>
                    <p className="text-xl font-bold text-primary">{concept.marketScore}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{concept.description}</p>

                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">{concept.target}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {concept.ingredients.map((ing) => (
                    <span key={ing} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary font-medium">
                      <FlaskConical className="h-2.5 w-2.5" />
                      {ing}
                    </span>
                  ))}
                </div>

                {selectedConcept === concept.id && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-xs font-semibold flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        ネーミング候補
                      </p>
                      {concept.namingOptions.map((name, i) => (
                        <div key={i} className="flex items-center justify-between py-1 px-2 rounded-lg bg-muted/50">
                          <span className="text-xs">{name}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {concept.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <Button size="sm" className="w-full gap-2 text-xs">
                      このコンセプトで詳細設計 <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
