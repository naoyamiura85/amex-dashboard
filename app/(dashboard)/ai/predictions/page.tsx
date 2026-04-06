"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AIPredictionsContent } from "@/components/dashboard/ai-predictions-content"

export default function PredictionsPage() {
  return (
    <>
      <DashboardHeader
        title="AIインサイト・予測"
        breadcrumb={["AI分析", "AIインサイト・予測"]}
      />
      <AIPredictionsContent />
    </>
  )
}
