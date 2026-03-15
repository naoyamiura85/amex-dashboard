"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Brain,
  Tv,
  Youtube,
  Twitter,
  TrendingUp,
  Beaker,
  MessageSquare,
  Lightbulb,
  Download,
  RefreshCw,
  ChevronRight,
  BarChart3,
  Database,
  Sparkles
} from "lucide-react"

// Mock data
const trendTopics = [
  { topic: "腸活・腸内環境", subTopics: ["プロバイオティクス", "発酵食品", "食物繊維"], mentions: 458000, growth: 32 },
  { topic: "メンタルヘルス", subTopics: ["ストレスケア", "睡眠改善", "マインドフルネス"], mentions: 392000, growth: 45 },
  { topic: "サステナビリティ", subTopics: ["プラントベース", "アップサイクル", "クリーンビューティ"], mentions: 287000, growth: 28 },
  { topic: "時短・効率化", subTopics: ["オールインワン", "マルチタスク", "ながらケア"], mentions: 245000, growth: 18 },
  { topic: "推し活", subTopics: ["コラボ商品", "限定パッケージ", "ファンコミュニティ"], mentions: 198000, growth: 56 },
]

const trendingIngredients = [
  { name: "GABA", category: "サプリ", growth: 42, status: "Growing" },
  { name: "バクチオール", category: "化粧品", growth: 68, status: "Emerging" },
  { name: "CICA", category: "化粧品", growth: 15, status: "Mature" },
  { name: "NMN", category: "サプリ", growth: 85, status: "Emerging" },
  { name: "グルタチオン", category: "サプリ", growth: 34, status: "Growing" },
  { name: "セラミド", category: "化粧品", growth: 12, status: "Mature" },
]

const mediaKeywords = {
  tv: ["腸活レシピ", "時短スキンケア", "睡眠の質", "発酵食品", "免疫力アップ"],
  youtube: ["モーニングルーティン", "ナイトルーティン", "購入品紹介", "正直レビュー", "ダイエット"],
  sns: ["#推し活", "#購入品", "#スキンケア", "#QOL爆上げ", "#買ってよかった"],
}

const consumerPains = [
  { pain: "情報過多で何を選べばいいかわからない", category: "共通", intensity: 85 },
  { pain: "続けることが難しい", category: "サプリ", intensity: 78 },
  { pain: "効果を実感できない", category: "化粧品", intensity: 72 },
  { pain: "価格が高い", category: "共通", intensity: 68 },
  { pain: "時間がない", category: "共通", intensity: 65 },
]

const sharedInsights = [
  {
    insight: "「がんばらない」志向の台頭",
    description: "完璧を目指さない、ゆるい健康・美容への関心が高まっている。「ズボラ」「手抜き」をポジティブに捉える消費者が増加。",
    evidence: "SNS発話量+45%、関連商品売上+32%"
  },
  {
    insight: "「推し」の消費への影響力拡大",
    description: "推しのための消費だけでなく、推し活をきっかけにしたセルフケア需要が拡大。",
    evidence: "推し活×美容の言及+120%"
  },
  {
    insight: "「見える化」ニーズの高まり",
    description: "効果や成分を可視化したい欲求が増加。成分解析アプリの利用者が急増。",
    evidence: "成分解析アプリDL数+200%"
  },
]

const dataSources = [
  { source: "TV番組トピック", description: "健康番組・バラエティでの取り上げテーマ", volume: "1万行〜/カテゴリ" },
  { source: "YouTube/TikTok", description: "再生数上位の関連コンテンツ解析", volume: "2万行〜/カテゴリ" },
  { source: "SNS(X)", description: "関連キーワードの発話量・センチメント", volume: "数十万行/カテゴリ" },
  { source: "市場構造情報", description: "競合情報、チャネル構造、価格帯", volume: "カテゴリ別に構造化" },
  { source: "社会背景データ", description: "マクロトレンド、規制変化、人口動態", volume: "通年更新" },
]

