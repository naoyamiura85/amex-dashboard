"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Eye,
  ShoppingCart,
  Crown,
  ArrowRight,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  TestTube,
  TrendingUp,
  TrendingDown,
  Database,
  Layers,
} from "lucide-react"

// 商品の定義（サントリーD2C商品）
const products = [
  { id: "all", name: "全商品", category: "", image: "" },
  { id: "menphys", name: "menphys", category: "健康ドリンク", image: "/images/products/menphys.jpg" },
  { id: "tokucha", name: "特茶/胡麻麦茶", category: "健康飲料", image: "/images/products/tokucha.jpg" },
  { id: "maintenansu", name: "すっきりメンテナン酢", category: "機能性表示食品", image: "/images/products/maintenansu.jpg" },
  { id: "coffee", name: "SUNTORY COFFEE ROASTERY", category: "プレミアムコーヒー", image: "/images/products/coffee-roastery.jpg" },
  { id: "zone", name: "ZONe", category: "エナジードリンク", image: "/images/products/zone.jpg" },
]

// データソース定義
const claimedData = {
  title: "Tunes ペルソナ",
  badge: "Claimed",
  badgeColor: "bg-emerald-500",
  items: [
    "価値観・ライフスタイル・メディア接触",
    "食の嗜好・健康意識・環境意識",
    "ブランド態度・カテゴリ関与度",
  ],
}

const observedData = {
  title: "自社EC行動",
  badge: "Observed",
  badgeColor: "bg-amber-500",
  items: [
    "検索・閲覧・カート・購買・リピート",
    "レビュー投稿・Q&A・滞在時間",
    "離脱ポイント・価格感応度",
  ],
}

// ファネル分析データ
const funnelAnalysis = [
  {
    segment: "全体",
    title: "カテゴリ潜在層",
    description: "Tunes上で食品・飲料カテゴリに関与が高いが、自社ECには未来訪の層。「来てもおかしくないのに来ていない」ペルソナの特定",
    count: "2,450万人",
    growth: 12.5,
    color: "bg-slate-500",
  },
  {
    segment: "来訪者",
    title: "来訪×ペルソナ照合",
    description: "来訪したが購買しなかった人のTunesプロファイル。閲覧商品×価値観で「何を期待して来て、何が足りなかったか」を推定",
    count: "890万人",
    growth: 8.3,
    color: "bg-blue-500",
  },
  {
    segment: "購買者",
    title: "購買×ペルソナ深掘り",
    description: "実購買者のTunesクラスタ分布。「どんな価値観の人が、何を、いくらで、どの頻度で買っているか」のクロス分析",
    count: "245万人",
    growth: 15.7,
    color: "bg-purple-500",
  },
  {
    segment: "ロイヤル",
    title: "LTV上位×ペルソナ特徴",
    description: "リピーター・高LTV層のTunes特徴量。ロイヤル層が共通して持つ価値観 → 新商品の「誰に向けて作るか」の定義に直結",
    count: "42万人",
    growth: 23.1,
    color: "bg-amber-500",
  },
]

// 商品開発への接続
const developmentConnections = [
  {
    type: "Gap",
    title: "品揃えギャップ",
    color: "bg-rose-500",
    items: [
      { text: "来訪⇔離脱のペルソナが求める商品属性を特定し、不足SKUを提案", highlight: "来訪⇔離脱" },
      { text: "ゼロ結果検索×Tunesクラスタで「誰のどんなニーズ」が欠落しているか可視化", highlight: "ゼロ結果検索" },
    ],
  },
  {
    type: "Who",
    title: "ペルソナ起点開発",
    color: "bg-blue-500",
    items: [
      { text: "高LTV層の価値観から逆算した商品コンセプトの自動生成", highlight: "高LTV層" },
      { text: "Claimed（雪だるま値）とObserved（↓購買）のズレから隠れたニーズを発掘", highlight: "Claimed" },
    ],
  },
  {
    type: "Test",
    title: "開発前検証",
    color: "bg-emerald-500",
    items: [
      { text: "新商品コンセプトに対するペルソナ別の受容性予測（Tunesベース）", highlight: "ペルソナ別" },
      { text: "類似商品の購買実績から需要の「質」をシミュレーション", highlight: "質" },
    ],
  },
]

// ペルソナクラスタデータ
const personaClusters = [
  { name: "健康志向ファミリー", count: 125000, share: 28, ltv: 18500, color: "#00A0D2" },
  { name: "価値重視シニア", count: 98000, share: 22, ltv: 24200, color: "#0077A3" },
  { name: "トレンド敏感Z世代", count: 78000, share: 17, ltv: 12800, color: "#00C4B4" },
  { name: "品質こだわり層", count: 67000, share: 15, ltv: 21500, color: "#F59E0B" },
  { name: "コスパ重視層", count: 52000, share: 12, ltv: 9200, color: "#6B7280" },
  { name: "その他", count: 25000, share: 6, ltv: 11000, color: "#D1D5DB" },
]

interface DigitalShelfContentProps {
  selectedProduct?: string
}

