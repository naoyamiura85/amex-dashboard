"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AIReportsContent } from "@/components/dashboard/ai-reports-content"

export default function ReportsPage() {
  return (
    <>
      <DashboardHeader
        title="自動レポート生成"
        breadcrumb={["レポート", "自動生成"]}
      />
      <AIReportsContent />
    </>
  )
}
