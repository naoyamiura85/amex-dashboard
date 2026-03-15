"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Sun, Moon, Coffee, Utensils, Dumbbell } from "lucide-react"

const moments = [
  { id: 1, name: "朝の準備", icon: Sun, time: "6:00-9:00", trends: 234, color: "bg-amber-100 text-amber-700" },
  { id: 2, name: "通勤・移動", icon: Coffee, time: "7:00-10:00", trends: 156, color: "bg-blue-100 text-blue-700" },
  { id: 3, name: "ランチタイム", icon: Utensils, time: "11:00-14:00", trends: 312, color: "bg-green-100 text-green-700" },
  { id: 4, name: "午後の休憩", icon: Coffee, time: "14:00-17:00", trends: 189, color: "bg-purple-100 text-purple-700" },
  { id: 5, name: "運動・ジム", icon: Dumbbell, time: "17:00-21:00", trends: 267, color: "bg-red-100 text-red-700" },
  { id: 6, name: "就寝前", icon: Moon, time: "21:00-24:00", trends: 198, color: "bg-indigo-100 text-indigo-700" },
]

export default function ExploreMomentsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">消費モーメント</h1>
            <p className="text-sm text-muted-foreground mt-1">消費者の生活シーン別トレンド分析</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {moments.map((moment) => {
              const Icon = moment.icon
              return (
                <Card key={moment.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${moment.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{moment.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {moment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{moment.trends} トレンド</span>
                      <Badge variant="secondary">詳細を見る</Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">モーメント別トレンドマップ</CardTitle>
              <CardDescription>各消費モーメントで注目されているトレンド</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">モーメント × トレンド ヒートマップ</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
