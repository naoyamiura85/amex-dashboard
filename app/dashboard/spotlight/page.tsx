"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { TrendSpotlightContent } from "@/components/dashboard/trend-spotlight-content"

export default function TrendSpotlightPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader 
            title="トレンド詳細" 
            breadcrumb={["ダッシュボード", "トレンド詳細"]}
          />
          <TrendSpotlightContent />
        </SidebarInset>
      </div>
      <YappiChat />
    </SidebarProvider>
  )
}
