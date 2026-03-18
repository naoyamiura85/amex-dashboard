"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Image,
  Instagram,
  Twitter,
  Youtube,
  Utensils,
  Loader2,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Download,
  ChefHat
} from "lucide-react"

interface GeneratedContent {
  id: string
  type: "sns" | "recipe" | "concept"
  platform?: string
  title: string
  content: string
  hashtags?: string[]
  imagePrompt?: string
}

const contentTypes = [
  { id: "instagram", label: "Instagram投稿", icon: Instagram, color: "bg-pink-100 text-pink-700" },
  { id: "twitter", label: "Twitter/X投稿", icon: Twitter, color: "bg-blue-100 text-blue-700" },
  { id: "youtube", label: "YouTube概要", icon: Youtube, color: "bg-red-100 text-red-700" },
  { id: "recipe", label: "レシピ", icon: ChefHat, color: "bg-amber-100 text-amber-700" },
  { id: "concept", label: "コンセプトシート", icon: FileText, color: "bg-emerald-100 text-emerald-700" },
]

export function ContentAgencyContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [selectedType, setSelectedType] = useState("instagram")
  const [tone, setTone] = useState("casual")
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const generateContent = () => {
    if (!productName || !productDescription) return
    
    setIsGenerating(true)
    
    setTimeout(() => {
      const newContent: GeneratedContent[] = []
      
      if (selectedType === "instagram") {
        newContent.push({
          id: `ig-${Date.now()}`,
          type: "sns",
          platform: "Instagram",
          title: "Instagram投稿",
          content: `✨ 毎日の健康習慣に${productName}を取り入れてみませんか？

忙しい朝でも、たった30秒で栄養チャージ完了！

🌿 ${productDescription.slice(0, 50)}...

「最近、朝起きるのがラクになった」
「肌の調子が良くなった気がする」

そんな嬉しいお声をたくさんいただいています。

まずは1週間、試してみてください。
きっと違いを実感できるはず💫

プロフィールのリンクからチェック！`,
          hashtags: ["健康習慣", "朝活", "セルフケア", "ナチュラルライフ", "腸活", "美容"],
          imagePrompt: `${productName}の商品写真、ナチュラルな朝のシーン、明るい日差し、ミニマルなテーブルセッティング`
        })
      } else if (selectedType === "twitter") {
        newContent.push({
          id: `tw-${Date.now()}`,
          type: "sns",
          platform: "Twitter/X",
          title: "Twitter/X投稿",
          content: `【新習慣】${productName}始めました

正直、最初は半信半疑だったけど...

2週間続けてみた結果:
✅ 朝スッキリ起きられる
✅ 午後の眠気が減った
✅ なんか肌の調子も良い？

${productDescription.slice(0, 30)}...

気になる人はプロフィールのリンクから👀`,
          hashtags: ["PR", "健康習慣", productName.replace(/\s/g, "")]
        })
      } else if (selectedType === "recipe") {
        newContent.push({
          id: `recipe-${Date.now()}`,
          type: "recipe",
          title: `${productName}を使ったアレンジレシピ`,
          content: `【${productName}スムージーボウル】

■ 材料（1人分）
・${productName} ... 1食分
・冷凍バナナ ... 1本
・冷凍ベリーミックス ... 50g
・豆乳 ... 100ml
・グラノーラ ... 適量
・フレッシュフルーツ ... お好みで

■ 作り方
1. ブレンダーに${productName}、冷凍バナナ、ベリー、豆乳を入れる
2. なめらかになるまでブレンド
3. ボウルに注ぎ、グラノーラとフルーツをトッピング

■ ポイント
・冷凍フルーツを使うことで、氷なしでも冷たく濃厚な仕上がりに
・はちみつを加えると甘みがアップ
・プロテインパウダーを追加すればさらに栄養価UP

調理時間: 約5分
カロリー: 約280kcal`,
          imagePrompt: `美しいスムージーボウル、フレッシュフルーツのトッピング、ナチュラルな木のテーブル、朝の光`
        })
      } else if (selectedType === "concept") {
        newContent.push({
          id: `concept-${Date.now()}`,
          type: "concept",
          title: "コンセプトシート",
          content: `【商品コンセプトシート】

■ 商品名
${productName}

■ コンセプト
${productDescription}

■ ターゲット
・メインターゲット: 25-35歳の健康意識の高い女性
・サブターゲット: 30-45歳の忙しいビジネスパーソン

■ ベネフィット
【機能的価値】
・1日に必要な栄養素を手軽に摂取
・時短で健康管理が可能
・持ち運びに便利

【情緒的価値】
・健康的な自分への自信
・セルフケアしている充実感
・ライフスタイルの向上感

■ 競合優位性
・独自の配合バランス
・天然由来成分へのこだわり
・継続しやすい価格設定

■ キーメッセージ
「毎日の30秒が、あなたの1日を変える」

■ トーン&マナー
・ナチュラル、誠実、親しみやすい
・過度な効果訴求は避け、リアルな体験を重視`
        })
      }
      
      setGeneratedContents([...newContent, ...generatedContents])
      setIsGenerating(false)
    }, 2000)
  }

  const copyContent = (content: GeneratedContent) => {
    navigator.clipboard.writeText(content.content)
    setCopiedId(content.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const regenerate = (content: GeneratedContent) => {
    // In real implementation, this would call API to regenerate
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Content Agency</h1>
          <p className="text-muted-foreground mt-1">
            SNS投稿、レシピ、コンセプトシートをAIが自動生成
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              コンテンツ生成
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">商品名</label>
              <Input 
                placeholder="例: グリーンプロテイン"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">商品説明</label>
              <Textarea 
                placeholder="商品の特徴やベネフィットを入力..."
                className="min-h-[80px]"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">コンテンツタイプ</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <span className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">トーン</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">カジュアル</SelectItem>
                  <SelectItem value="professional">プロフェッショナル</SelectItem>
                  <SelectItem value="friendly">フレンドリー</SelectItem>
                  <SelectItem value="luxury">ラグジュアリー</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full gap-2"
              onClick={generateContent}
              disabled={isGenerating || !productName || !productDescription}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  コンテンツを生成
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Contents */}
        <div className="lg:col-span-2 space-y-4">
          {generatedContents.length === 0 ? (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">商品情報を入力してコンテンツを生成してください</p>
              </div>
            </Card>
          ) : (
            generatedContents.map((content) => {
              const typeConfig = contentTypes.find(t => 
                (content.platform?.toLowerCase().includes(t.id)) || 
                (content.type === "recipe" && t.id === "recipe") ||
                (content.type === "concept" && t.id === "concept")
              )
              
              return (
                <Card key={content.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {typeConfig && (
                          <Badge className={typeConfig.color}>
                            <typeConfig.icon className="h-3 w-3 mr-1" />
                            {typeConfig.label}
                          </Badge>
                        )}
                        <span className="font-medium">{content.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => regenerate(content)}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copyContent(content)}>
                          {copiedId === content.id ? (
                            <Check className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                      {content.content}
                    </div>
                    {content.hashtags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {content.hashtags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">#{tag}</Badge>
                        ))}
                      </div>
                    )}
                    {content.imagePrompt && (
                      <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                        <p className="text-xs font-medium text-primary mb-1">画像生成プロンプト</p>
                        <p className="text-xs text-muted-foreground">{content.imagePrompt}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
