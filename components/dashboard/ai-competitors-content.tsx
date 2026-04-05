"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts"
import { Swords, TrendingUp, TrendingDown, AlertCircle, Download } from "lucide-react"

// --- 競合データ ---
const competitors = [
  { id: "amex", name: "AMEX", color: "#006FCF", isPrimary: true },
  { id: "jcb", name: "JCB", color: "#009A44" },
  { id: "visa-smbc", name: "Visa(SMBC)", color: "#1A1F71" },
  { id: "mastercard-mufg", name: "MC(MUFG)", color: "#EB001B" },
]

const radarData = [
  { metric: "プレミアム会員比率", amex: 90, jcb: 62, visambc: 48, mcmufg: 44 },
  { metric: "会員満足度(NPS)", amex: 78, jcb: 65, visambc: 55, mcmufg: 52 },
  { metric: "国際加盟店網", amex: 95, jcb: 70, visambc: 98, mcmufg: 96 },
  { metric: "特典・ベネフィット", amex: 92, jcb: 74, visambc: 58, mcmufg: 56 },
  { metric: "デジタル体験", amex: 82, jcb: 71, visambc: 76, mcmufg: 72 },
  { metric: "法人カードシェア", amex: 88, jcb: 55, visambc: 60, mcmufg: 58 },
]

const shareData = [
  { quarter: "2025Q1", amex: 18.2, jcb: 24.1, visambc: 31.4, mcmufg: 26.3 },
  { quarter: "2025Q2", amex: 18.6, jcb: 23.8, visambc: 31.2, mcmufg: 26.4 },
  { quarter: "2025Q3", amex: 19.1, jcb: 23.5, visambc: 31.0, mcmufg: 26.4 },
  { quarter: "2025Q4", amex: 19.4, jcb: 23.2, visambc: 31.1, mcmufg: 26.3 },
  { quarter: "2026Q1", amex: 19.8, jcb: 23.0, visambc: 31.0, mcmufg: 26.2 },
  { quarter: "2026Q2", amex: 20.2, jcb: 22.8, visambc: 30.8, mcmufg: 26.2 },
  { quarter: "2026Q3", amex: 20.7, jcb: 22.5, visambc: 30.6, mcmufg: 26.2 },
]

const annualFeeData = [
  { card: "プラチナ相当", amex: 165000, jcb: 132000, visambc: 110000, mcmufg: 99000 },
  { card: "ゴールド相当", amex: 31900, jcb: 11000, visambc: 11000, mcmufg: 11000 },
  { card: "スタンダード", amex: 13200, jcb: 0, visambc: 1375, mcmufg: 1375 },
]

const competitorAlerts = [
  {
    competitor: "JCB",
    type: "新施策",
    severity: "medium",
    title: "JCBがプラチナ向け空港ラウンジ拡充",
    detail: "国内主要空港20拠点追加。AMEX との差別化要因である旅行特典で競合激化。",
    date: "2026/09/28",
  },
  {
    competitor: "Visa(SMBC)",
    type: "新商品",
    severity: "high",
    title: "SMBCがプレミアムカード新ブランド発表",
    detail: "年会費55,000円の新プレミアムカード。ゴールド〜プラチナ層へ訴求。AMEX ゴールドと直接競合。",
    date: "2026/10/02",
  },
  {
    competitor: "MC(MUFG)",
    type: "価格改定",
    severity: "low",
    title: "MUFGカードが年会費を10%引き下げ",
    detail: "エントリー層への訴求強化。AMEX ブルー・グリーン層への影響は限定的と推定。",
    date: "2026/09/15",
  },
]

