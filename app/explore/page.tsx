"use client"

import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Search, 
  FlaskConical, 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  Users, 
  MapPin,
  TrendingUp,
  ArrowRight
} from "lucide-react"

const exploreCategories = [
  {
    title: "成分・原材料",
    description: "ナイアシンアミド、レチノール、乳酸菌など成分トレンドを分析",
    icon: FlaskConical,
    href: "/explore/ingredients",
    trending: ["ナイアシンアミド", "レチノール", "CICA", "ビタミンC"],
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "消費者ニーズ",
    description: "美白、腸活、時短、敏感肌など消費者の関心を探索",
    icon: Sparkles,
    href: "/explore/needs",
    trending: ["腸活", "時短", "敏感肌", "エイジングケア"],
    color: "bg-violet-50 text-violet-600"
  },
  {
    title: "商品タイプ",
    description: "美容液、RTD飲料、グミサプリなど商品形態別分析",
    icon: ShoppingBag,
    href: "/explore/products",
    trending: ["美容液", "グミサプリ", "オールインワン", "RTD"],
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "消費モーメント",
    description: "朝ルーティン、ご褒美タイム、オフィス間食など利用シーン",
    icon: Clock,
    href: "/explore/moments",
    trending: ["朝ルーティン", "夜のご褒美", "オフィス間食", "週末ケア"],
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "デモグラフィック",
    description: "年代・性別・ライフステージ別の消費傾向を分析",
    icon: Users,
    href: "/explore/demographics",
    trending: ["Z世代", "30代女性", "シニア", "子育て世代"],
    color: "bg-pink-50 text-pink-600"
  },
  {
    title: "地域",
    description: "都道府県・地方ブロック別のトレンド分析",
    icon: MapPin,
    href: "/explore/regions",
    trending: ["東京", "大阪", "福岡", "北海道"],
    color: "bg-cyan-50 text-cyan-600"
  }
]

const recentSearches = [
  "ナイアシンアミド × 美白",
  "プロテイン × スイーツ",
  "腸活 × 20代女性",
  "CICA × 敏感肌"
]

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Search Section */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-foreground">データを探索</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                カテゴリ横断で成分、ニーズ、商品タイプ、消費モーメントなど様々な切り口からデータを探索できます
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="キーワードで検索（例：ナイアシンアミド、腸活、Z世代）" 
                  className="pl-12 h-12 text-base"
                />
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">最近の検索:</span>
                {recentSearches.map((search) => (
                  <Badge key={search} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreCategories.map((category) => (
                <Link key={category.title} href={category.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-lg ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardTitle className="mt-4">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          <span>注目キーワード</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {category.trending.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Cross-Category Analysis */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  クロスカテゴリ分析
                </CardTitle>
                <CardDescription>
                  複数のディメンションを組み合わせて、隠れたトレンドや機会を発見
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="font-medium text-sm">腸活 × 美容</p>
                    <p className="text-xs text-muted-foreground mt-1">食品とスキンケアの融合トレンド</p>
                    <Badge className="mt-2 bg-emerald-100 text-emerald-700">Growing +42%</Badge>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="font-medium text-sm">プロテイン × スイーツ</p>
                    <p className="text-xs text-muted-foreground mt-1">罪悪感ゼロおやつの新潮流</p>
                    <Badge className="mt-2 bg-amber-100 text-amber-700">Emerging +128%</Badge>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="font-medium text-sm">韓国トレンド × 日本市場</p>
                    <p className="text-xs text-muted-foreground mt-1">Kビューティーの浸透状況</p>
                    <Badge className="mt-2 bg-violet-100 text-violet-700">Growing +67%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <YappiChat />
    </div>
  )
}
