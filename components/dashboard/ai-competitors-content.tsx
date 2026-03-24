"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Swords, Download } from "lucide-react"

export function AICompetitorsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Swords className="h-6 w-6 text-primary" />
            競合分析AI
          </h2>
          <p className="text-sm text-muted-foreground mt-1">新商品自動検知・成分比較・対抗策提案</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          レポート
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
              新商品自動検知
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">競合の新商品をリアルタイム検知</p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium">ブランドA: レチノール美容液新作</p>
              <p className="text-xs text-muted-foreground mt-1">2時間前に検知</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
              成分比較分析
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">成分構成の差別化ポイント抽出</p>
            <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
              <div className="flex justify-between"><span>ビタミンC:</span><span className="text-primary font-medium">1500mg vs 1000mg</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
