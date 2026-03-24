"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AIExplorerContent } from "@/components/dashboard/ai-explorer-content"

export default function ExplorerPage() {
  return (
    <>
      <DashboardHeader
        title="統合エクスプローラー"
        breadcrumb={["インサイト", "統合エクスプローラー"]}
      />
      <AIExplorerContent />
    </>
  )
}
