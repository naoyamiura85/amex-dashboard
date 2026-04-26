"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState, useCallback, useRef, useEffect } from "react"
import { Play, RotateCcw, ChevronRight, ChevronDown, Megaphone, Target, Sparkles, Users, TrendingUp, FileText } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── INPUT 1: メディア配分（金額ベース・百万円） ─────────────────────────────────
const MEDIA_CHANNELS = [
  { key: "tv",      label: "TV",      defaultBudget: 250, color: "#006FCF" },
  { key: "ctv",     label: "CTV",     defaultBudget: 150, color: "#B4975A" },
  { key: "ooh",     label: "OOH",     defaultBudget: 100, color: "#38A169" },
  { key: "olv",     label: "OLV",     defaultBudget: 200, color: "#9B2335" },
  { key: "social",  label: "Social",  defaultBudget: 200, color: "#8B5CF6" },
  { key: "audio",   label: "Audio",   defaultBudget: 50,  color: "#EC4899" },
  { key: "display", label: "Display", defaultBudget: 50,  color: "#F59E0B" },
] as const

const DEFAULT_TOTAL_BUDGET = 1000 // 百万円

// ─── INPUT 2: CR要素 ─────────────────────────────────────────────────────────
const CR_ELEMENTS = [
  { key: "emotional",  label: "感情訴求",     defaultValue: 60, color: "#006FCF" },
  { key: "rational",   label: "機能訴求",     defaultValue: 50, color: "#38A169" },
  { key: "celebrity",  label: "有名人起用",   defaultValue: 30, color: "#B4975A" },
  { key: "story",      label: "ストーリー性", defaultValue: 70, color: "#9B2335" },
  { key: "cta",        label: "CTA明確性",    defaultValue: 55, color: "#8B5CF6" },
] as const

// ─── 効果係数 ─────────────────────────────────────────────────────────────────
const IMPACT_COEFFICIENTS = {
  media: {
    tv:      { adRecall: 1.3, ltcs: 0.8 },
    ctv:     { adRecall: 1.5, ltcs: 1.0 },
    ooh:     { adRecall: 1.0, ltcs: 0.5 },
    olv:     { adRecall: 1.6, ltcs: 1.1 },
    social:  { adRecall: 1.4, ltcs: 1.3 },
    audio:   { adRecall: 0.9, ltcs: 0.6 },
    display: { adRecall: 0.8, ltcs: 0.9 },
  },
  cr: {
    emotional:  { adRecall: 1.2, ltcs: 1.4 },
    rational:   { adRecall: 0.9, ltcs: 1.1 },
    celebrity:  { adRecall: 1.5, ltcs: 0.8 },
    story:      { adRecall: 1.3, ltcs: 1.5 },
    cta:        { adRecall: 0.8, ltcs: 1.2 },
  },
  intermediate: {
    adRecall: { brandConsideration: 0.65, application: 0.25 },
    ltcs:     { brandConsideration: 0.45, application: 0.55 },
  }
}

