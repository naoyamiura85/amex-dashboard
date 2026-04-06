"use client"

import { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export interface MapRegion {
  id: string
  name: string
  marketSize: string
  sizeNum: number
  growth: string
  growthNum: number
  color: string
  coordinates: [number, number] // [lng, lat]
}

const REGION_MARKER_MIN = 28
const REGION_MARKER_MAX = 68

function markerRadius(sizeNum: number, min = 1.2, max = 6.5): number {
  return REGION_MARKER_MIN + ((sizeNum - min) / (max - min)) * (REGION_MARKER_MAX - REGION_MARKER_MIN)
}

// 国コード → 地域ID マッピング（ホバー時に地域をハイライト）
const COUNTRY_TO_REGION: Record<string, string> = {
  // 北米
  "840": "na", "124": "na", "484": "na",
  // 欧州
  "276": "eu", "250": "eu", "380": "eu", "724": "eu", "528": "eu",
  "752": "eu", "756": "eu", "616": "eu", "203": "eu", "040": "eu",
  "056": "eu", "620": "eu", "372": "eu", "208": "eu", "246": "eu",
  "578": "eu", "348": "eu", "703": "eu", "705": "eu", "191": "eu",
  "100": "eu", "642": "eu", "300": "eu",
  // 中国
  "156": "cn",
  // 日本
  "392": "jp",
  // インド
  "356": "in",
  // 南米
  "076": "sa", "032": "sa", "152": "sa", "170": "sa", "604": "sa",
  "218": "sa", "858": "sa", "591": "sa", "600": "sa", "068": "sa",
  "862": "sa", "328": "sa", "740": "sa", "780": "sa",
  // オセアニア
  "036": "oc", "554": "oc", "598": "oc",
}

interface Props {
  regions: MapRegion[]
  selectedRegion: string | null
  onSelectRegion: (id: string | null) => void
}

export function GlobalMap({ regions, selectedRegion, onSelectRegion }: Props) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const hoveredRegionId = hoveredCountry ? COUNTRY_TO_REGION[hoveredCountry] ?? null : null

  function getCountryFill(geo: { properties: { numeric: string } }): string {
    const numericCode = geo.properties.numeric
    const rid = COUNTRY_TO_REGION[numericCode]
    if (rid && selectedRegion === rid) {
      const r = regions.find((x) => x.id === rid)
      return r ? r.color + "55" : "#CBD5E0"
    }
    if (rid && hoveredRegionId === rid) {
      const r = regions.find((x) => x.id === rid)
      return r ? r.color + "33" : "#CBD5E0"
    }
    return "#D1D5DB"
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-[#EFF4FB]" style={{ aspectRatio: "2/1" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155, center: [10, 10] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
          {/* 海 */}
          <rect x="-800" y="-800" width="2000" height="2000" fill="#DAE8F5" />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryFill(geo)}
                  stroke="#FFFFFF"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none", cursor: "pointer", transition: "fill 0.15s" },
                    hover:   { outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => setHoveredCountry(geo.properties.numeric)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => {
                    const rid = COUNTRY_TO_REGION[geo.properties.numeric]
                    if (rid) onSelectRegion(rid === selectedRegion ? null : rid)
                  }}
                />
              ))
            }
          </Geographies>

          {/* 地域マーカーバブル */}
          {regions.map((r) => {
            const radius = markerRadius(r.sizeNum)
            const isSelected = selectedRegion === r.id
            const isHovered = hoveredRegionId === r.id
            const active = isSelected || isHovered

            return (
              <Marker
                key={r.id}
                coordinates={r.coordinates}
                onClick={() => onSelectRegion(r.id === selectedRegion ? null : r.id)}
                style={{ cursor: "pointer" }}
              >
                {/* 選択時の外周リング */}
                {active && (
                  <circle
                    r={radius + 6}
                    fill="none"
                    stroke={r.color}
                    strokeWidth={1.5}
                    opacity={0.5}
                    style={{ pointerEvents: "none" }}
                  />
                )}
                {/* メインバブル */}
                <circle
                  r={radius}
                  fill={active ? r.color + "22" : "#FFFFFF99"}
                  stroke={r.color}
                  strokeWidth={active ? 2 : 1.2}
                  style={{ transition: "all 0.2s" }}
                />
                {/* 成長アイコン */}
                <text
                  x={-4}
                  y={-radius * 0.25}
                  fontSize={radius * 0.25}
                  fill={r.color}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ pointerEvents: "none", fontWeight: 700 }}
                >
                  ↑
                </text>
                {/* 市場規模テキスト */}
                <text
                  x={0}
                  y={radius * 0.12}
                  fontSize={radius * 0.3}
                  fontWeight={700}
                  fill={active ? r.color : "#1A202C"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ pointerEvents: "none" }}
                >
                  {r.marketSize}
                </text>
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
