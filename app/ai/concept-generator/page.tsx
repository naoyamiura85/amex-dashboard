"use client"

import { Suspense, lazy } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { Skeleton } from "@/components/ui/skeleton"

const ConceptGeneratorContent = lazy(() => import("@/components/dashboard/ai-concept-generator-content").then(m => ({ default: m.ConceptGeneratorContent })))
const YappiChat = lazy(() => import("@/components/dashboard/yappi-chat").then(m => ({ default: m.YappiChat })))

export default function ConceptGeneratorPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="コンセプト生成"
            breadcrumb={["商品開発支援", "コンセプト生成"]}
          />
          <Suspense fallback={<Skeleton className="m-6 h-96 rounded-xl" />}>
            <ConceptGeneratorContent />
          </Suspense>
        </SidebarInset>
      </div>
      <Suspense fallback={null}>
        <YappiChat />
      </Suspense>
    </SidebarProvider>
  )
}
