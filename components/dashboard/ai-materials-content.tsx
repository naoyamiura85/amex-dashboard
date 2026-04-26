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
import { Progress } from "@/components/ui/progress"
import { FilterTabs } from "@/components/ui/filter-tabs"
import {
  Search,
  Filter,
  Plane,
  Hotel,
  Utensils,
  Music,
  ShieldCheck,
  Gem,
  Smartphone,
  Globe,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
} from "lucide-react"

// 特典カテゴリ
const categories = [
  { id: "all", name: "すべて" },
  { id: "travel", name: "トラベル" },
  { id: "hotel", name: "ホテル" },
  { id: "dining", name: "ダイニング" },
  { id: "entertainment", name: "エンタメ" },
  { id: "insurance", name: "保険・補償" },
  { id: "luxury", name: "ラグジュアリー" },
  { id: "digital", name: "デジタル" },
]

const categoryIcons: Record<string, React.ElementType> = {
  travel: Plane,
  hotel: Hotel,
  dining: Utensils,
  entertainment: Music,
  insurance: ShieldCheck,
  luxury: Gem,
  digital: Smartphone,
}

// パートナー特典データ
const partnersData = [
  {
    id: 1,
    name: "プライオリティ・パス",
    category: "travel",
    tier: "プラチナ以上",
    utilizationRate: 87,
    trend: "up",
    satisfactionScore: 4.8,
    partnerSince: 2008,
    annualUsers: 148000,
    description: "世界1,400か所以上の空港ラウンジに無制限アクセス",
    tags: ["フライト前後", "ビジネスクラス相当", "同伴者1名無料"],
  },
  {
    id: 2,
    name: "ザ・ペニンシュラ 東京",
    category: "hotel",
    tier: "プラチナ以上",
    utilizationRate: 62,
    trend: "up",
    satisfactionScore: 4.9,
    partnerSince: 2015,
    annualUsers: 28400,
    description: "スイートルームへの優先アップグレード、アーリーチェックイン/レイトチェックアウト",
    tags: ["スイート優先", "朝食無料", "ウェルカムアメニティ"],
  },
  {
    id: 3,
    name: "NOBU レストラン",
    category: "dining",
    tier: "ゴールド以上",
    utilizationRate: 54,
    trend: "up",
    satisfactionScore: 4.7,
    partnerSince: 2019,
    annualUsers: 52000,
    description: "国内外NOBU全店にて優先予約、シェフズテーブルへの特別アクセス",
    tags: ["優先予約", "シェフズテーブル", "ペアリングサービス"],
  },
  {
    id: 4,
    name: "ネットフリックス プレミアム",
    category: "digital",
    tier: "グリーン以上",
    utilizationRate: 78,
    trend: "up",
    satisfactionScore: 4.3,
    partnerSince: 2022,
    annualUsers: 320000,
    description: "月額費用の全額クレジット還元（プレミアムプラン）",
    tags: ["月額全額還元", "4Kストリーミング", "最大4デバイス"],
  },
  {
    id: 5,
    name: "スパ＆ウェルネス by アンダーズ",
    category: "luxury",
    tier: "プラチナ以上",
    utilizationRate: 41,
    trend: "stable",
    satisfactionScore: 4.6,
    partnerSince: 2020,
    annualUsers: 18600,
    description: "全国一流スパでの優待割引と予約優先権",
    tags: ["20%割引", "優先予約", "アロマウェルカム"],
  },
  {
    id: 6,
    name: "東京海上 旅行総合保険",
    category: "insurance",
    tier: "全カード",
    utilizationRate: 95,
    trend: "stable",
    satisfactionScore: 4.5,
    partnerSince: 2005,
    annualUsers: 620000,
    description: "海外旅行保険最高1億円、国内旅行保険最高5,000万円の自動付帯",
    tags: ["自動付帯", "家族も補償", "24h緊急対応"],
  },
  {
    id: 7,
    name: "ミシュランガイド 掲載店",
    category: "dining",
    tier: "ゴールド以上",
    utilizationRate: 38,
    trend: "up",
    satisfactionScore: 4.8,
    partnerSince: 2021,
    annualUsers: 41000,
    description: "3つ星・2つ星レストランへの専用テーブル確保サービス",
    tags: ["専用テーブル", "オマカセ対応", "ソムリエ選定"],
  },
  {
    id: 8,
    name: "ブルガリ ジャパン",
    category: "luxury",
    tier: "プラチナ以上",
    utilizationRate: 22,
    trend: "down",
    satisfactionScore: 4.4,
    partnerSince: 2017,
    annualUsers: 9800,
    description: "新作コレクション優先内覧、刻印・カスタマイズサービス",
    tags: ["優先内覧", "カスタマイズ", "限定モデル"],
  },
]

