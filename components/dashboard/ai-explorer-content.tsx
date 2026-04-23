"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Telescope, Search, Sparkles, Filter, X, Plane, Wine, Star, Trophy, Car, Music, Mountain, Palette, Fish, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

// セグメントデータ
const SEGMENTS = [
  { id: "all", label: "すべて", color: "bg-slate-500" },
  { id: "platinum", label: "プラチナ", color: "bg-[#006FCF]" },
  { id: "gold", label: "ゴールド", color: "bg-amber-500" },
  { id: "green", label: "グリーン", color: "bg-emerald-500" },
  { id: "prospect", label: "プロスペクト", color: "bg-slate-400" },
  { id: "new", label: "新規会員", color: "bg-sky-500" },
  { id: "active", label: "アクティブ", color: "bg-violet-500" },
  { id: "at-risk", label: "解約リスク", color: "bg-red-500" },
] as const

type SegmentId = (typeof SEGMENTS)[number]["id"]

// トライブデータ
const TRIBES: { id: string; label: string; icon: LucideIcon; category: "travel" | "dining" | "entertainment" }[] = [
  { id: "all", label: "すべて", icon: Star, category: "travel" },
  { id: "golf", label: "ゴルフ派", icon: Trophy, category: "travel" },
  { id: "jetsetter", label: "ジェットセッター派", icon: Plane, category: "travel" },
  { id: "fine-dining", label: "美食・グルメ派", icon: Wine, category: "dining" },
  { id: "wine-sommelier", label: "ワイン・ソムリエ派", icon: Wine, category: "dining" },
  { id: "art-collector", label: "アートコレクター派", icon: Palette, category: "entertainment" },
  { id: "f1-motor", label: "F1・モータースポーツ派", icon: Car, category: "entertainment" },
  { id: "classical-music", label: "クラシック・オペラ派", icon: Music, category: "entertainment" },
  { id: "adventure", label: "アドベンチャースポーツ派", icon: Mountain, category: "travel" },
  { id: "tech-investor", label: "テック投資家派", icon: Cpu, category: "entertainment" },
  { id: "local-gourmet", label: "ローカルグルメ探訪派", icon: Fish, category: "dining" },
]

const CATEGORY_COLORS = {
  travel: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
  dining: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  entertainment: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200" },
}

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
    segment: "gold",
    tribe: "fine-dining",
  },
  {
    query: "プラチナ転換に最も寄与する特典カテゴリ",
    result: "プライオリティパス初回利用後 90 日以内にプラチナ申込が発生するケースが 38%。コンシェルジュ利用との複合で 54% に上昇",
    tag: "AIインサイト",
    color: "bg-accent/10 text-accent",
    segment: "platinum",
    tribe: "jetsetter",
  },
  {
    query: "SNS経由申込会員の12か月後LTV",
    result: "SNS経由会員の12か月 LTV はウェブ直接申込比 -18%。ただし 25〜34 歳層に限定すると差は +6% と逆転",
    tag: "チャネル分析",
    color: "bg-emerald-500/10 text-emerald-600",
    segment: "new",
    tribe: "all",
  },
  {
    query: "ゴルフ派会員の年間利用額とアップグレード率",
    result: "ゴルフ派会員の平均年間利用額は ¥4,200,000 で全体平均の 2.8 倍。ゴールド→プラチナ転換率は 34% と最高水準",
    tag: "トライブ分析",
    color: "bg-sky-500/10 text-sky-600",
    segment: "gold",
    tribe: "golf",
  },
  {
    query: "アートコレクター派の特典利用傾向",
    result: "美術館・ギャラリー特典の利用率 89%。コンサート・劇場チケット優先購入も 67% が利用。文化系特典への満足度が解約抑止に直結",
    tag: "トライブ分析",
    color: "bg-violet-500/10 text-violet-600",
    segment: "platinum",
    tribe: "art-collector",
  },
  {
    query: "解約リスク会員のワイン・ソムリエ派復活施策",
    result: "ワインテイスティングイベント招待を実施した解約リスク会員の 42% が利用額を回復。パーソナライズされた特典訴求が効果的",
    tag: "リテンション",
    color: "bg-red-500/10 text-red-600",
    segment: "at-risk",
    tribe: "wine-sommelier",
  },
  {
    query: "テック投資家派の決済チャネル分析",
    result: "Apple Pay 利用率 78%、オンライン決済比率 85%。デジタルファースト施策への反応が他トライブ比 3.2 倍高い",
    tag: "チャネル分析",
    color: "bg-emerald-500/10 text-emerald-600",
    segment: "active",
    tribe: "tech-investor",
  },
]

