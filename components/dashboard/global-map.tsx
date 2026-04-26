"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

// ─── 型定義 ───────────────────────────────────────────────────────────────────
export interface MapRegion {
  id: string
  name: string
  flag: string
  marketSize: string
  sizeNum: number
  growth: string
  growthNum: number
  color: string
  coordinates: [number, number]
}

interface SubRegion {
  name: string
  marketSize: string
  sizeNum: number
  growth: string
}

// ─── サブ地域データ ───────────────────────────────────────────────────────────
const SUB_REGIONS: Record<string, SubRegion[]> = {
  jp: [
    { name: "首都圏", marketSize: "$980B", sizeNum: 980, growth: "+5.4%" },
    { name: "関西圏", marketSize: "$480B", sizeNum: 480, growth: "+4.8%" },
    { name: "中部・東海", marketSize: "$340B", sizeNum: 340, growth: "+5.1%" },
    { name: "九州・沖縄", marketSize: "$200B", sizeNum: 200, growth: "+4.2%" },
  ],
  us: [
    { name: "West Coast", marketSize: "$1,120B", sizeNum: 1120, growth: "+8.2%" },
    { name: "East Coast", marketSize: "$1,280B", sizeNum: 1280, growth: "+7.4%" },
    { name: "Midwest", marketSize: "$620B", sizeNum: 620, growth: "+5.8%" },
    { name: "South", marketSize: "$1,180B", sizeNum: 1180, growth: "+8.9%" },
  ],
  uk: [
    { name: "London", marketSize: "$520B", sizeNum: 520, growth: "+4.6%" },
    { name: "South East", marketSize: "$280B", sizeNum: 280, growth: "+3.8%" },
    { name: "Midlands", marketSize: "$220B", sizeNum: 220, growth: "+3.5%" },
    { name: "Scotland/North", marketSize: "$180B", sizeNum: 180, growth: "+4.2%" },
  ],
  mx: [
    { name: "CDMX", marketSize: "$240B", sizeNum: 240, growth: "+10.2%" },
    { name: "Monterrey", marketSize: "$120B", sizeNum: 120, growth: "+11.5%" },
    { name: "Guadalajara", marketSize: "$95B", sizeNum: 95, growth: "+9.8%" },
    { name: "Cancun", marketSize: "$65B", sizeNum: 65, growth: "+12.4%" },
  ],
  ca: [
    { name: "Toronto", marketSize: "$320B", sizeNum: 320, growth: "+6.2%" },
    { name: "Vancouver", marketSize: "$180B", sizeNum: 180, growth: "+5.8%" },
    { name: "Montreal", marketSize: "$140B", sizeNum: 140, growth: "+5.1%" },
    { name: "Calgary", marketSize: "$80B", sizeNum: 80, growth: "+6.5%" },
  ],
}

// 地図上のマーカー位置（パーセンテージ）
const MARKER_POSITIONS: Record<string, { left: string; top: string }> = {
  jp: { left: "85%", top: "42%" },
  us: { left: "20%", top: "40%" },
  uk: { left: "47%", top: "28%" },
  mx: { left: "15%", top: "52%" },
  ca: { left: "18%", top: "28%" },
}

interface Props {
  regions: MapRegion[]
  selectedRegion: string | null
  onSelectRegion: (id: string | null) => void
}

export function GlobalMap({ regions, selectedRegion, onSelectRegion }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const selectedData = selectedRegion && regions ? regions.find((r) => r.id === selectedRegion) : null
  const subRegions = selectedRegion ? SUB_REGIONS[selectedRegion] : null

  return (
    <div className="space-y-3">
      {/* 地図エリア（横長） */}
      <div className="relative h-[200px] rounded-xl overflow-hidden bg-gradient-to-br from-sky-100 to-blue-200 border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/world-map.jpg"
          alt="World Map"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        
        {/* 国マーカー */}
        {regions.map((r) => {
          const isActive = selectedRegion === r.id || hoveredRegion === r.id
          const pos = MARKER_POSITIONS[r.id]
          if (!pos) return null
          
          return (
            <button
              key={r.id}
              onClick={() => onSelectRegion(selectedRegion === r.id ? null : r.id)}
              onMouseEnter={() => setHoveredRegion(r.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-10"
              style={{ left: pos.left, top: pos.top }}
            >
              <div
                className={`
                  flex flex-col items-center justify-center
                  w-14 h-14 rounded-full bg-white shadow-lg
                  border-2 transition-all duration-200
                  ${isActive ? "scale-110 shadow-xl" : "hover:scale-105"}
                `}
                style={{ borderColor: isActive ? r.color : "rgba(0,0,0,0.1)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.flag}
                  alt={r.name}
                  className="w-5 h-3.5 object-cover rounded-sm mb-0.5"
                />
                <span className="text-[9px] font-bold text-slate-700">{r.marketSize}</span>
                <span className="text-[8px] text-emerald-600 font-medium flex items-center">
                  <TrendingUp className="w-2 h-2 mr-0.5" />
                  {r.growth}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* 国セレクター（1行） */}
      <div className="flex gap-2 overflow-x-auto">
        {regions.map((r) => {
          const isSelected = selectedRegion === r.id
          const isHovered = hoveredRegion === r.id
          return (
            <button
              key={r.id}
              onClick={() => onSelectRegion(r.id === selectedRegion ? null : r.id)}
              onMouseEnter={() => setHoveredRegion(r.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border text-left transition-all ${
                isSelected
                  ? "ring-2 ring-offset-1 bg-card shadow-sm"
                  : isHovered
                  ? "bg-muted/50"
                  : "bg-card hover:bg-muted/30"
              }`}
              style={{
                borderColor: isSelected || isHovered ? r.color : undefined,
                // @ts-expect-error Tailwind ring-color CSS variable
                "--tw-ring-color": isSelected ? r.color : undefined,
              } as React.CSSProperties}
            >
              <div className="w-6 h-4 rounded overflow-hidden border shadow-sm flex-shrink-0 mt-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.flag} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-semibold">{r.name}</div>
                <div className="text-[11px] font-bold" style={{ color: r.color }}>{r.marketSize}</div>
                <div className="text-[11px] text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" />{r.growth}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 選択された国のサブ地域詳細 */}
      {selectedData && subRegions && (
        <Card className="border-l-4 animate-in fade-in slide-in-from-top-2 duration-300" style={{ borderLeftColor: selectedData.color }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 rounded overflow-hidden border shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedData.flag} alt={selectedData.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <CardTitle className="text-base">{selectedData.name} - サブ市場</CardTitle>
                <p className="text-xs text-muted-foreground">
                  合計 {selectedData.marketSize} / 成長率 <span className="text-emerald-600 font-medium">{selectedData.growth}</span>
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {subRegions.map((sub) => (
                <div key={sub.name} className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <p className="text-xs text-muted-foreground">{sub.name}</p>
                  <p className="text-sm font-bold" style={{ color: selectedData.color }}>{sub.marketSize}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">{sub.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
