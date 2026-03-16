"use client"

import { useTrends } from "@/contexts/trends-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, CheckCircle2, Loader2 } from "lucide-react"

export function ResearchQueue() {
  const { trends, isResearching } = useTrends()
  
  const queuedTrends = trends.filter(t => t.researchStatus === "queued")
  const researchingTrend = trends.find(t => t.researchStatus === "researching")
  const recentlyCompleted = trends
    .filter(t => t.researchStatus === "completed" && t.createdAt)
    .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
    .slice(0, 3)

  const hasActiveQueue = queuedTrends.length > 0 || researchingTrend

  if (!hasActiveQueue && recentlyCompleted.length === 0) {
    return null
  }

  return (
    <Card className="shadow-sm border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AIリサーチキュー
          {hasActiveQueue && (
            <Badge variant="secondary" className="ml-auto">
              {(queuedTrends.length + (researchingTrend ? 1 : 0))} 件処理中
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Currently Researching */}
        {researchingTrend && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <span className="text-sm font-medium">リサーチ中</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {researchingTrend.categoryLabel}
              </Badge>
            </div>
            <p className="text-sm font-medium text-foreground mb-2">
              {researchingTrend.name}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>分析進捗</span>
                <span>{researchingTrend.researchProgress || 0}%</span>
              </div>
              <Progress value={researchingTrend.researchProgress || 0} className="h-1.5" />
            </div>
          </div>
        )}

        {/* Queued Items */}
        {queuedTrends.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              待機中 ({queuedTrends.length}件)
            </div>
            {queuedTrends.map((trend, index) => (
              <div 
                key={trend.id} 
                className="flex items-center gap-2 text-sm py-1.5 px-2 rounded bg-muted/50"
              >
                <span className="text-xs text-muted-foreground w-4">{index + 1}.</span>
                <span className="flex-1 truncate">{trend.name}</span>
                <Badge variant="outline" className="text-xs shrink-0">
                  {trend.categoryLabel}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Recently Completed */}
        {!hasActiveQueue && recentlyCompleted.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              最近完了したリサーチ
            </div>
            {recentlyCompleted.map((trend) => (
              <div 
                key={trend.id} 
                className="flex items-center gap-2 text-sm py-1.5 px-2 rounded bg-emerald-50"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span className="flex-1 truncate">{trend.name}</span>
                <Badge variant="outline" className="text-xs shrink-0 border-emerald-200 text-emerald-700">
                  完了
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
