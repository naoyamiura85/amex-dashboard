"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Boxes, Play } from "lucide-react"

export function AISimulatorContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Boxes className="h-6 w-6 text-primary" />
          改定シミュレーター
        </h2>
        <p className="text-sm text-muted-foreground mt-1">What-If分析・価格感応度・カニバリ予測</p>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">シミュレーションシナリオ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">レチノール濃度を0.5% → 1.0%に増加</p>
            <div className="text-xs space-y-1">
              <p>予想売上増加率: +23%</p>
              <p>既存製品との被食率: 8%</p>
              <p>推奨価格帯: ¥6,500 - ¥7,500</p>
            </div>
          </div>
          <Button className="w-full gap-2">
            <Play className="h-4 w-4" />
            詳細シミュレーション
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
