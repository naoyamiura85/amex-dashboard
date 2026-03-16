"use client"

import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { PersonaGeneratorContent } from "@/components/dashboard/persona-generator-content"

export default function PersonaGeneratorPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <PersonaGeneratorContent />
        </main>
      </div>
      <YappiChat />
    </div>
  )
}
