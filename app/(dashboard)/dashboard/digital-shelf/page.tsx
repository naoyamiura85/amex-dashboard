"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DigitalShelfContent } from "@/components/dashboard/digital-shelf-content"

export default function DigitalShelfPage() {
  const [selectedProduct, setSelectedProduct] = useState("all")

  return (
    <>
      <DashboardHeader 
        title="デジタルシェルフ分析" 
        breadcrumb={["ANALYTICS", "デジタルシェルフ分析"]}
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
      />
      <DigitalShelfContent selectedProduct={selectedProduct} />
    </>
  )
}