export function AIExplorerContent() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<SegmentId>("all")
  const [selectedTribe, setSelectedTribe] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(true)

  // フィルタリングされたインサイト
  const filteredInsights = useMemo(() => {
    return recentInsights.filter(insight => {
      const segmentMatch = selectedSegment === "all" || insight.segment === selectedSegment
      const tribeMatch = selectedTribe === "all" || insight.tribe === selectedTribe
      return segmentMatch && tribeMatch
    })
  }, [selectedSegment, selectedTribe])

  const activeFiltersCount = (selectedSegment !== "all" ? 1 : 0) + (selectedTribe !== "all" ? 1 : 0)

  const clearFilters = () => {
    setSelectedSegment("all")
    setSelectedTribe("all")
  }

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

      {/* フィルターパネル */}
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
                フィルター
              </CardTitle>
              {activeFiltersCount > 0 && (
                <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3 mr-1" />
                  クリア
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "折りたたむ" : "展開"}
              </Button>
            </div>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="pt-0 space-y-4">
            {/* セグメント別フィルター */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">セグメント別</p>
              <div className="flex flex-wrap gap-2">
                {SEGMENTS.map((seg) => (
                  <button
                    key={seg.id}
                    onClick={() => setSelectedSegment(seg.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      selectedSegment === seg.id
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                    )}
                  >
                    <span className={cn("w-2 h-2 rounded-full", seg.color)} />
                    {seg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* トライブ別フィルター */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">トライブ別</p>
              <div className="flex flex-wrap gap-2">
                {TRIBES.map((tribe) => {
                  const catColor = tribe.id === "all" ? null : CATEGORY_COLORS[tribe.category]
                  return (
                    <button
                      key={tribe.id}
                      onClick={() => setSelectedTribe(tribe.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                        selectedTribe === tribe.id
                          ? "bg-foreground text-background border-foreground"
                          : catColor
                          ? `${catColor.bg} ${catColor.text} ${catColor.border} hover:opacity-80`
                          : "bg-card text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                      )}
                    >
                      <tribe.icon className="h-3 w-3" />
                      {tribe.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        )}
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">直近の分析インサイト</CardTitle>
            <Badge variant="outline" className="text-[10px]">
              {filteredInsights.length} 件
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredInsights.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">該当するインサイトがありません</p>
              <Button variant="link" size="sm" onClick={clearFilters} className="mt-2">
                フィルターをクリア
              </Button>
            </div>
          ) : (
            filteredInsights.map((insight) => {
              const segmentData = SEGMENTS.find(s => s.id === insight.segment)
              const tribeData = TRIBES.find(t => t.id === insight.tribe)
              return (
                <div key={insight.query} className="flex flex-col gap-2 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`text-xs border-0 ${insight.color}`}>{insight.tag}</Badge>
                    {segmentData && segmentData.id !== "all" && (
                      <Badge variant="outline" className="text-[10px] gap-1">
                        <span className={cn("w-1.5 h-1.5 rounded-full", segmentData.color)} />
                        {segmentData.label}
                      </Badge>
                    )}
                    {tribeData && tribeData.id !== "all" && (
                      <Badge variant="outline" className="text-[10px] gap-1">
                        <tribeData.icon className="h-2.5 w-2.5" />
                        {tribeData.label}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{insight.query}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.result}</p>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
