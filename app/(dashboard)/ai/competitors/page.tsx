"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AICompetitorsContent } from "@/components/dashboard/ai-competitors-content"

export default function CompetitorsPage() {
  return (
    <>
      <DashboardHeader
        title="競合分析"
        breadcrumb={["AI分析", "競合分析"]}
      />
      <AICompetitorsContent />
    </>
  )
}
