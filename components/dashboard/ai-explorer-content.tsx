"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Telescope, Search, TrendingUp, Users, CreditCard, Sparkles } from "lucide-react"

const sampleQueries = [
  "プラチナ会員の解約リスクが高い層の特徴は？",
  "ゴールド会員がプラチナに転換する前の行動パターン",
  "空港ラウンジ利用率が高い会員のLTVとの相関",
  "30代男性でトラベル特典を活用していない層への提案",
  "海外利用比率 50% 以上の会員セグメントを抽出",
]

const recentInsights = [
  {
    query: "チャーン率が高いゴールド会員の共通属性",
    result: "ダイニング特典の利用がゼロで、直近3か月の利用額が前年比 -40% 以上の会員が解約リスクの 73% を占める",
    tag: "会員分析",
    color: "bg-primary/10 text-primary",
  },
  {
    query: "プラチナ転換に最も寄与する特典カテゴリ",
    result: "プライオリティパス初回利用後 90 日以内にプラチナ申込が発生するケースが 38%。コンシェルジュ利用との複合で 54% に上昇",
    tag: "AIインサイト",
    color: "bg-accent/10 text-accent",
  },
  {
    query: "SNS経由申込会員の12か月後LTV",
    result: "SNS経由会員の12か月 LTV はウェブ直接申込比 -18%。ただし 25〜34 歳層に限定すると差は +6% と逆転",
    tag: "チャネル分析",
    color: "bg-emerald-500/10 text-emerald-600",
  },
]

export function AIExplorerContent() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const runSearch = (q: string) => {
    const searchQuery = q || query
    if (!searchQuery.trim()) return
    setQuery(searchQuery)
    setIsSearching(true)
    setResult(null)
    setTimeout(() => {
      setIsSearching(false)
      setResult(
        `「${searchQuery}」に関する分析結果: 直近12か月のデータを解析した結果、該当会員セグメントは総会員の 8.4% に相当する約 42,000 名です。平均利用額は月 ¥284,000 で全体平均の 2.3 倍、特典利用率は 91% と非常に高水準です。解約リスクスコアは平均 12/100 と低く、最も安定した優良セグメントに分類されます。`
      )
    }, 1800)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Telescope className="h-6 w-6 text-primary" />
          会員データ統合エクスプローラー
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          自然言語で会員データ・特典・チャネルを横断的に検索・分析
        </p>
      </div>

      {/* 検索ボックス */}
      <Card className="rounded-xl border-primary/30 bg-primary/3">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="会員・特典・チャネルについて自然言語で質問..."
                className="pl-9 rounded-lg bg-card border-border"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") runSearch("") }}
              />
            </div>
            <Button className="gap-2 shrink-0" onClick={() => runSearch("")} disabled={isSearching}>
              {isSearching ? (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  分析中...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  検索
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 検索結果 */}
      {result && (
        <Card className="rounded-xl border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI 分析結果
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">{result}</p>
          </CardContent>
        </Card>
      )}

      {/* サンプルクエリ */}
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">よく使われる質問例</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {sampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => runSearch(q)}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors text-left group"
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">{q}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 直近インサイト */}
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">直近の分析インサイト</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentInsights.map((insight) => (
            <div key={insight.query} className="flex flex-col gap-2 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-2">
                <Badge className={`text-xs border-0 ${insight.color}`}>{insight.tag}</Badge>
                <p className="text-sm font-semibold text-foreground">{insight.query}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.result}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
