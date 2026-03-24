"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AIConceptGeneratorContent } from "@/components/dashboard/ai-concept-generator-content"

export default function ConceptGeneratorPage() {
  return (
    <>
      <DashboardHeader
        title="コンセプト生成"
        breadcrumb={["商品開発支援", "コンセプト生成"]}
      />
      <AIConceptGeneratorContent />
    </>
  )
}
