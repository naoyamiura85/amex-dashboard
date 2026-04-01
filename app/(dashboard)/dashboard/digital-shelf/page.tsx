"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { DigitalShelfContent } from "@/components/dashboard/digital-shelf-content"

export default function DigitalShelfPage() {
  return (
    <>
      <DashboardHeader 
        title="デジタルシェルフ分析" 
        breadcrumb={["ANALYTICS", "デジタルシェルフ分析"]} 
      />
      <DigitalShelfContent />
    </>
  )
}
