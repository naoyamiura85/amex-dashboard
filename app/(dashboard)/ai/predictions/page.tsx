"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AIPredictionsContent } from "@/components/dashboard/ai-predictions-content"

export default function PredictionsPage() {
  return (
    <>
      <DashboardHeader
        title="トレンド予測"
        breadcrumb={["AI分析", "トレンド予測"]}
      />
      <AIPredictionsContent />
    </>
  )
}
