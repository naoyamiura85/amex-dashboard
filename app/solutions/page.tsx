"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { SolutionsContent } from "@/components/dashboard/solutions-content"

export default function SolutionsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader 
            title="Solutions" 
            breadcrumb={["Solutions"]}
          />
          <SolutionsContent />
        </SidebarInset>
      </div>
      <YappiChat />
    </SidebarProvider>
  )
}
