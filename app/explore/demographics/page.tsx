"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const demographics = [
  { id: 1, name: "Z世代 (18-24)", population: "12.5M", engagement: 78, topTrends: ["クリーンビューティー", "サステナブル", "SNS映え"] },
  { id: 2, name: "ミレニアル (25-34)", population: "15.8M", engagement: 85, topTrends: ["腸活", "プロテイン", "時短"] },
  { id: 3, name: "ミドル (35-44)", population: "18.2M", engagement: 72, topTrends: ["エイジングケア", "健康食品", "家族向け"] },
  { id: 4, name: "アクティブシニア (45-54)", population: "16.4M", engagement: 65, topTrends: ["免疫", "関節ケア", "睡眠改善"] },
  { id: 5, name: "シニア (55+)", population: "35.2M", engagement: 45, topTrends: ["健康維持", "シンプルケア", "国産"] },
]

export default function ExploreDemographicsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">デモグラフィック</h1>
            <p className="text-sm text-muted-foreground mt-1">世代・属性別のトレンド傾向分析</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {demographics.map((demo) => (
              <Card key={demo.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 w-64">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{demo.name}</h3>
                        <p className="text-sm text-muted-foreground">{demo.population} 人口</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">エンゲージメント</span>
                        <span className="font-medium">{demo.engagement}%</span>
                      </div>
                      <Progress value={demo.engagement} className="h-2" />
                    </div>
                    <div className="flex gap-2 w-80">
                      {demo.topTrends.map((trend) => (
                        <Badge key={trend} variant="secondary" className="text-xs">
                          {trend}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">世代別トレンド感度</CardTitle>
                <CardDescription>新しいトレンドへの反応速度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">世代別感度チャート</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">世代間トレンド伝播</CardTitle>
                <CardDescription>トレンドがどの世代から広がるか</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">伝播フロー図</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
