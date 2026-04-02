"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TrendsListContent } from "@/components/dashboard/trends-list-content"
import { AmexTrendsContent } from "@/components/dashboard/amex-trends-content"
import { useClient } from "@/contexts/client-context"

export default function TrendsListPage() {
  const { brand, data } = useClient()
  const isAmex = brand.id === "amex"
  
  return (
    <>
      <DashboardHeader 
        title={data.trendTitle || "トップトレンド"} 
        breadcrumb={["ダッシュボード", data.trendTitle || "トップトレンド"]}
      />
      {isAmex ? <AmexTrendsContent /> : <TrendsListContent />}
    </>
  )
}
