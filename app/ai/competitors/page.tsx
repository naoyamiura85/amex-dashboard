"use client"

import { Suspense, lazy } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { Skeleton } from "@/components/ui/skeleton"

const CompetitorsContent = lazy(() => import("@/components/dashboard/ai-competitors-content").then(m => ({ default: m.AICompetitorsContent })))
const YappiChat = lazy(() => import("@/components/dashboard/yappi-chat").then(m => ({ default: m.YappiChat })))

export default function CompetitorsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="競合分析"
            breadcrumb={["AI分析", "競合分析"]}
          />
          <Suspense fallback={<Skeleton className="m-6 h-96 rounded-xl" />}>
            <CompetitorsContent />
          </Suspense>
        </SidebarInset>
      </div>
      <Suspense fallback={null}>
        <YappiChat />
      </Suspense>
    </SidebarProvider>
  )
}
