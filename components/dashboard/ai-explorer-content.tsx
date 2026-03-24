"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Telescope, Search } from "lucide-react"

export function AIExplorerContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Telescope className="h-6 w-6 text-primary" />
          統合エクスプローラー
        </h2>
        <p className="text-sm text-muted-foreground">成分・商品・ニーズをワンプレイスで検索・分析</p>
      </div>

      <div className="flex gap-2">
        <Input placeholder="成分、商品、ニーズを自然言語で検索..." className="rounded-lg" />
        <Button size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          検索
        </Button>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">検索サンプル</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-xs space-y-1">
            <li>• 「30代女性に人気の美容成分は？」</li>
            <li>• 「睡眠 × スキンケアの相関製品」</li>
            <li>• 「この素材で作れる新商品は？」</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
