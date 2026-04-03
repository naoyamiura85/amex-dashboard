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

// ファネルセグメントごとのペルソナデータ
const stagePersonas: Record<string, {
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
  "検索": {
    title: "検索ユーザー層",
    description: "サントリー商品を検索エンジンで探しているユーザー",
    insights: [
      "健康効果や成分名のキーワードで検索する傾向が高い",
      "比較サイトや口コミから流入するケースが多い",
      "20〜60代の幅広い年齢層が含まれる",
    ],
    personas: [
      { name: "佐藤健一", age: 45, gender: "男性", occupation: "会社員", image: "/images/personas/casual_man1.jpg", tags: ["健康志向", "情報収集型"], behavior: "成分効果をキーワード検索で調査" },
      { name: "田中美和", age: 38, gender: "女性", occupation: "主婦", image: "/images/personas/housewife1.jpg", tags: ["家族の健康", "比較検討"], behavior: "複数ブランドを同時に比較" },
      { name: "山田拓也", age: 52, gender: "男性", occupation: "経営者", image: "/images/personas/senior_man1.jpg", tags: ["プレミアム志向", "口コミ重視"], behavior: "SNSや口コミ評価を確認後に検索" },
    ],
  },
  "来訪": {
    title: "サイト来訪ユーザー層",
    description: "検索結果からサイトを訪問し、商品を閲覧しているユーザー",
    insights: [
      "商品詳細ページを平均3.2ページ閲覧",
      "定期購入ページのクリック率が高い",
      "スマートフォン経由の訪問が68%を占める",
    ],
    personas: [
      { name: "鈴木洋子", age: 42, gender: "女性", occupation: "パート", image: "/images/personas/middle_woman1.jpg", tags: ["コスパ重視", "まとめ買い検討"], behavior: "送料無料ラインを確認しながら閲覧" },
      { name: "高橋誠", age: 58, gender: "男性", occupation: "管理職", image: "/images/personas/casual_man1.jpg", tags: ["定期購入候補", "品質重視"], behavior: "定期便ページを複数回閲覧" },
    ],
  },
  "カート": {
    title: "カート追加ユーザー層",
    description: "商品をカートに追加し、購入を検討しているユーザー",
    insights: [
      "カート追加後の平均滞在時間は12分",
      "お気に入り登録との併用率が高い",
      "初回購入特典の確認が多い",
    ],
    personas: [
      { name: "伊藤真理", age: 35, gender: "女性", occupation: "会社員", image: "/images/personas/career_woman1.jpg", tags: ["新規顧客", "特典重視"], behavior: "初回割引クーポンを探してカートに追加" },
      { name: "渡辺健太", age: 48, gender: "男性", occupation: "自営業", image: "/images/personas/casual_man1.jpg", tags: ["リピーター候補", "慎重型"], behavior: "口コミ確認後にカートへ追加" },
    ],
  },
  "購入": {
    title: "購入完了ユーザー層",
    description: "実際に購入を完了した優良顧客層",
    insights: [
      "初回購入者の定期便移行率は40%",
      "平均購入金額は¥6,800",
      "購入後のレビュー投稿率が28%と高い",
    ],
    personas: [
      { name: "中村康夫", age: 55, gender: "男性", occupation: "役員", image: "/images/personas/senior_man1.jpg", tags: ["高LTV", "ロイヤル候補"], behavior: "まとめ買いで定期便に移行" },
      { name: "小林恵子", age: 50, gender: "女性", occupation: "主婦", image: "/images/personas/housewife1.jpg", tags: ["家族利用", "口コミ発信"], behavior: "効果を実感しレビューを投稿" },
    ],
  },
  "リピート": {
    title: "リピート購入ユーザー層",
    description: "継続的に購入しているロイヤルカスタマー層",
    insights: [
      "平均LTVは¥48,000と全体の3.2倍",
      "定期便利用率が85%と非常に高い",
      "家族・知人への口コミ紹介が多い",
    ],
    personas: [
      { name: "渡辺久美", age: 53, gender: "女性", occupation: "会社役員", image: "/images/personas/career_woman1.jpg", tags: ["ロイヤル顧客", "高LTV", "紹介者"], behavior: "定期便を3年以上継続し家族に紹介" },
      { name: "木村博", age: 61, gender: "男性", occupation: "定年退職", image: "/images/personas/senior_man1.jpg", tags: ["健康管理", "継続重視"], behavior: "健康維持目的で毎月定期購入" },
    ],
  },
}

