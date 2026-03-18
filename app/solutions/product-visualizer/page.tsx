"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { ProductVisualizerContent } from "@/components/dashboard/product-visualizer-content"

export default function ProductVisualizerPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <ProductVisualizerContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
