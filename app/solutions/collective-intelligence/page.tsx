"use client"

import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { CollectiveIntelligenceContent } from "@/components/dashboard/collective-intelligence-content"

export default function CollectiveIntelligencePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <CollectiveIntelligenceContent />
        </main>
      </div>
      <YappiChat />
    </div>
  )
}
