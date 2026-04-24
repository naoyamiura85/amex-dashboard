"use client"

import { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Globe } from "lucide-react"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

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

// サブ地域データ
interface SubRegion {
  name: string
  marketSize: string
  sizeNum: number
  growth: string
}

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

// 国コード -> 地域ID マッピング
const COUNTRY_TO_REGION: Record<string, string> = {
  "392": "jp",
  "840": "us",
  "826": "uk",
  "484": "mx",
  "124": "ca",
}

interface Props {
  regions: MapRegion[]
  selectedRegion: string | null
  onSelectRegion: (id: string | null) => void
}

export function GlobalMap({ regions, selectedRegion, onSelectRegion }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const selectedRegionData = selectedRegion ? regions.find((r) => r.id === selectedRegion) : null
  const subRegions = selectedRegion ? SUB_REGIONS[selectedRegion] : null

  function getCountryFill(numeric: string): string {
    const rid = COUNTRY_TO_REGION[numeric]
    if (!rid) return "#E5E7EB"
    const region = regions.find((x) => x.id === rid)
    if (!region) return "#E5E7EB"
    
    if (selectedRegion === rid) return region.color + "66"
    if (hoveredRegion === rid) return region.color + "33"
    return "#E5E7EB"
  }

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">グローバルマップ</span>
      </div>

      {/* メインコンテンツ: 地図 + 国カード */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 地図エリア (左側 2/3) */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden bg-[#EFF4FB] border" style={{ aspectRatio: "2/1" }}>
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 160, center: [0, 20] }}
            style={{ width: "100%", height: "100%" }}
          >
            <rect x="-1000" y="-1000" width="3000" height="3000" fill="#DAE8F5" />
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const numeric = geo.properties?.numeric ?? geo.properties?.ISO_N3 ?? ""
                  const rid = COUNTRY_TO_REGION[numeric]
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryFill(numeric)}
                      stroke="#FFFFFF"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: "none", cursor: rid ? "pointer" : "default", transition: "fill 0.2s" },
                        hover: { outline: "none", cursor: rid ? "pointer" : "default" },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={() => rid && setHoveredRegion(rid)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => rid && onSelectRegion(rid === selectedRegion ? null : rid)}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* 国カードリスト (右側 1/3) */}
        <div className="space-y-2">
          {regions.map((r) => {
            const isSelected = selectedRegion === r.id
            const isHovered = hoveredRegion === r.id
            return (
              <button
                key={r.id}
                onClick={() => onSelectRegion(r.id === selectedRegion ? null : r.id)}
                onMouseEnter={() => setHoveredRegion(r.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "ring-2 ring-offset-1 bg-card shadow-sm"
                    : isHovered
                    ? "bg-muted/50"
                    : "bg-card hover:bg-muted/30"
                }`}
                style={{
                  borderColor: isSelected || isHovered ? r.color : undefined,
                  ringColor: isSelected ? r.color : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  {/* 国旗 */}
                  <div
                    className="w-10 h-7 rounded overflow-hidden border shadow-sm flex-shrink-0"
                    style={{ borderColor: r.color + "44" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.flag}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* 国名と数値 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{r.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: r.color }}>
                        {r.marketSize}
                      </span>
                      <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" />
                        {r.growth}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 選択中の地域詳細パネル */}
      {selectedRegionData && subRegions && (
        <Card className="border-l-4" style={{ borderLeftColor: selectedRegionData.color }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-6 rounded overflow-hidden border shadow-sm"
                style={{ borderColor: selectedRegionData.color + "44" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedRegionData.flag}
                  alt={selectedRegionData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-base">{selectedRegionData.name} - サブ市場</CardTitle>
                <p className="text-xs text-muted-foreground">
                  合計 {selectedRegionData.marketSize} / 成長率{" "}
                  <span className="text-emerald-600 font-medium">{selectedRegionData.growth}</span>
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {subRegions.map((sub) => (
                <div
                  key={sub.name}
                  className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <p className="text-xs text-muted-foreground">{sub.name}</p>
                  <p className="text-sm font-bold" style={{ color: selectedRegionData.color }}>
                    {sub.marketSize}
                  </p>
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
