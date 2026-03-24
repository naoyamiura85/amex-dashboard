"use client"

import { Suspense, lazy } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { Skeleton } from "@/components/ui/skeleton"

const ExplorerContent = lazy(() => import("@/components/dashboard/ai-explorer-content").then(m => ({ default: m.AIExplorerContent })))
const YappiChat = lazy(() => import("@/components/dashboard/yappi-chat").then(m => ({ default: m.YappiChat })))

export default function ExplorerPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="統合エクスプローラー"
            breadcrumb={["インサイト", "統合エクスプローラー"]}
          />
          <Suspense fallback={<Skeleton className="m-6 h-96 rounded-xl" />}>
            <ExplorerContent />
          </Suspense>
        </SidebarInset>
      </div>
      <Suspense fallback={null}>
        <YappiChat />
      </Suspense>
    </SidebarProvider>
  )
}
