"use client"

import { use } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { TrendDetailContent } from "@/components/dashboard/trend-detail-content"

interface TrendDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TrendDetailPage({ params }: TrendDetailPageProps) {
  const { id } = use(params)
  
  return (
    <>
      <DashboardHeader 
        title="トレンド詳細" 
        breadcrumb={["ダッシュボード", "トップトレンド"]} 
      />
      <main className="flex-1 overflow-auto p-6 pt-0">
        <TrendDetailContent trendId={id} />
      </main>
    </>
  )
}
