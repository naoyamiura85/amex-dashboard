"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AISimulatorContent } from "@/components/dashboard/ai-simulator-content"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="改定シミュレーター"
        breadcrumb={["ダッシュボード", "改定シミュレーター"]}
      />
      <AISimulatorContent />
    </>
  )
}
