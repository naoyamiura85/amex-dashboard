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
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Download,
  AlertCircle,
  Eye,
  ChevronRight,
} from "lucide-react"

// 競合カード会社データ
const competitors = [
  {
    id: "jcb",
    name: "JCB",
    type: "国内ブランド",
    marketShare: 18.2,
    members: "1.45億人",
    avgFee: "¥11,000",
    nps: 42,
    change: "+0.4pt",
    trend: "up",
    color: "#1a56db",
    strengths: ["国内加盟店数最多", "Oki Dokiポイント", "国内ブランド優位"],
    threats: ["海外利用率低", "プレミアム層弱い", "年会費値上げ検討中"],
  },
  {
    id: "visa-mufg",
    name: "三菱UFJ Visa",
    type: "銀行系Visa",
    marketShare: 14.8,
    members: "1.18億人",
    avgFee: "¥8,500",
    nps: 38,
    change: "+1.2pt",
    trend: "up",
    color: "#e3a008",
    strengths: ["銀行連携", "学生層強い", "手数料優位"],
    threats: ["プレミアム特典弱い", "旅行系薄い", "デジタル対応遅"],
  },
  {
    id: "rakuten",
    name: "楽天カード",
    type: "ポイント特化",
    marketShare: 12.5,
    members: "3.00億枚",
    avgFee: "¥0",
    nps: 55,
    change: "+2.8pt",
    trend: "up",
    color: "#bf125d",
    strengths: ["楽天エコシステム", "年会費無料", "高NPS"],
    threats: ["プレミアム層なし", "収益性低", "SPU依存"],
  },
  {
    id: "diners",
    name: "ダイナースクラブ",
    type: "プレミアム競合",
    marketShare: 3.2,
    members: "92万人",
    avgFee: "¥24,200",
    nps: 64,
    change: "-0.3pt",
    trend: "down",
    color: "#057a55",
    strengths: ["プレミアムイメージ", "グルメ特典", "経営者層強い"],
    threats: ["会員数減少", "若年層弱い", "デジタル後手"],
  },
]

// 競合比較レーダーデータ
const radarComparison = [
  { subject: "プレミアム特典", amex: 95, jcb: 55, mufg: 40, rakuten: 20, diners: 88 },
  { subject: "旅行サービス", amex: 92, jcb: 45, mufg: 42, rakuten: 35, diners: 85 },
  { subject: "ポイント還元", amex: 72, jcb: 68, mufg: 55, rakuten: 95, diners: 60 },
  { subject: "加盟店数", amex: 78, jcb: 92, mufg: 80, rakuten: 85, diners: 65 },
  { subject: "顧客満足度", amex: 85, jcb: 42, mufg: 38, rakuten: 55, diners: 64 },
  { subject: "デジタル対応", amex: 88, jcb: 62, mufg: 48, rakuten: 92, diners: 45 },
]

// 市場シェアトレンド
const sharesTrend = [
  { month: "5月", amex: 8.4, rakuten: 11.8, jcb: 18.5, mufg: 14.2 },
  { month: "6月", amex: 8.5, rakuten: 12.0, jcb: 18.4, mufg: 14.3 },
  { month: "7月", amex: 8.6, rakuten: 12.1, jcb: 18.3, mufg: 14.4 },
  { month: "8月", amex: 8.7, rakuten: 12.2, jcb: 18.3, mufg: 14.5 },
  { month: "9月", amex: 8.8, rakuten: 12.4, jcb: 18.2, mufg: 14.7 },
  { month: "10月", amex: 8.9, rakuten: 12.5, jcb: 18.2, mufg: 14.8 },
]

// 新商品・動向アラート
const competitorAlerts = [
  {
    company: "楽天カード",
    type: "新施策",
    message: "楽天プレミアムカードのラウンジ特典をリニューアル。Priority Pass付与で上位層を狙う動き。",
    impact: "high",
    date: "2026/10/03",
  },
  {
    company: "JCB",
    type: "価格変更",
    message: "JCB THE CLASSの年会費を¥55,000→¥66,000に改定。プレミアム市場での値上げトレンド。",
    impact: "medium",
    date: "2026/09/28",
  },
  {
    company: "三菱UFJ",
    type: "新機能",
    message: "Tap to Pay対応を全カードに展開。NFC決済シェアで3位に浮上。",
    impact: "low",
    date: "2026/09/22",
  },
  {
    company: "ダイナース",
    type: "提携",
    message: "三井住友フィナンシャルグループとの資本提携を発表。デジタル強化へ。",
    impact: "high",
    date: "2026/09/15",
  },
]

const impactConfig: Record<string, { label: string; badge: string }> = {
  high: { label: "要注意", badge: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "注目", badge: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "情報収集", badge: "bg-slate-100 text-slate-600 border-slate-200" },
}

