"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { PopularityScoreContent } from "@/components/dashboard/popularity-score-content"

export default function PopularityScorePage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <PopularityScoreContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
