"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  FlaskConical, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  Leaf,
  Beaker,
  Heart,
  Sparkles,
  Shield,
  Zap,
  Brain,
  Eye,
  Droplets,
  Sun,
  Moon,
} from "lucide-react"

// 素材カテゴリ定義
const categories = [
  { id: "all", name: "すべて" },
  { id: "vitamin", name: "ビタミン類" },
  { id: "mineral", name: "ミネラル" },
  { id: "amino", name: "アミノ酸" },
  { id: "botanical", name: "植物由来" },
  { id: "functional", name: "機能性成分" },
  { id: "probiotic", name: "プロバイオティクス" },
  { id: "collagen", name: "コラーゲン・タンパク" },
]

// 効能タグ定義
const effectTags = [
  { id: "beauty", name: "美容", icon: Sparkles, color: "bg-pink-100 text-pink-700 border-pink-200" },
  { id: "health", name: "健康維持", icon: Heart, color: "bg-red-100 text-red-700 border-red-200" },
  { id: "energy", name: "活力", icon: Zap, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { id: "immunity", name: "免疫", icon: Shield, color: "bg-green-100 text-green-700 border-green-200" },
  { id: "cognitive", name: "認知機能", icon: Brain, color: "bg-purple-100 text-purple-700 border-purple-200" },
  { id: "eye", name: "アイケア", icon: Eye, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "hydration", name: "保湿", icon: Droplets, color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { id: "sleep", name: "睡眠", icon: Moon, color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { id: "antiaging", name: "エイジング", icon: Sun, color: "bg-orange-100 text-orange-700 border-orange-200" },
  { id: "natural", name: "天然由来", icon: Leaf, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
]

// 素材データベース
const materialsData = [
  {
    id: 1,
    name: "ビタミンC",
    nameEn: "Vitamin C / Ascorbic Acid",
    category: "vitamin",
    effects: ["beauty", "immunity", "antiaging"],
    trendStatus: "growing",
    trendChange: 24,
    safetyGrade: "A",
    cost: "低",
    origin: "合成/天然",
    description: "抗酸化作用、コラーゲン生成促進、美白効果",
    relatedTrends: ["美白ケア", "インナービューティー"],
    suppliers: 12,
  },
  {
    id: 2,
    name: "ヒアルロン酸",
    nameEn: "Hyaluronic Acid",
    category: "functional",
    effects: ["beauty", "hydration", "antiaging"],
    trendStatus: "stable",
    trendChange: 8,
    safetyGrade: "A",
    cost: "中",
    origin: "発酵法",
    description: "高い保水力、肌のハリ・弾力向上",
    relatedTrends: ["保湿ケア", "エイジングケア"],
    suppliers: 8,
  },
  {
    id: 3,
    name: "セラミド",
    nameEn: "Ceramide",
    category: "functional",
    effects: ["beauty", "hydration"],
    trendStatus: "growing",
    trendChange: 32,
    safetyGrade: "A",
    cost: "高",
    origin: "植物由来",
    description: "肌バリア機能強化、保湿効果",
    relatedTrends: ["敏感肌ケア", "バリア機能"],
    suppliers: 6,
  },
  {
    id: 4,
    name: "GABA",
    nameEn: "Gamma-Aminobutyric Acid",
    category: "amino",
    effects: ["sleep", "health", "cognitive"],
    trendStatus: "growing",
    trendChange: 45,
    safetyGrade: "A",
    cost: "低",
    origin: "発酵法",
    description: "リラックス効果、睡眠の質向上、血圧サポート",
    relatedTrends: ["睡眠改善", "ストレスケア"],
    suppliers: 10,
  },
  {
    id: 5,
    name: "コラーゲンペプチド",
    nameEn: "Collagen Peptide",
    category: "collagen",
    effects: ["beauty", "antiaging", "health"],
    trendStatus: "stable",
    trendChange: 12,
    safetyGrade: "A",
    cost: "中",
    origin: "魚由来/豚由来",
    description: "肌のハリ・弾力、関節サポート",
    relatedTrends: ["インナービューティー", "関節ケア"],
    suppliers: 15,
  },
  {
    id: 6,
    name: "ルテイン",
    nameEn: "Lutein",
    category: "botanical",
    effects: ["eye", "antiaging"],
    trendStatus: "growing",
    trendChange: 28,
    safetyGrade: "A",
    cost: "中",
    origin: "マリーゴールド由来",
    description: "ブルーライト対策、目の健康維持",
    relatedTrends: ["アイケア", "デジタルデトックス"],
    suppliers: 7,
  },
  {
    id: 7,
    name: "NMN",
    nameEn: "Nicotinamide Mononucleotide",
    category: "functional",
    effects: ["antiaging", "energy", "health"],
    trendStatus: "growing",
    trendChange: 156,
    safetyGrade: "B",
    cost: "高",
    origin: "発酵法",
    description: "NAD+前駆体、細胞エネルギー産生、抗老化",
    relatedTrends: ["長寿科学", "エイジングケア"],
    suppliers: 4,
  },
  {
    id: 8,
    name: "乳酸菌（ラクトバチルス）",
    nameEn: "Lactobacillus",
    category: "probiotic",
    effects: ["immunity", "health"],
    trendStatus: "stable",
    trendChange: 15,
    safetyGrade: "A",
    cost: "低",
    origin: "発酵法",
    description: "腸内環境改善、免疫力向上",
    relatedTrends: ["腸活", "免疫ケア"],
    suppliers: 20,
  },
  {
    id: 9,
    name: "ポストバイオティクス",
    nameEn: "Postbiotics",
    category: "probiotic",
    effects: ["immunity", "health"],
    trendStatus: "emerging",
    trendChange: 340,
    safetyGrade: "A",
    cost: "中",
    origin: "発酵法",
    description: "死菌体・代謝産物、安定性が高い次世代成分",
    relatedTrends: ["次世代腸活", "免疫ケア"],
    suppliers: 3,
  },
  {
    id: 10,
    name: "レチノール",
    nameEn: "Retinol",
    category: "vitamin",
    effects: ["beauty", "antiaging"],
    trendStatus: "growing",
    trendChange: 38,
    safetyGrade: "B",
    cost: "中",
    origin: "合成",
    description: "ターンオーバー促進、シワ改善",
    relatedTrends: ["エイジングケア", "シワ対策"],
    suppliers: 9,
  },
  {
    id: 11,
    name: "ナイアシンアミド",
    nameEn: "Niacinamide",
    category: "vitamin",
    effects: ["beauty", "hydration", "antiaging"],
    trendStatus: "growing",
    trendChange: 67,
    safetyGrade: "A",
    cost: "低",
    origin: "合成",
    description: "毛穴ケア、美白、バリア機能強化",
    relatedTrends: ["毛穴ケア", "美白"],
    suppliers: 11,
  },
  {
    id: 12,
    name: "アスタキサンチン",
    nameEn: "Astaxanthin",
    category: "botanical",
    effects: ["antiaging", "eye", "beauty"],
    trendStatus: "stable",
    trendChange: 18,
    safetyGrade: "A",
    cost: "高",
    origin: "藻類由来",
    description: "強力な抗酸化作用、目の疲労回復",
    relatedTrends: ["抗酸化", "アイケア"],
    suppliers: 5,
  },
  {
    id: 13,
    name: "テアニン",
    nameEn: "L-Theanine",
    category: "amino",
    effects: ["sleep", "cognitive"],
    trendStatus: "growing",
    trendChange: 29,
    safetyGrade: "A",
    cost: "低",
    origin: "茶葉由来",
    description: "リラックス効果、集中力向上",
    relatedTrends: ["ストレスケア", "集中力"],
    suppliers: 8,
  },
  {
    id: 14,
    name: "亜鉛",
    nameEn: "Zinc",
    category: "mineral",
    effects: ["immunity", "health", "beauty"],
    trendStatus: "stable",
    trendChange: 10,
    safetyGrade: "A",
    cost: "低",
    origin: "ミネラル",
    description: "免疫機能、味覚維持、肌の健康",
    relatedTrends: ["免疫ケア", "男性向け"],
    suppliers: 18,
  },
  {
    id: 15,
    name: "ビタミンD",
    nameEn: "Vitamin D",
    category: "vitamin",
    effects: ["immunity", "health"],
    trendStatus: "growing",
    trendChange: 42,
    safetyGrade: "A",
    cost: "低",
    origin: "合成/天然",
    description: "骨の健康、免疫機能サポート",
    relatedTrends: ["免疫ケア", "骨の健康"],
    suppliers: 14,
  },
  {
    id: 16,
    name: "バクチオール",
    nameEn: "Bakuchiol",
    category: "botanical",
    effects: ["beauty", "antiaging", "natural"],
    trendStatus: "emerging",
    trendChange: 210,
    safetyGrade: "A",
    cost: "高",
    origin: "植物由来",
    description: "天然レチノール代替、低刺激エイジングケア",
    relatedTrends: ["クリーンビューティー", "エイジングケア"],
    suppliers: 4,
  },
  {
    id: 17,
    name: "CBD",
    nameEn: "Cannabidiol",
    category: "botanical",
    effects: ["sleep", "health", "natural"],
    trendStatus: "emerging",
    trendChange: 180,
    safetyGrade: "C",
    cost: "高",
    origin: "麻由来",
    description: "リラックス、睡眠サポート（法規制注意）",
    relatedTrends: ["ウェルネス", "睡眠改善"],
    suppliers: 2,
  },
  {
    id: 18,
    name: "プラセンタ",
    nameEn: "Placenta Extract",
    category: "functional",
    effects: ["beauty", "antiaging", "energy"],
    trendStatus: "declining",
    trendChange: -12,
    safetyGrade: "B",
    cost: "高",
    origin: "豚/馬由来",
    description: "細胞活性化、美肌効果",
    relatedTrends: ["エイジングケア"],
    suppliers: 7,
  },
]

// トレンドステータスの表示設定
const trendStatusConfig: Record<string, { label: string; color: string; icon: typeof TrendingUp }> = {
  emerging: { label: "急上昇", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: TrendingUp },
  growing: { label: "成長中", color: "bg-blue-100 text-blue-700 border-blue-200", icon: TrendingUp },
  stable: { label: "安定", color: "bg-gray-100 text-gray-700 border-gray-200", icon: Minus },
  declining: { label: "下降", color: "bg-red-100 text-red-700 border-red-200", icon: TrendingDown },
}

// 安全性グレードの表示設定
const safetyGradeConfig: Record<string, { color: string }> = {
  A: { color: "bg-green-100 text-green-700 border-green-200" },
  B: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  C: { color: "bg-red-100 text-red-700 border-red-200" },
}

export function AIMaterialsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEffects, setSelectedEffects] = useState<string[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<typeof materialsData[0] | null>(null)

  // フィルタリング
  const filteredMaterials = useMemo(() => {
    return materialsData.filter((material) => {
      const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || material.category === selectedCategory
      const matchesEffects = selectedEffects.length === 0 || 
        selectedEffects.some(effect => material.effects.includes(effect))
      return matchesSearch && matchesCategory && matchesEffects
    })
  }, [searchQuery, selectedCategory, selectedEffects])

  const toggleEffect = (effectId: string) => {
    setSelectedEffects(prev => 
      prev.includes(effectId) 
        ? prev.filter(e => e !== effectId)
        : [...prev, effectId]
    )
  }

  return (
    <div className="p-6 space-y-6 bg-muted/30 min-h-screen">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            素材データベース
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {materialsData.length}種類の素材を管理 | タグ・効能・トレンドで検索可能
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          新規素材追加
        </Button>
      </div>

      {/* 検索・フィルター */}
      <Card className="rounded-xl">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 検索 */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="素材名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* カテゴリフィルター */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="カテゴリ" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 効能タグフィルター */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">効能で絞り込み</p>
            <div className="flex flex-wrap gap-2">
              {effectTags.map((tag) => {
                const Icon = tag.icon
                const isSelected = selectedEffects.includes(tag.id)
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleEffect(tag.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected 
                        ? tag.color + " ring-2 ring-offset-1 ring-primary/30" 
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {tag.name}
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 素材一覧テーブル */}
      <Card className="rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span>素材一覧（{filteredMaterials.length}件）</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[200px]">素材名</TableHead>
                  <TableHead className="w-[120px]">カテゴリ</TableHead>
                  <TableHead>効能タグ</TableHead>
                  <TableHead className="w-[100px]">トレンド</TableHead>
                  <TableHead className="w-[80px]">安全性</TableHead>
                  <TableHead className="w-[80px]">コスト</TableHead>
                  <TableHead className="w-[100px]">詳細</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => {
                  const trendConfig = trendStatusConfig[material.trendStatus]
                  const TrendIcon = trendConfig.icon
                  const safetyConfig = safetyGradeConfig[material.safetyGrade]
                  
                  return (
                    <TableRow key={material.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{material.name}</p>
                          <p className="text-[10px] text-muted-foreground">{material.nameEn}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {categories.find(c => c.id === material.category)?.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {material.effects.slice(0, 3).map((effectId) => {
                            const tag = effectTags.find(t => t.id === effectId)
                            if (!tag) return null
                            const Icon = tag.icon
                            return (
                              <span 
                                key={effectId} 
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${tag.color}`}
                              >
                                <Icon className="h-2.5 w-2.5" />
                                {tag.name}
                              </span>
                            )
                          })}
                          {material.effects.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">+{material.effects.length - 3}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className={`text-[10px] ${trendConfig.color}`}>
                            <TrendIcon className="h-3 w-3 mr-1" />
                            {trendConfig.label}
                          </Badge>
                          <span className={`text-[10px] font-medium ${material.trendChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {material.trendChange >= 0 ? '+' : ''}{material.trendChange}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${safetyConfig.color}`}>
                          {material.safetyGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{material.cost}</span>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedMaterial(material)}
                            >
                              詳細
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Beaker className="h-5 w-5 text-primary" />
                                {material.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">{material.nameEn}</p>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">カテゴリ</p>
                                  <p className="font-medium">{categories.find(c => c.id === material.category)?.name}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">原料由来</p>
                                  <p className="font-medium">{material.origin}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">安全性評価</p>
                                  <Badge className={safetyConfig.color}>{material.safetyGrade}</Badge>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">コスト</p>
                                  <p className="font-medium">{material.cost}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs text-muted-foreground mb-2">効能・効果</p>
                                <div className="flex flex-wrap gap-2">
                                  {material.effects.map((effectId) => {
                                    const tag = effectTags.find(t => t.id === effectId)
                                    if (!tag) return null
                                    const Icon = tag.icon
                                    return (
                                      <span key={effectId} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${tag.color}`}>
                                        <Icon className="h-3 w-3" />
                                        {tag.name}
                                      </span>
                                    )
                                  })}
                                </div>
                              </div>

                              <div>
                                <p className="text-xs text-muted-foreground mb-1">説明</p>
                                <p className="text-sm">{material.description}</p>
                              </div>

                              <div>
                                <p className="text-xs text-muted-foreground mb-2">関連トレンド</p>
                                <div className="flex flex-wrap gap-2">
                                  {material.relatedTrends.map((trend) => (
                                    <Badge key={trend} variant="secondary" className="text-xs">{trend}</Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                  <p className="text-xs text-muted-foreground">トレンド変化</p>
                                  <p className={`text-lg font-bold ${material.trendChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {material.trendChange >= 0 ? '+' : ''}{material.trendChange}%
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">サプライヤー数</p>
                                  <p className="text-lg font-bold text-primary">{material.suppliers}社</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
