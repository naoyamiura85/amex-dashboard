"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FlaskConical, Search, Plus, TrendingUp, Star, AlertTriangle } from "lucide-react"

const materials = [
  {
    id: 1, name: "バクチオール", origin: "植物由来", category: "エイジングケア",
    trendScore: 94, safetyScore: 98, costIndex: "中", synergies: ["エクトイン", "スクワラン"],
    status: "採用済み", marketGrowth: "+145%",
    description: "レチノールの植物由来代替素材。敏感肌にも使用可能。",
  },
  {
    id: 2, name: "ポストバイオティクス", origin: "発酵由来", category: "腸内環境・美容",
    trendScore: 91, safetyScore: 95, costIndex: "高", synergies: ["プレバイオティクス", "コラーゲン"],
    status: "検討中", marketGrowth: "+210%",
    description: "乳酸菌の代謝産物。腸内環境改善×美容の新複合領域。",
  },
  {
    id: 3, name: "グルタチオン", origin: "酵母由来", category: "美白",
    trendScore: 87, safetyScore: 92, costIndex: "高", synergies: ["ビタミンC誘導体", "α-アルブチン"],
    status: "検討中", marketGrowth: "+167%",
    description: "抗酸化×美白の複合効果。インナーケア市場で急成長中。",
  },
  {
    id: 4, name: "CICA (ツボクサエキス)", origin: "植物由来", category: "鎮静・修復",
    trendScore: 71, safetyScore: 97, costIndex: "低", synergies: ["ナイアシンアミド", "アロエ"],
    status: "採用済み", marketGrowth: "+12%",
    description: "鎮静・バリア修復成分。成熟期を迎えており差別化が必要。",
  },
  {
    id: 5, name: "エクトイン", origin: "微生物由来", category: "保湿・保護",
    trendScore: 83, safetyScore: 99, costIndex: "中", synergies: ["ヒアルロン酸", "バクチオール"],
    status: "未採用", marketGrowth: "+89%",
    description: "極限環境微生物由来。細胞保護×保湿の高機能素材。",
  },
]

const statusColors: Record<string, string> = {
  採用済み: "bg-emerald-100 text-emerald-700",
  検討中: "bg-amber-100 text-amber-700",
  未採用: "bg-gray-100 text-gray-600",
}

export function MaterialsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null)

  const filtered = materials.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <FlaskConical className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-base font-bold">素材データベース</h2>
            <p className="text-sm text-muted-foreground">素材のトレンドスコア・安全性・シナジー情報をAIが一元管理</p>
          </div>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          素材を追加
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="素材名・カテゴリで検索..."
          className="pl-9 h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "登録素材数", value: `${materials.length}`, sub: "全素材" },
          { label: "採用済み", value: `${materials.filter(m => m.status === "採用済み").length}`, sub: "現行製品" },
          { label: "検討中", value: `${materials.filter(m => m.status === "検討中").length}`, sub: "候補素材" },
          { label: "高トレンド", value: `${materials.filter(m => m.trendScore >= 85).length}`, sub: "スコア85以上" },
        ].map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-primary mt-0.5">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Material List */}
      <div className="space-y-3">
        {filtered.map((m) => (
          <Card
            key={m.id}
            className={`rounded-xl cursor-pointer transition-all hover:border-primary/40 ${
              selectedMaterial === m.id ? "border-primary ring-2 ring-primary/20" : ""
            }`}
            onClick={() => setSelectedMaterial(selectedMaterial === m.id ? null : m.id)}
          >
            <CardContent className="py-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold">{m.name}</p>
                    <Badge className={`text-[10px] ${statusColors[m.status]}`}>{m.status}</Badge>
                    <Badge variant="outline" className="text-[10px]">{m.origin}</Badge>
                    <Badge variant="outline" className="text-[10px]">{m.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">トレンド</p>
                    <p className="text-sm font-bold text-primary">{m.trendScore}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{m.marketGrowth}</Badge>
                </div>
              </div>

              {selectedMaterial === m.id && (
                <div className="pt-2 space-y-3 border-t border-border">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground">トレンドスコア</p>
                      <Progress value={m.trendScore} className="h-1.5" />
                      <p className="text-xs font-bold">{m.trendScore}/100</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground">安全性スコア</p>
                      <Progress value={m.safetyScore} className="h-1.5" />
                      <p className="text-xs font-bold">{m.safetyScore}/100</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground">コスト</p>
                      <p className="text-xs font-bold mt-3">{m.costIndex}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1.5">推奨シナジー素材</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {m.synergies.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
