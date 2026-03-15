"use client"

import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "総売上",
    value: "¥4,523,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "先月比",
  },
  {
    title: "アクティブユーザー",
    value: "2,350",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "先月比",
  },
  {
    title: "注文数",
    value: "1,234",
    change: "-2.1%",
    trend: "down",
    icon: ShoppingCart,
    description: "先月比",
  },
  {
    title: "コンバージョン率",
    value: "3.24%",
    change: "+0.5%",
    trend: "up",
    icon: Activity,
    description: "先月比",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <stat.icon className="h-4 w-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-emerald-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-rose-600" />
              )}
              <span
                className={`text-xs font-medium ${
                  stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
