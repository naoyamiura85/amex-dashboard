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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts"
import {
  Play,
  CreditCard,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  RefreshCw,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Download,
} from "lucide-react"

// カード選択肢
const cardProducts = [
  { id: "platinum", name: "プラチナ・カード", fee: 143000, targetIncome: 1200, color: "#B4975A" },
  { id: "gold", name: "ゴールド・カード", fee: 31900, targetIncome: 600, color: "#006FCF" },
  { id: "green", name: "グリーン・カード", fee: 13200, targetIncome: 300, color: "#10B981" },
  { id: "blue", name: "ブルー・カード", fee: 0, targetIncome: 0, color: "#64B5F6" },
  { id: "business-gold", name: "ビジネス・ゴールド", fee: 36300, targetIncome: 800, color: "#00175A" },
]

// 審査基準変更オプション
const criteriaOptions = [
  {
    id: "income",
    name: "年収基準緩和",
    description: "必要年収要件を引き下げる",
    effect: { applicants: 18, approval: -5, churn: 3, revenue: 8 },
    risk: "medium",
  },
  {
    id: "credit-score",
    name: "信用スコア要件緩和",
    description: "最低信用スコアを引き下げる",
    effect: { applicants: 12, approval: -8, churn: 5, revenue: 4 },
    risk: "high",
  },
  {
    id: "selfemployed",
    name: "自営業・フリーランス対応強化",
    description: "収入証明方法を多様化",
    effect: { applicants: 8, approval: 2, churn: 1, revenue: 6 },
    risk: "low",
  },
  {
    id: "young",
    name: "若年層向け特別審査",
    description: "25歳未満の審査基準を調整",
    effect: { applicants: 22, approval: -3, churn: 4, revenue: 7 },
    risk: "medium",
  },
  {
    id: "foreigner",
    name: "外国籍会員審査最適化",
    description: "在留カード・パスポート審査対応",
    effect: { applicants: 6, approval: 3, churn: 0, revenue: 5 },
    risk: "low",
  },
]

// 月次申込数ベース（千件）
const baseApplicantsData = {
  platinum: { base: 8, approved: 5.6, active: 4.8 },
  gold: { base: 48, approved: 33.6, active: 29.8 },
  green: { base: 86, approved: 65.4, active: 58.2 },
  blue: { base: 120, approved: 96.0, active: 84.5 },
  "business-gold": { base: 18, approved: 12.6, active: 10.8 },
}

// 収益シミュレーション（億円/年）
const baseRevenueData = {
  platinum: { fee: 60.1, spend: 340.2, interest: 12.8, total: 413.1 },
  gold: { fee: 34.9, spend: 220.4, interest: 28.5, total: 283.8 },
  green: { fee: 7.7, spend: 98.6, interest: 18.2, total: 124.5 },
  blue: { fee: 0, spend: 42.8, interest: 22.1, total: 64.9 },
  "business-gold": { fee: 25.4, spend: 158.4, interest: 8.2, total: 192.0 },
}

// 月別シミュレーション結果データ
function generateMonthlyData(
  baseApplicants: number,
  effectPct: number,
  approvalChange: number,
  baseApprovalRate: number
) {
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  return months.map((month, i) => {
    const newApplicants = Math.round(baseApplicants * (1 + effectPct / 100) * (1 + i * 0.01))
    const newApproval = Math.min(100, baseApprovalRate + approvalChange)
    return {
      month,
      base: Math.round(baseApplicants * (1 + i * 0.01)),
      simulated: newApplicants,
      approvalRate: newApproval,
    }
  })
}

type RiskLevel = "low" | "medium" | "high"

const riskConfig: Record<RiskLevel, { label: string; badge: string; color: string }> = {
  low: { label: "低リスク", badge: "bg-emerald-100 text-emerald-700", color: "#10B981" },
  medium: { label: "中リスク", badge: "bg-amber-100 text-amber-700", color: "#F59E0B" },
  high: { label: "高リスク", badge: "bg-red-100 text-red-700", color: "#EF4444" },
}

