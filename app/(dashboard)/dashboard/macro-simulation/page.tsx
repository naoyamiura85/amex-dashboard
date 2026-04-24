"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect, useCallback, useRef } from "react"
import { Play, RotateCcw, ArrowRight, ChevronRight, Megaphone, Target, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// メディアチャネル定義
const MEDIA_CHANNELS = [
  { key: "tv",      label: "TV",      defaultAlloc: 25, color: "#006FCF", impact: { adRecall: 1.2, application: 0.8 } },
  { key: "ctv",     label: "CTV",     defaultAlloc: 15, color: "#B4975A", impact: { adRecall: 1.4, application: 1.0 } },
  { key: "ooh",     label: "OOH",     defaultAlloc: 10, color: "#38A169", impact: { adRecall: 0.9, application: 0.6 } },
  { key: "olv",     label: "OLV",     defaultAlloc: 20, color: "#9B2335", impact: { adRecall: 1.5, application: 1.2 } },
  { key: "social",  label: "Social",  defaultAlloc: 20, color: "#8B5CF6", impact: { adRecall: 1.3, application: 1.5 } },
  { key: "audio",   label: "Audio",   defaultAlloc: 5,  color: "#EC4899", impact: { adRecall: 0.8, application: 0.4 } },
  { key: "display", label: "Display", defaultAlloc: 5,  color: "#F59E0B", impact: { adRecall: 0.7, application: 0.9 } },
] as const

// セグメントマトリクス定義
const STAGES = [
  { key: "prospect", label: "認知低", color: "bg-slate-100", textColor: "text-slate-600" },
  { key: "new",      label: "認知中", color: "bg-[#C5E4FC]", textColor: "text-[#006FCF]" },
  { key: "active",   label: "認知高", color: "bg-[#8ACDF6]", textColor: "text-[#00175A]" },
]

const ENGAGEMENTS = [
  { key: "H", label: "H", sublabel: "1,500万〜" },
  { key: "M", label: "M", sublabel: "1,000万〜" },
  { key: "L", label: "L", sublabel: "500万〜" },
]

// ベースセグメントデータ (万人)
const BASE_MATRIX: Record<string, Record<string, number>> = {
  H: { prospect: 142, new: 58, active: 89 },
  M: { prospect: 287, new: 112, active: 76 },
  L: { prospect: 461, new: 128, active: 45 },
}

// セグメント移動データ型
interface SegmentFlow {
  from: { eng: string; stage: string }
  to: { eng: string; stage: string }
  amount: number
  progress: number
}

export default function MacroSimulationPage() {
  // Media Allocation State
  const [allocations, setAllocations] = useState<Record<string, number>>(
    Object.fromEntries(MEDIA_CHANNELS.map(c => [c.key, c.defaultAlloc]))
  )
  
  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationPhase, setSimulationPhase] = useState<"idle" | "media" | "segment" | "output">("idle")
  const [segmentFlows, setSegmentFlows] = useState<SegmentFlow[]>([])
  const [currentMatrix, setCurrentMatrix] = useState<Record<string, Record<string, number>>>(BASE_MATRIX)
  const [outputMetrics, setOutputMetrics] = useState({ adRecall: 0, application: 0 })
  
  const animationRef = useRef<number | null>(null)

  // アロケーション調整
  const handleAllocationChange = (key: string, value: number) => {
    const total = Object.values(allocations).reduce((s, v) => s + v, 0) - allocations[key] + value
    if (total <= 100) {
      setAllocations(prev => ({ ...prev, [key]: value }))
    }
  }

  const totalAllocation = Object.values(allocations).reduce((s, v) => s + v, 0)

  // シミュレーション計算
  const calculateSimulation = useCallback(() => {
    // 1. メディア投資からAD Recall / Application効果を計算
    let adRecallScore = 0
    let applicationScore = 0
    
    MEDIA_CHANNELS.forEach(channel => {
      const alloc = allocations[channel.key] / 100
      adRecallScore += alloc * channel.impact.adRecall * 100
      applicationScore += alloc * channel.impact.application * 100
    })

    // 2. セグメント間移動を計算
    const flows: SegmentFlow[] = []
    const newMatrix = JSON.parse(JSON.stringify(BASE_MATRIX)) as typeof BASE_MATRIX
    
    // 各セグメントからの移動を計算
    ENGAGEMENTS.forEach(eng => {
      // prospect → new への移動
      const moveToNew = Math.round(BASE_MATRIX[eng.key].prospect * (adRecallScore / 100) * 0.15)
      if (moveToNew > 0) {
        flows.push({
          from: { eng: eng.key, stage: "prospect" },
          to: { eng: eng.key, stage: "new" },
          amount: moveToNew,
          progress: 0,
        })
        newMatrix[eng.key].prospect -= moveToNew
        newMatrix[eng.key].new += moveToNew
      }
      
      // new → active への移動
      const moveToActive = Math.round(BASE_MATRIX[eng.key].new * (applicationScore / 100) * 0.2)
      if (moveToActive > 0) {
        flows.push({
          from: { eng: eng.key, stage: "new" },
          to: { eng: eng.key, stage: "active" },
          amount: moveToActive,
          progress: 0,
        })
        newMatrix[eng.key].new -= moveToActive
        newMatrix[eng.key].active += moveToActive
      }
    })

    return { adRecallScore, applicationScore, flows, newMatrix }
  }, [allocations])

  // シミュレーション実行
  const runSimulation = () => {
    setIsSimulating(true)
    setSimulationPhase("media")
    
    // Phase 1: メディア投入表示
    setTimeout(() => {
      setSimulationPhase("segment")
      const { flows, newMatrix, adRecallScore, applicationScore } = calculateSimulation()
      
      // アニメーション開始
      let startTime: number | null = null
      const duration = 2000 // 2秒間のアニメーション
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // フローの進捗を更新
        setSegmentFlows(flows.map(f => ({ ...f, progress })))
        
        // マトリクスを徐々に更新
        const interpolatedMatrix = JSON.parse(JSON.stringify(BASE_MATRIX)) as typeof BASE_MATRIX
        flows.forEach(flow => {
          const movedAmount = Math.round(flow.amount * progress)
          interpolatedMatrix[flow.from.eng][flow.from.stage] = BASE_MATRIX[flow.from.eng][flow.from.stage] - movedAmount
          interpolatedMatrix[flow.to.eng][flow.to.stage] = BASE_MATRIX[flow.to.eng][flow.to.stage] + movedAmount
        })
        setCurrentMatrix(interpolatedMatrix)
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          // Phase 3: Output表示
          setSimulationPhase("output")
          setCurrentMatrix(newMatrix)
          setOutputMetrics({
            adRecall: Math.round(adRecallScore * 10) / 10,
            application: Math.round(applicationScore * 10) / 10,
          })
          setIsSimulating(false)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }, 800)
  }

  // リセット
  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setAllocations(Object.fromEntries(MEDIA_CHANNELS.map(c => [c.key, c.defaultAlloc])))
    setSimulationPhase("idle")
    setSegmentFlows([])
    setCurrentMatrix(BASE_MATRIX)
    setOutputMetrics({ adRecall: 0, application: 0 })
    setIsSimulating(false)
  }

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // セグメントセルのスタイル取得
  const getCellStyle = (eng: string, stage: string) => {
    const flow = segmentFlows.find(f => 
      (f.from.eng === eng && f.from.stage === stage) ||
      (f.to.eng === eng && f.to.stage === stage)
    )
    
    if (!flow || simulationPhase !== "segment") return {}
    
    const isFrom = flow.from.eng === eng && flow.from.stage === stage
    const intensity = flow.progress
    
    if (isFrom) {
      return {
        boxShadow: `inset 0 0 ${20 * intensity}px rgba(239, 68, 68, ${0.3 * intensity})`,
        transform: `scale(${1 - 0.02 * intensity})`,
      }
    } else {
      return {
        boxShadow: `inset 0 0 ${20 * intensity}px rgba(34, 197, 94, ${0.3 * intensity})`,
        transform: `scale(${1 + 0.02 * intensity})`,
      }
    }
  }

  return (
    <>
      <DashboardHeader 
        title="Macro Simulation" 
        breadcrumb={["Plan Simulation", "Macro Simulation"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          Media Allocation を入力 → セグメント間移動をシミュレート → AD Recall・Application を予測
        </p>

        {/* 3カラムフローレイアウト */}
        <div className="grid lg:grid-cols-[1fr_auto_1.2fr_auto_1fr] gap-4 items-start">
          
          {/* INPUT: Media Allocation */}
          <Card className={cn(
            "border-2 transition-all duration-500",
            simulationPhase === "media" ? "border-[#006FCF] shadow-lg shadow-[#006FCF]/20" : "border-border"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#006FCF]/10">
                  <Megaphone className="h-4 w-4 text-[#006FCF]" />
                </div>
                <div>
                  <CardTitle className="text-sm">INPUT</CardTitle>
                  <p className="text-xs text-muted-foreground">Media Allocation</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {MEDIA_CHANNELS.map(channel => (
                <div key={channel.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                      <span className="text-xs font-medium">{channel.label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: channel.color }}>
                      {allocations[channel.key]}%
                    </span>
                  </div>
                  <Slider
                    value={[allocations[channel.key]]}
                    onValueChange={([v]) => handleAllocationChange(channel.key, v)}
                    max={50}
                    step={5}
                    disabled={isSimulating}
                    className="w-full"
                  />
                </div>
              ))}
              <div className="pt-3 border-t flex items-center justify-between">
                <span className="text-xs text-muted-foreground">合計</span>
                <Badge variant={totalAllocation === 100 ? "default" : "destructive"} className="text-xs">
                  {totalAllocation}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center h-full">
            <div className={cn(
              "flex flex-col items-center gap-1 transition-all duration-500",
              simulationPhase === "media" || simulationPhase === "segment" ? "text-[#006FCF]" : "text-slate-300"
            )}>
              <ChevronRight className={cn(
                "h-8 w-8 transition-transform",
                simulationPhase === "segment" && "animate-pulse"
              )} />
              <span className="text-[10px] font-medium">投入効果</span>
            </div>
          </div>

          {/* INTERMEDIATE: Segment Flow */}
          <Card className={cn(
            "border-2 transition-all duration-500",
            simulationPhase === "segment" ? "border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-border"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Users className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-sm">INTERMEDIATE</CardTitle>
                  <p className="text-xs text-muted-foreground">セグメント間移動</p>
                </div>
                {simulationPhase === "segment" && (
                  <Badge className="ml-auto bg-emerald-500 animate-pulse">シミュレート中</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* マトリクス */}
              <div className="rounded-lg border border-border overflow-hidden">
                {/* ヘッダー */}
                <div className="grid grid-cols-[60px_repeat(3,1fr)]">
                  <div className="p-2 border-b border-r bg-slate-50 text-center">
                    <p className="text-[9px] text-muted-foreground">年収</p>
                  </div>
                  {STAGES.map(s => (
                    <div key={s.key} className={cn("p-2 border-b border-r last:border-r-0 text-center", s.color)}>
                      <p className={cn("text-[10px] font-bold", s.textColor)}>{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* ボディ */}
                {ENGAGEMENTS.map(eng => (
                  <div key={eng.key} className="grid grid-cols-[60px_repeat(3,1fr)]">
                    <div className="p-2 border-r border-b last:border-b-0 bg-slate-50 flex flex-col items-center justify-center">
                      <span className="text-sm font-bold text-[#006FCF]">{eng.label}</span>
                      <span className="text-[9px] text-muted-foreground">{eng.sublabel}</span>
                    </div>
                    {STAGES.map(stage => {
                      const base = BASE_MATRIX[eng.key][stage.key]
                      const current = currentMatrix[eng.key][stage.key]
                      const diff = current - base
                      const cellStyle = getCellStyle(eng.key, stage.key)
                      
                      return (
                        <div
                          key={stage.key}
                          className={cn(
                            "p-3 border-r border-b last:border-r-0 last:border-b-0 text-center transition-all duration-300",
                            STAGES.find(s => s.key === stage.key)?.color
                          )}
                          style={cellStyle}
                        >
                          <p className="text-lg font-bold text-slate-800">{current}万</p>
                          {simulationPhase !== "idle" && diff !== 0 && (
                            <Badge 
                              className={cn(
                                "text-[9px] mt-1 transition-all",
                                diff > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                              )}
                            >
                              {diff > 0 ? "+" : ""}{diff}万
                            </Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* フローインジケーター */}
              {simulationPhase === "segment" && segmentFlows.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">移動フロー</p>
                  {segmentFlows.map((flow, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">
                        {ENGAGEMENTS.find(e => e.key === flow.from.eng)?.label}-{STAGES.find(s => s.key === flow.from.stage)?.label}
                      </span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-400 to-emerald-400 transition-all duration-100"
                          style={{ width: `${flow.progress * 100}%` }}
                        />
                      </div>
                      <span className="text-emerald-600 font-medium">
                        +{Math.round(flow.amount * flow.progress)}万
                      </span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span className="text-slate-500">
                        {ENGAGEMENTS.find(e => e.key === flow.to.eng)?.label}-{STAGES.find(s => s.key === flow.to.stage)?.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center h-full">
            <div className={cn(
              "flex flex-col items-center gap-1 transition-all duration-500",
              simulationPhase === "output" ? "text-[#B4975A]" : "text-slate-300"
            )}>
              <ChevronRight className={cn(
                "h-8 w-8",
                simulationPhase === "output" && "animate-pulse"
              )} />
              <span className="text-[10px] font-medium">予測出力</span>
            </div>
          </div>

          {/* OUTPUT: AD Recall & Application */}
          <Card className={cn(
            "border-2 transition-all duration-500",
            simulationPhase === "output" ? "border-[#B4975A] shadow-lg shadow-[#B4975A]/20" : "border-border"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#B4975A]/10">
                  <Target className="h-4 w-4 text-[#B4975A]" />
                </div>
                <div>
                  <CardTitle className="text-sm">OUTPUT</CardTitle>
                  <p className="text-xs text-muted-foreground">予測KPI</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AD Recall */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all duration-500",
                simulationPhase === "output" 
                  ? "border-[#006FCF] bg-[#006FCF]/5" 
                  : "border-slate-200 bg-slate-50"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <Megaphone className="h-4 w-4 text-[#006FCF]" />
                  <span className="text-sm font-semibold text-[#006FCF]">AD Recall</span>
                </div>
                <p className={cn(
                  "text-4xl font-black transition-all duration-500",
                  simulationPhase === "output" ? "text-[#006FCF]" : "text-slate-300"
                )}>
                  {simulationPhase === "output" ? `+${outputMetrics.adRecall}%` : "---"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">広告認知度リフト予測</p>
              </div>

              {/* Application */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all duration-500",
                simulationPhase === "output" 
                  ? "border-[#B4975A] bg-[#B4975A]/5" 
                  : "border-slate-200 bg-slate-50"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-[#B4975A]" />
                  <span className="text-sm font-semibold text-[#B4975A]">Application</span>
                </div>
                <p className={cn(
                  "text-4xl font-black transition-all duration-500",
                  simulationPhase === "output" ? "text-[#B4975A]" : "text-slate-300"
                )}>
                  {simulationPhase === "output" ? `+${outputMetrics.application}%` : "---"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">申し込み率リフト予測</p>
              </div>

              {/* サマリー */}
              {simulationPhase === "output" && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">AI分析:</span> 現在のMedia Allocationでは、
                    Social・OLV への配分がAD Recall/Applicationの両方に高い効果を発揮。
                    TV は認知拡大に、Display は申込促進に効果的です。
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* コントロールボタン */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={runSimulation} 
            disabled={isSimulating || totalAllocation !== 100}
            className="bg-[#006FCF] hover:bg-[#005bb5] px-8"
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            シミュレート実行
          </Button>
          <Button variant="outline" onClick={handleReset} size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            リセット
          </Button>
        </div>

        {/* フロー説明 */}
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#006FCF]/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#006FCF]">1</span>
                </div>
                <span className="text-muted-foreground">Media配分を調整</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-600">2</span>
                </div>
                <span className="text-muted-foreground">セグメント移動を可視化</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#B4975A]/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#B4975A]">3</span>
                </div>
                <span className="text-muted-foreground">AD Recall / Application予測</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
