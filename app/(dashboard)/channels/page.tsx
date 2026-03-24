"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { ChannelsContent } from "@/components/dashboard/channels-content"

export default function ChannelsPage() {
  return (
    <>
      <DashboardHeader title="チャネル分析" breadcrumb={["インサイト", "チャネル分析"]} />
      <ChannelsContent />
    </>
  )
}
