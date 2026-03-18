"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { TargetStrategyContent } from "@/components/dashboard/target-strategy-content"

export default function TargetStrategyPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <TargetStrategyContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