const tierColors: Record<string, string> = {
  "プラチナ以上": "bg-primary/15 text-primary border-primary/30",
  "ゴールド以上": "bg-accent/15 text-accent border-accent/30",
  "グリーン以上": "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  "全カード": "bg-secondary/15 text-secondary border-secondary/30",
}

export function AIMaterialsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPartner, setSelectedPartner] = useState<typeof partnersData[0] | null>(null)

  const filtered = useMemo(() => {
    return partnersData.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [searchQuery, selectedCategory])

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-500" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Gem className="h-6 w-6 text-primary" />
          特典・パートナーデータベース
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          全カード種別の提携パートナー・特典マスターとトレンド相関分析
        </p>
      </div>

      {/* サマリーKPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "提携パートナー数", value: "1,240", sub: "+32 今月追加" },
          { label: "平均満足度", value: "4.6", sub: "★ 5点満点" },
          { label: "総特典利用者数", value: "120万人", sub: "直近30日" },
          { label: "高評価特典", value: "318", sub: "スコア4.5以上" },
        ].map((kpi) => (
          <Card key={kpi.label} className="rounded-xl border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
              <p className="text-xs text-primary mt-0.5">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* カテゴリフィルター */}
      <FilterTabs
        tabs={categories.map(cat => ({ key: cat.id, label: cat.name }))}
        activeTab={selectedCategory}
        onTabChange={setSelectedCategory}
        variant="rounded"
        size="sm"
      />

      {/* 検索 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="パートナー名・特典内容で検索..."
            className="pl-9 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="utilization">
          <SelectTrigger className="w-40 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utilization">利用率順</SelectItem>
            <SelectItem value="satisfaction">満足度順</SelectItem>
            <SelectItem value="users">利用者数順</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* テーブル */}
      <Card className="rounded-xl border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs w-8"></TableHead>
                <TableHead className="text-muted-foreground text-xs">パートナー名</TableHead>
                <TableHead className="text-muted-foreground text-xs">対象カード</TableHead>
                <TableHead className="text-muted-foreground text-xs">利用率</TableHead>
                <TableHead className="text-muted-foreground text-xs">満足度</TableHead>
                <TableHead className="text-muted-foreground text-xs">年間利用者</TableHead>
                <TableHead className="text-muted-foreground text-xs">トレンド</TableHead>
                <TableHead className="text-muted-foreground text-xs w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((partner) => {
                const Icon = categoryIcons[partner.category] || Globe
                return (
                  <TableRow key={partner.id} className="border-border hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{partner.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs border ${tierColors[partner.tier] ?? ""}`}>
                        {partner.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 w-24">
                        <span className="text-xs font-semibold text-foreground">{partner.utilizationRate}%</span>
                        <Progress value={partner.utilizationRate} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                        <span className="text-sm font-semibold text-foreground">{partner.satisfactionScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{partner.annualUsers.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <TrendIcon trend={partner.trend} />
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedPartner(partner)}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{partner.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">{partner.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {partner.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 bg-muted/40 rounded-lg">
                                <p className="text-xs text-muted-foreground">年間利用者数</p>
                                <p className="text-lg font-bold text-foreground">{partner.annualUsers.toLocaleString()}</p>
                              </div>
                              <div className="p-3 bg-muted/40 rounded-lg">
                                <p className="text-xs text-muted-foreground">満足度スコア</p>
                                <p className="text-lg font-bold text-foreground">{partner.satisfactionScore} / 5.0</p>
                              </div>
                              <div className="p-3 bg-muted/40 rounded-lg">
                                <p className="text-xs text-muted-foreground">利用率</p>
                                <p className="text-lg font-bold text-foreground">{partner.utilizationRate}%</p>
                              </div>
                              <div className="p-3 bg-muted/40 rounded-lg">
                                <p className="text-xs text-muted-foreground">提携開始年</p>
                                <p className="text-lg font-bold text-foreground">{partner.partnerSince}年</p>
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
        </CardContent>
      </Card>
    </div>
  )
}
