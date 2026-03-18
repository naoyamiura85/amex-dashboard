"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { SalesStoryContent } from "@/components/dashboard/sales-story-content"

export default function SalesStoryPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <SalesStoryContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
