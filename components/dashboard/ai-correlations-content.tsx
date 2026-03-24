"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Download } from "lucide-react"

export function AICorrelationsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI相関発見エンジン
          </h2>
          <p className="text-sm text-muted-foreground mt-1">クロスカテゴリー相関・素材シナジーの自動検出</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* クロスカテゴリー相関 */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
              クロスカテゴリー相関
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">異なるカテゴリ間のトレンド相関を自動発見</p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-sm font-medium">睡眠サプリ × スキンケア</span>
                <span className="text-sm font-bold text-primary">87%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-sm font-medium">アンチエイジング × 睡眠</span>
                <span className="text-sm font-bold text-primary">82%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-sm font-medium">美肌 × 栄養補助食品</span>
                <span className="text-sm font-bold text-primary">79%</span>
              </div>
            </div>
            <Button className="w-full gap-2">
              <Zap className="h-4 w-4" />
              詳細を見る
            </Button>
          </CardContent>
        </Card>

        {/* 素材シナジー発見 */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
              素材シナジー発見
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">組み合わせで効果が高まる素材ペアを提案</p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-sm font-medium">ビタミンC + ヒアルロン酸</span>
                <span className="text-sm font-bold text-primary">↑143%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-sm font-medium">レチノール + ペプチド</span>
                <span className="text-sm font-bold text-primary">↑128%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-sm font-medium">ナイアシンアミド + セラミド</span>
                <span className="text-sm font-bold text-primary">↑115%</span>
              </div>
            </div>
            <Button className="w-full gap-2">
              <Zap className="h-4 w-4" />
              詳細を見る
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 異業種トレンド転用 */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">NEW</Badge>
            異業種トレンド転用
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">アパレル・テック等のトレンドを消費財に応用</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["サステナビリティ", "パーソナライゼーション", "ウェルネス"].map((trend) => (
              <div key={trend} className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold text-sm mb-2">{trend}</h4>
                <p className="text-xs text-muted-foreground">アプリケーション可能性を検索中...</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