export function AICompetitorsContent() {
  const [selectedCompetitor, setSelectedCompetitor] = useState(competitors[0])
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">競合モニタリング: リアルタイム | 最終更新: 本日 08:30</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Download className="h-3.5 w-3.5" />
          レポート出力
        </Button>
      </div>

      {/* タブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60 h-9">
          <TabsTrigger value="overview" className="text-xs">競合概要</TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs">比較分析</TabsTrigger>
          <TabsTrigger value="share" className="text-xs">シェアトレンド</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs">動向アラート</TabsTrigger>
        </TabsList>

        {/* 競合概要 */}
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 競合一覧 */}
            <div className="space-y-2">
              {competitors.map((c) => (
                <Card
                  key={c.id}
                  className={`cursor-pointer border transition-all shadow-sm ${
                    selectedCompetitor.id === c.id
                      ? "border-[#006FCF] bg-[#E6F2FF]/50 shadow-md"
                      : "border-border hover:border-[#006FCF]/40"
                  }`}
                  onClick={() => setSelectedCompetitor(c)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-sm font-semibold">{c.name}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] px-1.5 h-4 border-border/60">{c.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">シェア {c.marketShare}%</span>
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${c.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                        {c.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {c.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 競合詳細 */}
            <Card className="lg:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-8 rounded-full" style={{ backgroundColor: selectedCompetitor.color }} />
                  <div>
                    <CardTitle className="text-base">{selectedCompetitor.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{selectedCompetitor.type}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">基本情報</p>
                    {[
                      { label: "市場シェア", value: `${selectedCompetitor.marketShare}%` },
                      { label: "会員数", value: selectedCompetitor.members },
                      { label: "平均年会費", value: selectedCompetitor.avgFee },
                      { label: "NPS", value: String(selectedCompetitor.nps) },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between py-1.5 border-b border-border/40 last:border-0">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <span className="text-xs font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">強み</p>
                      <ul className="space-y-1.5">
                        {selectedCompetitor.strengths.map((s) => (
                          <li key={s} className="flex items-center gap-2 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="text-foreground">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">弱み・脅威</p>
                      <ul className="space-y-1.5">
                        {selectedCompetitor.threats.map((t) => (
                          <li key={t} className="flex items-center gap-2 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                            <span className="text-foreground">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 比較分析 */}
        <TabsContent value="comparison" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">競合比較レーダーチャート</CardTitle>
                <p className="text-xs text-muted-foreground">主要6指標での相対比較スコア（0-100）</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { name: "AMEX", color: "#006FCF" },
                  { name: "JCB", color: "#1a56db" },
                  { name: "三菱UFJ", color: "#e3a008" },
                  { name: "楽天", color: "#bf125d" },
                  { name: "ダイナース", color: "#057a55" },
                ].map((l) => (
                  <span key={l.name} className="flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={360}>
                <RadarChart data={radarComparison}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="AMEX" dataKey="amex" stroke="#006FCF" fill="#006FCF" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="JCB" dataKey="jcb" stroke="#1a56db" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Radar name="楽天" dataKey="rakuten" stroke="#bf125d" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Radar name="ダイナース" dataKey="diners" stroke="#057a55" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* シェアトレンド */}
        <TabsContent value="share" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">主要カード会社 市場シェア推移（%）</CardTitle>
                <p className="text-xs text-muted-foreground">国内クレジットカード利用額シェア</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {[
                  { name: "AMEX", color: "#006FCF" },
                  { name: "楽天", color: "#bf125d" },
                  { name: "JCB", color: "#1a56db" },
                  { name: "三菱UFJ", color: "#e3a008" },
                ].map((l) => (
                  <span key={l.name} className="flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sharesTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[7, 20]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v: number) => [`${v}%`, ""]}
                  />
                  <Line type="monotone" dataKey="amex" name="AMEX" stroke="#006FCF" strokeWidth={3} dot={{ r: 4, fill: "#006FCF" }} />
                  <Line type="monotone" dataKey="rakuten" name="楽天" stroke="#bf125d" strokeWidth={1.5} dot={{ r: 3 }} strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="jcb" name="JCB" stroke="#1a56db" strokeWidth={1.5} dot={{ r: 3 }} strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="mufg" name="三菱UFJ" stroke="#e3a008" strokeWidth={1.5} dot={{ r: 3 }} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 動向アラート */}
        <TabsContent value="alerts" className="mt-4">
          <div className="space-y-3">
            {competitorAlerts.map((alert, idx) => {
              const cfg = impactConfig[alert.impact]
              return (
                <Card key={idx} className="border border-border shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{alert.company}</span>
                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-border/60">{alert.type}</Badge>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${cfg.badge}`}>{cfg.label}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{alert.date}</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{alert.message}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-[#006FCF] flex-shrink-0 hover:bg-[#E6F2FF] text-xs">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      詳細
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
