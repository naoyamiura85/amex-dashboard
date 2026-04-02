"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TrendsListContent } from "@/components/dashboard/trends-list-content"
import { AmexTrendsContent } from "@/components/dashboard/amex-trends-content"
import { useClient } from "@/contexts/client-context"

export default function TrendsListPage() {
  const clientConfig = useClient()
  console.log("[v0] clientConfig:", clientConfig)
  console.log("[v0] brand.id:", clientConfig?.brand?.id)
  const isAmex = clientConfig?.brand?.id === "amex"
  console.log("[v0] isAmex:", isAmex)
  const trendTitle = clientConfig?.data?.trendTitle || "トップトレンド"
  
  return (
    <>
      <DashboardHeader 
        title={trendTitle} 
        breadcrumb={["ダッシュボード", trendTitle]}
      />
      {isAmex ? <AmexTrendsContent /> : <TrendsListContent />}
    </>
  )
}
