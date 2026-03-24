'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileBarChart, Download, Mail, Calendar, TrendingUp, AlertCircle } from 'lucide-react'

export function AIReportsContent() {
  const [selectedReport, setSelectedReport] = useState('weekly')

  const reports = [
    {
      id: 'weekly',
      title: '週次インサイトレポート',
      icon: Calendar,
      lastGenerated: '2026-03-24',
      items: [
        { title: '急上昇トレンド TOP3', value: 'バクチオール、レチナール、CICA' },
        { title: 'クロスカテゴリー相関', value: '睡眠 × スキンケアで+42%の需要相関' },
        { title: 'ユーザークラスター変動', value: '敏感肌ケア層が前週比+18%で成長' },
        { title: '新機会', value: '韓国コスメ × 20代女性の透明感志向' },
      ],
    },
    {
      id: 'monthly',
      title: '月次ビジネスレポート',
      icon: TrendingUp,
      lastGenerated: '2026-03-20',
      items: [
        { title: 'トレンド成熟度分析', value: 'バクチオール（急成長期）、レチナール（成熟期）' },
        { title: '競合動向', value: '競合5社の新商品投入が3件確認' },
        { title: '推奨アクション', value: '素材シナジー商品の3ヶ月内ローンチ' },
        { title: 'リスク警告', value: '敏感肌ケアのカニバリゼーション懸念' },
      ],
    },
    {
      id: 'custom',
      title: 'カスタムレポート',
      icon: FileBarChart,
      lastGenerated: '指定に応じて生成',
      items: [
        { title: 'テンプレート', value: '商品企画、競合分析、市場機会分析' },
        { title: 'データ範囲', value: '期間、カテゴリ、セグメント、地域を指定' },
        { title: '出力形式', value: 'PDF、Excel、PowerPoint' },
        { title: 'スケジュール', value: '定期配信（日次、週次、月次）' },
      ],
    },
  ]

  const currentReport = reports.find(r => r.id === selectedReport)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">自動レポート生成</h1>
        <p className="text-muted-foreground">
          トレンドデータから自動生成されるインサイトレポート。定期配信もカスタマイズ可能です
        </p>
      </div>

      {/* Report Selector */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">週次</TabsTrigger>
          <TabsTrigger value="monthly">月次</TabsTrigger>
          <TabsTrigger value="custom">カスタム</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Report Content */}
      {currentReport && (
        <div className="space-y-4">
          {/* Report Header Card */}
          <Card className="rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    {currentReport.icon && <currentReport.icon className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{currentReport.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      最終生成: {currentReport.lastGenerated}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2 rounded-lg">
                    <Download className="h-3.5 w-3.5" />
                    ダウンロード
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2 rounded-lg">
                    <Mail className="h-3.5 w-3.5" />
                    送信
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Report Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentReport.items.map((item, idx) => (
              <Card key={idx} className="rounded-xl">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Configuration */}
          {selectedReport === 'custom' && (
            <Card className="rounded-xl border-dashed">
              <CardHeader>
                <CardTitle className="text-base">レポート設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">期間</label>
                    <select className="w-full mt-1.5 p-2 rounded-lg border border-input bg-background text-sm">
                      <option>先週</option>
                      <option>先月</option>
                      <option>カスタム期間</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">出力形式</label>
                    <select className="w-full mt-1.5 p-2 rounded-lg border border-input bg-background text-sm">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>PowerPoint</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full rounded-lg">レポート生成</Button>
              </CardContent>
            </Card>
          )}

          {/* Action Items */}
          <Card className="rounded-xl border-amber-200 bg-amber-50">
            <CardContent className="pt-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-900">推奨アクション</h4>
                <p className="text-sm text-amber-800 mt-1">
                  素材シナジーの高い商品コンセプトを3件ジェネレーターで生成することをお勧めします
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
