"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Download, ArrowUpRight, TrendingUp } from "lucide-react"
import Image from "next/image"

const crossCategoryCorrelations = [
  {
    title: "睡眠サプリ × スキンケア",
    correlation: 87,
    image: "/images/correlations/sleep-skincare.jpg",
    insight: "睡眠の質向上と美肌効果の相乗効果",
  },
  {
    title: "アンチエイジング × 睡眠",
    correlation: 82,
    image: "/images/correlations/antiaging-sleep.jpg",
    insight: "夜間ケアと睡眠促進の組み合わせ需要",
  },
  {
    title: "美肌 × 栄養補助食品",
    correlation: 79,
    image: "/images/correlations/beauty-supplements.jpg",
    insight: "インナービューティー市場の拡大",
  },
]

const materialSynergies = [
  {
    title: "ビタミンC + ヒアルロン酸",
    boost: 143,
    image: "/images/correlations/vitaminc-hyaluronic.jpg",
    insight: "保湿×美白の定番コンビ",
  },
  {
    title: "レチノール + ペプチド",
    boost: 128,
    image: "/images/correlations/retinol-peptide.jpg",
    insight: "エイジングケアの最強タッグ",
  },
  {
    title: "ナイアシンアミド + セラミド",
    boost: 115,
    image: "/images/correlations/niacinamide-ceramide.jpg",
    insight: "バリア機能強化の新定番",
  },
]

const industryTrends = [
  {
    title: "サステナビリティ",
    image: "/images/correlations/sustainability.jpg",
    description: "環境配慮型パッケージ・クリーンビューティーへの転用",
    opportunity: "高",
  },
  {
    title: "パーソナライゼーション",
    image: "/images/correlations/personalization.jpg",
    description: "AI診断・カスタム処方のスキンケア展開",
    opportunity: "非常に高",
  },
  {
    title: "ウェルネス",
    image: "/images/correlations/wellness.jpg",
    description: "ホリスティックケア・心身一体アプローチ",
    opportunity: "高",
  },
]

export function AICorrelationsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI相関発見エンジン
          </h2>
          <p className="text-sm text-muted-foreground mt-1">クロスカテゴリー相関・素材シナジーの自動検出</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* クロスカテゴリー相関 */}
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
              クロスカテゴリー相関
            </CardTitle>
            <p className="text-sm text-muted-foreground">異なるカテゴリ間のトレンド相関を自動発見</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {crossCategoryCorrelations.map((item) => (
              <div
                key={item.title}
                className="group flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.title}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-primary">{item.correlation}%</span>
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{item.insight}</p>
                </div>
              </div>
            ))}
            <Button className="w-full gap-2 mt-2">
              <Zap className="h-4 w-4" />
              詳細を見る
            </Button>
          </CardContent>
        </Card>

        {/* 素材シナジー発見 */}
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
              素材シナジー発見
            </CardTitle>
            <p className="text-sm text-muted-foreground">組み合わせで効果が高まる素材ペアを提案</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {materialSynergies.map((item) => (
              <div
                key={item.title}
                className="group flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.title}</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-lg font-bold">+{item.boost}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{item.insight}</p>
                </div>
              </div>
            ))}
            <Button className="w-full gap-2 mt-2">
              <Zap className="h-4 w-4" />
              詳細を見る
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 異業種トレンド転用 */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
            異業種トレンド転用
          </CardTitle>
          <p className="text-sm text-muted-foreground">アパレル・テック等のトレンドを消費財に応用</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industryTrends.map((trend) => (
              <div
                key={trend.title}
                className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={trend.image}
                    alt={trend.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{trend.title}</h4>
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                      {trend.opportunity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{trend.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
