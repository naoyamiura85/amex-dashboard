"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Settings, Play, RotateCcw, TrendingUp, TrendingDown, Users, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"

// --- デフォルト審査パラメータ ---
const defaultParams = {
  cardType: "gold",
  minIncome: 400,           // 万円
  minCreditScore: 680,      // 信用スコア
  maxDebtRatio: 35,         // 負債比率（%）
  employmentRequired: true, // 在職証明必須
  minAge: 20,
  strictFraudCheck: true,
}

// 審査結果の計算（擬似ロジック）
function calcResults(params: typeof defaultParams) {
  const incomeMultiplier = Math.max(0.5, 1 - (params.minIncome - 300) / 1000)
  const scoreMultiplier = Math.max(0.4, 1 - (params.minCreditScore - 600) / 800)
  const debtMultiplier = Math.min(1.2, params.maxDebtRatio / 35)
  const employmentPenalty = params.employmentRequired ? 0.88 : 1.0
  const agePenalty = Math.min(1.0, (params.minAge - 18) / 12 * -0.05 + 1)

  const baseApplicants = 580000
  const baseApproval = 0.707
  const baseDefault = 0.012

  const approvalRate = Math.min(0.95, Math.max(0.25,
    baseApproval * scoreMultiplier * incomeMultiplier * debtMultiplier * employmentPenalty * agePenalty
  ))
  const applicants = Math.round(baseApplicants * (1 + (1 - scoreMultiplier) * 0.3 + (1 - incomeMultiplier) * 0.2))
  const approved = Math.round(applicants * approvalRate)
  const defaultRate = Math.max(0.003, Math.min(0.05,
    baseDefault * (1 / scoreMultiplier) * (1 / incomeMultiplier) * (params.strictFraudCheck ? 0.85 : 1.1)
  ))
  const expectedRevenue = Math.round(approved * 25000 * (1 - defaultRate))

  return {
    applicants,
    approvalRate: (approvalRate * 100).toFixed(1),
    approved,
    defaultRate: (defaultRate * 100).toFixed(2),
    expectedRevenue,
    riskLevel: defaultRate > 0.025 ? "high" : defaultRate > 0.015 ? "medium" : "low",
  }
}

const cardTypes = [
  { value: "blue", label: "ブルー・カード", minIncome: 200, minScore: 620 },
  { value: "green", label: "グリーン・カード", minIncome: 300, minScore: 650 },
  { value: "gold", label: "ゴールド・カード", minIncome: 400, minScore: 680 },
  { value: "platinum", label: "プラチナ・カード", minIncome: 1000, minScore: 750 },
  { value: "business-gold", label: "ビジネス・ゴールド", minIncome: 600, minScore: 700 },
]

const riskConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  low: { label: "低リスク", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  medium: { label: "中リスク", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  high: { label: "高リスク", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
}

export function AISimulatorContent() {
  const [params, setParams] = useState(defaultParams)
  const [results, setResults] = useState(() => calcResults(defaultParams))
  const [baseResults] = useState(() => calcResults(defaultParams))
  const [isRunning, setIsRunning] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)

  const runSimulation = () => {
    setIsRunning(true)
    setTimeout(() => {
      setResults(calcResults(params))
      setIsRunning(false)
      setHasChanged(false)
    }, 800)
  }

  const resetParams = () => {
    setParams(defaultParams)
    setResults(calcResults(defaultParams))
    setHasChanged(false)
  }

  const updateParam = <K extends keyof typeof defaultParams>(key: K, value: typeof defaultParams[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }))
    setHasChanged(true)
  }

  const diff = {
    applicants: results.applicants - baseResults.applicants,
    approvalRate: (parseFloat(results.approvalRate) - parseFloat(baseResults.approvalRate)).toFixed(1),
    approved: results.approved - baseResults.approved,
    defaultRate: (parseFloat(results.defaultRate) - parseFloat(baseResults.defaultRate)).toFixed(2),
    revenue: results.expectedRevenue - baseResults.expectedRevenue,
  }

  const radarData = [
    { metric: "承認率", current: parseFloat(results.approvalRate), base: parseFloat(baseResults.approvalRate) },
    { metric: "安全性", current: (1 - parseFloat(results.defaultRate) / 5) * 100, base: (1 - parseFloat(baseResults.defaultRate) / 5) * 100 },
    { metric: "収益性", current: Math.min(100, results.expectedRevenue / 1500000 * 100), base: Math.min(100, baseResults.expectedRevenue / 1500000 * 100) },
    { metric: "成長性", current: Math.min(100, results.applicants / 700000 * 100), base: Math.min(100, baseResults.applicants / 700000 * 100) },
    { metric: "信頼スコア", current: 100 - parseFloat(results.defaultRate) * 20, base: 100 - parseFloat(baseResults.defaultRate) * 20 },
  ]

  const kpiBarData = [
    {
      name: "承認率(%)",
      current: parseFloat(results.approvalRate),
      base: parseFloat(baseResults.approvalRate),
    },
    {
      name: "デフォルト率(%)",
      current: parseFloat(results.defaultRate),
      base: parseFloat(baseResults.defaultRate),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F2FF]">
            <Settings className="h-4 w-4 text-[#006FCF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">審査基準 シミュレーター</p>
            <p className="text-xs text-muted-foreground">審査条件の変更が承認率・デフォルト率・収益に与える影響を試算</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs" onClick={resetParams}>
            <RotateCcw className="h-3.5 w-3.5" />
            リセット
          </Button>
          <Button
            size="sm"
            className="gap-2 text-xs bg-[#006FCF] hover:bg-[#0051A8] text-white"
            onClick={runSimulation}
            disabled={isRunning || !hasChanged}
          >
            <Play className="h-3.5 w-3.5" />
            {isRunning ? "計算中..." : "シミュレーション実行"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左: パラメータ設定 */}
        <div className="space-y-5">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">審査条件の設定</CardTitle>
              <CardDescription className="text-xs">パラメータを変更して実行ボタンを押してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* カード種別 */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">対象カード</Label>
                <Select
                  value={params.cardType}
                  onValueChange={(v) => updateParam("cardType", v)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((ct) => (
                      <SelectItem key={ct.value} value={ct.value} className="text-xs">
                        {ct.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 最低年収 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">最低年収</Label>
                  <span className="text-xs font-bold text-foreground">{params.minIncome}万円</span>
                </div>
                <Slider
                  min={200}
                  max={1500}
                  step={50}
                  value={[params.minIncome]}
                  onValueChange={([v]) => updateParam("minIncome", v)}
                  className="[&_[role=slider]]:bg-[#006FCF] [&_[role=slider]]:border-[#006FCF]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>200万</span><span>1,500万</span>
                </div>
              </div>

              {/* 信用スコア閾値 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">最低信用スコア</Label>
                  <span className="text-xs font-bold text-foreground">{params.minCreditScore}</span>
                </div>
                <Slider
                  min={550}
                  max={800}
                  step={10}
                  value={[params.minCreditScore]}
                  onValueChange={([v]) => updateParam("minCreditScore", v)}
                  className="[&_[role=slider]]:bg-[#006FCF] [&_[role=slider]]:border-[#006FCF]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>550</span><span>800</span>
                </div>
              </div>

              {/* 負債比率 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">最大負債比率</Label>
                  <span className="text-xs font-bold text-foreground">{params.maxDebtRatio}%</span>
                </div>
                <Slider
                  min={10}
                  max={60}
                  step={5}
                  value={[params.maxDebtRatio]}
                  onValueChange={([v]) => updateParam("maxDebtRatio", v)}
                  className="[&_[role=slider]]:bg-[#006FCF] [&_[role=slider]]:border-[#006FCF]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>10%</span><span>60%</span>
                </div>
              </div>

              {/* 最低年齢 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">最低申込年齢</Label>
                  <span className="text-xs font-bold text-foreground">{params.minAge}歳</span>
                </div>
                <Slider
                  min={18}
                  max={30}
                  step={1}
                  value={[params.minAge]}
                  onValueChange={([v]) => updateParam("minAge", v)}
                  className="[&_[role=slider]]:bg-[#006FCF] [&_[role=slider]]:border-[#006FCF]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>18歳</span><span>30歳</span>
                </div>
              </div>

              {/* スイッチ */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-foreground">在職証明を必須とする</Label>
                  <Switch
                    checked={params.employmentRequired}
                    onCheckedChange={(v) => updateParam("employmentRequired", v)}
                    className="data-[state=checked]:bg-[#006FCF]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-foreground">厳格な不正チェック</Label>
                  <Switch
                    checked={params.strictFraudCheck}
                    onCheckedChange={(v) => updateParam("strictFraudCheck", v)}
                    className="data-[state=checked]:bg-[#006FCF]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右: 結果表示 */}
        <div className="lg:col-span-2 space-y-4">
          {/* KPI 結果 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                label: "申込推定数",
                value: results.applicants.toLocaleString(),
                unit: "件",
                icon: Users,
                change: diff.applicants,
                isHighGood: true,
              },
              {
                label: "承認率",
                value: results.approvalRate,
                unit: "%",
                icon: CheckCircle,
                change: parseFloat(diff.approvalRate),
                isHighGood: true,
              },
              {
                label: "デフォルト率",
                value: results.defaultRate,
                unit: "%",
                icon: AlertTriangle,
                change: parseFloat(diff.defaultRate),
                isHighGood: false,
              },
              {
                label: "期待収益",
                value: `¥${(results.expectedRevenue / 1000000).toFixed(1)}M`,
                unit: "",
                icon: CreditCard,
                change: diff.revenue,
                isHighGood: true,
              },
            ].map((kpi) => {
              const Icon = kpi.icon
              const isPositive = kpi.change > 0
              const isGood = kpi.isHighGood ? isPositive : !isPositive
              return (
                <Card key={kpi.label} className="border border-border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-4 w-4 text-[#006FCF]" />
                      {kpi.change !== 0 && (
                        <span className={`flex items-center text-[10px] font-semibold ${isGood ? "text-emerald-600" : "text-red-600"}`}>
                          {isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                          {isPositive ? "+" : ""}{typeof kpi.change === "number" ? kpi.change.toLocaleString() : kpi.change}
                        </span>
                      )}
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {kpi.value}
                      <span className="text-xs font-normal ml-0.5 text-muted-foreground">{kpi.unit}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* リスク判定 */}
          {(() => {
            const cfg = riskConfig[results.riskLevel]
            return (
              <div className={`p-3.5 rounded-xl border ${cfg.border} ${cfg.bg} flex items-center gap-3`}>
                {results.riskLevel === "low"
                  ? <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  : results.riskLevel === "medium"
                  ? <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  : <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />}
                <div>
                  <span className={`text-xs font-bold ${cfg.color}`}>{cfg.label}</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {results.riskLevel === "low"
                      ? "現在の審査基準は安全性と収益性のバランスが取れています。"
                      : results.riskLevel === "medium"
                      ? "デフォルト率がやや上昇しています。信用スコア閾値の引き上げを検討してください。"
                      : "デフォルト率が高水準です。審査基準の厳格化を強く推奨します。"}
                  </p>
                </div>
                <Badge className={`ml-auto text-xs border ${cfg.border} ${cfg.bg} ${cfg.color}`}>
                  デフォルト率 {results.defaultRate}%
                </Badge>
              </div>
            )
          })()}

          {/* レーダーチャート + バー比較 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-semibold">審査バランスレーダー</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="base" name="現行基準" stroke="#D0DCE8" fill="#D0DCE8" fillOpacity={0.3} strokeWidth={1.5} />
                    <Radar dataKey="current" name="シミュレーション" stroke="#006FCF" fill="#006FCF" fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 11 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-2 rounded-sm bg-[#D0DCE8]" />
                    現行基準
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-2 rounded-sm bg-[#006FCF]" />
                    シミュレーション
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-semibold">承認率 / デフォルト率 比較</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={kpiBarData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                      formatter={(v: number) => [`${v.toFixed(2)}%`, ""]}
                    />
                    <Bar dataKey="base" name="現行基準" fill="#D0DCE8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="current" name="シミュレーション" fill="#006FCF" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
