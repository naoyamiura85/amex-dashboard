"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Target, Lightbulb } from "lucide-react"

export function AIConceptGeneratorContent() {
  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            商品コンセプト自動生成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            トレンド、ターゲット、素材から最適な商品コンセプトを自動生成します。
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">コンセプト生成</TabsTrigger>
          <TabsTrigger value="history">生成履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-4">
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">新規コンセプト生成</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">トレンド選択</label>
                  <Button variant="outline" className="w-full mt-2">
                    トレンドを選択
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium">ターゲット層</label>
                  <Button variant="outline" className="w-full mt-2">
                    ターゲットを設定
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium">使用可能素材</label>
                  <Button variant="outline" className="w-full mt-2">
                    素材を選択
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Sparkles className="mr-2 h-4 w-4" />
                コンセプト生成
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-base">生成されたコンセプト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "輝く肌", desc: "光反射技術で肌の透明感を強調", score: "92%" },
                { name: "深呼吸スキンケア", desc: "アロマテラピー×保湿ケア", score: "87%" },
                { name: "時間逆行美容", desc: "夜間修復機能を強化", score: "85%" },
              ].map((concept, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{concept.name}</div>
                    <Badge className="bg-purple-600">{concept.score}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{concept.desc}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    詳細を見る
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-base">最近の生成</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 2024年3月24日 - ナチュラルスキンケアコンセプト</p>
                <p>• 2024年3月23日 - 敏感肌向けコンセプト</p>
                <p>• 2024年3月22日 - アンチエイジング</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
