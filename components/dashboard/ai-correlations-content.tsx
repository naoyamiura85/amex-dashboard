"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, Download, ArrowUpRight, TrendingUp } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts"

// 会員属性×利用カテゴリ相関
const behaviorCorrelations = [
  {
    title: "プラチナ会員 × トラベル利用",
    correlation: 92,
    insight: "年間旅行支出が一般会員の4.2倍、海外ラウンジ利用率 87%",
  },
  {
    title: "ゴールド会員 × ダイニング",
    correlation: 84,
    insight: "高級レストラン月次利用率 68%、グルメ特典活用で継続率 +22%",
  },
  {
    title: "30代会員 × デジタルサービス",
    correlation: 79,
    insight: "サブスク決済比率 54%、モバイル申込率 91%",
  },
]

// ラグジュアリーベネフィットシナジー
const benefitSynergies = [
  {
    title: "空港ラウンジ + コンシェルジュ",
    boost: 156,
    insight: "組み合わせ利用会員の年間利用額が +56%、継続率が +31%",
  },
  {
    title: "ホテル優待 + ダイニングクレジット",
    boost: 138,
    insight: "トラベル×グルメ複合利用会員のLTVが最高水準",
  },
  {
    title: "プライオリティパス + 保険サービス",
    boost: 121,
    insight: "出張利用層のカード必携理由 No.1、解約率 -18%",
  },
]

// 異業界トレンド転用機会
const industryOpportunities = [
  {
    title: "サステナビリティ",
    description: "グリーン決済・ESG連動ポイントへの関心 年比 +43%",
    opportunity: "高",
    opportunityColor: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  },
  {
    title: "ウェルネス体験",
    description: "スパ・ヘルスクラブ優待がプラチナ会員維持の上位理由",
    opportunity: "非常に高",
    opportunityColor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  },
  {
    title: "デジタル富裕層",
    description: "NFT・デジタルアート購入層への限定特典でゴールド→プラチナ転換率 +28%",
    opportunity: "高",
    opportunityColor: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  },
]

// レーダーチャートデータ（会員セグメント別特典利用）
const radarData = [
  { subject: "トラベル", platinum: 92, gold: 61, green: 28 },
  { subject: "ダイニング", platinum: 85, gold: 74, green: 41 },
  { subject: "ショッピング", platinum: 78, gold: 80, green: 65 },
  { subject: "エンタメ", platinum: 70, gold: 58, green: 52 },
  { subject: "ウェルネス", platinum: 88, gold: 45, green: 18 },
  { subject: "デジタル", platinum: 65, gold: 72, green: 80 },
]

// 散布図データ（利用額 vs 継続率）
const scatterData = [
  { x: 1.2, y: 71, label: "グリーン" },
  { x: 3.8, y: 82, label: "ゴールド" },
  { x: 8.5, y: 91, label: "プラチナ" },
  { x: 5.2, y: 85, label: "ビジネスG" },
  { x: 12.1, y: 95, label: "セントュリオン" },
]

const COLORS = ["#006FCF", "#00175A", "#B4975A"]

export function AICorrelationsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            会員行動相関分析エンジン
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            会員属性・利用カテゴリ・ベネフィット活用の相関とシナジーを自動検出
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          エクスポート
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 会員行動×利用カテゴリ相関 */}
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Badge className="bg-primary/10 text-primary border-0">AI検出</Badge>
              会員行動×利用カテゴリ相関
            </CardTitle>
            <p className="text-xs text-muted-foreground">セグメント別の主要利用カテゴリとの相関係数</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {behaviorCorrelations.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-foreground">{item.title}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-primary">{item.correlation}%</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <Progress value={item.correlation} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{item.insight}</p>
              </div>
            ))}
            <Button className="w-full gap-2 mt-2">
              <Zap className="h-4 w-4" />
              全相関データを見る
            </Button>
          </CardContent>
        </Card>

        {/* ベネフィットシナジー */}
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Badge className="bg-accent/10 text-accent border-0">シナジー</Badge>
              ラグジュアリーベネフィット相乗効果
            </CardTitle>
            <p className="text-xs text-muted-foreground">組み合わせ利用でLTV・継続率を最大化するベネフィットペア</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {benefitSynergies.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-foreground">{item.title}</span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-lg font-bold">+{item.boost - 100}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{item.insight}</p>
              </div>
            ))}
            <Button className="w-full gap-2 mt-2">
              <Zap className="h-4 w-4" />
              詳細を見る
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* セグメント別特典利用レーダー */}
      <Card className="rounded-xl border-border">
        <CardHeader>
          <CardTitle className="text-base">セグメント別特典カテゴリ利用率</CardTitle>
          <p className="text-sm text-muted-foreground">各カード種別の特典利用プロファイル比較</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Radar name="プラチナ" dataKey="platinum" stroke="#006FCF" fill="#006FCF" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="ゴールド" dataKey="gold" stroke="#B4975A" fill="#B4975A" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="グリーン" dataKey="green" stroke="#00175A" fill="#00175A" fillOpacity={0.1} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">プラチナ会員</p>
                  <p className="text-xs text-muted-foreground">トラベル・ウェルネス利用が突出。高LTV層の中核</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="w-3 h-3 rounded-full bg-accent shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">ゴールド会員</p>
                  <p className="text-xs text-muted-foreground">ショッピング・ダイニング特化。プラチナ転換候補</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="w-3 h-3 rounded-full bg-secondary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">グリーン会員</p>
                  <p className="text-xs text-muted-foreground">デジタル・ショッピング主体。若年層のエントリー層</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 利用額 vs 継続率 散布図 */}
      <Card className="rounded-xl border-border">
        <CardHeader>
          <CardTitle className="text-base">年間利用額 vs 継続率 相関</CardTitle>
          <p className="text-sm text-muted-foreground">カード種別ごとの利用額と会員継続率の相関</p>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="x"
                  name="年間利用額"
                  unit="百万円"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  label={{ value: "年間利用額（百万円）", position: "insideBottom", offset: -2, fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  dataKey="y"
                  name="継続率"
                  unit="%"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  domain={[60, 100]}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ payload }) => {
                    if (!payload?.length) return null
                    const d = payload[0]?.payload
                    return (
                      <div className="bg-card border border-border rounded-lg p-2 text-xs shadow">
                        <p className="font-semibold text-foreground">{d?.label}</p>
                        <p className="text-muted-foreground">利用額: {d?.x}百万円 / 継続率: {d?.y}%</p>
                      </div>
                    )
                  }}
                />
                <Scatter data={scatterData} fill="#006FCF">
                  {scatterData.map((entry, index) => (
                    <Cell key={index} fill={index === 2 ? "#B4975A" : index === 4 ? "#00175A" : "#006FCF"} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* トレンド転用機会 */}
      <Card className="rounded-xl border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Badge className="bg-primary/10 text-primary border-0">NEW</Badge>
            ラグジュアリートレンド転用機会
          </CardTitle>
          <p className="text-sm text-muted-foreground">富裕層市場の最新トレンドをAMEX会員体験に応用</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industryOpportunities.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 p-4 bg-muted/30 rounded-xl border border-border hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                  <Badge className={`text-xs border ${item.opportunityColor}`}>
                    {item.opportunity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
