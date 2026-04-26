"use client"

import { useState, useRef, useEffect, useCallback } from "react"

// ─── データ定義 ───────────────────────────────────────────────────────────────

const TRIBES = [
  { id: "t1", label: "プレミアム旅行派" },
  { id: "t2", label: "美食探求派" },
  { id: "t3", label: "ラグジュアリー派" },
  { id: "t4", label: "エンタメ愛好派" },
  { id: "t5", label: "スポーツ好き派" },
  { id: "t6", label: "ビジネス重視派" },
  { id: "t7", label: "ウェルネス派" },
  { id: "t8", label: "テクノロジー派" },
]

const TOUCHPOINTS = [
  { id: "tp1", label: "Social" },
  { id: "tp2", label: "CTV" },
  { id: "tp3", label: "OLV" },
  { id: "tp4", label: "OOH" },
  { id: "tp5", label: "TV" },
  { id: "tp6", label: "Audio" },
  { id: "tp7", label: "Display" },
  { id: "tp8", label: "Fuji-Rock" },
  { id: "tp9", label: "F1" },
]

const MOTIVES = [
  { id: "m1", label: "ステータス・優越感" },
  { id: "m2", label: "利便性・効率" },
  { id: "m3", label: "特別な体験" },
  { id: "m4", label: "ポイント・特典" },
  { id: "m5", label: "ブランドへの信頼" },
  { id: "m6", label: "品質・安心感" },
]

const PATTERNS = [
  { id: "p1", label: "プラチナ申込", count: "3.2万人", color: "#006FCF", image: "/images/cards/amex-platinum.png" },
  { id: "p2", label: "ゴールド申込", count: "8.7万人", color: "#B4975A", image: "/images/cards/amex-gold.png" },
  { id: "p3", label: "グリーン申込", count: "20.1万人", color: "#38A169", image: "/images/cards/amex-green.png" },
]

// 接続データ（from → to）
const EDGES: { from: string; to: string; weight: number }[] = [
  // Tribe → Touchpoint
  { from: "t1", to: "tp1", weight: 3 }, { from: "t1", to: "tp2", weight: 2 }, { from: "t1", to: "tp9", weight: 4 },
  { from: "t2", to: "tp1", weight: 2 }, { from: "t2", to: "tp3", weight: 3 }, { from: "t2", to: "tp8", weight: 2 },
  { from: "t3", to: "tp2", weight: 3 }, { from: "t3", to: "tp4", weight: 2 }, { from: "t3", to: "tp9", weight: 3 },
  { from: "t4", to: "tp1", weight: 4 }, { from: "t4", to: "tp3", weight: 2 }, { from: "t4", to: "tp8", weight: 3 },
  { from: "t5", to: "tp4", weight: 3 }, { from: "t5", to: "tp5", weight: 2 }, { from: "t5", to: "tp9", weight: 4 },
  { from: "t6", to: "tp2", weight: 2 }, { from: "t6", to: "tp5", weight: 3 }, { from: "t6", to: "tp6", weight: 2 },
  { from: "t7", to: "tp1", weight: 2 }, { from: "t7", to: "tp6", weight: 3 }, { from: "t7", to: "tp7", weight: 2 },
  { from: "t8", to: "tp1", weight: 3 }, { from: "t8", to: "tp3", weight: 4 }, { from: "t8", to: "tp7", weight: 3 },
  // Touchpoint → Motive
  { from: "tp1", to: "m1", weight: 2 }, { from: "tp1", to: "m3", weight: 3 }, { from: "tp1", to: "m4", weight: 2 },
  { from: "tp2", to: "m1", weight: 3 }, { from: "tp2", to: "m5", weight: 2 }, { from: "tp2", to: "m2", weight: 2 },
  { from: "tp3", to: "m3", weight: 3 }, { from: "tp3", to: "m4", weight: 2 }, { from: "tp3", to: "m6", weight: 2 },
  { from: "tp4", to: "m1", weight: 2 }, { from: "tp4", to: "m2", weight: 2 }, { from: "tp4", to: "m3", weight: 3 },
  { from: "tp5", to: "m5", weight: 3 }, { from: "tp5", to: "m6", weight: 2 }, { from: "tp5", to: "m2", weight: 2 },
  { from: "tp6", to: "m3", weight: 2 }, { from: "tp6", to: "m6", weight: 3 }, { from: "tp6", to: "m4", weight: 2 },
  { from: "tp7", to: "m2", weight: 3 }, { from: "tp7", to: "m4", weight: 3 }, { from: "tp7", to: "m6", weight: 2 },
  { from: "tp8", to: "m1", weight: 2 }, { from: "tp8", to: "m3", weight: 4 }, { from: "tp8", to: "m5", weight: 2 },
  { from: "tp9", to: "m1", weight: 4 }, { from: "tp9", to: "m3", weight: 3 }, { from: "tp9", to: "m5", weight: 2 },
  // Motive → Pattern
  { from: "m1", to: "p1", weight: 4 }, { from: "m1", to: "p2", weight: 2 },
  { from: "m2", to: "p2", weight: 3 }, { from: "m2", to: "p3", weight: 3 },
  { from: "m3", to: "p1", weight: 3 }, { from: "m3", to: "p2", weight: 3 },
  { from: "m4", to: "p2", weight: 2 }, { from: "m4", to: "p3", weight: 4 },
  { from: "m5", to: "p1", weight: 2 }, { from: "m5", to: "p2", weight: 3 },
  { from: "m6", to: "p2", weight: 3 }, { from: "m6", to: "p3", weight: 2 },
]

