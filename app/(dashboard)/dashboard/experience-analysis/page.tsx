"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { ExperienceFlow } from "@/components/dashboard/experience-flow"

export default function ExperienceAnalysisPage() {
  return (
    <>
      <DashboardHeader
        title="Experience Analysis"
        breadcrumb={["Japan Market", "Experience Analysis"]}
      />
      <div className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          トライブを起点に ブランド接点 → 申込み動機 → 申し込みパターン へのフローを分析します。ノードをクリックして関連パスをフィルターできます。
        </p>
        <ExperienceFlow />
      </div>
    </>
  )
}
