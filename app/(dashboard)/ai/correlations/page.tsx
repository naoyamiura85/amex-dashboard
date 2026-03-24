"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AICorrelationsContent } from "@/components/dashboard/ai-correlations-content"

export default function CorrelationsPage() {
  return (
    <>
      <DashboardHeader
        title="相関発見"
        breadcrumb={["AI分析", "相関発見"]}
      />
      <AICorrelationsContent />
    </>
  )
}