export function CollectiveIntelligenceContent() {
  const [selectedCategory, setSelectedCategory] = useState("食品")
  const [isGenerating, setIsGenerating] = useState(false)

  const categories = ["食品", "化粧品", "トイレタリー", "サプリ", "ウェルネス"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Collective Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            多層データを横断的に学習し、カテゴリの「集合知」を自動生成
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <RefreshCw className="h-4 w-4 mr-2" />
          集合知を更新
        </Button>
      </div>

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">カテゴリ選択</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            インプットデータソース
          </CardTitle>
          <CardDescription>
            集合知生成に使用されるデータの概要
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataSources.map((source) => (
              <div key={source.source} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  {source.source.includes("TV") && <Tv className="h-4 w-4 text-primary" />}
                  {source.source.includes("YouTube") && <Youtube className="h-4 w-4 text-red-500" />}
                  {source.source.includes("SNS") && <Twitter className="h-4 w-4 text-blue-400" />}
                  {source.source.includes("市場") && <BarChart3 className="h-4 w-4 text-green-500" />}
                  {source.source.includes("社会") && <TrendingUp className="h-4 w-4 text-amber-500" />}
                  <span className="font-medium text-sm">{source.source}</span>
                </div>
                <p className="text-xs text-muted-foreground">{source.description}</p>
                <p className="text-xs text-primary mt-1">{source.volume}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="topics" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="topics">
            <TrendingUp className="h-4 w-4 mr-1" />
            トレンドトピック
          </TabsTrigger>
          <TabsTrigger value="ingredients">
            <Beaker className="h-4 w-4 mr-1" />
            注目成分
          </TabsTrigger>
          <TabsTrigger value="media">
            <Tv className="h-4 w-4 mr-1" />
            メディアキーワード
          </TabsTrigger>
          <TabsTrigger value="pains">
            <MessageSquare className="h-4 w-4 mr-1" />
            消費者の悩み
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Lightbulb className="h-4 w-4 mr-1" />
            共通インサイト
          </TabsTrigger>
        </TabsList>

        {/* Trend Topics */}
        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>カテゴリ別トレンドトピック一覧</CardTitle>
              <CardDescription>
                {selectedCategory}カテゴリで注目されているテーマとサブトピック
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendTopics.map((topic, index) => (
                  <div key={topic.topic} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="font-semibold">{topic.topic}</h4>
                          <p className="text-sm text-muted-foreground">
                            {topic.mentions.toLocaleString()} 言及
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        +{topic.growth}%
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topic.subTopics.map((sub) => (
                        <Badge key={sub} variant="secondary">{sub}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trending Ingredients */}
        <TabsContent value="ingredients">
          <Card>
            <CardHeader>
              <CardTitle>注目成分/原材料ランキング</CardTitle>
              <CardDescription>成長率付きの注目成分一覧</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingIngredients.map((ingredient, index) => (
                  <div key={ingredient.name} className="flex items-center gap-4 p-3 rounded-lg border">
                    <span className="text-lg font-bold text-muted-foreground w-8">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{ingredient.name}</span>
                        <Badge variant="outline">{ingredient.category}</Badge>
                        <Badge 
                          className={
                            ingredient.status === "Emerging" ? "bg-violet-500" :
                            ingredient.status === "Growing" ? "bg-green-500" : "bg-gray-500"
                          }
                        >
                          {ingredient.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-medium">+{ingredient.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Keywords */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>メディア別話題キーワード</CardTitle>
              <CardDescription>TV/SNS/YouTubeで話題のキーワードをクロス分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Tv className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">TV番組</h4>
                  </div>
                  {mediaKeywords.tv.map((keyword, i) => (
                    <div key={keyword} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <span className="text-sm text-muted-foreground">{i + 1}</span>
                      <span className="text-sm">{keyword}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <h4 className="font-semibold">YouTube/TikTok</h4>
                  </div>
                  {mediaKeywords.youtube.map((keyword, i) => (
                    <div key={keyword} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <span className="text-sm text-muted-foreground">{i + 1}</span>
                      <span className="text-sm">{keyword}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <h4 className="font-semibold">SNS(X)</h4>
                  </div>
                  {mediaKeywords.sns.map((keyword, i) => (
                    <div key={keyword} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <span className="text-sm text-muted-foreground">{i + 1}</span>
                      <span className="text-sm">{keyword}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consumer Pains */}
        <TabsContent value="pains">
          <Card>
            <CardHeader>
              <CardTitle>消費者の悩み・課題の構造整理</CardTitle>
              <CardDescription>カテゴリ内で共通して見られる消費者の課題</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consumerPains.map((pain) => (
                  <div key={pain.pain} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pain.pain}</span>
                        <Badge variant="outline">{pain.category}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        深刻度: {pain.intensity}%
                      </span>
                    </div>
                    <Progress value={pain.intensity} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shared Insights */}
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>共通インサイト</CardTitle>
              <CardDescription>カテゴリを貫く大きな消費者心理の変化</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedInsights.map((insight) => (
                  <div key={insight.insight} className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">{insight.insight}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        <p className="text-xs text-primary mt-2">Evidence: {insight.evidence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">集合知ドキュメントをエクスポート</h4>
              <p className="text-sm text-muted-foreground">
                生成された集合知をPDF/PPTXとして出力
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                PPTX
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