export function DigitalShelfContent() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [selectedDropoff, setSelectedDropoff] = useState<string | null>(null)
  const [panelType, setPanelType] = useState<"stage" | "dropoff" | null>(null)

  const stageData = selectedStage ? stagePersonas[selectedStage] : null
  const dropoffData = selectedDropoff ? dropoffPersonas[selectedDropoff] : null

  const handleStageClick = (stageName: string) => {
    if (selectedStage === stageName && panelType === "stage") {
      setSelectedStage(null)
      setPanelType(null)
    } else {
      setSelectedStage(stageName)
      setSelectedDropoff(null)
      setPanelType("stage")
    }
  }

  const handleDropoffClick = (stageName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedDropoff === stageName && panelType === "dropoff") {
      setSelectedDropoff(null)
      setPanelType(null)
    } else {
      setSelectedDropoff(stageName)
      setSelectedStage(null)
      setPanelType("dropoff")
    }
  }

  const closePanel = () => {
    setSelectedStage(null)
    setSelectedDropoff(null)
    setPanelType(null)
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
            各ステージをクリックするとユーザー特徴・AIペルソナが表示されます。離脱率もクリック可能です。
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
                const isStageSelected = selectedStage === stage.name && panelType === "stage"
                const isDropoffSelected = selectedDropoff === stage.name && panelType === "dropoff"
                const isLast = index === funnelData.length - 1

                return (
                  <div key={stage.name} className="flex items-center">
                    {/* ファネルセグメント */}
                    <div
                      className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                        isStageSelected ? "drop-shadow-lg scale-105" : "hover:scale-[1.03]"
                      }`}
                      style={{
                        width: "140px",
                        height: `${Math.max(heightPercent * 1.6, 60)}px`,
                        minHeight: "60px",
                        maxHeight: "160px",
                      }}
                      onClick={() => handleStageClick(stage.name)}
                      title={`${stage.name}ステージの詳細を見る`}
                    >
                      {/* ファネル形状 */}
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
                          opacity={isStageSelected ? 1 : 0.92}
                        />
                      </svg>

                      {/* コンテンツ */}
                      <div className="relative z-10 flex flex-col items-center text-white">
                        <Icon className="h-5 w-5 mb-1 drop-shadow" />
                        <span className="text-lg font-bold drop-shadow">{stage.value}万人</span>
                        <span className="text-xs font-medium drop-shadow opacity-90">{stage.name}</span>
                      </div>

                      {/* 選択インジケーター */}
                      {isStageSelected && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-primary border-l border-t border-primary/30" />
                      )}
                    </div>

                    {/* コネクタ：CV率 + 離脱ボタン */}
                    {!isLast && (
                      <div className="flex flex-col items-center mx-2 gap-1">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        {nextStage?.convRate && (
                          <span className="text-[11px] font-semibold text-emerald-600">
                            {nextStage.convRate}%
                          </span>
                        )}
                        {stage.dropoff && (
                          <button
                            className={`text-[11px] font-semibold px-1.5 py-0.5 rounded transition-colors ${
                              isDropoffSelected
                                ? "bg-red-100 text-red-600"
                                : "text-red-500 hover:bg-red-50 hover:text-red-600"
                            }`}
                            onClick={(e) => handleDropoffClick(stage.name, e)}
                            title="離脱ユーザーの詳細を見る"
                          >
                            離脱 {stage.dropoff}%
                          </button>
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

      {/* ステージ詳細パネル */}
      {panelType === "stage" && stageData && (
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {stageData.title}
                </CardTitle>
                <CardDescription>{stageData.description}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={closePanel} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* インサイト */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  AIインサイト
                </h4>
                <ul className="space-y-2">
                  {stageData.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ペルソナ */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  AIペルソナ
                </h4>
                <div className="space-y-2">
                  {stageData.personas.map((persona, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                      <Avatar className="h-10 w-10 border-2 border-primary/20 shrink-0">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{persona.name}</span>
                          <span className="text-xs text-muted-foreground">{persona.age}歳 / {persona.gender}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {persona.occupation}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {persona.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground mb-0.5">行動特性</p>
                        <p className="text-xs font-medium text-primary max-w-[120px] text-right">{persona.behavior}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 離脱詳細パネル */}
      {panelType === "dropoff" && dropoffData && (
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
              <Button variant="ghost" size="icon" onClick={closePanel} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* 離脱理由 */}
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <X className="h-4 w-4 text-destructive" />
                  主な離脱理由
                </h4>
                <ul className="space-y-2">
                  {dropoffData.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-destructive mt-1 shrink-0">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 改善提案 */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  AI改善提案
                </h4>
                <ul className="space-y-2">
                  {dropoffData.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                      <span className="mt-1 shrink-0">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 離脱ペルソナ */}
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-destructive" />
                  離脱ユーザーの特徴
                </h4>
                <div className="space-y-2">
                  {dropoffData.personas.map((persona, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-card rounded-lg border border-destructive/20">
                      <Avatar className="h-10 w-10 border-2 border-destructive/20 shrink-0">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{persona.name}</span>
                          <span className="text-xs text-muted-foreground">{persona.age}歳 / {persona.gender}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {persona.occupation}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {persona.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-[10px] border-destructive/30">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground mb-0.5">離脱理由</p>
                        <p className="text-xs font-medium text-destructive max-w-[100px] text-right">{persona.dropReason}</p>
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
