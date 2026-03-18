"use client"

import { 
  ClipboardList, 
  Pencil, 
  Presentation, 
  Image, 
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    id: "survey",
    name: "AI Survey Agency",
    description: "観察データからN=100万規模のサーベイ結果をAIが数分で生成。従来の調査の2-3ヶ月を大幅短縮。",
    icon: ClipboardList,
    href: "/solutions/ai-survey",
    features: [
      "N=100万+の観察データ分析",
      "数分〜数時間で結果取得",
      "Observedデータでバイアス最小化",
      "リアルパネル併用オプション",
    ],
    useCases: ["コンセプト検証", "消費者受容性テスト", "価格感度分析", "ターゲット特定"],
    status: "available" as const,
    color: "bg-primary",
  },
  {
    id: "content",
    name: "Content Agency",
    description: "消費者インサイトに基づくコンテンツを自動生成。SNS投稿、レシピ、商品コンセプトシートまで対応。",
    icon: Pencil,
    href: "/solutions/content-agency",
    features: [
      "SNS投稿案の自動生成",
      "レシピ・使い方コンテンツ",
      "商品コンセプトシート",
      "パッケージコピー提案",
    ],
    useCases: ["SNSマーケティング", "商品企画書作成", "LP/広告コピー", "PRコンテンツ"],
    status: "available" as const,
    color: "bg-emerald-500",
  },
  {
    id: "sales",
    name: "Sales Story Creator",
    description: "小売バイヤー向け提案資料を自動生成。データに裏付けされた説得力のあるストーリーをPPT形式で出力。",
    icon: Presentation,
    href: "/solutions/sales-story",
    features: [
      "チャネル別テンプレート",
      "Demand Driver分析統合",
      "競合Brand Comparison",
      "トレンド予測データ付与",
    ],
    useCases: ["棚入れ提案", "新商品プレゼン", "カテゴリレビュー", "定番化提案"],
    status: "available" as const,
    color: "bg-amber-500",
  },
  {
    id: "visualizer",
    name: "Product Visualizer",
    description: "テキストベースの商品コンセプトからパッケージデザインモックアップ、使用シーン画像をAIが生成。",
    icon: Image,
    href: "/solutions/product-visualizer",
    features: [
      "パッケージモックアップ生成",
      "使用シーン画像生成",
      "複数バリエーション対応",
      "高解像度出力",
    ],
    useCases: ["社内プレゼン", "コンセプトテスト", "クリエイティブ開発", "企画書作成"],
    status: "beta" as const,
    color: "bg-pink-500",
  },
  {
    id: "regcheck",
    name: "Regulatory Checker",
    description: "化粧品・サプリの広告表現が薬機法・景表法に準拠しているかAIで自動チェック。代替案も提案。",
    icon: ShieldCheck,
    href: "/solutions/regulatory-checker",
    features: [
      "薬機法・景表法チェック",
      "NG表現の自動検出",
      "代替表現の提案",
      "カテゴリ別ルール対応",
    ],
    useCases: ["広告審査", "パッケージ表記確認", "LP・ECページ確認", "SNS投稿確認"],
    status: "coming" as const,
    color: "bg-blue-500",
  },
]

const statusConfig = {
  available: { label: "利用可能", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  beta: { label: "Beta", className: "bg-amber-100 text-amber-700 border-amber-200" },
  coming: { label: "Coming Soon", className: "bg-muted text-muted-foreground border-border" },
}

const recentUsage = [
  { solution: "AI Survey Agency", project: "新商品コンセプトテスト", date: "2時間前", status: "completed" },
  { solution: "Content Agency", project: "Instagram投稿案生成", date: "5時間前", status: "completed" },
  { solution: "Sales Story Creator", project: "コンビニ提案資料", date: "1日前", status: "completed" },
  { solution: "Product Visualizer", project: "パッケージモック生成", date: "2日前", status: "completed" },
]

export function SolutionsContent() {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Solutions</h2>
          <p className="text-sm text-muted-foreground">
            インサイトの発見から実行可能なアウトプットまで一気通貫で支援
          </p>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution) => {
          const status = statusConfig[solution.status]
          const isDisabled = solution.status === "coming"
          
          return (
          <Card 
            key={solution.id} 
            className={`group transition-all duration-200 ${
              isDisabled ? "opacity-60" : "hover:shadow-md hover:border-primary/20 cursor-pointer"
            }`}
          >
            <Link href={isDisabled ? "#" : solution.href} className={isDisabled ? "pointer-events-none" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-xl ${solution.color}/10 flex items-center justify-center mb-3`}>
                    <solution.icon className={`h-6 w-6`} style={{ color: solution.color.replace("bg-", "").includes("primary") ? "var(--primary)" : undefined }} />
                  </div>
                  <Badge variant="outline" className={`${status.className} text-[10px]`}>
                    {status.label}
                  </Badge>
                </div>
                <CardTitle className="text-base">{solution.name}</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-1.5">
                  {solution.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Use Cases */}
                <div className="flex flex-wrap gap-1">
                  {solution.useCases.map((useCase) => (
                    <Badge key={useCase} variant="secondary" className="text-[10px] font-normal">
                      {useCase}
                    </Badge>
                  ))}
                </div>

                {/* Action */}
                <Button 
                  className="w-full justify-between" 
                  variant={isDisabled ? "outline" : "default"}
                  disabled={isDisabled}
                  size="sm"
                  asChild={!isDisabled}
                >
                  {isDisabled ? <span>準備中</span> : (
                    <div>
                      使ってみる
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Link>
          </Card>
          )
        })}
      </div>

      {/* Recent Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">最近の利用履歴</CardTitle>
          <CardDescription>過去に生成したコンテンツ・レポート</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUsage.map((usage, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{usage.project}</p>
                    <p className="text-xs text-muted-foreground">{usage.solution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {usage.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
