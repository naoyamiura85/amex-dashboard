"use client"

import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "ORD-001",
    customer: "山田 花子",
    email: "yamada@example.com",
    amount: "¥45,200",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "佐藤 一郎",
    email: "sato@example.com",
    amount: "¥12,800",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "鈴木 美咲",
    email: "suzuki@example.com",
    amount: "¥78,500",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "高橋 健太",
    email: "takahashi@example.com",
    amount: "¥23,100",
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "ORD-005",
    customer: "伊藤 さくら",
    email: "ito@example.com",
    amount: "¥56,700",
    status: "completed",
    date: "2024-01-13",
  },
]

const statusConfig = {
  completed: { label: "完了", variant: "default" as const },
  pending: { label: "保留中", variant: "secondary" as const },
  processing: { label: "処理中", variant: "outline" as const },
}

export function RecentOrders() {
  return (
    <Card className="border-border/40 shadow-sm col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">最近の注文</CardTitle>
          <CardDescription>直近5件の注文履歴</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          すべて表示
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">注文ID</TableHead>
              <TableHead className="text-muted-foreground font-medium">顧客</TableHead>
              <TableHead className="text-muted-foreground font-medium">金額</TableHead>
              <TableHead className="text-muted-foreground font-medium">ステータス</TableHead>
              <TableHead className="text-muted-foreground font-medium">日付</TableHead>
              <TableHead className="text-muted-foreground font-medium w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-border/40">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.customer}`} />
                      <AvatarFallback>{order.customer[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{order.amount}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[order.status as keyof typeof statusConfig].variant}>
                    {statusConfig[order.status as keyof typeof statusConfig].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>詳細を見る</DropdownMenuItem>
                      <DropdownMenuItem>編集</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">キャンセル</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
