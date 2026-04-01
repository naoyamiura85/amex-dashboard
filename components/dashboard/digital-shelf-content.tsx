"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Users,
  Search,
  Eye,
  ShoppingCart,
  Crown,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  X,
  User,
  Briefcase,
  Heart,
  AlertTriangle,
} from "lucide-react"

// 商品の定義（サントリーD2C商品）
const products = [
  { id: "all", name: "全商品", category: "", image: "" },
  { id: "menphys", name: "menphys", category: "健康ドリンク", image: "/images/products/menphys.jpg" },
  { id: "tokucha", name: "特茶/胡麻麦茶", category: "健康飲料", image: "/images/products/tokucha.jpg" },
  { id: "maintenansu", name: "すっきりメンテナン酢", category: "機能性表示食品", image: "/images/products/maintenansu.jpg" },
  { id: "coffee", name: "SUNTORY COFFEE ROASTERY", category: "プレミアムコーヒー", image: "/images/products/coffee-roastery.jpg" },
  { id: "zone", name: "ZONe", category: "エナジードリンク", image: "/images/products/zone.jpg" },
]

// サンキーダイアグラムのステージデータ
const sankeyStages = [
  { id: "search", name: "検索", icon: Search, count: 2450000, color: "#6B7280" },
  { id: "visit", name: "来訪", icon: Eye, count: 890000, color: "#3B82F6" },
  { id: "cart", name: "カート", icon: ShoppingCart, count: 420000, color: "#8B5CF6" },
  { id: "purchase", name: "購入", icon: ShoppingCart, count: 245000, color: "#10B981" },
  { id: "repeat", name: "リピート", icon: Crown, count: 98000, color: "#F59E0B" },
]

// フロー（移動）データ
const sankeyFlows = [
  { from: "search", to: "visit", value: 890000, rate: 36.3 },
  { from: "visit", to: "cart", value: 420000, rate: 47.2 },
  { from: "cart", to: "purchase", value: 245000, rate: 58.3 },
  { from: "purchase", to: "repeat", value: 98000, rate: 40.0 },
]

// 離脱データ
const sankeyDropoffs = [
  { from: "search", value: 1560000, rate: 63.7, reason: "検索離脱" },
  { from: "visit", value: 470000, rate: 52.8, reason: "来訪離脱" },
  { from: "cart", value: 175000, rate: 41.7, reason: "カート放棄" },
  { from: "purchase", value: 147000, rate: 60.0, reason: "単発購入" },
]

// ペルソナデータ（フローごと）
const flowPersonas: Record<string, {
  title: string
  description: string
  insights: string[]
  personas: Array<{
    name: string
    age: number
    gender: string
    occupation: string
    image: string
    tags: string[]
    behavior: string
  }>
}> = {
  "search-visit": {
    title: "検索 → 来訪",
    description: "検索から実際にサイトを訪問したユーザー層",
    insights: [
      "健康志向が高く、特定の成分名で検索する傾向",
      "口コミやレビューを重視する",
      "比較検討に時間をかける",
    ],
    personas: [
      { name: "佐藤健一", age: 45, gender: "男性", occupation: "会社員", image: "/images/personas/casual_man1.jpg", tags: ["健康志向", "情報収集型"], behavior: "成分効果を詳しく調査" },
      { name: "田中美和", age: 38, gender: "女性", occupation: "主婦", image: "/images/personas/housewife1.jpg", tags: ["家族の健康", "価格比較"], behavior: "複数商品を比較検討" },
      { name: "山田拓也", age: 52, gender: "男性", occupation: "経営者", image: "/images/personas/senior_man1.jpg", tags: ["プレミアム志向", "時短"], behavior: "口コミ評価を重視" },
    ],
  },
  "visit-cart": {
    title: "来訪 → カート",
    description: "サイト訪問後、カートに商品を追加したユーザー層",
    insights: [
      "商品詳細ページを複数回閲覧",
      "定期購入オプションに関心が高い",
      "送料無料ラインを意識した購買行動",
    ],
    personas: [
      { name: "鈴木洋子", age: 42, gender: "女性", occupation: "パート", image: "/images/personas/middle_woman1.jpg", tags: ["コスパ重視", "まとめ買い"], behavior: "送料無料を狙う" },
      { name: "高橋誠", age: 58, gender: "男性", occupation: "管理職", image: "/images/personas/casual_man1.jpg", tags: ["定期購入派", "品質重視"], behavior: "定期便を検討" },
    ],
  },
  "cart-purchase": {
    title: "カート → 購入",
    description: "カートから実際に購入完了したユーザー層",
    insights: [
      "決済方法の選択肢を重視",
      "初回割引キャンペーンに反応",
      "レビュー投稿率が高い",
    ],
    personas: [
      { name: "伊藤恵", age: 35, gender: "女性", occupation: "会社員", image: "/images/personas/young_woman1.jpg", tags: ["即決型", "ポイント活用"], behavior: "クーポン利用で購入" },
      { name: "渡辺健太", age: 48, gender: "男性", occupation: "自営業", image: "/images/personas/senior_man1.jpg", tags: ["信頼重視", "継続利用"], behavior: "まずは試し買い" },
    ],
  },
  "purchase-repeat": {
    title: "購入 → リピート",
    description: "初回購入後、継続購入しているロイヤルユーザー層",
    insights: [
      "平均LTVが最も高いセグメント",
      "口コミ投稿・紹介が活発",
      "新商品への関心が高い",
    ],
    personas: [
      { name: "小林正雄", age: 65, gender: "男性", occupation: "退職", image: "/images/personas/senior_man1.jpg", tags: ["健康投資", "ロイヤル"], behavior: "毎月定期購入" },
      { name: "中村由美", age: 55, gender: "女性", occupation: "専業主婦", image: "/images/personas/housewife1.jpg", tags: ["品質重視", "紹介者"], behavior: "家族にも推奨" },
    ],
  },
}

