"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Boxes, 
  Play, 
  Package, 
  FlaskConical, 
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronRight,
  Zap,
  Target,
  DollarSign,
  BarChart3,
} from "lucide-react"

// 商品の定義
const products = [
  { id: "menphys", name: "menphys", category: "健康ドリンク", image: "/images/products/menphys.jpg", basePrice: 3980 },
  { id: "tokucha", name: "特茶/胡麻麦茶", category: "健康飲料", image: "/images/products/tokucha.jpg", basePrice: 170 },
  { id: "maintenansu", name: "すっきりメンテナン酢", category: "機能性表示食品", image: "/images/products/maintenansu.jpg", basePrice: 2980 },
  { id: "coffee", name: "SUNTORY COFFEE ROASTERY", category: "プレミアムコーヒー", image: "/images/products/coffee-roastery.jpg", basePrice: 450 },
  { id: "zone", name: "ZONe", category: "エナジードリンク", image: "/images/products/zone.jpg", basePrice: 200 },
]

// 素材オプション
const materialOptions = [
  { id: "gaba", name: "GABA配合", effect: { lm: 5, mh: 8, purchase: 12, regular: 15 }, cost: 50 },
  { id: "collagen", name: "コラーゲン強化", effect: { lm: 3, mh: 10, purchase: 8, regular: 5 }, cost: 80 },
  { id: "vitamin", name: "ビタミンD追加", effect: { lm: 8, mh: 6, purchase: 4, regular: 3 }, cost: 30 },
  { id: "probiotic", name: "プロバイオティクス", effect: { lm: 6, mh: 12, purchase: 15, regular: 20 }, cost: 100 },
  { id: "omega3", name: "オメガ3脂肪酸", effect: { lm: 4, mh: 7, purchase: 10, regular: 12 }, cost: 70 },
]

// 企画オプション
const campaignOptions = [
  { id: "subscription", name: "定期購入割引20%", effect: { lm: 2, mh: 5, purchase: 8, regular: 25 }, cost: -15 },
  { id: "bundle", name: "セット販売", effect: { lm: 5, mh: 8, purchase: 15, regular: 10 }, cost: 0 },
  { id: "trial", name: "お試しサイズ展開", effect: { lm: 15, mh: 10, purchase: 5, regular: 2 }, cost: -20 },
  { id: "influencer", name: "インフルエンサー連携", effect: { lm: 20, mh: 15, purchase: 8, regular: 3 }, cost: 200 },
  { id: "eco", name: "エコパッケージ", effect: { lm: 8, mh: 12, purchase: 6, regular: 8 }, cost: 40 },
]

// ファネルデータ（ベース）
const baseFunnelData = {
  menphys: { lm: 1200, mh: 283, purchase: 128, regular: 79 },
  tokucha: { lm: 1800, mh: 340, purchase: 107, regular: 57 },
  maintenansu: { lm: 1500, mh: 227, purchase: 85, regular: 34 },
  coffee: { lm: 980, mh: 185, purchase: 62, regular: 28 },
  zone: { lm: 2200, mh: 420, purchase: 156, regular: 89 },
}

// ペルソナデータ
const personasByProduct: Record<string, { name: string; image: string; segment: string }[]> = {
  menphys: [
    { name: "佐藤健一", image: "/images/personas/senior_man1.jpg", segment: "lm" },
    { name: "田中正雄", image: "/images/personas/casual_man1.jpg", segment: "mh" },
    { name: "山本洋子", image: "/images/personas/senior_woman1.jpg", segment: "purchase" },
    { name: "山田美和", image: "/images/personas/housewife2.jpg", segment: "regular" },
  ],
  tokucha: [
    { name: "中村一郎", image: "/images/personas/casual_man1.jpg", segment: "lm" },
    { name: "加藤美咲", image: "/images/personas/young_woman1.jpg", segment: "mh" },
    { name: "吉田浩", image: "/images/personas/young_man1.jpg", segment: "purchase" },
  ],
  maintenansu: [
    { name: "鈴木太郎", image: "/images/personas/middle_woman1.jpg", segment: "lm" },
    { name: "高橋由美", image: "/images/personas/housewife1.jpg", segment: "mh" },
  ],
  coffee: [
    { name: "北村誠一", image: "/images/personas/senior_man1.jpg", segment: "mh" },
    { name: "藤井恵子", image: "/images/personas/housewife1.jpg", segment: "purchase" },
  ],
  zone: [
    { name: "岡本翔太", image: "/images/personas/young_man1.jpg", segment: "lm" },
    { name: "鈴木翔", image: "/images/personas/student1.jpg", segment: "mh" },
    { name: "山本彩", image: "/images/personas/young_woman1.jpg", segment: "purchase" },
  ],
}

