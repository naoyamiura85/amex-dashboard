"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { DriveContent } from "@/components/dashboard/drive-content"

export default function DrivePage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <DriveContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
