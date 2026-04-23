"use client"

import { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, X } from "lucide-react"

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

const MARKER_MIN = 36
const MARKER_MAX = 72

function markerRadius(sizeNum: number, min: number, max: number): number {
  if (max === min) return (MARKER_MIN + MARKER_MAX) / 2
  return MARKER_MIN + ((sizeNum - min) / (max - min)) * (MARKER_MAX - MARKER_MIN)
}

interface Props {
  regions: MapRegion[]
  selectedRegion: string | null
  onSelectRegion: (id: string | null) => void
}

export function GlobalMap({ regions, selectedRegion, onSelectRegion }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const globalSizes = regions.map((r) => r.sizeNum)
  const gMin = Math.min(...globalSizes)
  const gMax = Math.max(...globalSizes)

  const selectedRegionData = selectedRegion ? regions.find((r) => r.id === selectedRegion) : null
  const subRegions = selectedRegion ? SUB_REGIONS[selectedRegion] : null

  function getCountryFill(numeric: string): string {
    const rid = COUNTRY_TO_REGION[numeric]
    if (!rid) return "#E5E7EB"
    if (selectedRegion === rid) {
      const r = regions.find((x) => x.id === rid)
      return r ? r.color + "44" : "#CBD5E0"
    }
    if (hoveredRegion === rid) {
      const r = regions.find((x) => x.id === rid)
      return r ? r.color + "22" : "#CBD5E0"
    }
    return "#E5E7EB"
  }

  return (
    <div className="relative w-full">
      {/* 地図エリア */}
      <div className="relative w-full rounded-xl overflow-hidden bg-[#EFF4FB]" style={{ aspectRatio: "2.2/1" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [20, 30] }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* 海の背景 */}
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

          {/* 地域バブル */}
          {regions.map((r) => {
            const radius = markerRadius(r.sizeNum, gMin, gMax)
            const isSelected = selectedRegion === r.id
            const isHovered = hoveredRegion === r.id
            const active = isSelected || isHovered

            return (
              <Marker
                key={r.id}
                coordinates={r.coordinates}
                onClick={() => onSelectRegion(r.id === selectedRegion ? null : r.id)}
                style={{ cursor: "pointer" }}
              >
                {/* シャドウ */}
                <circle
                  r={radius}
                  fill="rgba(0,0,0,0.06)"
                  style={{ pointerEvents: "none", transform: "translate(2px, 2px)" }}
                />
                {/* メインバブル */}
                <circle
                  r={radius}
                  fill="#FFFFFF"
                  stroke={active ? r.color : "rgba(0,0,0,0.08)"}
                  strokeWidth={active ? 2.5 : 1}
                  style={{ transition: "all 0.2s" }}
                />
                {/* 国旗（円形クリップ） */}
                <defs>
                  <clipPath id={`flag-clip-${r.id}`}>
                    <circle cx={0} cy={-radius * 0.22} r={radius * 0.28} />
                  </clipPath>
                </defs>
                <image
                  href={r.flag}
                  x={-radius * 0.28}
                  y={-radius * 0.50}
                  width={radius * 0.56}
                  height={radius * 0.56}
                  clipPath={`url(#flag-clip-${r.id})`}
                  preserveAspectRatio="xMidYMid slice"
                  style={{ pointerEvents: "none" }}
                />
                {/* 成長矢印 */}
                <text
                  x={radius * 0.38}
                  y={radius * 0.15}
                  fontSize={radius * 0.22}
                  fill="#10B981"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ pointerEvents: "none", fontWeight: 700 }}
                >
                  ↗
                </text>
                {/* 市場規模 */}
                <text
                  x={0}
                  y={radius * 0.38}
                  fontSize={radius * 0.30}
                  fontWeight={700}
                  fill="#1E3A5F"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ pointerEvents: "none" }}
                >
                  {r.marketSize}
                </text>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>

      {/* 選択中の地域詳細パネル */}
      {selectedRegionData && subRegions && (
        <Card className="mt-4 border-l-4" style={{ borderLeftColor: selectedRegionData.color }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: selectedRegionData.color }}>
                  <Image
                    src={selectedRegionData.flag}
                    alt={selectedRegionData.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-base">{selectedRegionData.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    市場規模 {selectedRegionData.marketSize} / 成長率{" "}
                    <span className="text-emerald-600 font-medium">{selectedRegionData.growth}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectRegion(null)}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">サブ市場</p>
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
