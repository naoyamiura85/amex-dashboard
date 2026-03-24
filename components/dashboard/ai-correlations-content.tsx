"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"
import { Cpu, TrendingUp, ArrowRight, RefreshCw, Sparkles, FlaskConical, Users, Globe } from "lucide-react"

const crossCategoryCorrelations = [
  { id: 1, categoryA: "睡眠サプリ", categoryB: "スキンケア", strength: 87, trend: "+23%", insight: "睡眠改善訴求がスキンケアへの関心を高める", type: "cross" },
  { id: 2, categoryA: "腸活", categoryB: "美容食品", strength: 82, trend: "+31%", insight: "腸内環境ケアと美容の相関が急上昇中", type: "cross" },
  { id: 3, categoryA: "ストレスケア", categoryB: "機能性飲料", strength: 76, trend: "+18%", insight: "メンタルウェルネスと飲料カテゴリが連動", type: "cross" },
  { id: 4, categoryA: "プロテイン", categoryB: "低カロリー食品", strength: 71, trend: "+12%", insight: "筋活×ダイエットの同時訴求に需要", type: "cross" },
  { id: 5, categoryA: "エイジングケア", categoryB: "サプリメント", strength: 68, trend: "+28%", insight: "インナーケアとアウターケアの融合トレンド", type: "cross" },
]

const materialSynergies = [
  { id: 1, materialA: "レチノール", materialB: "ナイアシンアミド", score: 94, effect: "美白×エイジング複合効果", risk: "低" },
  { id: 2, materialA: "ヒアルロン酸", materialB: "セラミド", score: 91, effect: "バリア機能×保湿の相乗効果", risk: "低" },
  { id: 3, materialA: "ビタミンC", materialB: "フェルラ酸", score: 88, effect: "抗酸化効果の増強", risk: "低" },
  { id: 4, materialA: "バクチオール", materialB: "スクワラン", score: 85, effect: "低刺激レチノール代替の安定化", risk: "低" },
  { id: 5, materialA: "グルタチオン", materialB: "α-アルブチン", score: 79, effect: "美白効果の多角的アプローチ", risk: "中" },
]

const hiddenNeedsData = [
  { need: "「疲れ顔」改善", volume: 89000, growth: 67, cluster: "30-40代 OL", untapped: true },
  { need: "スポーツ後のリカバリー美容", volume: 54000, growth: 112, cluster: "20-30代 女性アスリート", untapped: true },
  { need: "男性向けエイジングケア", volume: 43000, growth: 89, cluster: "40-50代 男性", untapped: true },
  { need: "妊活中のスキンケア", volume: 38000, growth: 44, cluster: "30代 女性", untapped: false },
  { need: "更年期対応コスメ", volume: 71000, growth: 156, cluster: "45-55代 女性", untapped: true },
]

const scatterData = crossCategoryCorrelations.map(c => ({
  x: c.strength,
  y: parseInt(c.trend),
  name: `${c.categoryA}×${c.categoryB}`,
  size: c.strength * 2,
}))

const COLORS = ["#3700FF", "#C8FF00", "#00C8FF", "#FF6B6B", "#FFB347"]

export function CorrelationsContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("cross")

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Cpu className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">AI相関発見エンジン</h2>
            <p className="text-sm text-muted-foreground">人間では発見困難なクロスカテゴリー相関・素材シナジー・隠れニーズを自動発掘</p>
          </div>
        </div>
        <Button onClick={handleAnalyze} disabled={isAnalyzing} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`} />
          {isAnalyzing ? "分析中..." : "再分析を実行"}
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "発見された相関", value: "247", sub: "今月+32件", icon: Cpu, color: "text-primary" },
          { label: "素材シナジー", value: "89", sub: "新規+12件", icon: FlaskConical, color: "text-emerald-600" },
          { label: "隠れニーズ", value: "34", sub: "未充足 18件", icon: Sparkles, color: "text-amber-600" },
          { label: "市場機会スコア", value: "8.4", sub: "前月比 +1.2", icon: TrendingUp, color: "text-blue-600" },
        ].map((kpi) => (
          <Card key={kpi.label} className="rounded-xl">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-9">
          <TabsTrigger value="cross" className="text-xs">クロスカテゴリー相関</TabsTrigger>
          <TabsTrigger value="synergy" className="text-xs">素材シナジー</TabsTrigger>
          <TabsTrigger value="needs" className="text-xs">隠れニーズ発掘</TabsTrigger>
          <TabsTrigger value="scatter" className="text-xs">相関マップ</TabsTrigger>
        </TabsList>

        {/* クロスカテゴリー相関 */}
        <TabsContent value="cross" className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">異なるカテゴリ間で同時に関心が高まる相関パターンを検出。マーケティングの新機会を発見。</p>
          {crossCategoryCorrelations.map((c) => (
            <Card key={c.id} className="rounded-xl">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-5 shrink-0">{c.id}</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="outline" className="text-xs shrink-0">{c.categoryA}</Badge>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <Badge variant="outline" className="text-xs shrink-0">{c.categoryB}</Badge>
                  </div>
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="text-xs text-muted-foreground truncate">{c.insight}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">相関強度</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Progress value={c.strength} className="w-16 h-1.5" />
                        <span className="text-xs font-bold">{c.strength}</span>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{c.trend}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 pl-9 md:hidden">{c.insight}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 素材シナジー */}
        <TabsContent value="synergy" className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">組み合わせることで効果が増強される素材ペアをAIが自動発見。差別化配合の発見を支援。</p>
          {materialSynergies.map((m) => (
            <Card key={m.id} className="rounded-xl">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-5 shrink-0">{m.id}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FlaskConical className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">{m.materialA}</span>
                    <span className="text-muted-foreground">+</span>
                    <span className="text-sm font-semibold">{m.materialB}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{m.effect}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="outline" className="text-xs">リスク: {m.risk}</Badge>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">シナジースコア</p>
                      <p className="text-lg font-bold text-primary">{m.score}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 隠れニーズ */}
        <TabsContent value="needs" className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">SNS・検索データから潜在的な不満や願望を抽出。まだ商品化されていない未充足ニーズを発見。</p>
          {hiddenNeedsData.map((n, i) => (
            <Card key={i} className={`rounded-xl ${n.untapped ? "border-amber-200 bg-amber-50/30" : ""}`}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{n.need}</p>
                      {n.untapped && (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px]">未充足</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{n.cluster}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">検索ボリューム</p>
                      <p className="text-sm font-bold">{(n.volume / 1000).toFixed(0)}K</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">+{n.growth}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 相関マップ */}
        <TabsContent value="scatter" className="mt-4">
          <Card className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">相関強度 × 成長率 マップ</CardTitle>
              <p className="text-xs text-muted-foreground">右上に位置するほど強い相関と高い成長率を持つ</p>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="x" name="相関強度" tick={{ fontSize: 11 }} label={{ value: "相関強度", position: "bottom", fontSize: 11 }} />
                    <YAxis dataKey="y" name="成長率" tick={{ fontSize: 11 }} label={{ value: "成長率(%)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload
                          return (
                            <div className="bg-white border border-border rounded-lg p-3 shadow-md text-xs">
                              <p className="font-semibold">{d.name}</p>
                              <p className="text-muted-foreground">相関強度: {d.x}</p>
                              <p className="text-muted-foreground">成長率: +{d.y}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter data={scatterData} fill="#3700FF">
                      {scatterData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { AICorrelationsContent }
