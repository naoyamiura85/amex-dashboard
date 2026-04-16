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
  na: {
    center: [-100, 48],
    zoom: 3.2,
    color: "#006FCF",
    subs: [
      { name: "US West",   marketSize: "$1,120B", sizeNum: 1120, growth: "+6.2%", coordinates: [-118, 37] },
      { name: "US East",   marketSize: "$550B",   sizeNum: 550,  growth: "+4.8%", coordinates: [-76, 40]  },
      { name: "Mexico",    marketSize: "$620B",   sizeNum: 620,  growth: "+7.1%", coordinates: [-102, 24] },
      { name: "Canada",    marketSize: "$450B",   sizeNum: 450,  growth: "+5.5%", coordinates: [-96, 56]  },
    ],
  },
  eu: {
    center: [15, 52],
    zoom: 4,
    color: "#38A169",
    subs: [
      { name: "UK",          marketSize: "$820B", sizeNum: 820, growth: "+4.1%", coordinates: [-2, 54]  },
      { name: "DACH",        marketSize: "$740B", sizeNum: 740, growth: "+4.9%", coordinates: [13, 48]  },
      { name: "France",      marketSize: "$610B", sizeNum: 610, growth: "+5.3%", coordinates: [2, 46]   },
      { name: "South EU",    marketSize: "$490B", sizeNum: 490, growth: "+6.0%", coordinates: [13, 40]  },
      { name: "Nordic/East", marketSize: "$370B", sizeNum: 370, growth: "+5.8%", coordinates: [22, 58]  },
    ],
  },
  sa: {
    center: [-58, -15],
    zoom: 2.8,
    color: "#9B2335",
    subs: [
      { name: "Brazil",    marketSize: "$480B", sizeNum: 480, growth: "+9.4%", coordinates: [-51, -14] },
      { name: "Argentina", marketSize: "$290B", sizeNum: 290, growth: "+8.1%", coordinates: [-64, -34] },
      { name: "Chile",     marketSize: "$200B", sizeNum: 200, growth: "+7.6%", coordinates: [-71, -33] },
      { name: "Colombia",  marketSize: "$230B", sizeNum: 230, growth: "+8.8%", coordinates: [-74, 4]   },
    ],
  },
  jp: {
    center: [138, 37],
    zoom: 5.5,
    color: "#B4975A",
    subs: [
      { name: "首都圏",   marketSize: "$980B",  sizeNum: 980, growth: "+5.4%", coordinates: [139, 35] },
      { name: "関西圏",   marketSize: "$480B",  sizeNum: 480, growth: "+4.8%", coordinates: [135, 35] },
      { name: "中部・九州", marketSize: "$340B", sizeNum: 340, growth: "+5.1%", coordinates: [130, 33] },
      { name: "地方都市", marketSize: "$200B",  sizeNum: 200, growth: "+4.2%", coordinates: [141, 43] },
    ],
  },
  oc: {
    center: [134, -27],
    zoom: 2.5,
    color: "#805AD5",
    subs: [
      { name: "Sydney",    marketSize: "$420B", sizeNum: 420, growth: "+9.2%", coordinates: [151, -34] },
      { name: "Melbourne", marketSize: "$360B", sizeNum: 360, growth: "+8.6%", coordinates: [145, -38] },
      { name: "NZ",        marketSize: "$180B", sizeNum: 180, growth: "+8.9%", coordinates: [174, -41] },
      { name: "Pacific",   marketSize: "$240B", sizeNum: 240, growth: "+9.6%", coordinates: [160, -22] },
    ],
  },
}

// 国コード → 地域ID マッピング
const COUNTRY_TO_REGION: Record<string, string> = {
  "840": "na", "124": "na", "484": "na",
  "276": "eu", "250": "eu", "380": "eu", "724": "eu", "528": "eu",
  "752": "eu", "756": "eu", "616": "eu", "203": "eu", "040": "eu",
  "056": "eu", "620": "eu", "372": "eu", "208": "eu", "246": "eu",
  "578": "eu", "348": "eu", "703": "eu", "705": "eu", "191": "eu",
  "100": "eu", "642": "eu", "300": "eu", "826": "eu",
  "392": "jp",
  "076": "sa", "032": "sa", "152": "sa", "170": "sa", "604": "sa",
  "218": "sa", "858": "sa", "591": "sa", "600": "sa", "068": "sa",
  "862": "sa", "328": "sa", "740": "sa", "780": "sa",
  "036": "oc", "554": "oc", "598": "oc",
}

const GLOBAL_CONFIG = { center: [0, 25] as [number, number], zoom: 1.0 }

const MARKER_MIN = 38
const MARKER_MAX = 85
function markerRadius(sizeNum: number, min: number, max: number): number {
  return MARKER_MIN + ((sizeNum - min) / (max - min)) * (MARKER_MAX - MARKER_MIN)
}

// サブ地域用のバブルサイズ（smaller range）
const SUB_MIN = 18
const SUB_MAX = 46
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
    // バブルクリック → ドリルダウン
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
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 125, center: [0, 25], rotate: [-150, 0, 0] }}
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
                  {/* パルスリング */}
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
