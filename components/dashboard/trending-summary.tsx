"use client"

import { TrendingUp, Eye, Zap, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const summaryStats = [
  {
    label: "トレンド総数",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "前月比",
  },
  {
    label: "Emerging",
    value: "89",
    change: "+23",
    changeType: "positive" as const,
    icon: Zap,
    description: "新規検出",
  },
  {
    label: "総言及量",
    value: "45.2M",
    change: "+8.5%",
    changeType: "positive" as const,
    icon: Eye,
    description: "過去30日間",
  },
  {
    label: "平均Popularity",
    value: "72.4",
    change: "+2.1",
    changeType: "positive" as const,
    icon: Target,
    description: "スコア",
  },
]

export function TrendingSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryStats.map((stat) => (
        <Card key={stat.label} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </span>
                  <span className={`text-xs font-medium ${
                    stat.changeType === "positive" ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
