"use client"

import { Bell, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  title: string
  breadcrumb?: string[]
}

export function DashboardHeader({ title, breadcrumb }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <div>
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
              {breadcrumb.map((item, index) => (
                <span key={item} className="flex items-center gap-1.5">
                  {index > 0 && <span>/</span>}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          )}
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* インラインフィルター */}
        <div className="hidden md:flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="h-9 w-[130px] text-sm">
              <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="期間" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">過去7日間</SelectItem>
              <SelectItem value="30days">過去30日間</SelectItem>
              <SelectItem value="90days">過去90日間</SelectItem>
              <SelectItem value="1year">過去1年間</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[100px] text-sm">
              <SelectValue placeholder="地域" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全国</SelectItem>
              <SelectItem value="kanto">関東</SelectItem>
              <SelectItem value="kansai">関西</SelectItem>
              <SelectItem value="tokai">東海</SelectItem>
              <SelectItem value="kyushu">九州</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden md:block h-6 w-px bg-border" />

        {/* 検索 */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="検索..."
            className="h-9 w-[180px] pl-9 text-sm bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>

        {/* 通知 */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
            3
          </Badge>
        </Button>
      </div>
    </header>
  )
}
