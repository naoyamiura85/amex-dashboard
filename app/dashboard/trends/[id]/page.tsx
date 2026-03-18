"use client"

import { use, Suspense, lazy } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { Skeleton } from "@/components/ui/skeleton"

const TrendDetailContent = lazy(() => import("@/components/dashboard/trend-detail-content").then(m => ({ default: m.TrendDetailContent })))
const YappiChat = lazy(() => import("@/components/dashboard/yappi-chat").then(m => ({ default: m.YappiChat })))

function TrendDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl lg:col-span-2" />
      </div>
    </div>
  )
}

interface TrendDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TrendDetailPage({ params }: TrendDetailPageProps) {
  const { id } = use(params)
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader 
            title="トレンド詳細" 
            breadcrumb={["ダッシュボード", "トップトレンド"]} 
          />
          <main className="flex-1 overflow-auto p-6">
            <Suspense fallback={<TrendDetailSkeleton />}>
              <TrendDetailContent trendId={id} />
            </Suspense>
          </main>
        </div>
        <Suspense fallback={null}>
          <YappiChat />
        </Suspense>
      </div>
    </SidebarProvider>
  )
}
