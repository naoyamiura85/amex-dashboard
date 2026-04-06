"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Globe,
  BarChart3,
  Smartphone,
  Users,
  Mail,
  Store,
  Phone,
  Tv,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// 申込チャネルデータ
const channels = [
  {
    id: 1,
    name: "公式ウェブサイト",
    type: "デジタル",
    icon: Globe,
    monthlyApps: 18420,
    approvalRate: 68.4,
    cac: 8200,
    trend: "up",
    delta: 14.2,
    avgAge: 34,
  },
  {
    id: 2,
    name: "モバイルアプリ",
    type: "デジタル",
    icon: Smartphone,
    monthlyApps: 12380,
    approvalRate: 71.2,
    cac: 6800,
    trend: "up",
    delta: 28.6,
    avgAge: 30,
  },
  {
    id: 3,
    name: "店頭（百貨店等）",
    type: "対面",
    icon: Store,
    monthlyApps: 8940,
    approvalRate: 74.8,
    cac: 14600,
    trend: "down",
    delta: -8.3,
    avgAge: 46,
  },
  {
    id: 4,
    name: "ダイレクトメール",
    type: "オフライン",
    icon: Mail,
    monthlyApps: 5210,
    approvalRate: 66.1,
    cac: 18200,
    trend: "down",
    delta: -12.7,
    avgAge: 52,
  },
  {
    id: 5,
    name: "テレマーケティング",
    type: "対面",
    icon: Phone,
    monthlyApps: 4180,
    approvalRate: 58.3,
    cac: 22400,
    trend: "down",
    delta: -18.4,
    avgAge: 50,
  },
  {
    id: 6,
    name: "SNS広告",
    type: "デジタル",
    icon: Users,
    monthlyApps: 9640,
    approvalRate: 62.8,
    cac: 9400,
    trend: "up",
    delta: 32.1,
    avgAge: 28,
  },
  {
    id: 7,
    name: "TV・OOH広告",
    type: "オフライン",
    icon: Tv,
    monthlyApps: 3820,
    approvalRate: 64.5,
    cac: 31800,
    trend: "stable",
    delta: 1.2,
    avgAge: 44,
  },
]

// 月次申込件数推移
const monthlyApps = [
  { month: "10月", web: 14200, app: 8400, store: 10200, sns: 5800 },
  { month: "11月", web: 15800, app: 9600, store: 9800, sns: 7200 },
  { month: "12月", web: 17200, app: 10800, store: 11400, sns: 8400 },
  { month: "1月", web: 16400, app: 11200, store: 8600, sns: 8900 },
  { month: "2月", web: 17800, app: 11900, store: 8200, sns: 9400 },
  { month: "3月", web: 18420, app: 12380, store: 8940, sns: 9640 },
]

// チャネル別シェア
const channelShare = [
  { name: "ウェブ", value: 30.2, color: "#006FCF" },
  { name: "モバイル", value: 20.3, color: "#00175A" },
  { name: "SNS広告", value: 15.8, color: "#B4975A" },
  { name: "店頭", value: 14.7, color: "#64B5F6" },
  { name: "DM", value: 8.5, color: "#4CAF50" },
  { name: "その他", value: 10.5, color: "#90A4AE" },
]

const typeColors: Record<string, string> = {
  "デジタル": "bg-primary/15 text-primary border-primary/30",
  "対面": "bg-accent/15 text-accent border-accent/30",
  "オフライン": "bg-muted text-muted-foreground border-border",
}

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-500" />
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

export function ChannelsContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          申込チャネル分析
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          チャネル別の新規申込件数・承認率・獲得コストのパフォーマンス分析
        </p>
      </div>

      {/* KPI サマリー */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "月間総申込数", value: "62,590件", sub: "前月比 +8.4%" },
          { label: "平均承認率", value: "66.9%", sub: "業界平均 +4.2pt" },
          { label: "平均獲得コスト", value: "¥15,800", sub: "前月比 -6.1%" },
          { label: "デジタル申込比率", value: "66.3%", sub: "前月比 +5.8pt" },
        ].map((kpi) => (
          <Card key={kpi.label} className="rounded-xl border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
              <p className="text-xs text-primary mt-0.5">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="table">
        <TabsList className="mb-4">
          <TabsTrigger value="table">チャネル一覧</TabsTrigger>
          <TabsTrigger value="trends">推移グラフ</TabsTrigger>
          <TabsTrigger value="share">シェア</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card className="rounded-xl border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs text-muted-foreground">チャネル</TableHead>
                    <TableHead className="text-xs text-muted-foreground">種別</TableHead>
                    <TableHead className="text-xs text-muted-foreground">月間申込数</TableHead>
                    <TableHead className="text-xs text-muted-foreground">承認率</TableHead>
                    <TableHead className="text-xs text-muted-foreground">獲得コスト</TableHead>
                    <TableHead className="text-xs text-muted-foreground">平均年齢</TableHead>
                    <TableHead className="text-xs text-muted-foreground">前月比</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channels.map((ch) => (
                    <TableRow key={ch.id} className="border-border hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ch.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{ch.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs border ${typeColors[ch.type]}`}>{ch.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold text-foreground">{ch.monthlyApps.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 w-20">
                          <span className="text-xs font-semibold text-foreground">{ch.approvalRate}%</span>
                          <Progress value={ch.approvalRate} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">¥{ch.cac.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">{ch.avgAge}歳</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendIcon trend={ch.trend} />
                          <span className={`text-xs font-semibold ${ch.trend === "up" ? "text-emerald-600" : ch.trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
                            {ch.delta > 0 ? "+" : ""}{ch.delta}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="rounded-xl border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">主要チャネル月次申込推移</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyApps} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="web" name="ウェブ" stroke="#006FCF" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="app" name="モバイル" stroke="#00175A" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="sns" name="SNS広告" stroke="#B4975A" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="store" name="店頭" stroke="#64B5F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share">
          <Card className="rounded-xl border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">チャネル別申込シェア</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8 h-64">
                <div className="flex-1 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={channelShare} innerRadius={60} outerRadius={96} paddingAngle={2} dataKey="value">
                        {channelShare.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {channelShare.map((d) => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-foreground w-20">{d.name}</span>
                        <span className="text-sm font-bold text-foreground">{d.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
