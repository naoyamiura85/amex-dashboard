"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Boxes, Play, TrendingUp, TrendingDown, Minus, ArrowRight, AlertCircle } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts"

const products = [
  { id: "p1", name: "モイスチャーリフト セラム 50ml" },
  { id: "p2", name: "ホワイトニング クリーム 30g" },
  { id: "p3", name: "ナイトリペア エッセンス 40ml" },
]

const simulationResult = {
  before: { appeal: 68, differentiation: 54, priceAcceptance: 72, purchaseIntent: 61 },
  after: { appeal: 84, differentiation: 78, priceAcceptance: 69, purchaseIntent: 79 },
  impactData: [
    { channel: "ドラッグストア", before: 100, after: 118 },
    { channel: "EC", before: 100, after: 134 },
    { channel: "コンビニ", before: 100, after: 108 },
    { channel: "百貨店", before: 100, after: 122 },
  ],
  risks: [
    { type: "コスト増加", detail: "バクチオール追加により製造コストが約+15%上昇", severity: "medium" },
    { type: "安定性リスク", detail: "レチノールとの配合比率に注意が必要", severity: "high" },
  ],
  opportunities: [
    "敏感肌ユーザー層（推定+23万人）へのリーチ拡大",
    "エイジングケア訴求による単価アップの余地 (+800円想定)",
    "韓国発バクチオールトレンドとの連動でSNS拡散期待",
  ],
}

const metricLabels: Record<string, string> = {
  appeal: "訴求力",
  differentiation: "差別化度",
  priceAcceptance: "価格受容性",
  purchaseIntent: "購入意向",
}

export function SimulatorContent() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [addIngredient, setAddIngredient] = useState("")
  const [concentration, setConcentration] = useState([1.0])
  const [isSimulating, setIsSimulating] = useState(false)
  const [showResult, setShowResult] = useState(true)

  const handleSimulate = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      setShowResult(true)
    }, 2000)
  }

  const metrics = Object.entries(simulationResult.before).map(([key, before]) => ({
    key,
    label: metricLabels[key] || key,
    before,
    after: simulationResult.after[key as keyof typeof simulationResult.after],
    delta: simulationResult.after[key as keyof typeof simulationResult.after] - before,
  }))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <Boxes className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-bold">改定シミュレーター</h2>
          <p className="text-sm text-muted-foreground">成分変更・処方改定の市場インパクトをAIがシミュレーション。リスクなく改定判断を下せます。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-2 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">改定パラメータ設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">対象製品</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="製品を選択" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">追加・変更する成分</label>
              <Select value={addIngredient} onValueChange={setAddIngredient}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="成分を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bakuchiol">バクチオール</SelectItem>
                  <SelectItem value="glutathione">グルタチオン</SelectItem>
                  <SelectItem value="ectoin">エクトイン</SelectItem>
                  <SelectItem value="postbiotics">ポストバイオティクス</SelectItem>
                  <SelectItem value="niacinamide">ナイアシンアミド増量</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">配合濃度</label>
                <span className="text-xs font-bold text-primary">{concentration[0].toFixed(1)}%</span>
              </div>
              <Slider
                value={concentration}
                onValueChange={setConcentration}
                min={0.1}
                max={5.0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0.1%</span>
                <span>5.0%</span>
              </div>
            </div>

            <Button onClick={handleSimulate} disabled={isSimulating} className="w-full gap-2">
              <Play className={`h-4 w-4 ${isSimulating ? "animate-pulse" : ""}`} />
              {isSimulating ? "シミュレーション中..." : "シミュレーション実行"}
            </Button>
          </CardContent>
        </Card>

        {/* Result Panel */}
        {showResult && (
          <div className="lg:col-span-3 space-y-4">
            {/* KPI comparison */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">改定前後の比較</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {metrics.map((m) => (
                  <div key={m.key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{m.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{m.before}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-bold text-primary">{m.after}</span>
                        <Badge className={`text-[10px] ${m.delta > 0 ? "bg-emerald-100 text-emerald-700" : m.delta < 0 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                          {m.delta > 0 ? `+${m.delta}` : m.delta}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Progress value={m.before} className="h-1.5 flex-1 opacity-40" />
                      <Progress value={m.after} className="h-1.5 flex-1" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Channel Impact */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">チャネル別インパクト（改定前=100）</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={simulationResult.impactData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="channel" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[90, 140]} />
                      <Tooltip contentStyle={{ fontSize: 12 }} />
                      <Bar dataKey="after" radius={[4, 4, 0, 0]}>
                        {simulationResult.impactData.map((_, i) => (
                          <Cell key={i} fill="#3700FF" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risks & Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="rounded-xl border-amber-200 bg-amber-50/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                    リスク
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {simulationResult.risks.map((r, i) => (
                    <div key={i} className="text-xs">
                      <p className="font-semibold">{r.type}</p>
                      <p className="text-muted-foreground">{r.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="rounded-xl border-emerald-200 bg-emerald-50/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    機会
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 pt-0">
                  {simulationResult.opportunities.map((o, i) => (
                    <p key={i} className="text-xs text-muted-foreground">{o}</p>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { AISimulatorContent }
