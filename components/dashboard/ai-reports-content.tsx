"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileBarChart, Download, Calendar, ArrowRight, Users, CreditCard, TrendingUp, BarChart3 } from "lucide-react"

const scheduledReports = [
  {
    title: "週次会員サマリー",
    description: "新規申込・解約・利用額の週次推移と前週比",
    frequency: "毎週月曜 8:00",
    lastGenerated: "2026年4月1日",
    tag: "会員分析",
    color: "bg-primary/10 text-primary border-0",
    icon: Users,
  },
  {
    title: "月次KPIダッシュボード",
    description: "経営陣向け全指標サマリー。カード種別・チャネル別パフォーマンス",
    frequency: "毎月1日 7:00",
    lastGenerated: "2026年4月1日",
    tag: "エグゼクティブ",
    color: "bg-accent/10 text-accent border-0",
    icon: BarChart3,
  },
  {
    title: "AI解約予測レポート",
    description: "高リスク会員一覧とリテンション施策の自動推奨",
    frequency: "毎週水曜 9:00",
    lastGenerated: "2026年3月26日",
    tag: "AIインサイト",
    color: "bg-destructive/10 text-destructive border-0",
    icon: TrendingUp,
  },
  {
    title: "特典利用率レポート",
    description: "カード種別×特典カテゴリ別の利用率とNPS相関",
    frequency: "毎月15日 8:00",
    lastGenerated: "2026年3月15日",
    tag: "特典分析",
    color: "bg-emerald-500/10 text-emerald-600 border-0",
    icon: CreditCard,
  },
]

const recentReports = [
  { title: "2026年3月 月次KPIレポート", date: "2026/04/01", size: "2.4 MB", format: "PDF" },
  { title: "2026年Q1 会員動向分析", date: "2026/04/01", size: "5.8 MB", format: "PPTX" },
  { title: "2026年3月 AI解約予測レポート", date: "2026/03/26", size: "1.2 MB", format: "PDF" },
  { title: "2026年3月 特典利用率レポート", date: "2026/03/15", size: "3.1 MB", format: "XLSX" },
]

export function AIReportsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileBarChart className="h-6 w-6 text-primary" />
            自動レポート生成
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            会員・特典・チャネルの定期レポートとカスタムレポートの管理
          </p>
        </div>
        <Button className="gap-2">
          <FileBarChart className="h-4 w-4" />
          カスタムレポート作成
        </Button>
      </div>

      {/* 定期レポート */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">定期レポート設定</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scheduledReports.map((report) => (
            <Card key={report.title} className="rounded-xl border-border hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">{report.title}</p>
                      <Badge className={`text-xs shrink-0 ${report.color}`}>{report.tag}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{report.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {report.frequency}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">最終生成: {report.lastGenerated}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Download className="h-3 w-3" />
                      最新版
                    </Button>
                    <Button size="sm" className="h-7 text-xs gap-1">
                      <ArrowRight className="h-3 w-3" />
                      詳細
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 直近のレポート */}
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">直近のレポート一覧</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentReports.map((r) => (
            <div key={r.title} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileBarChart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.date} · {r.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{r.format}</Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
