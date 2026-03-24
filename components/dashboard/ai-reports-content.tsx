"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileBarChart, Download } from "lucide-react"

export function AIReportsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileBarChart className="h-6 w-6 text-primary" />
            自動レポート生成
          </h2>
          <p className="text-sm text-muted-foreground mt-1">週次/月次インサイト + カスタムレポート</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">定期レポート</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">今週のトップトレンド</p>
              <p className="text-xs text-muted-foreground mt-1">毎週金曜日に自動配信</p>
            </div>
            <Button className="w-full gap-2">
              <Download className="h-4 w-4" />
              最新レポートを見る
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">カスタムレポート</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">任意の条件でレポートを生成</p>
            <Button variant="outline" className="w-full">+ 新規作成</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
