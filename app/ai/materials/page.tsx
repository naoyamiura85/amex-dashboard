"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AIMaterialsContent } from "@/components/dashboard/ai-materials-content"

export default function MaterialsPage() {
  return (
    <>
      <DashboardHeader
        title="素材データベース"
        breadcrumb={["商品開発支援", "素材データベース"]}
      />
      <AIMaterialsContent />
    </>
  )
}
