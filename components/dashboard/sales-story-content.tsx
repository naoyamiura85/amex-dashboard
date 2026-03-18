"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Presentation, 
  FileText, 
  Download,
  Loader2,
  Sparkles,
  CheckCircle,
  ChevronRight,
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Lightbulb,
  Building2
} from "lucide-react"

interface SlidePreview {
  id: number
  title: string
  type: "title" | "content" | "chart" | "summary"
  content: string[]
}

export function SalesStoryContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [targetRetailer, setTargetRetailer] = useState("")
  const [keyBenefits, setKeyBenefits] = useState("")
  const [presentationType, setPresentationType] = useState("new-product")

  const [slides, setSlides] = useState<SlidePreview[]>([])

  const generatePresentation = () => {
    if (!productName || !productCategory) return
    
    setIsGenerating(true)
    setProgress(0)
    setIsComplete(false)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setIsComplete(true)
          
          // Generate slide previews
          setSlides([
            {
              id: 1,
              title: "表紙",
              type: "title",
              content: [productName, "ご提案資料", new Date().toLocaleDateString("ja-JP")]
            },
            {
              id: 2,
              title: "エグゼクティブサマリー",
              type: "content",
              content: [
                `${productCategory}市場は年間+15%で成長中`,
                `${productName}は競合比2倍の効果を実現`,
                "初年度売上目標: 5億円"
              ]
            },
            {
              id: 3,
              title: "市場環境",
              type: "chart",
              content: [
                "市場規模: 2,500億円（前年比+15%）",
                "成長ドライバー: 健康意識の高まり",
                "競合動向: 大手3社が市場シェア60%を占有"
              ]
            },
            {
              id: 4,
              title: "ターゲット顧客",
              type: "content",
              content: [
                "メインターゲット: 25-35歳女性",
                "購買動機: 手軽な健康管理",
                "想定購買頻度: 月2回"
              ]
            },
            {
              id: 5,
              title: "商品特長",
              type: "content",
              content: keyBenefits.split("\n").filter(b => b.trim())
            },
            {
              id: 6,
              title: "競合優位性",
              type: "chart",
              content: [
                "独自成分による差別化",
                "価格競争力（競合比-15%）",
                "SNS口コミ数No.1"
              ]
            },
            {
              id: 7,
              title: "販売計画",
              type: "content",
              content: [
                `${targetRetailer || "主要チャネル"}での展開計画`,
                "初回導入: 100店舗",
                "年間売上目標: 5億円"
              ]
            },
            {
              id: 8,
              title: "販促サポート",
              type: "content",
              content: [
                "店頭POP・什器の提供",
                "SNSキャンペーン連動",
                "サンプリング施策"
              ]
            },
            {
              id: 9,
              title: "まとめ・ご提案",
              type: "summary",
              content: [
                `${productName}は成長市場における有力商品`,
                "貴社との協業で相乗効果を実現",
                "まずはテスト導入からスタート"
              ]
            }
          ])
          
          return 100
        }
        return prev + 12
      })
    }, 400)
  }

  const getSlideIcon = (type: string) => {
    switch (type) {
      case "title": return Presentation
      case "chart": return BarChart3
      case "summary": return CheckCircle
      default: return FileText
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales Story Creator</h1>
          <p className="text-muted-foreground mt-1">
            営業提案資料をAIが自動生成
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              資料設定
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
              <label className="text-sm font-medium mb-2 block">商品カテゴリ</label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health-food">健康食品</SelectItem>
                  <SelectItem value="cosmetics">化粧品</SelectItem>
                  <SelectItem value="supplement">サプリメント</SelectItem>
                  <SelectItem value="beverage">飲料</SelectItem>
                  <SelectItem value="toiletry">トイレタリー</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">提案先</label>
              <Input 
                placeholder="例: ドラッグストアA社"
                value={targetRetailer}
                onChange={(e) => setTargetRetailer(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">プレゼンタイプ</label>
              <Select value={presentationType} onValueChange={setPresentationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-product">新商品提案</SelectItem>
                  <SelectItem value="expansion">販路拡大</SelectItem>
                  <SelectItem value="renewal">リニューアル提案</SelectItem>
                  <SelectItem value="promotion">販促企画</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">主要ベネフィット（改行区切り）</label>
              <Textarea 
                placeholder="・独自の発酵技術&#10;・1食で20gのタンパク質&#10;・人工甘味料不使用"
                className="min-h-[80px]"
                value={keyBenefits}
                onChange={(e) => setKeyBenefits(e.target.value)}
              />
            </div>
            <Button 
              className="w-full gap-2"
              onClick={generatePresentation}
              disabled={isGenerating || !productName || !productCategory}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Presentation className="h-4 w-4" />
                  プレゼン資料を生成
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-4">
          {isGenerating && (
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                  <h3 className="font-semibold mb-2">プレゼン資料を生成中...</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    市場データと商品情報を分析しています
                  </p>
                  <Progress value={progress} className="h-2 max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>
          )}

          {isComplete && (
            <>
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-emerald-900">資料生成完了</h3>
                      <p className="text-sm text-emerald-700">{slides.length}ページのプレゼン資料が生成されました</p>
                    </div>
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      PPTXをダウンロード
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">スライドプレビュー</CardTitle>
                  <CardDescription>生成された資料の構成を確認</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {slides.map((slide) => {
                      const Icon = getSlideIcon(slide.type)
                      return (
                        <div 
                          key={slide.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                              {slide.id}
                            </div>
                            <span className="text-sm font-medium truncate">{slide.title}</span>
                          </div>
                          <div className="aspect-video bg-muted rounded flex flex-col items-center justify-center p-2">
                            <Icon className="h-6 w-6 text-muted-foreground mb-2" />
                            <div className="text-xs text-muted-foreground text-center space-y-0.5">
                              {slide.content.slice(0, 2).map((line, i) => (
                                <p key={i} className="truncate max-w-full">{line}</p>
                              ))}
                              {slide.content.length > 2 && (
                                <p className="text-muted-foreground/50">...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  PDFで出力
                </Button>
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  スライドを編集
                </Button>
              </div>
            </>
          )}

          {!isGenerating && !isComplete && (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Presentation className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">商品情報を入力してプレゼン資料を生成</p>
                <p className="text-sm text-muted-foreground mt-2">市場データ・競合分析を自動で組み込みます</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
