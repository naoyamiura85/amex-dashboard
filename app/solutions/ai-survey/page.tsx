"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { AISurveyContent } from "@/components/dashboard/ai-survey-content"

export default function AISurveyPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <AISurveyContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
