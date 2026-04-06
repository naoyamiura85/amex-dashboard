import { Metadata } from "next"
import { MarketOverviewContent } from "@/components/dashboard/market-overview-content"
import { DashboardHeader } from "@/components/dashboard/header"

export const metadata: Metadata = {
  title: "会員分析 | AMEX 会員分析ダッシュボード",
  description: "会員セグメント・ファネル・ペルソナ別の詳細分析",
}

export default function MarketOverviewPage() {
  return (
    <>
      <DashboardHeader
        title="会員分析"
        breadcrumb={["ダッシュボード", "会員分析"]}
      />
      <MarketOverviewContent />
    </>
  )
}
