"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { ChannelsContent } from "@/components/dashboard/channels-content"

export default function ChannelsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader title="チャネル分析" breadcrumb={["インサイト", "チャネル分析"]} />
        <main className="flex-1 overflow-auto">
          <ChannelsContent />
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
