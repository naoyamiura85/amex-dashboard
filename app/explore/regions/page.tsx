"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Globe } from "lucide-react"

const regions = [
  { id: 1, name: "関東", population: "43.5M", trends: 1234, growth: 15, topCity: "東京" },
  { id: 2, name: "関西", population: "20.9M", trends: 856, growth: 12, topCity: "大阪" },
  { id: 3, name: "中部", population: "15.1M", trends: 534, growth: 18, topCity: "名古屋" },
  { id: 4, name: "九州", population: "14.3M", trends: 423, growth: 22, topCity: "福岡" },
  { id: 5, name: "北海道", population: "5.2M", trends: 234, growth: 8, topCity: "札幌" },
  { id: 6, name: "東北", population: "8.8M", trends: 312, growth: 10, topCity: "仙台" },
]

export default function ExploreRegionsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">地域</h1>
            <p className="text-sm text-muted-foreground mt-1">地域別のトレンド分布と特徴</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  地域別トレンド分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">日本地図ヒートマップ</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {regions.slice(0, 4).map((region) => (
                <Card key={region.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{region.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {region.topCity} 中心 / {region.population}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{region.trends} トレンド</p>
                        <p className="text-sm text-green-600 flex items-center justify-end gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +{region.growth}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {regions.map((region) => (
              <Card key={region.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{region.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">トレンド数</p>
                      <p className="font-medium">{region.trends}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">成長率</p>
                      <p className="font-medium text-green-600">+{region.growth}%</p>
                    </div>
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
