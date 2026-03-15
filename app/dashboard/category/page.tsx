"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { CategoryDashboardContent } from "@/components/dashboard/category-dashboard-content"

export default function CategoryDashboardPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <CategoryDashboardContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
