"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AmexHomeContent } from "@/components/dashboard/amex-home-content"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Market Overview"
        breadcrumb={["ダッシュボード", "Market Overview"]}
      />
      <AmexHomeContent />
    </>
  )
}
