"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TribeAnalysisContent } from "@/components/dashboard/tribe-analysis-content"

export default function TribeAnalysisPage() {
  return (
    <>
      <DashboardHeader
        title="トライブ分析"
        breadcrumb={["ダッシュボード", "トライブ分析"]}
      />
      <TribeAnalysisContent />
    </>
  )
}
