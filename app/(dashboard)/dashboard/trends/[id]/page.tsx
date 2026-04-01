import { TrendDetailContent } from "@/components/dashboard/trend-detail-content"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function TrendDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <>
      <DashboardHeader />
      <TrendDetailContent trendId={id} />
    </>
  )
}
