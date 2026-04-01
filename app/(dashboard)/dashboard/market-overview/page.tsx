import { Metadata } from "next"
import { MarketOverviewContent } from "@/components/dashboard/market-overview-content"
import { DashboardHeader } from "@/components/dashboard/header"

export const metadata: Metadata = {
  title: "Market Overview | サントリー食品",
  description: "定期顧客化ポテンシャルとウェルネスレベルごとのペルソナ分布",
}

export default function MarketOverviewPage() {
  return (
    <>
      <DashboardHeader title="Market Overview" />
      <MarketOverviewContent />
    </>
  )
}