export function AISimulatorContent() {
  const [selectedProduct, setSelectedProduct] = useState("menphys")
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [priceAdjustment, setPriceAdjustment] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  const currentProduct = products.find(p => p.id === selectedProduct)
  const baseFunnel = baseFunnelData[selectedProduct as keyof typeof baseFunnelData]
  const personas = personasByProduct[selectedProduct] || []

  // シミュレーション効果を計算
  const calculateEffects = () => {
    let effects = { lm: 0, mh: 0, purchase: 0, regular: 0 }
    
    selectedMaterials.forEach(matId => {
      const mat = materialOptions.find(m => m.id === matId)
      if (mat) {
        effects.lm += mat.effect.lm
        effects.mh += mat.effect.mh
        effects.purchase += mat.effect.purchase
        effects.regular += mat.effect.regular
      }
    })
    
    selectedCampaigns.forEach(campId => {
      const camp = campaignOptions.find(c => c.id === campId)
      if (camp) {
        effects.lm += camp.effect.lm
        effects.mh += camp.effect.mh
        effects.purchase += camp.effect.purchase
        effects.regular += camp.effect.regular
      }
    })
    
    // 価格調整の影響（価格を下げると購入系が上がる、上げると下がる）
    effects.purchase += priceAdjustment * -0.5
    effects.regular += priceAdjustment * -0.3
    
    return effects
  }

  const effects = calculateEffects()
  
  // 新しいファネル値を計算
  const newFunnel = {
    lm: Math.round(baseFunnel.lm * (1 + effects.lm / 100)),
    mh: Math.round(baseFunnel.mh * (1 + effects.mh / 100)),
    purchase: Math.round(baseFunnel.purchase * (1 + effects.purchase / 100)),
    regular: Math.round(baseFunnel.regular * (1 + effects.regular / 100)),
  }

  // コスト計算
  const calculateCost = () => {
    let cost = 0
    selectedMaterials.forEach(matId => {
      const mat = materialOptions.find(m => m.id === matId)
      if (mat) cost += mat.cost
    })
    selectedCampaigns.forEach(campId => {
      const camp = campaignOptions.find(c => c.id === campId)
      if (camp) cost += camp.cost
    })
    return cost
  }

  // シミュレーション実行
  const runSimulation = () => {
    setIsSimulating(true)
    setSimulationComplete(false)
    
    // アニメーション用に段階的に値を更新
    const steps = 20
    const duration = 1500
    const stepDuration = duration / steps
    
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setAnimatedValues({
        lm: Math.round(baseFunnel.lm + (newFunnel.lm - baseFunnel.lm) * progress),
        mh: Math.round(baseFunnel.mh + (newFunnel.mh - baseFunnel.mh) * progress),
        purchase: Math.round(baseFunnel.purchase + (newFunnel.purchase - baseFunnel.purchase) * progress),
        regular: Math.round(baseFunnel.regular + (newFunnel.regular - baseFunnel.regular) * progress),
      })
      
      if (currentStep >= steps) {
        clearInterval(interval)
        setIsSimulating(false)
        setSimulationComplete(true)
      }
    }, stepDuration)
  }

  // リセット
  const resetSimulation = () => {
    setAnimatedValues({})
    setSimulationComplete(false)
  }

  const displayFunnel = simulationComplete || isSimulating ? animatedValues : baseFunnel

  const funnelStages = [
    { id: "lm", name: "LM(ポテンシャル小)", color: "#64748B", icon: Users },
    { id: "mh", name: "MH(ポテンシャル大)", color: "#0EA5E9", icon: Target },
    { id: "purchase", name: "購入ユーザー", color: "#10B981", icon: DollarSign },
    { id: "regular", name: "定期購入", color: "#F59E0B", icon: Sparkles },
  ]

  return (
    <div className="p-6 space-y-6 bg-muted/30 min-h-screen">
      {/* ========== 上部: パラメータ設定エリア ========== */}
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Boxes className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>改定シミュレーター</CardTitle>
                <CardDescription>商品・素材・企画を組み合わせて市場インパクトを予測</CardDescription>
              </div>
            </div>
            <Button 
              className="gap-2 h-10" 
              onClick={runSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  シミュレーション中...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  シミュレーション実行
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 商品選択 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4 text-primary" />
                対象商品
              </div>
              <Select value={selectedProduct} onValueChange={(v) => { setSelectedProduct(v); resetSimulation(); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded overflow-hidden bg-white border flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentProduct && (
                <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                    <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{currentProduct.name}</p>
                    <p className="text-xs text-muted-foreground">{currentProduct.category}</p>
                    <p className="text-sm font-medium text-primary">
                      ¥{(currentProduct.basePrice + priceAdjustment).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 素材オプション */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FlaskConical className="h-4 w-4 text-primary" />
                素材改定
              </div>
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                {materialOptions.map((mat) => (
                  <label
                    key={mat.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-sm ${
                      selectedMaterials.includes(mat.id) ? "bg-primary/10 border border-primary/30" : "bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={selectedMaterials.includes(mat.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMaterials([...selectedMaterials, mat.id])
                          } else {
                            setSelectedMaterials(selectedMaterials.filter(id => id !== mat.id))
                          }
                          resetSimulation()
                        }}
                      />
                      <span className="font-medium">{mat.name}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      +¥{mat.cost}
                    </Badge>
                  </label>
                ))}
              </div>
            </div>

            {/* 企画オプション */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                企画施策
              </div>
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                {campaignOptions.map((camp) => (
                  <label
                    key={camp.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-sm ${
                      selectedCampaigns.includes(camp.id) ? "bg-primary/10 border border-primary/30" : "bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={selectedCampaigns.includes(camp.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCampaigns([...selectedCampaigns, camp.id])
                          } else {
                            setSelectedCampaigns(selectedCampaigns.filter(id => id !== camp.id))
                          }
                          resetSimulation()
                        }}
                      />
                      <span className="font-medium">{camp.name}</span>
                    </div>
                    <Badge variant={camp.cost > 0 ? "outline" : "secondary"} className="text-[10px] shrink-0">
                      {camp.cost > 0 ? `+¥${camp.cost}` : camp.cost < 0 ? `${camp.cost}%` : "±0"}
                    </Badge>
                  </label>
                ))}
              </div>
            </div>

            {/* 価格調整 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-primary" />
                価格調整
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-4">
                <div className="text-center">
                  <span className={`text-2xl font-bold ${priceAdjustment > 0 ? "text-red-500" : priceAdjustment < 0 ? "text-green-500" : "text-foreground"}`}>
                    {priceAdjustment > 0 ? "+" : ""}{priceAdjustment === 0 ? "±0" : `¥${priceAdjustment}`}
                  </span>
                </div>
                <Slider
                  value={[priceAdjustment]}
                  onValueChange={([v]) => { setPriceAdjustment(v); resetSimulation(); }}
                  min={-500}
                  max={500}
                  step={50}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-¥500</span>
                  <span>+¥500</span>
                </div>
              </div>
              {/* 選択中の要約 */}
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">選択中の改定</p>
                <div className="flex flex-wrap gap-1">
                  {selectedMaterials.length === 0 && selectedCampaigns.length === 0 && (
                    <span className="text-xs text-muted-foreground">なし</span>
                  )}
                  {selectedMaterials.map(id => {
                    const mat = materialOptions.find(m => m.id === id)
                    return mat && (
                      <Badge key={id} variant="secondary" className="text-[10px]">
                        {mat.name}
                      </Badge>
                    )
                  })}
                  {selectedCampaigns.map(id => {
                    const camp = campaignOptions.find(c => c.id === id)
                    return camp && (
                      <Badge key={id} variant="outline" className="text-[10px]">
                        {camp.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========== 下部: 結果表示エリア ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ファネル変化（2カラム幅） */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    ファネル変化予測
                  </CardTitle>
                  <CardDescription>改定による各ステージの人数変化</CardDescription>
                </div>
                {simulationComplete && (
                  <Badge className="bg-green-100 text-green-700">シミュレーション完了</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {funnelStages.map((stage) => {
                  const baseValue = baseFunnel[stage.id as keyof typeof baseFunnel]
                  const currentValue = displayFunnel[stage.id as keyof typeof displayFunnel] || baseValue
                  const diff = currentValue - baseValue
                  const diffPercent = ((diff / baseValue) * 100).toFixed(1)
                  const Icon = stage.icon
                  
                  return (
                    <div key={stage.id} className="relative">
                      <div 
                        className="rounded-xl p-4 text-center transition-all duration-300"
                        style={{ 
                          backgroundColor: `${stage.color}15`,
                          borderLeft: `4px solid ${stage.color}`,
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                          style={{ backgroundColor: `${stage.color}20` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: stage.color }} />
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{stage.name}</p>
                        <p 
                          className="text-2xl font-bold transition-all duration-300"
                          style={{ color: stage.color }}
                        >
                          {currentValue}
                          <span className="text-sm font-normal">万人</span>
                        </p>
                        
                        {simulationComplete && diff !== 0 && (
                          <div className={`mt-2 flex items-center justify-center gap-1 text-sm font-medium ${diff > 0 ? "text-green-600" : "text-red-600"}`}>
                            {diff > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            <span>{diff > 0 ? "+" : ""}{diff}万人</span>
                            <span className="text-xs">({diff > 0 ? "+" : ""}{diffPercent}%)</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 矢印 */}
                      {stage.id !== "regular" && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* フロー矢印（視覚的な流れ） */}
              {simulationComplete && (
                <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm font-medium mb-3">ユーザー移動予測</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {effects.lm > 0 && (
                      <Badge className="bg-slate-100 text-slate-700">
                        新規認知 +{effects.lm}%
                      </Badge>
                    )}
                    {effects.mh > 0 && (
                      <Badge className="bg-sky-100 text-sky-700">
                        興味喚起 +{effects.mh}%
                      </Badge>
                    )}
                    {effects.purchase > 0 && (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        購入転換 +{effects.purchase}%
                      </Badge>
                    )}
                    {effects.regular > 0 && (
                      <Badge className="bg-amber-100 text-amber-700">
                        定期化 +{effects.regular}%
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右カラム: ペルソナと収益 */}
        <div className="space-y-6">
          {/* ペルソナ影響分析 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5" />
                影響を受けるペルソナ
              </CardTitle>
              <CardDescription className="text-xs">改定により行動変化が予測されるユーザー像</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {personas.map((persona, index) => {
                  const segmentEffect = effects[persona.segment as keyof typeof effects] || 0
                  const isPositive = segmentEffect > 0
                  const stage = funnelStages.find(s => s.id === persona.segment)
                  
                  return (
                    <div 
                      key={index}
                      className={`p-3 rounded-xl border transition-all duration-500 ${
                        simulationComplete && isPositive 
                          ? "border-green-200 bg-green-50/50" 
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2" style={{ borderColor: stage?.color }}>
                          <AvatarImage src={persona.image} alt={persona.name} />
                          <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{persona.name}</p>
                          <p className="text-xs text-muted-foreground">{stage?.name}</p>
                        </div>
                        {simulationComplete && segmentEffect !== 0 && (
                          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span>{isPositive ? "+" : ""}{segmentEffect}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 収益インパクト */}
          <Card className={`transition-all duration-500 ${simulationComplete ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" : ""}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                収益インパクト予測
              </CardTitle>
            </CardHeader>
            <CardContent>
              {simulationComplete ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm text-muted-foreground">追加コスト</span>
                    <span className={`text-lg font-bold ${calculateCost() > 0 ? "text-red-600" : "text-green-600"}`}>
                      {calculateCost() > 0 ? "+" : ""}{calculateCost()}円/個
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm text-muted-foreground">売上増加予測</span>
                    <span className="text-lg font-bold text-green-600">
                      +{((newFunnel.purchase - baseFunnel.purchase) * 0.8 + (newFunnel.regular - baseFunnel.regular) * 2.5).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="text-sm font-medium">ROI予測</span>
                    <span className="text-2xl font-bold text-primary">
                      {(((newFunnel.purchase - baseFunnel.purchase) * 0.8 + (newFunnel.regular - baseFunnel.regular) * 2.5) / Math.max(calculateCost() / 100, 1)).toFixed(1)}x
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">シミュレーションを実行すると</p>
                  <p className="text-sm">収益予測が表示されます</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
