"use client"

import { Suspense, lazy } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { Skeleton } from "@/components/ui/skeleton"

const PredictionsContent = lazy(() => import("@/components/dashboard/ai-predictions-content").then(m => ({ default: m.PredictionsContent })))
const YappiChat = lazy(() => import("@/components/dashboard/yappi-chat").then(m => ({ default: m.YappiChat })))

export default function PredictionsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="トレンド予測"
            breadcrumb={["AI分析", "トレンド予測"]}
          />
          <Suspense fallback={<Skeleton className="m-6 h-96 rounded-xl" />}>
            <PredictionsContent />
          </Suspense>
        </SidebarInset>
      </div>
      <Suspense fallback={null}>
        <YappiChat />
      </Suspense>
    </SidebarProvider>
  )
}
