"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { BrandComparisonContent } from "@/components/dashboard/brand-comparison-content"

export default function BrandComparisonPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <BrandComparisonContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
