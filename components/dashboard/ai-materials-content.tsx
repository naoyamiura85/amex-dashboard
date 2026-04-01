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
  Search, 
  Filter,
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
  Dna,
  Smile,
  Coffee,
  Flame,
  Wind,
  Star,
  Award,
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

// 商品DNAファクター定義（消費者に与える感情・気持ち）
const dnaFactors = [
  { id: "refresh", name: "リフレッシュ", icon: Wind, color: "bg-sky-50 text-sky-600 border-sky-200" },
  { id: "relax", name: "リラックス", icon: Coffee, color: "bg-amber-50 text-amber-600 border-amber-200" },
  { id: "vitality", name: "活力・元気", icon: Flame, color: "bg-orange-50 text-orange-600 border-orange-200" },
  { id: "confidence", name: "自信", icon: Star, color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { id: "comfort", name: "安心感", icon: Shield, color: "bg-green-50 text-green-600 border-green-200" },
  { id: "joy", name: "喜び・幸福", icon: Smile, color: "bg-pink-50 text-pink-600 border-pink-200" },
  { id: "premium", name: "プレミアム感", icon: Award, color: "bg-violet-50 text-violet-600 border-violet-200" },
  { id: "smart", name: "知的・賢さ", icon: Brain, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
]

// 素材データベース
const materialsData = [
  {
    id: 1,
    name: "ビタミンC",
    nameEn: "Vitamin C / Ascorbic Acid",
    category: "vitamin",
    effects: ["beauty", "immunity", "antiaging"],
    dna: ["refresh", "confidence", "vitality"],
    origin: "合成/天然",
    description: "抗酸化作用、コラーゲン生成促進、美白効果",
    relatedTrends: ["美白ケア", "インナービューティー"],
  },
  {
    id: 2,
    name: "ヒアルロン酸",
    nameEn: "Hyaluronic Acid",
    category: "functional",
    effects: ["beauty", "hydration", "antiaging"],
    dna: ["confidence", "premium", "joy"],
    origin: "発酵法",
    description: "高い保水力、肌のハリ・弾力向上",
    relatedTrends: ["保湿ケア", "エイジングケア"],
  },
  {
    id: 3,
    name: "セラミド",
    nameEn: "Ceramide",
    category: "functional",
    effects: ["beauty", "hydration"],
    dna: ["comfort", "confidence", "premium"],
    origin: "植物由来",
    description: "肌バリア機能強化、保湿効果",
    relatedTrends: ["敏感肌ケア", "バリア機能"],
  },
  {
    id: 4,
    name: "GABA",
    nameEn: "Gamma-Aminobutyric Acid",
    category: "amino",
    effects: ["sleep", "health", "cognitive"],
    dna: ["relax", "comfort", "smart"],
    origin: "発酵法",
    description: "リラックス効果、睡眠の質向上、血圧サポート",
    relatedTrends: ["睡眠改善", "ストレスケア"],
  },
  {
    id: 5,
    name: "コラーゲンペプチド",
    nameEn: "Collagen Peptide",
    category: "collagen",
    effects: ["beauty", "antiaging", "health"],
    dna: ["confidence", "joy", "premium"],
    origin: "魚由来/豚由来",
    description: "肌のハリ・弾力、関節サポート",
    relatedTrends: ["インナービューティー", "関節ケア"],
  },
  {
    id: 6,
    name: "ルテイン",
    nameEn: "Lutein",
    category: "botanical",
    effects: ["eye", "antiaging"],
    dna: ["comfort", "smart", "vitality"],
    origin: "マリーゴールド由来",
    description: "ブルーライト対策、目の健康維持",
    relatedTrends: ["アイケア", "デジタルデトックス"],
  },
  {
    id: 7,
    name: "NMN",
    nameEn: "Nicotinamide Mononucleotide",
    category: "functional",
    effects: ["antiaging", "energy", "health"],
    dna: ["premium", "vitality", "confidence"],
    origin: "発酵法",
    description: "NAD+前駆体、細胞エネルギー産生、抗老化",
    relatedTrends: ["長寿科学", "エイジングケア"],
  },
  {
    id: 8,
    name: "乳酸菌（ラクトバチルス）",
    nameEn: "Lactobacillus",
    category: "probiotic",
    effects: ["immunity", "health"],
    dna: ["comfort", "vitality", "joy"],
    origin: "発酵法",
    description: "腸内環境改善、免疫力向上",
    relatedTrends: ["腸活", "免疫ケア"],
  },
  {
    id: 9,
    name: "ポストバイオティクス",
    nameEn: "Postbiotics",
    category: "probiotic",
    effects: ["immunity", "health"],
    dna: ["smart", "comfort", "premium"],
    origin: "発酵法",
    description: "死菌体・代謝産物、安定性が高い次世代成分",
    relatedTrends: ["次世代腸活", "免疫ケア"],
  },
  {
    id: 10,
    name: "レチノール",
    nameEn: "Retinol",
    category: "vitamin",
    effects: ["beauty", "antiaging"],
    dna: ["confidence", "premium", "joy"],
    origin: "合成",
    description: "ターンオーバー促進、シワ改善",
    relatedTrends: ["エイジングケア", "シワ対策"],
  },
  {
    id: 11,
    name: "ナイアシンアミド",
    nameEn: "Niacinamide",
    category: "vitamin",
    effects: ["beauty", "hydration", "antiaging"],
    dna: ["refresh", "confidence", "comfort"],
    origin: "合成",
    description: "毛穴ケア、美白、バリア機能強化",
    relatedTrends: ["毛穴ケア", "美白"],
  },
  {
    id: 12,
    name: "アスタキサンチン",
    nameEn: "Astaxanthin",
    category: "botanical",
    effects: ["antiaging", "eye", "beauty"],
    dna: ["premium", "vitality", "confidence"],
    origin: "藻類由来",
    description: "強力な抗酸化作用、目の疲労回復",
    relatedTrends: ["抗酸化", "アイケア"],
  },
  {
    id: 13,
    name: "テアニン",
    nameEn: "L-Theanine",
    category: "amino",
    effects: ["sleep", "cognitive"],
    dna: ["relax", "smart", "comfort"],
    origin: "茶葉由来",
    description: "リラックス効果、集中力向上",
    relatedTrends: ["ストレスケア", "集中力"],
  },
  {
    id: 14,
    name: "亜鉛",
    nameEn: "Zinc",
    category: "mineral",
    effects: ["immunity", "health", "beauty"],
    dna: ["vitality", "comfort", "confidence"],
    origin: "ミネラル",
    description: "免疫機能、味覚維持、肌の健康",
    relatedTrends: ["免疫ケア", "男性向け"],
  },
  {
    id: 15,
    name: "ビタミンD",
    nameEn: "Vitamin D",
    category: "vitamin",
    effects: ["immunity", "health"],
    dna: ["vitality", "comfort", "joy"],
    origin: "合成/天然",
    description: "骨の健康、免疫機能サポート",
    relatedTrends: ["免疫ケア", "骨の健康"],
  },
  {
    id: 16,
    name: "バクチオール",
    nameEn: "Bakuchiol",
    category: "botanical",
    effects: ["beauty", "antiaging", "natural"],
    dna: ["premium", "confidence", "comfort"],
    origin: "植物由来",
    description: "天然レチノール代替、低刺激エイジングケア",
    relatedTrends: ["クリーンビューティー", "エイジングケア"],
  },
  {
    id: 17,
    name: "CBD",
    nameEn: "Cannabidiol",
    category: "botanical",
    effects: ["sleep", "health", "natural"],
    dna: ["relax", "comfort", "premium"],
    origin: "麻由来",
    description: "リラックス、睡眠サポート（法規制注意）",
    relatedTrends: ["ウェルネス", "睡眠改善"],
  },
  {
    id: 18,
    name: "プラセンタ",
    nameEn: "Placenta Extract",
    category: "functional",
    effects: ["beauty", "antiaging", "energy"],
    dna: ["premium", "vitality", "confidence"],
    origin: "豚/馬由来",
    description: "細胞活性化、美肌効果",
    relatedTrends: ["エイジングケア"],
  },
]

export function AIMaterialsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEffects, setSelectedEffects] = useState<string[]>([])
  const [selectedDnaFactors, setSelectedDnaFactors] = useState<string[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<typeof materialsData[0] | null>(null)

  // フィルタリング
  const filteredMaterials = useMemo(() => {
    return materialsData.filter((material) => {
      const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || material.category === selectedCategory
      const matchesEffects = selectedEffects.length === 0 || 
        selectedEffects.some(effect => material.effects.includes(effect))
      const matchesDna = selectedDnaFactors.length === 0 ||
        selectedDnaFactors.some(dna => material.dna.includes(dna))
      return matchesSearch && matchesCategory && matchesEffects && matchesDna
    })
  }, [searchQuery, selectedCategory, selectedEffects, selectedDnaFactors])

  const toggleEffect = (effectId: string) => {
    setSelectedEffects(prev => 
      prev.includes(effectId) 
        ? prev.filter(e => e !== effectId)
        : [...prev, effectId]
    )
  }

  const toggleDnaFactor = (dnaId: string) => {
    setSelectedDnaFactors(prev => 
      prev.includes(dnaId) 
        ? prev.filter(d => d !== dnaId)
        : [...prev, dnaId]
    )
  }

  return (
    <div className="p-6 space-y-6 bg-muted/30 min-h-screen">
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

          {/* 商品DNAフィルター */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Dna className="h-3 w-3" />
              商品DNA（消費者に与える感情）で絞り込み
            </p>
            <div className="flex flex-wrap gap-2">
              {dnaFactors.map((factor) => {
                const Icon = factor.icon
                const isSelected = selectedDnaFactors.includes(factor.id)
                return (
                  <button
                    key={factor.id}
                    onClick={() => toggleDnaFactor(factor.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected 
                        ? factor.color + " ring-2 ring-offset-1 ring-primary/30" 
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {factor.name}
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
                  <TableHead className="w-[280px]">効能タグ</TableHead>
                  <TableHead>
                    <span className="flex items-center gap-1">
                      <Dna className="h-3.5 w-3.5" />
                      商品DNA
                    </span>
                  </TableHead>
                  <TableHead className="w-[80px]">詳細</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => {
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
                        <div className="flex flex-wrap gap-1">
                          {material.dna.map((dnaId) => {
                            const factor = dnaFactors.find(f => f.id === dnaId)
                            if (!factor) return null
                            const Icon = factor.icon
                            return (
                              <span 
                                key={dnaId} 
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${factor.color}`}
                              >
                                <Icon className="h-2.5 w-2.5" />
                                {factor.name}
                              </span>
                            )
                          })}
                        </div>
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
                                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                  <Dna className="h-3 w-3" />
                                  商品DNA（消費者に与える感情）
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {material.dna.map((dnaId) => {
                                    const factor = dnaFactors.find(f => f.id === dnaId)
                                    if (!factor) return null
                                    const Icon = factor.icon
                                    return (
                                      <span key={dnaId} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${factor.color}`}>
                                        <Icon className="h-3 w-3" />
                                        {factor.name}
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
                                  {material.relatedTrends.map((trend, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {trend}
                                    </Badge>
                                  ))}
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
