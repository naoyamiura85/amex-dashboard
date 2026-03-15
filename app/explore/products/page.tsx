"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, TrendingUp, Star, ExternalLink } from "lucide-react"

const products = [
  { id: 1, name: "プロテインバー", category: "サプリ", brand: "Various", trends: 45, growth: 32 },
  { id: 2, name: "オートミール", category: "食品", brand: "Various", trends: 38, growth: 28 },
  { id: 3, name: "美容液", category: "化粧品", brand: "Various", trends: 52, growth: 18 },
  { id: 4, name: "シャンプー", category: "トイレタリー", brand: "Various", trends: 28, growth: 12 },
  { id: 5, name: "グミサプリ", category: "サプリ", brand: "Various", trends: 34, growth: 42 },
  { id: 6, name: "プラントベースミート", category: "食品", brand: "Various", trends: 22, growth: 56 },
]

export default function ExploreProductsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">商品タイプ</h1>
              <p className="text-sm text-muted-foreground mt-1">商品タイプ別のトレンド分析</p>
            </div>
          </div>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="商品タイプを検索..." className="pl-10" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{product.trends} トレンド</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +{product.growth}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
