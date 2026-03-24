"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, Plus } from "lucide-react"

export function AIMaterialsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            素材データベース
          </h2>
          <p className="text-sm text-muted-foreground mt-1">原材料・成分マスタ管理 + トレンド相関分析</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          新規素材追加
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">登録済み素材</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["ビタミンC", "ヒアルロン酸", "セラミド"].map((material) => (
                <div key={material} className="p-2 bg-muted/50 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">{material}</span>
                  <Badge variant="outline" className="text-xs">トレンド中</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">素材×トレンド相関</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">ポストバイオティクス</p>
              <p className="text-xs text-muted-foreground">成長率: +340% | 関連素材: 5個</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
