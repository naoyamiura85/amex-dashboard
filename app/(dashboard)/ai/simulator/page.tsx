"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AISimulatorContent } from "@/components/dashboard/ai-simulator-content"

export default function SimulatorPage() {
  return (
    <>
      <DashboardHeader
        title="改定シミュレーター"
        breadcrumb={["商品開発支援", "改定シミュレーター"]}
      />
      <AISimulatorContent />
    </>
  )
}
