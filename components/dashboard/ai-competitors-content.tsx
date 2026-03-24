"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Swords, TrendingUp, AlertCircle, CheckCircle2, Minus, ExternalLink, Bell } from "lucide-react"

const competitors = [
  {
    id: 1,
    name: "花王 ソフィーナ",
    newProduct: "プリマヴィスタ バイオミメティクスセラム",
    launchDate: "2025年3月",
    targetOverlap: 78,
    keyIngredients: ["バイオミメティクス", "レチナール", "ペプチド"],
    positioning: "技術×プレミアム",
    threat: "high",
    counterStrategy: "ナチュラル訴求での差別化、敏感肌対応を前面に",
    detectedAt: "3日前",
  },
  {
    id: 2,
    name: "資生堂 ELIXIR",
    newProduct: "エリクシール リンクル クリーム SP",
    launchDate: "2025年4月",
    targetOverlap: 65,
    keyIngredients: ["レチノール", "コラーゲンブースター"],
    positioning: "エイジングケア",
    threat: "medium",
    counterStrategy: "インナーケアとの複合提案で差別化",
    detectedAt: "1週間前",
  },
  {
    id: 3,
    name: "コーセー SEKKISEI",
    newProduct: "雪肌精 グルタチオン美白美容液",
    launchDate: "2025年5月",
    targetOverlap: 71,
    keyIngredients: ["グルタチオン", "トラネキサム酸", "植物エキス"],
    positioning: "和漢×最新科学",
    threat: "high",
    counterStrategy: "ユーザークラスター分析で未開拓層を狙う",
    detectedAt: "5日前",
  },
]

const benchmarkData = [
  { dimension: "成分革新性", ours: 82, avg: 71, leader: 89 },
  { dimension: "ターゲット精度", ours: 76, avg: 68, leader: 85 },
  { dimension: "価格競争力", ours: 71, avg: 75, leader: 72 },
  { dimension: "SNS影響力", ours: 65, avg: 70, leader: 91 },
  { dimension: "チャネル展開", ours: 79, avg: 72, leader: 88 },
  { dimension: "ブランド認知", ours: 68, avg: 74, leader: 95 },
]

const threatColors: Record<string, string> = {
  high: "border-red-200 bg-red-50/30",
  medium: "border-amber-200 bg-amber-50/30",
  low: "border-green-200 bg-green-50/30",
}

const threatBadge: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
}

const threatLabel: Record<string, string> = {
  high: "高脅威",
  medium: "中脅威",
  low: "低脅威",
}

export function CompetitorsContent() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(null)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <Swords className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-bold">競合分析AI</h2>
          <p className="text-sm text-muted-foreground">競合の新商品・成分・訴求を自動検知し、対抗策をAIが提案します</p>
        </div>
        <Button variant="outline" className="ml-auto gap-2 shrink-0">
          <Bell className="h-4 w-4" />
          アラート設定
        </Button>
      </div>

      <Tabs defaultValue="detection">
        <TabsList className="h-9">
          <TabsTrigger value="detection" className="text-xs">新商品検知</TabsTrigger>
          <TabsTrigger value="benchmark" className="text-xs">ベンチマーク比較</TabsTrigger>
        </TabsList>

        {/* 新商品検知 */}
        <TabsContent value="detection" className="mt-4 space-y-4">
          <p className="text-xs text-muted-foreground">AIが競合他社の新商品・成分・マーケティング動向を自動検知。ターゲット重複度と対抗策を自動提案します。</p>
          {competitors.map((c) => (
            <Card
              key={c.id}
              className={`rounded-xl cursor-pointer transition-all ${threatColors[c.threat]} ${
                selectedCompetitor === c.id ? "ring-2 ring-primary/30" : ""
              }`}
              onClick={() => setSelectedCompetitor(selectedCompetitor === c.id ? null : c.id)}
            >
              <CardContent className="py-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs text-muted-foreground">{c.name}</p>
                      <Badge className={`text-[10px] ${threatBadge[c.threat]}`}>{threatLabel[c.threat]}</Badge>
                      <span className="text-[10px] text-muted-foreground">検知: {c.detectedAt}</span>
                    </div>
                    <p className="text-sm font-bold mt-0.5">{c.newProduct}</p>
                    <p className="text-xs text-muted-foreground">発売予定: {c.launchDate} / ポジション: {c.positioning}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">ターゲット重複度</p>
                    <p className="text-2xl font-bold text-primary">{c.targetOverlap}%</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {c.keyIngredients.map((ing) => (
                    <Badge key={ing} variant="secondary" className="text-[10px]">{ing}</Badge>
                  ))}
                </div>

                {selectedCompetitor === c.id && (
                  <div className="mt-3 p-3 rounded-lg bg-white/60 border border-border space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-700">AI対抗策提案</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.counterStrategy}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full gap-2 text-xs">
                      詳細分析を開始 <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ベンチマーク */}
        <TabsContent value="benchmark" className="mt-4">
          <Card className="rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">競合ベンチマーク比較</CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary inline-block" />自社</div>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-muted-foreground inline-block" />業界平均</div>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />業界リーダー</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {benchmarkData.map((b) => (
                <div key={b.dimension} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{b.dimension}</span>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="font-bold text-primary">{b.ours}</span>
                      {b.ours > b.avg ? (
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                      ) : b.ours === b.avg ? (
                        <Minus className="h-3 w-3 text-gray-400" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-full" style={{ width: `${b.avg}%` }} />
                    <div className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all" style={{ width: `${b.ours}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>業界平均: {b.avg}</span>
                    <span>リーダー: {b.leader}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
