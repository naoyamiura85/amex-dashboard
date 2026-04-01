"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { SalesAnalysisContent } from "@/components/dashboard/sales-analysis-content"

export default function SalesAnalysisPage() {
  return (
    <>
      <DashboardHeader 
        title="販売状況分析" 
        breadcrumb={["ダッシュボード", "販売状況分析"]} 
      />
      <SalesAnalysisContent />
    </>
  )
}
