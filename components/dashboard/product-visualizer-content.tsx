"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { 
  Image,
  Loader2,
  Sparkles,
  Download,
  RefreshCw,
  Palette,
  Package,
  Maximize2,
  Grid,
  Camera,
  Wand2
} from "lucide-react"

interface GeneratedImage {
  id: string
  prompt: string
  style: string
  url: string
  timestamp: Date
}

const stylePresets = [
  { id: "minimal", label: "ミニマル", description: "シンプルでクリーンなデザイン" },
  { id: "natural", label: "ナチュラル", description: "自然素材を感じる温かみ" },
  { id: "luxury", label: "ラグジュアリー", description: "高級感のある洗練された印象" },
  { id: "modern", label: "モダン", description: "先進的でスタイリッシュ" },
  { id: "playful", label: "ポップ", description: "明るく楽しい雰囲気" },
]

const scenePresets = [
  { id: "studio", label: "スタジオ撮影", icon: Camera },
  { id: "lifestyle", label: "ライフスタイル", icon: Image },
  { id: "nature", label: "自然環境", icon: Palette },
  { id: "kitchen", label: "キッチン", icon: Grid },
]

// Mock placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
]

export function ProductVisualizerContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("minimal")
  const [selectedScene, setSelectedScene] = useState("studio")
  const [colorScheme, setColorScheme] = useState("")
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)

  const generateImages = () => {
    if (!productName) return
    
    setIsGenerating(true)
    
    setTimeout(() => {
      const styleLabel = stylePresets.find(s => s.id === selectedStyle)?.label
      const sceneLabel = scenePresets.find(s => s.id === selectedScene)?.label
      
      const newImages: GeneratedImage[] = [
        {
          id: `img-${Date.now()}-1`,
          prompt: `${productName} - ${styleLabel}スタイル、${sceneLabel}シーン`,
          style: selectedStyle,
          url: placeholderImages[0],
          timestamp: new Date()
        },
        {
          id: `img-${Date.now()}-2`,
          prompt: `${productName} - ${styleLabel}スタイル、バリエーション2`,
          style: selectedStyle,
          url: placeholderImages[1],
          timestamp: new Date()
        },
        {
          id: `img-${Date.now()}-3`,
          prompt: `${productName} - ${styleLabel}スタイル、バリエーション3`,
          style: selectedStyle,
          url: placeholderImages[2],
          timestamp: new Date()
        },
        {
          id: `img-${Date.now()}-4`,
          prompt: `${productName} - ${styleLabel}スタイル、バリエーション4`,
          style: selectedStyle,
          url: placeholderImages[3],
          timestamp: new Date()
        },
      ]
      
      setGeneratedImages([...newImages, ...generatedImages])
      setSelectedImage(newImages[0])
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Visualizer</h1>
          <p className="text-muted-foreground mt-1">
            AIで商品イメージ・パッケージビジュアルを生成
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              画像設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">商品名</label>
              <Input 
                placeholder="例: オーガニックプロテイン"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">商品説明（任意）</label>
              <Textarea 
                placeholder="商品の特徴やイメージを入力..."
                className="min-h-[60px]"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">スタイル</label>
              <div className="grid grid-cols-2 gap-2">
                {stylePresets.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedStyle === style.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="text-sm font-medium">{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">シーン</label>
              <div className="grid grid-cols-2 gap-2">
                {scenePresets.map(scene => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene.id)}
                    className={`p-3 rounded-lg border flex items-center gap-2 transition-all ${
                      selectedScene === scene.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <scene.icon className="h-4 w-4" />
                    <span className="text-sm">{scene.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">カラースキーム（任意）</label>
              <Input 
                placeholder="例: グリーン×ホワイト"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
              />
            </div>

            <Button 
              className="w-full gap-2"
              onClick={generateImages}
              disabled={isGenerating || !productName}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  画像を生成
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-4">
          {isGenerating ? (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <h3 className="font-semibold">画像を生成中...</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  AIが商品イメージを作成しています
                </p>
              </div>
            </Card>
          ) : selectedImage ? (
            <>
              {/* Main Preview */}
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-square max-h-[400px] bg-muted rounded-lg overflow-hidden mx-auto">
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{selectedImage.prompt}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedImage.timestamp.toLocaleString("ja-JP")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        再生成
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        ダウンロード
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Maximize2 className="h-4 w-4" />
                        拡大
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Variations */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">バリエーション</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-3">
                    {generatedImages.slice(0, 8).map((img) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage?.id === img.id 
                            ? "border-primary" 
                            : "border-transparent hover:border-primary/50"
                        }`}
                      >
                        <img 
                          src={img.url} 
                          alt={img.prompt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">商品情報を入力して画像を生成</p>
                <p className="text-sm text-muted-foreground mt-2">
                  AIがパッケージや商品イメージを作成します
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
