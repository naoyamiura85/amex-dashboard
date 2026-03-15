"use client"

import { Check, Package, CreditCard, UserPlus, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    icon: Package,
    title: "新規注文",
    description: "注文 #ORD-001 が作成されました",
    time: "5分前",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "支払い完了",
    description: "¥45,200 の支払いを受領",
    time: "15分前",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    icon: UserPlus,
    title: "新規ユーザー",
    description: "田中さんが登録しました",
    time: "1時間前",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    icon: Check,
    title: "配送完了",
    description: "注文 #ORD-098 が配送されました",
    time: "2時間前",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 5,
    icon: Bell,
    title: "システム通知",
    description: "在庫アラート: 商品Aの在庫が少なくなっています",
    time: "3時間前",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
]

export function ActivityFeed() {
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">最近のアクティビティ</CardTitle>
        <CardDescription>システムの最新情報</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
