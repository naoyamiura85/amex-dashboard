"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TrendsListContent } from "@/components/dashboard/trends-list-content"
import { AmexTrendsContent } from "@/components/dashboard/amex-trends-content"
import { useClient } from "@/contexts/client-context"

export default function TrendsListPage() {
  const { brand, data } = useClient()
  const isAmex = brand?.id === "amex"
  const trendTitle = data?.trendTitle || "トップトレンド"
  
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
