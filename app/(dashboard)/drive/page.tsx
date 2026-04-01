"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { DriveContent } from "@/components/dashboard/drive-content"

export default function DrivePage() {
  return (
    <>
      <DashboardHeader title="ドライブ" breadcrumb={["レポート", "ドライブ"]} />
      <DriveContent />
    </>
  )
}
