"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AISimulatorContent } from "@/components/dashboard/ai-simulator-content"

export default function SimulatorPage() {
  return (
    <>
      <DashboardHeader
        title="審査シミュレーター"
        breadcrumb={["AI分析", "審査シミュレーター"]}
      />
      <AISimulatorContent />
    </>
  )
}
