"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

// サンキーダイアグラムのステージデータ（サントリーブランドカラー）
const sankeyStages = [
  { id: "search", name: "検索", icon: Search, count: 2450000, color: "#0068B7" },    // サントリーブルー
  { id: "visit", name: "来訪", icon: Eye, count: 890000, color: "#0088CC" },         // ライトブルー
  { id: "cart", name: "カート", icon: ShoppingCart, count: 420000, color: "#00A0E9" }, // スカイブルー
  { id: "purchase", name: "購入", icon: ShoppingCart, count: 245000, color: "#00B894" }, // ティール
  { id: "repeat", name: "リピート", icon: Crown, count: 98000, color: "#F5A623" },   // ゴールド
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
      { name: "松本恵子", age: 45, gender: "女性", occupation: "パート", image: "/images/personas/middle_woman1.jpg", tags: ["口コミ重視", "慎重派"], dropReason: "レビュ���数が少なかった" },
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

  // サンキーダイアグラムのSVG描画（モダンデザイン）
  const renderSankeyDiagram = () => {
    const totalWidth = 900
    const svgHeight = 400
    const nodeWidth = 8
    const nodePadding = 140
    const maxCount = sankeyStages[0].count
    const baseY = 100
    const maxNodeHeight = 200

    // グラデーション定義用のカラー（サントリーブランドカラー：青系）
    const gradientColors = [
      { from: "#0068B7", to: "#0088CC" }, // 検索→来訪 (サントリーブルー)
      { from: "#0088CC", to: "#00A0E9" }, // 来訪→カート (ライトブルー)
      { from: "#00A0E9", to: "#00B894" }, // カート→購入 (シアン→ティール)
      { from: "#00B894", to: "#F5A623" }, // 購入→リピート (ティール→ゴールド)
    ]

    const stageColors = ["#0068B7", "#0088CC", "#00A0E9", "#00B894", "#F5A623"]

    return (
      <div className="relative w-full overflow-x-auto py-4">
        <svg width={totalWidth} height={svgHeight} className="mx-auto" viewBox={`0 0 ${totalWidth} ${svgHeight}`}>
          <defs>
            {/* フロー用グラデーション */}
            {gradientColors.map((color, i) => (
              <linearGradient key={`flow-gradient-${i}`} id={`flowGradient${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color.from} stopOpacity="0.6" />
                <stop offset="100%" stopColor={color.to} stopOpacity="0.6" />
              </linearGradient>
            ))}
            {/* ノード用グラデーション */}
            {stageColors.map((color, i) => (
              <linearGradient key={`node-gradient-${i}`} id={`nodeGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.7" />
              </linearGradient>
            ))}
            {/* 離脱用グラデーション */}
            <linearGradient id="dropoffGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F87171" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F87171" stopOpacity="0.1" />
            </linearGradient>
            {/* シャドウフィルター */}
            <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* フローパス（滑らかな曲線） */}
          {sankeyFlows.map((flow, index) => {
            const fromIndex = sankeyStages.findIndex(s => s.id === flow.from)
            const toIndex = sankeyStages.findIndex(s => s.id === flow.to)
            const fromStage = sankeyStages[fromIndex]
            const toStage = sankeyStages[toIndex]
            
            const fromX = fromIndex * nodePadding + 60 + nodeWidth
            const toX = toIndex * nodePadding + 60
            const fromHeight = (fromStage.count / maxCount) * maxNodeHeight
            const toHeight = (toStage.count / maxCount) * maxNodeHeight
            const flowHeight = Math.min((flow.value / maxCount) * maxNodeHeight, toHeight)
            
            const controlOffset = (toX - fromX) * 0.4
            
            const pathD = `
              M ${fromX} ${baseY}
              C ${fromX + controlOffset} ${baseY}, ${toX - controlOffset} ${baseY}, ${toX} ${baseY}
              L ${toX} ${baseY + flowHeight}
              C ${toX - controlOffset} ${baseY + flowHeight}, ${fromX + controlOffset} ${baseY + flowHeight}, ${fromX} ${baseY + flowHeight}
              Z
            `
            
            return (
              <g key={`flow-${index}`} className="group">
                <path
                  d={pathD}
                  fill={`url(#flowGradient${index})`}
                  className="cursor-pointer transition-all duration-300 group-hover:opacity-80"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                  onClick={() => setSelectedFlow(`${flow.from}-${flow.to}`)}
                />
                {/* フロー率ラベル */}
                <g className="pointer-events-none">
                  <rect
                    x={(fromX + toX) / 2 - 28}
                    y={baseY + flowHeight / 2 - 12}
                    width="56"
                    height="24"
                    rx="12"
                    fill="white"
                    fillOpacity="0.95"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
                  />
                  <text
                    x={(fromX + toX) / 2}
                    y={baseY + flowHeight / 2 + 5}
                    textAnchor="middle"
                    className="text-sm font-semibold"
                    fill={stageColors[toIndex]}
                  >
                    {flow.rate}%
                  </text>
                </g>
              </g>
            )
          })}
          
          {/* ステージノード（縦バー） */}
          {sankeyStages.map((stage, index) => {
            const x = index * nodePadding + 60
            const height = (stage.count / maxCount) * maxNodeHeight
            const Icon = stage.icon
            
            return (
              <g key={stage.id}>
                {/* ノードバー */}
                <rect
                  x={x}
                  y={baseY}
                  width={nodeWidth}
                  height={height}
                  fill={`url(#nodeGradient${index})`}
                  rx={4}
                  filter="url(#nodeShadow)"
                />
                {/* ラベル（上部） */}
                <foreignObject x={x - 50} y={baseY - 70} width={110} height={65}>
                  <div className="flex flex-col items-center justify-end h-full text-center">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-full mb-1"
                      style={{ backgroundColor: `${stageColors[index]}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: stageColors[index] }} />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{stage.name}</span>
                    <span className="text-lg font-bold" style={{ color: stageColors[index] }}>
                      {(stage.count / 10000).toFixed(0)}万人
                    </span>
                  </div>
                </foreignObject>
                
                {/* 離脱表示（下部） */}
                {sankeyDropoffs[index] && (
                  <g 
                    className="cursor-pointer group/drop"
                    onClick={() => setSelectedDropoff(stage.id)}
                  >
                    <foreignObject x={x - 45} y={baseY + height + 10} width={100} height={60}>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 group-hover/drop:bg-red-100 transition-colors border border-red-200">
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-xs font-semibold text-red-600">
                            -{sankeyDropoffs[index].rate}%
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1">
                          {(sankeyDropoffs[index].value / 10000).toFixed(0)}万人離脱
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                )}
              </g>
            )
          })}

          {/* 矢印インジケーター */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`arrow-${i}`} className="pointer-events-none">
              <circle
                cx={i * nodePadding + 60 + nodePadding / 2}
                cy={baseY - 10}
                r="12"
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <path
                d={`M ${i * nodePadding + 60 + nodePadding / 2 - 4} ${baseY - 10} l 8 0 l -4 5 z`}
                fill="#9CA3AF"
                transform={`rotate(270, ${i * nodePadding + 60 + nodePadding / 2}, ${baseY - 10})`}
              />
            </g>
          ))}
        </svg>
        
        {/* 凡例 */}
        <div className="flex items-center justify-center gap-8 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-60" />
            <span className="text-muted-foreground">コンバージョン（クリックで詳細）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-full bg-red-50 border border-red-200">
              <span className="text-[10px] text-red-600 font-medium">-XX%</span>
            </div>
            <span className="text-muted-foreground">離脱率（クリックで詳細）</span>
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
                  <p className="text-xs text-muted-foreground">購入ユーザー��</p>
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

      {/* フロー詳細（インライン表示） */}
      {selectedFlow && flowData && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  {flowData.title}
                </CardTitle>
                <CardDescription>{flowData.description}</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedFlow(null)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
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
                <div className="space-y-3">
                  {flowData.personas.map((persona, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-card rounded-lg border">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{persona.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {persona.age}歳 / {persona.gender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground">行動特性</p>
                        <p className="text-xs font-medium text-primary">{persona.behavior}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 離脱詳細（インライン表示） */}
      {selectedDropoff && dropoffData && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  {dropoffData.title}
                </CardTitle>
                <CardDescription>{dropoffData.description}</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedDropoff(null)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
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
                <div className="space-y-3">
                  {dropoffData.personas.map((persona, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-card rounded-lg border border-destructive/20">
                      <Avatar className="h-10 w-10 border-2 border-destructive/20">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{persona.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {persona.age}歳 / {persona.gender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground">離脱理由</p>
                        <p className="text-xs font-medium text-destructive">{persona.dropReason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </main>
  )
}
