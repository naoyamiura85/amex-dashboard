"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TrendsListContent } from "@/components/dashboard/trends-list-content"
import { AmexTrendsContent } from "@/components/dashboard/amex-trends-content"
import { useClient } from "@/contexts/client-context"

export default function TrendsListPage() {
  const clientConfig = useClient()
  const isAmex = clientConfig?.brand?.id === "amex"
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
