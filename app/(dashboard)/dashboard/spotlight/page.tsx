"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TrendSpotlightContent } from "@/components/dashboard/trend-spotlight-content"

export default function TrendSpotlightPage() {
  return (
    <>
      <DashboardHeader 
        title="トレンド詳細" 
        breadcrumb={["ダッシュボード", "トレンド詳細"]}
      />
      <TrendSpotlightContent />
    </>
  )
}
