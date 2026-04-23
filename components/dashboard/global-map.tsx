"use client"

import { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"
import { ChevronLeft } from "lucide-react"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
// ローカルフォールバック: /public/world-110m.json が存在すれば "/world-110m.json" に切り替え可能

export interface MapRegion {
  id: string
  name: string
  marketSize: string
  sizeNum: number
  growth: string
  growthNum: number
  color: string
  coordinates: [number, number]
}

// サブ地域データ（ドリルダウン時に表示）
interface SubRegion {
  name: string
  marketSize: string
  sizeNum: number
  growth: string
  coordinates: [number, number]
}

const SUB_REGIONS: Record<string, {
  center: [number, number]
  zoom: number
  color: string
  subs: SubRegion[]
}> = {
  jp: {
    center: [138, 37],
    zoom: 5.5,
    color: "#B4975A",
    subs: [
      { name: "首都圏",     marketSize: "$980B",  sizeNum: 980, growth: "+5.4%", coordinates: [139.7, 35.7] },
      { name: "関西圏",     marketSize: "$480B",  sizeNum: 480, growth: "+4.8%", coordinates: [135.5, 34.7] },
      { name: "中部・東海", marketSize: "$340B",  sizeNum: 340, growth: "+5.1%", coordinates: [137, 35.2]   },
      { name: "九州・沖縄", marketSize: "$200B",  sizeNum: 200, growth: "+4.2%", coordinates: [131, 33]     },
    ],
  },
  us: {
    center: [-98, 39],
    zoom: 3.5,
    color: "#006FCF",
    subs: [
      { name: "West Coast",   marketSize: "$1,120B", sizeNum: 1120, growth: "+8.2%", coordinates: [-118, 34] },
      { name: "East Coast",   marketSize: "$1,280B", sizeNum: 1280, growth: "+7.4%", coordinates: [-74, 41]  },
      { name: "Midwest",      marketSize: "$620B",   sizeNum: 620,  growth: "+5.8%", coordinates: [-87, 42]  },
      { name: "South",        marketSize: "$1,180B", sizeNum: 1180, growth: "+8.9%", coordinates: [-84, 34]  },
    ],
  },
  uk: {
    center: [-2, 54],
    zoom: 6,
    color: "#9B2335",
    subs: [
      { name: "London",         marketSize: "$520B", sizeNum: 520, growth: "+4.6%", coordinates: [-0.1, 51.5] },
      { name: "South East",     marketSize: "$280B", sizeNum: 280, growth: "+3.8%", coordinates: [0.5, 51.2]  },
      { name: "Midlands",       marketSize: "$220B", sizeNum: 220, growth: "+3.5%", coordinates: [-1.9, 52.5] },
      { name: "Scotland/North", marketSize: "$180B", sizeNum: 180, growth: "+4.2%", coordinates: [-4, 56]    },
    ],
  },
  mx: {
    center: [-102, 24],
    zoom: 4,
    color: "#38A169",
    subs: [
      { name: "CDMX",      marketSize: "$240B", sizeNum: 240, growth: "+10.2%", coordinates: [-99.1, 19.4] },
      { name: "Monterrey", marketSize: "$120B", sizeNum: 120, growth: "+11.5%", coordinates: [-100.3, 25.7]},
      { name: "Guadalajara",marketSize: "$95B", sizeNum: 95,  growth: "+9.8%",  coordinates: [-103.3, 20.7]},
      { name: "Cancún",    marketSize: "$65B",  sizeNum: 65,  growth: "+12.4%", coordinates: [-87, 21.2]   },
    ],
  },
  ca: {
    center: [-106, 56],
    zoom: 3,
    color: "#805AD5",
    subs: [
      { name: "Toronto",   marketSize: "$320B", sizeNum: 320, growth: "+6.2%", coordinates: [-79.4, 43.7] },
      { name: "Vancouver", marketSize: "$180B", sizeNum: 180, growth: "+5.8%", coordinates: [-123.1, 49.3]},
      { name: "Montreal",  marketSize: "$140B", sizeNum: 140, growth: "+5.1%", coordinates: [-73.6, 45.5] },
      { name: "Calgary",   marketSize: "$80B",  sizeNum: 80,  growth: "+6.5%", coordinates: [-114.1, 51]  },
    ],
  },
}

// 国コード → 地域ID マッピング（5カ国: 日本・US・UK・メキシコ・カナダ）
const COUNTRY_TO_REGION: Record<string, string> = {
  "392": "jp",   // Japan
  "840": "us",   // United States
  "826": "uk",   // United Kingdom
  "484": "mx",   // Mexico
  "124": "ca",   // Canada
}

const GLOBAL_CONFIG = { center: [40, 45] as [number, number], zoom: 1.0 }

const MARKER_MIN = 38
const MARKER_MAX = 85
function markerRadius(sizeNum: number, min: number, max: number): number {
  return MARKER_MIN + ((sizeNum - min) / (max - min)) * (MARKER_MAX - MARKER_MIN)
}

// サブ地域用のバブルサイズ（smaller range）
const SUB_MIN = 12
const SUB_MAX = 32
function subRadius(sizeNum: number, min: number, max: number): number {
  return SUB_MIN + ((sizeNum - min) / (max - min)) * (SUB_MAX - SUB_MIN)
}

interface Props {
  regions: MapRegion[]
  selectedRegion: string | null
  onSelectRegion: (id: string | null) => void
}

export function GlobalMap({ regions, selectedRegion, onSelectRegion }: Props) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  // ドリルダウン中の地域ID（nullならグローバルビュー）
  const [drilledRegion, setDrilledRegion] = useState<string | null>(null)

  const hoveredRegionId = hoveredCountry ? COUNTRY_TO_REGION[hoveredCountry] ?? null : null
  const drillConfig = drilledRegion ? SUB_REGIONS[drilledRegion] : null
  const drilledColor = drillConfig?.color ?? "#006FCF"

  // ビュー設定
  const viewCenter = drillConfig ? drillConfig.center : GLOBAL_CONFIG.center
  const viewZoom   = drillConfig ? drillConfig.zoom   : GLOBAL_CONFIG.zoom

  function getCountryFill(numeric: string): string {
    const rid = COUNTRY_TO_REGION[numeric]
    if (!rid) return "#D1D5DB"
    if (drilledRegion) {
      // ドリルダウン中: 対象地域は色付き、それ以外は薄く
      return rid === drilledRegion ? drilledColor + "44" : "#E5E7EB"
    }
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

  function handleRegionClick(id: string) {
    // バブルクリック → ドリルダウン（SUB_REGIONSに存在する場合のみ）
    if (!SUB_REGIONS[id]) {
      console.warn(`[v0] Region "${id}" not found in SUB_REGIONS`)
      return
    }
    setDrilledRegion(id)
    onSelectRegion(id)
  }

  function handleBack() {
    setDrilledRegion(null)
    onSelectRegion(null)
  }

  // グローバルビューのバブルサイズ計算
  const globalSizes = regions.map((r) => r.sizeNum)
  const gMin = Math.min(...globalSizes)
  const gMax = Math.max(...globalSizes)

  // サブ地域バブルサイズ計算
  const subSizes = drillConfig ? drillConfig.subs.map((s) => s.sizeNum) : []
  const sMin = subSizes.length ? Math.min(...subSizes) : 0
  const sMax = subSizes.length ? Math.max(...subSizes) : 1

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-[#EFF4FB]" style={{ aspectRatio: "2/1" }}>
      {/* 戻るボタン */}
      {drilledRegion && (
        <button
          onClick={handleBack}
          className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all hover:opacity-90"
          style={{ backgroundColor: drilledColor, color: "#fff" }}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          グローバルビューへ戻る
        </button>
      )}

      {/* ドリルダウン中のラベル */}
      {drilledRegion && (
        <div
          className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-xs font-bold shadow-md"
          style={{ backgroundColor: drilledColor + "22", color: drilledColor, border: `1.5px solid ${drilledColor}` }}
        >
          {regions.find((r) => r.id === drilledRegion)?.name} — サブ市場
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 190, center: [40, 45] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={viewZoom}
          center={viewCenter}
          minZoom={1}
          maxZoom={8}
        >
          {/* 海 */}
          <rect x="-800" y="-800" width="2000" height="2000" fill="#DAE8F5" />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numeric = geo.properties.numeric
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryFill(numeric)}
                    stroke="#FFFFFF"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none", cursor: "pointer", transition: "fill 0.2s" },
                      hover:   { outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => !drilledRegion && setHoveredCountry(numeric)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => {
                      if (drilledRegion) return
                      const rid = COUNTRY_TO_REGION[numeric]
                      if (rid) handleRegionClick(rid)
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* グローバルビュー：地域バブル */}
          {!drilledRegion &&
            regions.map((r) => {
              const radius = markerRadius(r.sizeNum, gMin, gMax)
              const isSelected = selectedRegion === r.id
              const isHovered  = hoveredRegionId === r.id
              const active     = isSelected || isHovered

              return (
                <Marker
                  key={r.id}
                  coordinates={r.coordinates}
                  onClick={() => handleRegionClick(r.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* ドロップシャドウ用の下層円 */}
                  <circle
                    r={radius}
                    fill="rgba(0,0,0,0.08)"
                    style={{ pointerEvents: "none", transform: "translate(2px, 3px)" }}
                  />
                  {/* メインバブル - 白塗りつぶし */}
                  <circle
                    r={radius}
                    fill="#FFFFFF"
                    stroke={active ? r.color : "rgba(0,0,0,0.06)"}
                    strokeWidth={active ? 2 : 1}
                    style={{ transition: "all 0.2s" }}
                  />
                  {/* 緑の矢印 */}
                  <text x={radius * 0.35} y={-radius * 0.15} fontSize={radius * 0.32} fill="#10B981" textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none", fontWeight: 700 }}>↗</text>
                  {/* 市場規模テキスト - 濃紺で大きく */}
                  <text x={0} y={radius * 0.18} fontSize={radius * 0.42} fontWeight={700} fill="#1E3A5F" textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none" }}>
                    {r.marketSize}
                  </text>
                </Marker>
              )
            })
          }

          {/* ドリルダウンビュー：サブ地域バブル */}
          {drilledRegion && drillConfig &&
            drillConfig.subs.map((sub, i) => {
              const radius = subRadius(sub.sizeNum, sMin, sMax)
              return (
                <Marker key={i} coordinates={sub.coordinates} style={{ cursor: "default" }}>
                  {/* パルスリン���� */}
                  <circle r={radius + 5} fill="none" stroke={drillConfig.color} strokeWidth={1} opacity={0.35} style={{ pointerEvents: "none" }}>
                    <animate attributeName="r" from={radius + 5} to={radius + 12} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from={0.35} to={0} dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle r={radius} fill={drillConfig.color + "1A"} stroke={drillConfig.color} strokeWidth={1.8} style={{ pointerEvents: "none" }} />
                  <text x={-3} y={-radius * 0.26} fontSize={radius * 0.28} fill={drillConfig.color} textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none", fontWeight: 700 }}>↑</text>
                  {/* 市場���模 */}
                  <text x={0} y={radius * 0.05} fontSize={radius * 0.32} fontWeight={700} fill={drillConfig.color} textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none" }}>
                    {sub.marketSize}
                  </text>
                  {/* 地域名 */}
                  <text x={0} y={radius + 12} fontSize={8} fill="#374151" textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none", fontWeight: 600 }}>
                    {sub.name}
                  </text>
                  {/* 成長率 */}
                  <text x={0} y={radius + 22} fontSize={7} fill={drillConfig.color} textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none", fontWeight: 600 }}>
                    {sub.growth}
                  </text>
                </Marker>
              )
            })
          }
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