export function DigitalShelfContent({ selectedProduct = "all" }: DigitalShelfContentProps) {
  const [expandedFunnel, setExpandedFunnel] = useState<string | null>("購買者")

  const currentProduct = products.find(p => p.id === selectedProduct)

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* 選択された商品のサマリー表示 */}
      {currentProduct && currentProduct.id !== "all" && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{currentProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{currentProduct.category}</p>
              </div>
              <div className="ml-auto flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">24.5万人</p>
                  <p className="text-xs text-muted-foreground">購入ユーザー数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">+12.3%</p>
                  <p className="text-xs text-muted-foreground">前月比</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">¥18,500</p>
                  <p className="text-xs text-muted-foreground">平均LTV</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* データソース統合セクション */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">2つのデータ源</CardTitle>
              <CardDescription>ID連携 / 類似推定マッチングでSync</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              データ同期
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Claimed データ */}
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${claimedData.badgeColor} text-white`}>
                  {claimedData.badge}
                </Badge>
                <h3 className="font-semibold text-foreground">{claimedData.title}</h3>
              </div>
              <ul className="space-y-2">
                {claimedData.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Observed データ */}
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${observedData.badgeColor} text-white`}>
                  {observedData.badge}
                </Badge>
                <h3 className="font-semibold text-foreground">{observedData.title}</h3>
              </div>
              <ul className="space-y-2">
                {observedData.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 連携表示 */}
          <div className="flex items-center justify-center gap-4 mt-6 py-4 border-t">
            <Database className="h-5 w-5 text-emerald-500" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span>ID連携 / 類似推定マッチングでSync</span>
              <RefreshCw className="h-4 w-4" />
            </div>
            <Layers className="h-5 w-5 text-amber-500" />
          </div>
        </CardContent>
      </Card>

      {/* ファネル別 × TUNES連携分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            ファネル別 × TUNES連携分析
          </CardTitle>
          <CardDescription>各ファネルステージにおけるペルソナ分析と商品開発インサイト</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {funnelAnalysis.map((funnel) => (
            <div
              key={funnel.segment}
              className={`border rounded-lg overflow-hidden transition-all ${
                expandedFunnel === funnel.segment ? "ring-2 ring-primary" : ""
              }`}
            >
              <button
                onClick={() => setExpandedFunnel(expandedFunnel === funnel.segment ? null : funnel.segment)}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <Badge variant="outline" className={`${funnel.color} text-white border-0 min-w-[70px]`}>
                  {funnel.segment}
                </Badge>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-foreground">{funnel.title}</h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{funnel.count}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {funnel.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-rose-500" />
                      )}
                      <span className={funnel.growth > 0 ? "text-emerald-500" : "text-rose-500"}>
                        {funnel.growth > 0 ? "+" : ""}{funnel.growth}%
                      </span>
                      <span className="text-muted-foreground">前月比</span>
                    </p>
                  </div>
                  {expandedFunnel === funnel.segment ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              {expandedFunnel === funnel.segment && (
                <div className="px-4 pb-4 pt-2 border-t bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-4">{funnel.description}</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    詳細を見る
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ペルソナクラスタ分布 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">購買者ペルソナクラスタ分布</CardTitle>
            <CardDescription>Tunesデータに基づく購買者セグメント</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personaClusters.map((cluster) => (
                <div key={cluster.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: cluster.color }}
                      />
                      <span className="font-medium">{cluster.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{cluster.count.toLocaleString()}人</span>
                      <span className="font-semibold w-12 text-right">{cluster.share}%</span>
                    </div>
                  </div>
                  <Progress value={cluster.share} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">クラスタ別LTV</CardTitle>
            <CardDescription>年間顧客生涯価値の比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personaClusters.slice(0, 5).map((cluster, index) => (
                <div key={cluster.name} className="flex items-center gap-4">
                  <div className="w-8 text-center">
                    <span className={`text-lg font-bold ${index < 3 ? "text-primary" : "text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: cluster.color }}
                      />
                      <span className="text-sm font-medium">{cluster.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(cluster.ltv / 25000) * 100}%`,
                            backgroundColor: cluster.color,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold min-w-[70px] text-right">
                        ¥{cluster.ltv.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 商品開発への接続 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">商品開発への接続</CardTitle>
          <CardDescription>デジタルシェルフデータを製品開発に活用</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {developmentConnections.map((connection) => (
              <div key={connection.type} className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${connection.color} text-white`}>{connection.type}</Badge>
                  <h4 className="font-semibold text-foreground">{connection.title}</h4>
                </div>
                <ul className="space-y-3">
                  {connection.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">{item.highlight}</span>
                      {item.text.replace(item.highlight, "").split(item.highlight).join("")}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="mt-4 w-full gap-2">
                  {connection.type === "Gap" && <Target className="h-4 w-4" />}
                  {connection.type === "Who" && <Lightbulb className="h-4 w-4" />}
                  {connection.type === "Test" && <TestTube className="h-4 w-4" />}
                  分析を開始
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
