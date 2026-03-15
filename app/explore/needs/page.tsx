"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { ExploreNeedsContent } from "@/components/dashboard/explore-needs-content"

export default function ExploreNeedsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <ExploreNeedsContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