// 離脱ペルソナデータ
const dropoffPersonas: Record<string, {
  title: string
  description: string
  reasons: string[]
  recommendations: string[]
  personas: Array<{
    name: string
    age: number
    gender: string
    occupation: string
    image: string
    tags: string[]
    dropReason: string
  }>
}> = {
  "search": {
    title: "検索離脱",
    description: "検索後、サイトに来訪せず離脱したユーザー層",
    reasons: [
      "検索結果での競合優位性不足",
      "広告クリエイティブの訴求力不足",
      "ブランド認知度の低さ",
    ],
    recommendations: [
      "SEO対策の強化（特に成分名キーワード）",
      "リスティング広告のクリエイティブ改善",
      "SNSでのブランド認知向上施策",
    ],
    personas: [
      { name: "木村太郎", age: 32, gender: "男性", occupation: "会社員", image: "/images/personas/young_man1.jpg", tags: ["価格重視", "即断型"], dropReason: "競合の安さに流れた" },
      { name: "松本恵子", age: 45, gender: "女性", occupation: "パート", image: "/images/personas/middle_woman1.jpg", tags: ["口コミ重視", "慎重派"], dropReason: "レビュー数が少なかった" },
    ],
  },
  "visit": {
    title: "来訪離脱",
    description: "サイト訪問後、カートに入れずに離脱したユーザー層",
    reasons: [
      "商品情報の不足・わかりにくさ",
      "価格への納得感不足",
      "サイトの使いにくさ",
    ],
    recommendations: [
      "商品詳細ページのコンテンツ充実",
      "価格の根拠・価値の明確化",
      "サイトUX/UIの改善",
    ],
    personas: [
      { name: "斎藤健", age: 55, gender: "男性", occupation: "管理職", image: "/images/personas/senior_man1.jpg", tags: ["比較検討", "時間がない"], dropReason: "情報収集だけで終了" },
      { name: "井上美咲", age: 28, gender: "女性", occupation: "会社員", image: "/images/personas/young_woman1.jpg", tags: ["SNS情報重視", "価格敏感"], dropReason: "思ったより高かった" },
    ],
  },
  "cart": {
    title: "カート放棄",
    description: "カートに入れたが購入せず離脱したユーザー層",
    reasons: [
      "送料が高い",
      "決済方法が限られている",
      "購入手続きが複雑",
    ],
    recommendations: [
      "送料無料キャンペーンの実施",
      "決済方法の追加（Amazon Pay等）",
      "購入フローの簡素化",
    ],
    personas: [
      { name: "加藤裕子", age: 40, gender: "女性", occupation: "主婦", image: "/images/personas/housewife1.jpg", tags: ["送料敏感", "まとめ買い派"], dropReason: "送料がかかると分かり離脱" },
      { name: "山口隆", age: 38, gender: "男性", occupation: "エンジニア", image: "/images/personas/casual_man1.jpg", tags: ["Amazon Pay派", "時短重視"], dropReason: "決済が面倒で後回し" },
    ],
  },
  "purchase": {
    title: "単発購入",
    description: "1回購入したが、リピートしていないユーザー層",
    reasons: [
      "効果実感の不足",
      "価格に対する継続負担感",
      "定期購入への心理的ハードル",
    ],
    recommendations: [
      "効果実感を促すフォローメール",
      "2回目購入の特別割引",
      "定期購入のメリット訴求強化",
    ],
    personas: [
      { name: "森田一郎", age: 50, gender: "男性", occupation: "自営業", image: "/images/personas/senior_man1.jpg", tags: ["試し買い", "効果重視"], dropReason: "効果がよくわからなかった" },
      { name: "石井真由美", age: 35, gender: "女性", occupation: "会社員", image: "/images/personas/young_woman1.jpg", tags: ["飽き性", "新商品好き"], dropReason: "他の商品を試したくなった" },
    ],
  },
}

