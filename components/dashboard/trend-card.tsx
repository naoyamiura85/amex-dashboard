"use client"

import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type LifecycleStage = "emerging" | "growing" | "peaking" | "declining"
type Category = "food" | "cosmetics" | "toiletry" | "supplement" | "wellness"

interface TrendCardProps {
  name: string
  growthRate: number
  lifecycleStage: LifecycleStage
  mentionVolume: string
  demandDriverSummary: string
  popularityScore: number
  category: Category
  sparklineData?: number[]
}

const lifecycleConfig: Record<LifecycleStage, { label: string; className: string }> = {
  emerging: { label: "Emerging", className: "bg-blue-100 text-blue-700 border-blue-200" },
  growing: { label: "Growing", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  peaking: { label: "Peaking", className: "bg-amber-100 text-amber-700 border-amber-200" },
  declining: { label: "Declining", className: "bg-rose-100 text-rose-700 border-rose-200" },
}

const categoryConfig: Record<Category, { label: string; color: string }> = {
  food: { label: "食品・飲料", color: "bg-emerald-500" },
  cosmetics: { label: "化粧品", color: "bg-rose-400" },
  toiletry: { label: "トイレタリー", color: "bg-blue-500" },
  supplement: { label: "サプリ", color: "bg-amber-500" },
  wellness: { label: "ウェルネス", color: "bg-violet-500" },
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 32
  const width = 80

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
    </svg>
  )
}

export function TrendCard({
  name,
  growthRate,
  lifecycleStage,
  mentionVolume,
  demandDriverSummary,
  popularityScore,
  category,
  sparklineData = [30, 40, 35, 50, 49, 60, 70, 91, 85, 95],
}: TrendCardProps) {
  const lifecycle = lifecycleConfig[lifecycleStage]
  const categoryInfo = categoryConfig[category]

  const GrowthIcon = growthRate > 0 ? TrendingUp : growthRate < 0 ? TrendingDown : Minus
  const growthColor = growthRate > 0 ? "text-emerald-600" : growthRate < 0 ? "text-rose-600" : "text-muted-foreground"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30 cursor-pointer border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-2 h-2 rounded-full ${categoryInfo.color}`} />
              <span className="text-xs text-muted-foreground">{categoryInfo.label}</span>
            </div>
            <h3 className="font-semibold text-foreground text-base leading-tight truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <Badge variant="outline" className={`${lifecycle.className} text-[10px] font-medium shrink-0`}>
            {lifecycle.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Growth Rate & Sparkline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GrowthIcon className={`h-4 w-4 ${growthColor}`} />
            <span className={`text-lg font-semibold ${growthColor}`}>
              {growthRate > 0 ? "+" : ""}{growthRate}%
            </span>
          </div>
          <Sparkline data={sparklineData} />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">言及量</p>
            <p className="text-sm font-medium text-foreground">{mentionVolume}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Popularity</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all" 
                  style={{ width: `${popularityScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">{popularityScore}</span>
            </div>
          </div>
        </div>

        {/* Demand Driver Summary */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {demandDriverSummary}
        </p>

        {/* Action */}
        <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-8 text-muted-foreground hover:text-primary">
          詳細を見る
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
