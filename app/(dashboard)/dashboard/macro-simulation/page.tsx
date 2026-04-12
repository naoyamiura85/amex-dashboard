"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"

const SEGMENTS = [
  { id: "bc_low_500", label: "BC低 / 500万〜", base: 890 },
  { id: "bc_low_1000", label: "BC低 / 1000万〜", base: 320 },
  { id: "bc_low_1500", label: "BC低 / 1500万〜", base: 120 },
  { id: "bc_mid_500", label: "BC中 / 500万〜", base: 430 },
  { id: "bc_mid_1000", label: "BC中 / 1000万〜", base: 210 },
  { id: "bc_mid_1500", label: "BC中 / 1500万〜", base: 85 },
  { id: "bc_high_500", label: "BC高 / 500万〜", base: 180 },
  { id: "bc_high_1000", label: "BC高 / 1000万〜", base: 95 },
  { id: "bc_high_1500", label: "BC高 / 1500万〜", base: 42 },
]

export default function MacroSimulationPage() {
  const [adSpend, setAdSpend] = useState(100)
  const [isSimulated, setIsSimulated] = useState(false)

  const adRecallLift = Math.min(50, adSpend * 0.3)
  const ltcsLift = Math.min(30, adSpend * 0.18)

  const handleSimulate = () => {
    setIsSimulated(true)
  }

  const handleReset = () => {
    setAdSpend(100)
    setIsSimulated(false)
  }

  return (
    <>
      <DashboardHeader 
        title="Macro Simulation" 
        breadcrumb={["Plan Simulation", "Macro Simulation"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          9セグメントの変動と「Ad Recall」「LTCS」のリフトをシミュレート
        </p>

        {/* コントロール */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">シミュレーション設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">広告投資額</span>
                <span className="text-lg font-bold text-[#006FCF]">{adSpend}億円</span>
              </div>
              <Slider
                value={[adSpend]}
                onValueChange={(v) => { setAdSpend(v[0]); setIsSimulated(false) }}
                min={50}
                max={200}
                step={10}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSimulate} className="bg-[#006FCF] hover:bg-[#005bb5]">
                <Play className="h-4 w-4 mr-2" />
                シミュレート実行
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                リセット
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 結果 */}
        {isSimulated && (
          <>
            {/* KPIリフト */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border shadow-sm">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground">Ad Recall リフト</p>
                  <p className="text-4xl font-bold text-[#006FCF] mt-2">+{adRecallLift.toFixed(1)}%</p>
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground">LTCS リフト</p>
                  <p className="text-4xl font-bold text-[#B4975A] mt-2">+{ltcsLift.toFixed(1)}%</p>
                </CardContent>
              </Card>
            </div>

            {/* 9セグメント変動 */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">9セグメント変動予測</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {SEGMENTS.map((seg) => {
                    const lift = seg.id.includes("high") ? adSpend * 0.15 : seg.id.includes("mid") ? adSpend * 0.08 : adSpend * 0.03
                    const projected = seg.base + Math.round(lift)
                    return (
                      <div key={seg.id} className="p-3 rounded-lg border text-center">
                        <p className="text-xs text-muted-foreground">{seg.label}</p>
                        <p className="text-lg font-bold mt-1">{projected.toLocaleString()}万人</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          +{Math.round(lift).toLocaleString()}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  )
}
