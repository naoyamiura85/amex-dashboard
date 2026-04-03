"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Construction } from "lucide-react"

export default function ConceptGeneratorPage() {
  return (
    <>
      <DashboardHeader
        title="コンセプト生成"
        breadcrumb={["商品開発支援", "コンセプト生成"]}
      />
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted">
          <Construction className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">準備中</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            このページは現在開発中です。<br />しばらくお待ちください。
          </p>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
