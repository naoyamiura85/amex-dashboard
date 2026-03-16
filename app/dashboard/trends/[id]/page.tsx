"use client"

import { use } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { TrendDetailContent } from "@/components/dashboard/trend-detail-content"

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
            title="Trend Spotlight" 
            breadcrumb={[
              { label: "Dashboard", href: "/dashboard/trends" },
              { label: "Top Trends", href: "/dashboard/trends" },
            ]} 
          />
          <main className="flex-1 overflow-auto p-6">
            <TrendDetailContent trendId={id} />
          </main>
        </div>
        <YappiChat />
      </div>
    </SidebarProvider>
  )
}
