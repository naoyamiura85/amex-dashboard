"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Play, RotateCcw, TrendingUp, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// メディアチャネルタブ定義
const MEDIA_CHANNELS = [
  { key: "tv",      label: "TV" },
  { key: "ctv",     label: "CTV" },
  { key: "ooh",     label: "OOH" },
  { key: "olv",     label: "OLV" },
  { key: "social",  label: "Social" },
  { key: "audio",   label: "Audio" },
  { key: "display", label: "Display" },
] as const
type MediaChannelKey = typeof MEDIA_CHANNELS[number]["key"]

// マトリクス用定数
const stages = [
  { key: "prospect", label: "Brand Consideration 低", sub: "890万人" },
  { key: "new", label: "Brand Consideration 中", sub: "430万人" },
  { key: "active", label: "Brand Consideration 高", sub: "210万人" },
]

const engagements = [
  { key: "H", label: "H", sublabel: "1,500万〜" },
  { key: "M", label: "M", sublabel: "1,000万〜" },
  { key: "L", label: "L", sublabel: "500万〜" },
]

// 9セグメントのベースデータ（マトリクス形式）
const MATRIX_DATA: Record<string, Record<string, number>> = {
  H: { prospect: 142, new: 58, active: 89 },
  M: { prospect: 287, new: 112, active: 76 },
  L: { prospect: 461, new: 128, active: 45 },
}

// 背景色設定
const stageBg: Record<string, { cell: string; cellHover: string }> = {
  prospect: { cell: "bg-white", cellHover: "hover:bg-slate-50" },
  new:      { cell: "bg-[#C5E4FC]", cellHover: "hover:bg-[#B0D9F9]" },
  active:   { cell: "bg-[#8ACDF6]", cellHover: "hover:bg-[#6BC0F3]" },
}

export default function MacroSimulationPage() {
  const [selectedChannel, setSelectedChannel] = useState<MediaChannelKey>("tv")
  const [adSpend, setAdSpend] = useState(100)
  const [isSimulated, setIsSimulated] = useState(false)

  const adRecallLift = Math.min(50, adSpend * 0.3)
  const applicationLift = Math.min(30, adSpend * 0.18)

  // セグメントごとの変動計算
  const getSegmentLift = (eng: string, stage: string) => {
    const baseLift = adSpend * 0.1
    const stageMultiplier = stage === "active" ? 1.5 : stage === "new" ? 1.0 : 0.5
    const engMultiplier = eng === "H" ? 1.3 : eng === "M" ? 1.0 : 0.7
    return Math.round(baseLift * stageMultiplier * engMultiplier)
  }

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
        {/* メディアチャネルタブ */}
        <div className="flex">
          {MEDIA_CHANNELS.map((channel) => (
            <button
              key={channel.key}
              onClick={() => { setSelectedChannel(channel.key); setIsSimulated(false) }}
              className={cn(
                "flex-1 px-4 py-2.5 text-sm font-semibold transition-all border-b-2",
                selectedChannel === channel.key
                  ? "bg-[#006FCF] text-white border-[#006FCF]"
                  : "bg-[#006FCF]/90 text-white/80 border-[#006FCF]/90 hover:bg-[#006FCF] hover:text-white"
              )}
            >
              {channel.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {MEDIA_CHANNELS.find(c => c.key === selectedChannel)?.label}チャネルの9セグメント変動と「Ad Recall」「Application」のリフトをシミュレート
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
                  <p className="text-sm text-muted-foreground">Application（申し込み）リフト</p>
                  <p className="text-4xl font-bold text-[#B4975A] mt-2">+{applicationLift.toFixed(1)}%</p>
                </CardContent>
              </Card>
            </div>

            {/* マトリクス変動予測（統合版） */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#006FCF]" />
                  9セグメント変動予測
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border border-border">
                  {/* ヘッダー */}
                  <div className="grid grid-cols-[80px_repeat(3,1fr)]">
                    <div className="p-3 border-b border-r border-border bg-slate-50">
                      <p className="text-[10px] text-muted-foreground text-center">ステージ</p>
                      <p className="text-[10px] text-muted-foreground text-center">世帯年収</p>
                    </div>
                    {stages.map((s) => (
                      <div key={s.key} className={cn("p-3 border-b border-r last:border-r-0 border-border text-center", stageBg[s.key].cell)}>
                        <div className="flex items-center justify-center gap-1 mb-0.5">
                          <div className={cn("w-2 h-2 rounded-full", s.key === "prospect" ? "bg-slate-400" : "bg-[#006FCF]")} />
                        </div>
                        <p className={cn("text-sm font-bold", s.key === "prospect" ? "text-slate-600" : "text-[#006FCF]")}>{s.label}</p>
                        <p className="text-[10px] text-slate-400">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                  {/* ボディ */}
                  {engagements.map((eng) => (
                    <div key={eng.key} className="grid grid-cols-[80px_repeat(3,1fr)]">
                      <div className="p-3 border-r border-b last:border-b-0 border-border bg-slate-50 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-[#006FCF]">{eng.label}</span>
                        <span className="text-[10px] text-muted-foreground">{eng.sublabel}</span>
                      </div>
                      {stages.map((stage) => {
                        const base = MATRIX_DATA[eng.key][stage.key]
                        const lift = getSegmentLift(eng.key, stage.key)
                        const projected = base + lift
                        return (
                          <div
                            key={stage.key}
                            className={cn(
                              "p-4 border-r border-b last:border-r-0 last:border-b-0 border-border/50 text-center",
                              stageBg[stage.key].cell
                            )}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm text-muted-foreground">{base}万人</span>
                              <ArrowRight className="h-3 w-3 text-[#006FCF]" />
                              <span className="text-lg font-bold text-[#1A202C]">{projected}万人</span>
                            </div>
                            <Badge className="text-[10px] bg-emerald-100 text-emerald-700 mt-2">
                              +{lift}万人
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* 合計変動サマリー */}
                <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">総人数変動</p>
                      <p className="text-xs text-muted-foreground">全9セグメント合計</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#006FCF]">
                        +{engagements.reduce((sum, eng) => 
                          sum + stages.reduce((s, stage) => s + getSegmentLift(eng.key, stage.key), 0), 0
                        )}万人
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Object.values(MATRIX_DATA).reduce((sum, row) => sum + Object.values(row).reduce((s, v) => s + v, 0), 0)}万人 → {
                          Object.values(MATRIX_DATA).reduce((sum, row) => sum + Object.values(row).reduce((s, v) => s + v, 0), 0) +
                          engagements.reduce((sum, eng) => 
                            sum + stages.reduce((s, stage) => s + getSegmentLift(eng.key, stage.key), 0), 0
                          )
                        }万人
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  )
}
