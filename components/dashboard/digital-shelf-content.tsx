"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  LabelList,
} from "recharts"
import {
  Users,
  Search,
  Eye,
  ShoppingCart,
  Crown,
  ArrowRight,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  X,
  Briefcase,
  AlertTriangle,
  ChevronRight,
} from "lucide-react"
import { FUNNEL_COLORS } from "@/lib/constants"

// 商品の定義（サントリーD2C商品）
const products = [
  { id: "all", name: "全商品", category: "", image: "" },
  { id: "menphys", name: "menphys", category: "健康ドリンク", image: "/images/products/menphys.jpg" },
  { id: "tokucha", name: "特茶/胡麻麦茶", category: "健康飲料", image: "/images/products/tokucha.jpg" },
  { id: "maintenansu", name: "すっきりメンテナン酢", category: "機能性表示食品", image: "/images/products/maintenansu.jpg" },
  { id: "coffee", name: "SUNTORY COFFEE ROASTERY", category: "プレミアムコーヒー", image: "/images/products/coffee-roastery.jpg" },
  { id: "zone", name: "ZONe", category: "エナジードリンク", image: "/images/products/zone.jpg" },
]

// ファネルデータ
const funnelData = [
  { name: "検索", value: 245, fill: FUNNEL_COLORS.search, icon: Search, dropoff: 63.7, dropoffValue: 156 },
  { name: "来訪", value: 89, fill: FUNNEL_COLORS.visit, icon: Eye, dropoff: 52.8, dropoffValue: 47, convRate: 36.3 },
  { name: "カート", value: 42, fill: FUNNEL_COLORS.cart, icon: ShoppingCart, dropoff: 41.7, dropoffValue: 18, convRate: 47.2 },
  { name: "購入", value: 25, fill: FUNNEL_COLORS.purchase, icon: ShoppingCart, dropoff: 60.0, dropoffValue: 15, convRate: 58.3 },
  { name: "リピート", value: 10, fill: FUNNEL_COLORS.repeat, icon: Crown, convRate: 40.0 },
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
  "検索-来訪": {
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
  "来訪-カート": {
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
  "カート-購入": {
    title: "カート → 購入",
    description: "カートに入れた後、実際に購入完了したユーザー層",
    insights: [
      "決済方法の多様性を重視",
      "お得なキャンペーンに反応しやすい",
      "初回購入特典に関心が高い",
    ],
    personas: [
      { name: "伊藤真理", age: 35, gender: "女性", occupation: "会社員", image: "/images/personas/career_woman1.jpg", tags: ["新規顧客", "特典重視"], behavior: "初回割引で購入決定" },
      { name: "渡辺健太", age: 48, gender: "男性", occupation: "自営業", image: "/images/personas/casual_man1.jpg", tags: ["リピーター候補", "品質重視"], behavior: "口コミ確認後に購入" },
    ],
  },
  "購入-リピート": {
    title: "購入 → リピート",
    description: "初回購入後、継続購入しているユーザー層",
    insights: [
      "定期購入への移行率が高い",
      "商品効果を実感している",
      "価格より品質を重視",
    ],
    personas: [
      { name: "中村康夫", age: 55, gender: "男性", occupation: "役員", image: "/images/personas/senior_man1.jpg", tags: ["ロイヤル顧客", "高LTV"], behavior: "定期購入を継続" },
      { name: "小林恵子", age: 50, gender: "女性", occupation: "主婦", image: "/images/personas/housewife1.jpg", tags: ["家族利用", "まとめ買い"], behavior: "家族全員で愛用" },
    ],
  },
}

// ��脱ペルソナデータ
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
  "検索": {
    title: "検索離脱",
    description: "検索後、サイトを訪問せずに離脱したユーザー",
    reasons: [
      "検索結果での表示順位が低い",
      "メタディスクリプションが魅力的でない",
      "競合他社のサイトを選択",
    ],
    recommendations: [
      "SEO対策の強化",
      "リスティング広告の最適化",
      "ブランド認知向上キャンペーン",
    ],
    personas: [
      { name: "情報探索型ユーザー", age: 30, gender: "男性", occupation: "会社員", image: "/images/personas/casual_man1.jpg", tags: ["比較検討", "慎重派"], dropReason: "他社サイトを優先" },
    ],
  },
  "来訪": {
    title: "来訪離脱",
    description: "サイト訪問後、カートに入れずに離脱したユーザー",
    reasons: [
      "商品情報が不十分",
      "価格が期待より高い",
      "サイトの使いやすさに問題",
    ],
    recommendations: [
      "商品ページの情報充実",
      "お試しセットの導入",
      "UI/UXの改善",
    ],
    personas: [
      { name: "価格敏感ユーザー", age: 35, gender: "女性", occupation: "主婦", image: "/images/personas/housewife1.jpg", tags: ["価格比較", "慎重"], dropReason: "価格が高いと感じた" },
    ],
  },
  "カート": {
    title: "カート放棄",
    description: "カートに商品を入れたが購入しなかったユーザー",
    reasons: [
      "送料が予想より高い",
      "決済方法の選択肢が少ない",
      "購入手続きが複雑",
    ],
    recommendations: [
      "送料無料キャンペーン",
      "決済方法の追加",
      "チェックアウトプロセスの簡素化",
    ],
    personas: [
      { name: "送料敏感ユーザー", age: 40, gender: "女性", occupation: "パート", image: "/images/personas/middle_woman1.jpg", tags: ["送料重視", "価格比較"], dropReason: "送料が高い" },
    ],
  },
  "購入": {
    title: "単発購入",
    description: "一度購入したがリピートしていないユーザー",
    reasons: [
      "商品効果を実感できなかった",
      "価格に見合う価値を感じなかった",
      "他社商品に乗り換え",
    ],
    recommendations: [
      "フォローアップメールの最適化",
      "定期購入特典の強化",
      "使用方法のサポート強化",
    ],
    personas: [
      { name: "効果実感できず離脱", age: 45, gender: "男性", occupation: "会社員", image: "/images/personas/casual_man1.jpg", tags: ["効果重視", "短期判断"], dropReason: "効果を感じなかった" },
    ],
  },
}

export function DigitalShelfContent() {
  const [selectedProduct] = useState("all")
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [selectedDropoff, setSelectedDropoff] = useState<string | null>(null)

  const currentProduct = products.find(p => p.id === selectedProduct)
  const flowData = selectedFlow ? flowPersonas[selectedFlow] : null
  const dropoffData = selectedDropoff ? dropoffPersonas[selectedDropoff] : null

  // カスタムツールチップ
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof funnelData[0] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-card p-3 rounded-lg shadow-lg border">
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-lg font-bold" style={{ color: data.fill }}>{data.value}万人</p>
          {data.convRate && (
            <p className="text-xs text-emerald-600">コンバージョン率: {data.convRate}%</p>
          )}
          {data.dropoff && (
            <p className="text-xs text-red-500">離脱率: {data.dropoff}%</p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* 購買ファネル分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            購買ファネル分析
          </CardTitle>
          <CardDescription>
            検索から購入、リピートまでのユーザーフロー。各ステージをクリックすると詳細が表示されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 横向きファネルチャート */}
          <div className="py-4">
            <div className="flex items-center justify-center gap-0">
              {funnelData.map((stage, index) => {
                const Icon = stage.icon
                const maxValue = funnelData[0].value
                const heightPercent = (stage.value / maxValue) * 100
                const nextStage = funnelData[index + 1]
                const flowKey = nextStage ? `${stage.name}-${nextStage.name}` : null
                const isSelected = selectedFlow === flowKey || selectedDropoff === stage.name
                const isLast = index === funnelData.length - 1
                
                return (
                  <div key={stage.name} className="flex items-center">
                    {/* ファネルセグメント */}
                    <div 
                      className={`relative flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isSelected ? 'scale-105' : 'hover:scale-102'
                      }`}
                      style={{
                        width: '140px',
                        height: `${Math.max(heightPercent * 1.6, 60)}px`,
                        minHeight: '60px',
                        maxHeight: '160px',
                      }}
                      onClick={() => {
                        if (flowKey) {
                          setSelectedFlow(flowKey)
                          setSelectedDropoff(null)
                        }
                      }}
                    >
                      {/* ファネル形状（SVG） */}
                      <svg 
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 140 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points={
                            index === 0
                              ? "0,0 140,10 140,90 0,100"
                              : isLast
                              ? "0,15 140,30 140,70 0,85"
                              : `0,${5 + index * 3} 140,${10 + index * 4} 140,${90 - index * 4} 0,${95 - index * 3}`
                          }
                          fill={stage.fill}
                          className="transition-opacity hover:opacity-90"
                        />
                      </svg>
                      
                      {/* コンテンツ */}
                      <div className="relative z-10 flex flex-col items-center text-white">
                        <Icon className="h-5 w-5 mb-1 drop-shadow" />
                        <span className="text-lg font-bold drop-shadow">{stage.value}万人</span>
                        <span className="text-xs font-medium drop-shadow opacity-90">{stage.name}</span>
                      </div>
                    </div>
                    
                    {/* 矢印コネクタと離脱情報 */}
                    {!isLast && (
                      <div className="flex flex-col items-center mx-2 gap-1">
                        <div className="flex items-center gap-1">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        {stage.convRate && (
                          <span className="text-xs font-semibold text-emerald-600">{stage.convRate}%</span>
                        )}
                        {stage.dropoff && (
                          <span className="text-xs font-semibold text-red-500">離脱 {stage.dropoff}%</span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
                      {stage.dropoff && (
                        <button
                          className="text-[10px] text-red-500 hover:text-red-600 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDropoff(stage.name)
                            setSelectedFlow(null)
                          }}
                        >
                          離脱 {stage.dropoff}%
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* 矢印 */}
                  {index < funnelData.length - 1 && (
                    <div className="flex items-center mx-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-current to-transparent" style={{ color: stage.fill }} />
                      <ChevronRight className="h-4 w-4 -ml-1" style={{ color: nextStage?.fill }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

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