export default function MacroSimulationPage() {
  // INPUT State
  const [totalBudget, setTotalBudget] = useState(DEFAULT_TOTAL_BUDGET)
  const [mediaBudget, setMediaBudget] = useState<Record<string, number>>(
    Object.fromEntries(MEDIA_CHANNELS.map(c => [c.key, c.defaultBudget]))
  )
  const [crValues, setCrValues] = useState<Record<string, number>>(
    Object.fromEntries(CR_ELEMENTS.map(c => [c.key, c.defaultValue]))
  )
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [isCrOpen, setIsCrOpen] = useState(false)

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false)
  const [phase, setPhase] = useState<"idle" | "input" | "intermediate" | "output">("idle")
  const [metrics, setMetrics] = useState({
    adRecall: { base: 60, delta: 0 },
    ltcs: { base: 75, delta: 0 },
    brandConsideration: { base: 48, delta: 0 },
    application: { base: 2.4, delta: 0 },
  })

  const animationRef = useRef<number | null>(null)

  // メディア予算変更
  const handleMediaBudgetChange = (key: string, value: number) => {
    setMediaBudget(prev => ({ ...prev, [key]: value }))
  }

  // メディア予算合計
  const totalMediaBudget = Object.values(mediaBudget).reduce((s, v) => s + v, 0)

  // パーセンテージ計算（シミュレーション用）
  const mediaAlloc = Object.fromEntries(
    MEDIA_CHANNELS.map(c => [c.key, totalBudget > 0 ? (mediaBudget[c.key] / totalBudget) * 100 : 0])
  )

  // シミュレーション計算
  const runSimulation = useCallback(() => {
    setIsSimulating(true)
    setPhase("input")

    // Phase 1: INPUT表示
    setTimeout(() => {
      setPhase("intermediate")

      // 1. メディア配分の効果計算
      let mediaAdRecallEffect = 0
      let mediaLtcsEffect = 0
      MEDIA_CHANNELS.forEach(ch => {
        const alloc = mediaAlloc[ch.key] / 100
        mediaAdRecallEffect += alloc * IMPACT_COEFFICIENTS.media[ch.key as keyof typeof IMPACT_COEFFICIENTS.media].adRecall
        mediaLtcsEffect += alloc * IMPACT_COEFFICIENTS.media[ch.key as keyof typeof IMPACT_COEFFICIENTS.media].ltcs
      })

      // 2. CR要素の効果計算
      let crAdRecallEffect = 0
      let crLtcsEffect = 0
      CR_ELEMENTS.forEach(el => {
        const val = crValues[el.key] / 100
        crAdRecallEffect += val * IMPACT_COEFFICIENTS.cr[el.key as keyof typeof IMPACT_COEFFICIENTS.cr].adRecall * 0.2
        crLtcsEffect += val * IMPACT_COEFFICIENTS.cr[el.key as keyof typeof IMPACT_COEFFICIENTS.cr].ltcs * 0.2
      })

      // 3. 中間指標の変化量
      const adRecallDelta = Math.round((mediaAdRecallEffect + crAdRecallEffect) * 8 * 10) / 10
      const ltcsDelta = Math.round((mediaLtcsEffect + crLtcsEffect) * 6 * 10) / 10

      // アニメーション
      let startTime: number | null = null
      const duration = 1500

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic

        setMetrics(prev => ({
          ...prev,
          adRecall: { ...prev.adRecall, delta: Math.round(adRecallDelta * eased * 10) / 10 },
          ltcs: { ...prev.ltcs, delta: Math.round(ltcsDelta * eased * 10) / 10 },
        }))

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          // Phase 3: OUTPUT計算
          setTimeout(() => {
            setPhase("output")

            // 4. 出力指標の計算
            const brandConsiderationDelta = Math.round(
              (adRecallDelta * IMPACT_COEFFICIENTS.intermediate.adRecall.brandConsideration +
               ltcsDelta * IMPACT_COEFFICIENTS.intermediate.ltcs.brandConsideration) * 10
            ) / 10

            const applicationDelta = Math.round(
              (adRecallDelta * IMPACT_COEFFICIENTS.intermediate.adRecall.application +
               ltcsDelta * IMPACT_COEFFICIENTS.intermediate.ltcs.application) * 0.1 * 10
            ) / 10

            // 出力アニメーション
            let outStart: number | null = null
            const outDuration = 1000

            const animateOut = (ts: number) => {
              if (!outStart) outStart = ts
              const p = Math.min((ts - outStart) / outDuration, 1)
              const e = 1 - Math.pow(1 - p, 3)

              setMetrics(prev => ({
                ...prev,
                brandConsideration: { ...prev.brandConsideration, delta: Math.round(brandConsiderationDelta * e * 10) / 10 },
                application: { ...prev.application, delta: Math.round(applicationDelta * e * 100) / 100 },
              }))

              if (p < 1) {
                animationRef.current = requestAnimationFrame(animateOut)
              } else {
                setIsSimulating(false)
              }
            }

            animationRef.current = requestAnimationFrame(animateOut)
          }, 500)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }, 600)
  }, [mediaAlloc, crValues])

  // リセット
  const handleReset = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    setTotalBudget(DEFAULT_TOTAL_BUDGET)
    setMediaBudget(Object.fromEntries(MEDIA_CHANNELS.map(c => [c.key, c.defaultBudget])))
    setCrValues(Object.fromEntries(CR_ELEMENTS.map(c => [c.key, c.defaultValue])))
    setPhase("idle")
    setMetrics({
      adRecall: { base: 60, delta: 0 },
      ltcs: { base: 75, delta: 0 },
      brandConsideration: { base: 48, delta: 0 },
      application: { base: 2.4, delta: 0 },
    })
    setIsSimulating(false)
    setIsMediaOpen(false)
    setIsCrOpen(false)
  }

  useEffect(() => {
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [])

  return (
    <>
      <DashboardHeader 
        title="Macro Simulation" 
        breadcrumb={["Plan Simulation", "Macro Simulation"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          メディア配分とCR要素を入力 → AD Recall・LTCSの変化 → Brand Consideration・Applicationを予測
        </p>

        {/* コントロール */}
        <div className="flex gap-3">
          <Button
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-[#006FCF] hover:bg-[#005bb5] gap-2"
          >
            <Play className="h-4 w-4" />
            シミュレーション実行
          </Button>
          <Button variant="outline" onClick={handleReset} disabled={isSimulating} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            リセット
          </Button>
        </div>

        {/* 4カラムフローレイアウト */}
        <div className="grid lg:grid-cols-[1fr_auto_0.8fr_auto_1fr] gap-4 items-start">

          {/* ===== INPUT (1カード) ===== */}
          <Card className={cn(
            "border-2 transition-all duration-500",
            phase === "input" ? "border-[#006FCF] shadow-lg shadow-[#006FCF]/20" : "border-border"
          )}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#006FCF]/10">
                  <Megaphone className="h-4 w-4 text-[#006FCF]" />
                </div>
                <div>
                  <CardTitle className="text-xs">INPUT</CardTitle>
                  <p className="text-[11px] text-muted-foreground">メディア配分 & CR要素</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {/* トータルバジェット */}
              <div>
                <label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">トータルバジェット</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val >= 0 && val <= 99999) {
                        setTotalBudget(val)
                      }
                    }}
                    max={99999}
                    min={0}
                    disabled={isSimulating}
                    className="text-sm font-bold h-9"
                  />
                  <span className="text-xs text-slate-500 whitespace-nowrap">百万円</span>
                </div>
              </div>

              {/* メディア配分（プルダウン） */}
              <Collapsible open={isMediaOpen} onOpenChange={setIsMediaOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-3.5 w-3.5 text-[#006FCF]" />
                    <span className="text-[11px] font-semibold text-slate-700">メディア配分</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">
                      合計: <span className={cn("font-bold", totalMediaBudget === totalBudget ? "text-emerald-600" : "text-amber-600")}>
                        ¥{totalMediaBudget.toLocaleString()}M
                      </span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isMediaOpen && "rotate-180")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3 space-y-2">
                  {MEDIA_CHANNELS.map(ch => (
                    <div key={ch.key} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ch.color }} />
                          <span className="text-[10px] font-medium">{ch.label}</span>
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: ch.color }}>
                          ¥{mediaBudget[ch.key]}M
                          <span className="text-[9px] text-slate-400 font-normal ml-1">
                            ({totalBudget > 0 ? Math.round((mediaBudget[ch.key] / totalBudget) * 100) : 0}%)
                          </span>
                        </span>
                      </div>
                      <Slider
                        value={[mediaBudget[ch.key]]}
                        onValueChange={([v]) => handleMediaBudgetChange(ch.key, v)}
                        max={Math.max(500, totalBudget)}
                        step={10}
                        disabled={isSimulating}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* CR要素（プルダウン） */}
              <Collapsible open={isCrOpen} onOpenChange={setIsCrOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#B4975A]" />
                    <span className="text-[11px] font-semibold text-slate-700">CR要素</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">
                      平均: <span className="font-bold text-[#B4975A]">
                        {Math.round(Object.values(crValues).reduce((a, b) => a + b, 0) / CR_ELEMENTS.length)}
                      </span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isCrOpen && "rotate-180")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3 space-y-2">
                  {CR_ELEMENTS.map(el => (
                    <div key={el.key} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium">{el.label}</span>
                        <span className="text-[10px] font-bold" style={{ color: el.color }}>{crValues[el.key]}</span>
                      </div>
                      <Slider
                        value={[crValues[el.key]]}
                        onValueChange={([v]) => setCrValues(prev => ({ ...prev, [el.key]: v }))}
                        max={100}
                        step={5}
                        disabled={isSimulating}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center h-full pt-20">
            <div className={cn(
              "flex flex-col items-center gap-1 transition-all duration-500",
              phase === "input" || phase === "intermediate" ? "text-[#006FCF]" : "text-slate-300"
            )}>
              <ChevronRight className={cn("h-6 w-6", phase === "intermediate" && "animate-pulse")} />
              <span className="text-[9px] font-medium">効果</span>
            </div>
          </div>

          {/* ===== INTERMEDIATE ===== */}
          <Card className={cn(
            "border-2 transition-all duration-500",
            phase === "intermediate" ? "border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-border"
          )}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-xs">中間指標</CardTitle>
                  <p className="text-[11px] text-muted-foreground">ブランド指標の変化</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AD Recall */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all duration-500",
                phase === "intermediate" || phase === "output"
                  ? "border-[#006FCF] bg-[#006FCF]/5"
                  : "border-slate-200 bg-slate-50"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#006FCF]">AD Recall</span>
                  <Badge className="bg-[#006FCF]/10 text-[#006FCF] text-[10px]">認知</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-800">
                    {metrics.adRecall.base + metrics.adRecall.delta}%
                  </span>
                  {metrics.adRecall.delta > 0 && (
                    <span className="text-sm font-bold text-emerald-600">+{metrics.adRecall.delta}%</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">広告認知率</p>
              </div>

              {/* LTCS */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all duration-500",
                phase === "intermediate" || phase === "output"
                  ? "border-[#38A169] bg-[#38A169]/5"
                  : "border-slate-200 bg-slate-50"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#38A169]">LTCS</span>
                  <Badge className="bg-[#38A169]/10 text-[#38A169] text-[10px]">好意度</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-800">
                    {metrics.ltcs.base + metrics.ltcs.delta}%
                  </span>
                  {metrics.ltcs.delta > 0 && (
                    <span className="text-sm font-bold text-emerald-600">+{metrics.ltcs.delta}%</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Long Term Customer Score</p>
              </div>
            </CardContent>
          </Card>

          {/* Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center h-full pt-20">
            <div className={cn(
              "flex flex-col items-center gap-1 transition-all duration-500",
              phase === "output" ? "text-[#B4975A]" : "text-slate-300"
            )}>
              <ChevronRight className={cn("h-6 w-6", phase === "output" && "animate-pulse")} />
              <span className="text-[9px] font-medium">予測</span>
            </div>
          </div>

          {/* ===== OUTPUT ===== */}
          <Card className={cn(
            "border-2 transition-all duration-500",
            phase === "output" ? "border-[#B4975A] shadow-lg shadow-[#B4975A]/20" : "border-border"
          )}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#B4975A]/10">
                  <Target className="h-4 w-4 text-[#B4975A]" />
                </div>
                <div>
                  <CardTitle className="text-xs">OUTPUT</CardTitle>
                  <p className="text-[11px] text-muted-foreground">ビジネス指標</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Brand Consideration */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all duration-500",
                phase === "output"
                  ? "border-[#006FCF] bg-[#006FCF]/5"
                  : "border-slate-200 bg-slate-50"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#006FCF]">Brand Consideration</span>
                  <Badge className="bg-[#006FCF]/10 text-[#006FCF] text-[10px]">検討</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={cn(
                    "text-3xl font-black transition-all duration-500",
                    phase === "output" ? "text-slate-800" : "text-slate-300"
                  )}>
                    {phase === "output" 
                      ? `${(metrics.brandConsideration.base + metrics.brandConsideration.delta).toFixed(1)}%`
                      : "---"}
                  </span>
                  {phase === "output" && metrics.brandConsideration.delta > 0 && (
                    <span className="text-sm font-bold text-emerald-600">+{metrics.brandConsideration.delta}%</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">ブランド検討率</p>
              </div>

              {/* Application */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all duration-500",
                phase === "output"
                  ? "border-[#B4975A] bg-[#B4975A]/5"
                  : "border-slate-200 bg-slate-50"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#B4975A]">Application</span>
                  <Badge className="bg-[#B4975A]/10 text-[#B4975A] text-[10px]">申込</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={cn(
                    "text-3xl font-black transition-all duration-500",
                    phase === "output" ? "text-slate-800" : "text-slate-300"
                  )}>
                    {phase === "output"
                      ? `${(metrics.application.base + metrics.application.delta).toFixed(2)}%`
                      : "---"}
                  </span>
                  {phase === "output" && metrics.application.delta > 0 && (
                    <span className="text-sm font-bold text-emerald-600">+{metrics.application.delta.toFixed(2)}%</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">カード申込率</p>
              </div>

              {/* サマリー */}
              {phase === "output" && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      現在のメディア配分とCR要素により、AD Recallが<span className="font-bold text-[#006FCF]">+{metrics.adRecall.delta}%</span>、
                      LTCSが<span className="font-bold text-[#38A169]">+{metrics.ltcs.delta}%</span>向上。
                      Brand Considerationは<span className="font-bold text-[#006FCF]">+{metrics.brandConsideration.delta}%</span>、
                      Applicationは<span className="font-bold text-[#B4975A]">+{metrics.application.delta.toFixed(2)}%</span>の
                      リフトが予測されます。
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
