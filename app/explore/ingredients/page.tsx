"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { ExploreIngredientsContent } from "@/components/dashboard/explore-ingredients-content"

export default function ExploreIngredientsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader 
            title="成分・原材料" 
            breadcrumb={["Explore", "成分・原材料"]}
          />
          <ExploreIngredientsContent />
        </SidebarInset>
      </div>
      <YappiChat />
    </SidebarProvider>
  )
}