export function AISimulatorContent() {
  const [selectedCard, setSelectedCard] = useState(cardProducts[1])
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([])
  const [priceChange, setPriceChange] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasResult, setHasResult] = useState(false)

  const baseData = baseApplicantsData[selectedCard.id as keyof typeof baseApplicantsData]
  const revenueData = baseRevenueData[selectedCard.id as keyof typeof baseRevenueData]

  // 選択した基準変更の累積効果計算
  const totalEffect = criteriaOptions
    .filter((c) => selectedCriteria.includes(c.id))
    .reduce(
      (acc, c) => ({
        applicants: acc.applicants + c.effect.applicants,
        approval: acc.approval + c.effect.approval,
        churn: acc.churn + c.effect.churn,
        revenue: acc.revenue + c.effect.revenue,
      }),
      { applicants: 0, approval: 0, churn: 0, revenue: 0 }
    )

  const feeEffect = priceChange / 100
  const baseApprovalRate = 70
  const monthlyData = generateMonthlyData(baseData.base, totalEffect.applicants, totalEffect.approval, baseApprovalRate)

  const simulatedApplicants = Math.round(baseData.base * (1 + totalEffect.applicants / 100))
  const simulatedApproved = Math.round(simulatedApplicants * Math.min(1, (baseApprovalRate + totalEffect.approval) / 100))
  const simulatedRevenue = revenueData.total * (1 + (totalEffect.revenue + feeEffect) / 100)

  const toggleCriteria = (id: string) => {
    setSelectedCriteria((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
    setHasResult(false)
  }

  const runSimulation = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setHasResult(true)
    }, 1500)
  }

  const resetAll = () => {
    setSelectedCriteria([])
    setPriceChange(0)
    setHasResult(false)
  }

  const overallRisk: RiskLevel = selectedCriteria.some(
    (id) => criteriaOptions.find((c) => c.id === id)?.risk === "high"
  )
    ? "high"
    : selectedCriteria.some((id) => criteriaOptions.find((c) => c.id === id)?.risk === "medium")
    ? "medium"
    : "low"

  return (
    <div className="p-6 space-y-6">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E6F2FF]">
            <Sparkles className="h-4 w-4 text-[#006FCF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">審査基準 What-If シミュレーター</p>
            <p className="text-xs text-muted-foreground">基準変更の影響を申込数・収益・チャーンで試算</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={resetAll} className="gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5" />
            リセット
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            出力
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左: 設定パネル */}
        <div className="space-y-4">
          {/* カード選択 */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#006FCF]" />
                対象カード
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedCard.id}
                onValueChange={(v) => {
                  const card = cardProducts.find((c) => c.id === v)
                  if (card) { setSelectedCard(card); setHasResult(false) }
                }}
              >
                <SelectTrigger className="w-full bg-background text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cardProducts.map((card) => (
                    <SelectItem key={card.id} value={card.id}>
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
                        {card.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">現在の月次申込</span>
                  <span className="font-semibold">{baseData.base}千件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">承認率</span>
                  <span className="font-semibold">70%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">年会費</span>
                  <span className="font-semibold">¥{selectedCard.fee.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 年会費変更 */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#006FCF]" />
                年会費変更率
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">変更率</span>
                  <Badge
                    className={`text-xs border-0 ${priceChange > 0 ? "bg-red-100 text-red-700" : priceChange < 0 ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}
                  >
                    {priceChange > 0 ? `+${priceChange}%` : priceChange < 0 ? `${priceChange}%` : "変更なし"}
                  </Badge>
                </div>
                <Slider
                  value={[priceChange]}
                  onValueChange={([v]) => { setPriceChange(v); setHasResult(false) }}
                  min={-30}
                  max={30}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>-30%</span>
                  <span>0%</span>
                  <span>+30%</span>
                </div>
                {priceChange !== 0 && (
                  <div className="p-2 bg-muted/50 rounded text-xs">
                    <span className="text-muted-foreground">改定後年会費: </span>
                    <span className="font-bold text-foreground">
                      ¥{Math.round(selectedCard.fee * (1 + priceChange / 100)).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 審査基準変更 */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-[#006FCF]" />
                審査基準変更
              </CardTitle>
              <CardDescription className="text-xs">複数選択可</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {criteriaOptions.map((criteria) => {
                const isSelected = selectedCriteria.includes(criteria.id)
                const riskCfg = riskConfig[criteria.risk as RiskLevel]
                return (
                  <div
                    key={criteria.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected ? "border-[#006FCF] bg-[#E6F2FF]/50" : "border-border/60 hover:border-[#006FCF]/40 bg-card"
                    }`}
                    onClick={() => toggleCriteria(criteria.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-foreground">{criteria.name}</span>
                          <Badge className={`text-[10px] h-4 px-1 border-0 ${riskCfg.badge}`}>{riskCfg.label}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{criteria.description}</p>
                      </div>
                      <Switch
                        checked={isSelected}
                        onCheckedChange={() => toggleCriteria(criteria.id)}
                        className="flex-shrink-0 mt-0.5"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-[#006FCF]/20 grid grid-cols-2 gap-1 text-[10px]">
                        <span className="text-emerald-600 font-medium">申込 +{criteria.effect.applicants}%</span>
                        <span className={criteria.effect.approval >= 0 ? "text-emerald-600" : "text-red-600"}>
                          承認 {criteria.effect.approval >= 0 ? "+" : ""}{criteria.effect.approval}pt
                        </span>
                        <span className="text-amber-600">チャーン +{criteria.effect.churn}pt</span>
                        <span className="text-emerald-600 font-medium">収益 +{criteria.effect.revenue}%</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* シミュレーション実行 */}
          <Button
            className="w-full bg-[#006FCF] hover:bg-[#0051A8] text-white gap-2"
            onClick={runSimulation}
            disabled={isRunning || (selectedCriteria.length === 0 && priceChange === 0)}
          >
            {isRunning ? (
              <><RefreshCw className="h-4 w-4 animate-spin" />シミュレーション実行中...</>
            ) : (
              <><Play className="h-4 w-4" />シミュレーション実行</>
            )}
          </Button>
        </div>

        {/* 右: 結果パネル */}
        <div className="lg:col-span-2 space-y-4">
          {/* 結果サマリー */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                label: "月次申込数",
                base: `${baseData.base}千件`,
                sim: `${simulatedApplicants}千件`,
                change: totalEffect.applicants,
                icon: CreditCard,
                color: "text-[#006FCF]",
                bg: "bg-[#E6F2FF]",
              },
              {
                label: "月次承認数",
                base: `${baseData.approved}千件`,
                sim: `${simulatedApproved}千件`,
                change: totalEffect.applicants + totalEffect.approval,
                icon: CheckCircle,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                label: "チャーン変化",
                base: "1.80%",
                sim: `${(1.8 + totalEffect.churn * 0.1).toFixed(2)}%`,
                change: -totalEffect.churn,
                icon: Users,
                color: "text-amber-600",
                bg: "bg-amber-50",
                invertColor: true,
              },
              {
                label: "年間収益予測",
                base: `¥${revenueData.total}億`,
                sim: `¥${simulatedRevenue.toFixed(1)}億`,
                change: totalEffect.revenue + feeEffect,
                icon: BarChart3,
                color: "text-[#006FCF]",
                bg: "bg-[#E6F2FF]",
              },
            ].map((item) => {
              const Icon = item.icon
              const isPositive = item.invertColor ? item.change < 0 : item.change > 0
              return (
                <Card key={item.label} className={`border shadow-sm ${hasResult ? "border-[#006FCF]/30" : "border-border"}`}>
                  <CardContent className="p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-1.5 rounded-lg ${item.bg}`}>
                        <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                      </div>
                      {hasResult && item.change !== 0 && (
                        <span className={`text-xs font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                          {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold text-foreground">{hasResult ? item.sim : item.base}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.label}</p>
                    {hasResult && (
                      <p className="text-[10px] text-muted-foreground">元: {item.base}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* リスク評価 */}
          {selectedCriteria.length > 0 && (
            <Card className={`border shadow-sm ${
              overallRisk === "high" ? "border-red-200 bg-red-50/30" :
              overallRisk === "medium" ? "border-amber-200 bg-amber-50/30" :
              "border-emerald-200 bg-emerald-50/30"
            }`}>
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                  overallRisk === "high" ? "text-red-600" :
                  overallRisk === "medium" ? "text-amber-600" : "text-emerald-600"
                }`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    総合リスク評価: {riskConfig[overallRisk].label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {overallRisk === "high"
                      ? "信用損失リスクが高い変更が含まれています。コンプライアンスレビューを推奨します。"
                      : overallRisk === "medium"
                      ? "一部リスクのある変更が含まれています。段階的な導入を推奨します。"
                      : "リスクの低い変更です。パイロットテストを実施することを推奨します。"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* グラフ */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">月次申込数シミュレーション（千件）</CardTitle>
                <p className="text-xs text-muted-foreground">年間推移: 現状 vs シミュレーション</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="inline-block w-6 h-1.5 rounded bg-muted-foreground/40" />現状</span>
                <span className="flex items-center gap-1"><span className="inline-block w-6 h-1.5 rounded" style={{ backgroundColor: selectedCard.color }} />シミュレーション</span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedCard.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={selectedCard.color} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="base" name="現状" stroke="#94a3b8" fill="url(#baseGrad)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="simulated" name="シミュレーション" stroke={selectedCard.color} fill="url(#simGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 未選択状態のプレースホルダー */}
          {selectedCriteria.length === 0 && priceChange === 0 && !hasResult && (
            <Card className="border border-dashed border-[#006FCF]/30 bg-[#E6F2FF]/20 shadow-none">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E6F2FF] mb-3">
                  <Sparkles className="h-6 w-6 text-[#006FCF]" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">シミュレーションを開始</p>
                <p className="text-xs text-muted-foreground">左パネルで対象カードと審査基準変更を選択し、<br />シミュレーションを実行してください。</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
