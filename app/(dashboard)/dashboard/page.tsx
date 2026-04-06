"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AmexHomeContent } from "@/components/dashboard/amex-home-content"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="エグゼクティブサマリー"
        breadcrumb={["ダッシュボード", "エグゼクティブサマリー"]}
      />
      <AmexHomeContent />
    </>
  )
}