// ─── カラー ────────────────────────────────────────────────────────────────────
const COL_COLORS = {
  tribe:      "#006FCF",
  touchpoint: "#0EA5E9",
  motive:     "#38BDF8",
  pattern:    "#0F172A",
}

// ─── ユーティリティ ─────────────────────────────────────────────────────────────

function getConnectedIds(activeId: string | null): Set<string> {
  if (!activeId) return new Set()
  const connected = new Set<string>([activeId])
  EDGES.forEach(e => {
    if (e.from === activeId) connected.add(e.to)
    if (e.to === activeId)   connected.add(e.from)
  })
  // 2ホップ
  const firstHop = new Set(connected)
  EDGES.forEach(e => {
    if (firstHop.has(e.from)) connected.add(e.to)
    if (firstHop.has(e.to))   connected.add(e.from)
  })
  return connected
}

// ─── メインコンポーネント ──────────────────────────────────────────────────────

export function ExperienceFlow() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dims, setDims] = useState({ w: 1100 })

  useEffect(() => {
    const el = svgRef.current?.parentElement
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect
      setDims({ w: Math.max(900, width) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w } = dims
  const PAD = { t: 60, b: 60, l: 130, r: 20 }

  // 最も多いノード数に合わせて高さを動的計算（最低間隔 72px）
  const maxNodes = Math.max(TRIBES.length, TOUCHPOINTS.length, MOTIVES.length, PATTERNS.length)
  const ROW_GAP = 72
  const h = PAD.t + PAD.b + maxNodes * ROW_GAP
  const innerH = h - PAD.t - PAD.b

  // 列 X 位置
  const usableW = w - PAD.l - PAD.r
  const colX = {
    tribe:      PAD.l + usableW * 0.00,
    touchpoint: PAD.l + usableW * 0.30,
    motive:     PAD.l + usableW * 0.60,
    pattern:    PAD.l + usableW * 0.88,
  }

  // ノードの Y 位置を計算（列ごとに innerH を均等分割）
  function nodePositions<T extends { id: string }>(nodes: T[], x: number) {
    const count = nodes.length
    return nodes.map((n, i) => ({
      ...n,
      x,
      y: PAD.t + (innerH / (count + 1)) * (i + 1),
    }))
  }

  const tribeNodes      = nodePositions(TRIBES,      colX.tribe)
  const touchpointNodes = nodePositions(TOUCHPOINTS, colX.touchpoint)
  const motiveNodes     = nodePositions(MOTIVES,     colX.motive)
  const patternNodes    = nodePositions(PATTERNS,    colX.pattern)

  const allNodes = [
    ...tribeNodes.map(n => ({ ...n, col: "tribe" as const })),
    ...touchpointNodes.map(n => ({ ...n, col: "touchpoint" as const })),
    ...motiveNodes.map(n => ({ ...n, col: "motive" as const })),
    ...patternNodes.map(n => ({ ...n, col: "pattern" as const })),
  ]

  const nodeMap = new Map(allNodes.map(n => [n.id, n]))
  const connected = getConnectedIds(activeId)
  const isHighlight = (id: string) => !activeId || connected.has(id)
  const isEdgeActive = (e: typeof EDGES[number]) =>
    !activeId || (connected.has(e.from) && connected.has(e.to))

  // ベジェカーブ生成
  function makePath(fromId: string, toId: string) {
    const a = nodeMap.get(fromId)
    const b = nodeMap.get(toId)
    if (!a || !b) return ""
    const mx = (a.x + b.x) / 2
    return `M ${a.x + 6} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x - 6} ${b.y}`
  }

  const handleClick = useCallback((id: string) => {
    setActiveId(prev => prev === id ? null : id)
  }, [])

  return (
      <div className="w-full rounded-xl bg-white border border-slate-100 overflow-visible select-none">
      {/* 凡例 */}
      <div className="flex items-center gap-6 px-5 py-3 border-b border-slate-100 text-xs text-slate-500">
        {[
          { label: "Tribe",        color: COL_COLORS.tribe },
          { label: "ブランド接点", color: COL_COLORS.touchpoint },
          { label: "申込み動機",       color: COL_COLORS.motive },
          { label: "パターン",       color: COL_COLORS.pattern },
        ].map(l => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-slate-400">ノードをクリックしてパスをフィルター</span>
      </div>

      {/* SVG */}
      <svg
        ref={svgRef}
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full"
        style={{ fontFamily: "inherit" }}
      >
        {/* 列ヘッダー */}
        {[
          { label: "Tribe",        x: colX.tribe,      anchor: "end"    },
          { label: "ブランド接点", x: colX.touchpoint, anchor: "middle" },
          { label: "申込み動機",       x: colX.motive,     anchor: "middle" },
          { label: "パターン",       x: colX.pattern,    anchor: "middle" },
        ].map(col => (
          <text
            key={col.label}
            x={col.x}
            y={PAD.t - 20}
            textAnchor={col.anchor as "end" | "middle" | "start"}
            fontSize={11}
            fill="#64748B"
            fontWeight={600}
            letterSpacing={1}
          >
            {col.label}
          </text>
        ))}

        {/* エッジ */}
        {EDGES.map((e, i) => (
          <path
            key={i}
            d={makePath(e.from, e.to)}
            fill="none"
            stroke={isEdgeActive(e) ? "#0EA5E9" : "#E2E8F0"}
            strokeWidth={isEdgeActive(e) ? Math.max(1, e.weight * 0.8) : 0.8}
            strokeOpacity={isEdgeActive(e) ? (activeId ? 0.7 : 0.3) : 0.15}
            style={{ transition: "all 0.25s ease" }}
          />
        ))}

        {/* Tribe ノード */}
        {tribeNodes.map(n => (
          <g
            key={n.id}
            onClick={() => handleClick(n.id)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={7}
              fill={isHighlight(n.id) ? COL_COLORS.tribe : "#CBD5E1"}
              style={{ transition: "all 0.2s" }}
            />
            <text
              x={n.x - 14}
              y={n.y + 4}
              textAnchor="end"
              fontSize={11}
              fill={isHighlight(n.id) ? "#1E293B" : "#94A3B8"}
              style={{ transition: "all 0.2s" }}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* ブランド接点 ノード */}
        {touchpointNodes.map(n => (
          <g
            key={n.id}
            onClick={() => handleClick(n.id)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={22}
              fill="white"
              stroke={isHighlight(n.id) ? COL_COLORS.touchpoint : "#E2E8F0"}
              strokeWidth={isHighlight(n.id) ? 2 : 1}
              style={{ transition: "all 0.2s" }}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontSize={10}
              fontWeight={600}
              fill={isHighlight(n.id) ? COL_COLORS.touchpoint : "#94A3B8"}
              style={{ transition: "all 0.2s" }}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* 申込み動機 ノード */}
        {motiveNodes.map(n => (
          <g
            key={n.id}
            onClick={() => handleClick(n.id)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={7}
              fill={isHighlight(n.id) ? COL_COLORS.motive : "#CBD5E1"}
              style={{ transition: "all 0.2s" }}
            />
            <text
              x={n.x + 14}
              y={n.y + 4}
              textAnchor="start"
              fontSize={11}
              fill={isHighlight(n.id) ? "#1E293B" : "#94A3B8"}
              style={{ transition: "all 0.2s" }}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* パターン ノード（カード画像付き） */}
        {patternNodes.map(n => {
          const cardW = 54
          const cardH = 34
          return (
            <g
              key={n.id}
              onClick={() => handleClick(n.id)}
              style={{ cursor: "pointer" }}
            >
              {/* 背景円 */}
              <circle
                cx={n.x}
                cy={n.y}
                r={42}
                fill={isHighlight(n.id) ? n.color : "#E2E8F0"}
                fillOpacity={0.12}
                stroke={isHighlight(n.id) ? n.color : "#CBD5E1"}
                strokeWidth={isHighlight(n.id) ? 2 : 1}
                style={{ transition: "all 0.2s" }}
              />
              {/* カード画像 */}
              <defs>
                <clipPath id={`card-clip-${n.id}`}>
                  <rect x={n.x - cardW / 2} y={n.y - 20} width={cardW} height={cardH} rx={4} />
                </clipPath>
              </defs>
              <image
                href={n.image}
                x={n.x - cardW / 2}
                y={n.y - 20}
                width={cardW}
                height={cardH}
                clipPath={`url(#card-clip-${n.id})`}
                style={{
                  transition: "opacity 0.2s",
                  opacity: isHighlight(n.id) ? 1 : 0.4,
                }}
              />
              {/* ラベルと人数 */}
              <text
                x={n.x}
                y={n.y + 24}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={isHighlight(n.id) ? n.color : "#94A3B8"}
                style={{ transition: "all 0.2s" }}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 36}
                textAnchor="middle"
                fontSize={10}
                fontWeight={800}
                fill={isHighlight(n.id) ? n.color : "#94A3B8"}
                style={{ transition: "all 0.2s" }}
              >
                {n.count}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
