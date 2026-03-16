"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { TrendsListContent } from "@/components/dashboard/trends-list-content"

export default function TrendsListPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader 
            title="Top Trends" 
            breadcrumb={["Dashboard", "Top Trends"]}
          />
          <TrendsListContent />
        </SidebarInset>
      </div>
      <YappiChat />
    </SidebarProvider>
  )
}