interface DigitalShelfContentProps {
  selectedProduct?: string
}

export function DigitalShelfContent({ selectedProduct = "all" }: DigitalShelfContentProps) {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [selectedDropoff, setSelectedDropoff] = useState<string | null>(null)

  const currentProduct = products.find(p => p.id === selectedProduct)

  // フローのモーダルデータ
  const flowData = selectedFlow ? flowPersonas[selectedFlow] : null
  const dropoffData = selectedDropoff ? dropoffPersonas[selectedDropoff] : null

  // サンキーダイアグラムのSVG描画
  const renderSankeyDiagram = () => {
    const stageWidth = 120
    const stageGap = 100
    const svgWidth = (stageWidth + stageGap) * sankeyStages.length - stageGap
    const svgHeight = 320
    const maxCount = sankeyStages[0].count

    return (
      <div className="relative w-full overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="min-w-full">
          {/* フローパス（移動） */}
          {sankeyFlows.map((flow, index) => {
            const fromIndex = sankeyStages.findIndex(s => s.id === flow.from)
            const toIndex = sankeyStages.findIndex(s => s.id === flow.to)
            const fromStage = sankeyStages[fromIndex]
            const toStage = sankeyStages[toIndex]
            
            const fromX = fromIndex * (stageWidth + stageGap) + stageWidth
            const toX = toIndex * (stageWidth + stageGap)
            const fromHeight = (fromStage.count / maxCount) * 180
            const toHeight = (toStage.count / maxCount) * 180
            const flowHeight = (flow.value / maxCount) * 180
            
            const fromY = 80
            const toY = 80
            
            const pathD = `
              M ${fromX} ${fromY}
              C ${fromX + 50} ${fromY}, ${toX - 50} ${toY}, ${toX} ${toY}
              L ${toX} ${toY + flowHeight}
              C ${toX - 50} ${toY + flowHeight}, ${fromX + 50} ${fromY + flowHeight}, ${fromX} ${fromY + flowHeight}
              Z
            `
            
            return (
              <g key={`flow-${index}`}>
                <path
                  d={pathD}
                  fill={toStage.color}
                  fillOpacity={0.3}
                  stroke={toStage.color}
                  strokeWidth={1}
                  className="cursor-pointer hover:fill-opacity-50 transition-all"
                  onClick={() => setSelectedFlow(`${flow.from}-${flow.to}`)}
                />
                <text
                  x={(fromX + toX) / 2}
                  y={fromY + flowHeight / 2 + 4}
                  textAnchor="middle"
                  className="text-xs fill-foreground font-medium pointer-events-none"
                >
                  {flow.rate}%
                </text>
              </g>
            )
          })}
          
          {/* 離脱パス */}
          {sankeyDropoffs.map((dropoff, index) => {
            const fromIndex = sankeyStages.findIndex(s => s.id === dropoff.from)
            const fromStage = sankeyStages[fromIndex]
            
            const x = fromIndex * (stageWidth + stageGap) + stageWidth / 2
            const fromHeight = (fromStage.count / maxCount) * 180
            const dropoffHeight = (dropoff.value / maxCount) * 180
            const startY = 80 + fromHeight - dropoffHeight
            
            return (
              <g key={`dropoff-${index}`}>
                <path
                  d={`
                    M ${x - 20} ${startY}
                    Q ${x - 20} ${svgHeight - 40}, ${x - 50} ${svgHeight - 30}
                    L ${x - 40} ${svgHeight - 30}
                    Q ${x - 10} ${svgHeight - 50}, ${x + 20} ${startY + dropoffHeight}
                    Z
                  `}
                  fill="#EF4444"
                  fillOpacity={0.2}
                  stroke="#EF4444"
                  strokeWidth={1}
                  strokeDasharray="4 2"
                  className="cursor-pointer hover:fill-opacity-40 transition-all"
                  onClick={() => setSelectedDropoff(dropoff.from)}
                />
                <text
                  x={x - 35}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  className="text-[10px] fill-destructive font-medium pointer-events-none"
                >
                  -{dropoff.rate}%
                </text>
              </g>
            )
          })}
          
          {/* ステージノード */}
          {sankeyStages.map((stage, index) => {
            const x = index * (stageWidth + stageGap)
            const height = (stage.count / maxCount) * 180
            const Icon = stage.icon
            
            return (
              <g key={stage.id}>
                <rect
                  x={x}
                  y={80}
                  width={stageWidth}
                  height={height}
                  fill={stage.color}
                  rx={8}
                  className="drop-shadow-sm"
                />
                <foreignObject x={x} y={20} width={stageWidth} height={50}>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex items-center gap-1 text-foreground">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{stage.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(stage.count / 10000).toFixed(0)}万人
                    </span>
                  </div>
                </foreignObject>
              </g>
            )
          })}
        </svg>
        
        {/* 凡例 */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-primary/30 rounded border border-primary" />
            <span className="text-muted-foreground">移動（クリックで詳細）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-destructive/20 rounded border border-destructive border-dashed" />
            <span className="text-muted-foreground">離脱（クリックで詳細）</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* 選択された商品のサマリー表示 */}
      {currentProduct && currentProduct.id !== "all" && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{currentProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{currentProduct.category}</p>
              </div>
              <div className="ml-auto flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">24.5万人</p>
                  <p className="text-xs text-muted-foreground">購入ユーザー数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">+12.3%</p>
                  <p className="text-xs text-muted-foreground">前月比</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">¥18,500</p>
                  <p className="text-xs text-muted-foreground">平均LTV</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* サンキーダイアグラム */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            購買ファネル分析
          </CardTitle>
          <CardDescription>
            検索から購入、リピートまでのユーザーフロー。フローや離脱部分をクリックすると該当ペルソナの詳細が見られます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderSankeyDiagram()}
        </CardContent>
      </Card>

      {/* ファネル別サマリーカード */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {sankeyStages.map((stage, index) => {
          const flow = sankeyFlows[index]
          const dropoff = sankeyDropoffs[index]
          const Icon = stage.icon
          
          return (
            <Card key={stage.id} className="relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: stage.color }}
              />
              <CardContent className="pt-4 pb-3 px-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4" style={{ color: stage.color }} />
                  <span className="font-medium text-sm">{stage.name}</span>
                </div>
                <p className="text-xl font-bold">{(stage.count / 10000).toFixed(0)}万人</p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  {flow && (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      次へ {flow.rate}%
                    </span>
                  )}
                  {dropoff && (
                    <span className="text-destructive flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      離脱 {dropoff.rate}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* フロー詳細モーダル */}
      <Dialog open={!!selectedFlow} onOpenChange={() => setSelectedFlow(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              {flowData?.title}
            </DialogTitle>
            <DialogDescription>{flowData?.description}</DialogDescription>
          </DialogHeader>
          
          {flowData && (
            <div className="space-y-6">
              {/* インサイト */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  主なインサイト
                </h4>
                <ul className="space-y-2">
                  {flowData.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 代表的なペルソナ */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  代表的なペルソナ
                </h4>
                <div className="grid gap-3">
                  {flowData.personas.map((persona, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{persona.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {persona.age}歳 / {persona.gender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {persona.occupation}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {persona.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">行動特性</p>
                        <p className="text-sm font-medium text-primary">{persona.behavior}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 離脱詳細モーダル */}
      <Dialog open={!!selectedDropoff} onOpenChange={() => setSelectedDropoff(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              {dropoffData?.title}
            </DialogTitle>
            <DialogDescription>{dropoffData?.description}</DialogDescription>
          </DialogHeader>
          
          {dropoffData && (
            <div className="space-y-6">
              {/* 離脱理由 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <X className="h-4 w-4 text-destructive" />
                  主な離脱理由
                </h4>
                <ul className="space-y-2">
                  {dropoffData.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-destructive mt-1">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 改善提案 */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  改善提案
                </h4>
                <ul className="space-y-2">
                  {dropoffData.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                      <span className="mt-1">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 離脱ペルソナ */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-destructive" />
                  離脱ユーザーの特徴
                </h4>
                <div className="grid gap-3">
                  {dropoffData.personas.map((persona, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                      <Avatar className="h-12 w-12 border-2 border-destructive/20">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{persona.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {persona.age}歳 / {persona.gender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {persona.occupation}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {persona.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-[10px] border-destructive/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">離脱理由</p>
                        <p className="text-sm font-medium text-destructive">{persona.dropReason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
