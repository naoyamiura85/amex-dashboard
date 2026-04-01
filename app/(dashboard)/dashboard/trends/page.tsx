"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { TrendsListContent } from "@/components/dashboard/trends-list-content"

export default function TrendsListPage() {
  return (
    <>
      <DashboardHeader 
        title="トップトレンド" 
        breadcrumb={["ダッシュボード", "トップトレンド"]}
      />
      <TrendsListContent />
    </>
  )
}