const severityConfig: Record<string, { badge: string; dot: string }> = {
  high: { badge: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  medium: { badge: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  low: { badge: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
}

export function AICompetitorsContent() {
  const [activeTab, setActiveTab] = useState("radar")
  const [selectedCompetitor, setSelectedCompetitor] = useState("all")

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F2FF]">
            <Swords className="h-4 w-4 text-[#006FCF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">競合・市場分析</p>
            <p className="text-xs text-muted-foreground">データ収集: Web・開示資料・SNS分析 | 更新: 2026/10/01</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Download className="h-3.5 w-3.5" />
          レポート出力
        </Button>
      </div>

      {/* 競合アラート */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI 検知アラート</p>
        {competitorAlerts.map((alert, idx) => {
          const cfg = severityConfig[alert.severity]
          return (
            <div key={idx} className="flex gap-3 p-3.5 rounded-xl border border-border bg-card">
              <div className="mt-1.5 flex-shrink-0">
                <span className={`inline-block w-2 h-2 rounded-full ${cfg.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${cfg.badge}`}>
                    {alert.type}
                  </span>
                  <span className="text-[10px] font-bold text-[#006FCF]">{alert.competitor}</span>
                  <span className="text-[10px] text-muted-foreground">{alert.date}</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{alert.detail}</p>
              </div>
              <div className="flex-shrink-0">
                {alert.severity === "high"
                  ? <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  : alert.severity === "medium"
                  ? <TrendingDown className="h-4 w-4 text-amber-500 mt-0.5" />
                  : <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />}
              </div>
            </div>
          )
        })}
      </div>

      {/* 分析タブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="radar" className="text-xs">ポジショニング</TabsTrigger>
          <TabsTrigger value="share" className="text-xs">市場シェア推移</TabsTrigger>
          <TabsTrigger value="fee" className="text-xs">年会費比較</TabsTrigger>
        </TabsList>

        {/* ポジショニングレーダー */}
        <TabsContent value="radar" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">競合ポジショニングレーダー</CardTitle>
                <p className="text-xs text-muted-foreground">主要6軸での競合比較（スコア 0–100）</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {competitors.map((c) => (
                  <span key={c.id} className="flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                    <span className={c.isPrimary ? "font-bold text-foreground" : ""}>{c.name}</span>
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={360}>
                <RadarChart data={radarData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="amex" name="AMEX" stroke="#006FCF" fill="#006FCF" fillOpacity={0.25} strokeWidth={2.5} />
                  <Radar dataKey="jcb" name="JCB" stroke="#009A44" fill="#009A44" fillOpacity={0.08} strokeWidth={1.5} />
                  <Radar dataKey="visambc" name="Visa(SMBC)" stroke="#1A1F71" fill="#1A1F71" fillOpacity={0.06} strokeWidth={1.5} />
                  <Radar dataKey="mcmufg" name="MC(MUFG)" stroke="#EB001B" fill="#EB001B" fillOpacity={0.06} strokeWidth={1.5} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 市場シェア推移 */}
        <TabsContent value="share" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">プレミアムカード市場 シェア推移（%）</CardTitle>
                <p className="text-xs text-muted-foreground">四半期ベース | 対象: 年会費1万円以上のカード</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {competitors.map((c) => (
                  <span key={c.id} className="flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2 rounded-sm" style={{ backgroundColor: c.color }} />
                    <span className={c.isPrimary ? "font-bold text-foreground" : ""}>{c.name}</span>
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={shareData} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[15, 35]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v: number) => [`${v.toFixed(1)}%`, ""]}
                  />
                  <Line type="monotone" dataKey="amex" name="AMEX" stroke="#006FCF" strokeWidth={3} dot={{ r: 4, fill: "#006FCF" }} />
                  <Line type="monotone" dataKey="jcb" name="JCB" stroke="#009A44" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="visambc" name="Visa(SMBC)" stroke="#1A1F71" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="mcmufg" name="MC(MUFG)" stroke="#EB001B" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 年会費比較 */}
        <TabsContent value="fee" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">カードランク別 年会費比較（円）</CardTitle>
              <p className="text-xs text-muted-foreground">税込み年会費（2026年10月現在）</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={annualFeeData} margin={{ top: 4, right: 12, left: -4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="card" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v: number) => [`¥${v.toLocaleString()}`, ""]}
                  />
                  <Bar dataKey="amex" name="AMEX" fill="#006FCF" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="jcb" name="JCB" fill="#009A44" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="visambc" name="Visa(SMBC)" fill="#1A1F71" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="mcmufg" name="MC(MUFG)" fill="#EB001B" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
