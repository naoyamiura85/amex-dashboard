"use client"

import { Suspense, lazy } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { Skeleton } from "@/components/ui/skeleton"

const ReportsContent = lazy(() => import("@/components/dashboard/reports-content").then(m => ({ default: m.ReportsContent })))
const YappiChat = lazy(() => import("@/components/dashboard/yappi-chat").then(m => ({ default: m.YappiChat })))

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="自動レポート生成"
            breadcrumb={["レポート", "自動生成"]}
          />
          <Suspense fallback={<Skeleton className="m-6 h-96 rounded-xl" />}>
            <ReportsContent />
          </Suspense>
        </SidebarInset>
      </div>
      <Suspense fallback={null}>
        <YappiChat />
      </Suspense>
    </SidebarProvider>
  )
}
