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

// ─── パス別分析データ ─────────────────────────────────────────────────────────
const PATH_ANALYSIS: Record<string, {
  ratio: string
  score: number
  scoreLabel: string
  touchpoints: string[]
  motivations: string[]
  insight: string
  personas: { name: string; age: string; desc: string; image: string; lifestyle: string; interests: string[] }[]
}> = {
  t1: {
    ratio: "68:32",
    score: 72,
    scoreLabel: "旅行熱狂度",
    touchpoints: ["Instagram広告", "旅行メディア", "航空会社提携"],
    motivations: ["ラウンジアクセス", "マイル還元", "旅行保険"],
    insight: "「非日常への没入」を重視。価格より体験の質を優先し、SNSでのシェアも意識する傾向が強い。",
    personas: [
      { name: "山田 優子", age: "38 F", desc: "外資コンサル勤務。年間15回以上の海外出張。", image: "/images/personas/tanaka-masako.jpg", lifestyle: "ビジネスとプライベートの境界なく旅を楽しむ。", interests: ["ラウンジ", "マイル"] },
      { name: "田中 健太", age: "45 M", desc: "IT企業役員。家族との旅行を大切にする。", image: "/images/personas/sato-kenichi.jpg", lifestyle: "週末は家族でリゾートへ。", interests: ["家族旅行", "高級ホテル"] },
    ]
  },
  t2: {
    ratio: "55:45",
    score: 85,
    scoreLabel: "美食探求度",
    touchpoints: ["グルメメディア", "シェフSNS", "レストラン予約アプリ"],
    motivations: ["レストラン優先予約", "ダイニング特典", "限定イベント"],
    insight: "「食を通じた文化体験」を追求。ミシュラン星付きから隠れ家まで、体験の幅広さを求める。",
    personas: [
      { name: "佐藤 美咲", age: "42 F", desc: "食品メーカーマーケティング部長。週3回外食。", image: "/images/personas/suzuki-misaki.jpg", lifestyle: "新しいレストランの開拓が趣味。", interests: ["ワイン", "和食"] },
    ]
  },
  t5: {
    ratio: "78:22",
    score: 91,
    scoreLabel: "スポーツ熱狂度",
    touchpoints: ["F1公式", "スポーツメディア", "スタジアム広告"],
    motivations: ["VIP観戦席", "選手交流", "限定グッズ"],
    insight: "「現場での興奮」を最優先。チケット入手困難なイベントへのアクセスに価値を感じる。",
    personas: [
      { name: "鈴木 拓也", age: "35 M", desc: "金融機関勤務。年間10回以上のスポーツ観戦。", image: "/images/personas/james-carter.jpg", lifestyle: "週末はスタジアムへ。平日もスポーツニュースをチェック。", interests: ["F1", "サッカー", "ゴルフ"] },
    ]
  },
  t6: {
    ratio: "82:18",
    score: 68,
    scoreLabel: "効率重視度",
    touchpoints: ["ビジネスメディア", "空港広告", "法人提携"],
    motivations: ["経費精算の簡素化", "出張サポート", "保険の充実"],
    insight: "「時間とストレスの節約」が最重要。信頼性とサポート体制を重視する傾向。",
    personas: [
      { name: "高橋 誠", age: "52 M", desc: "商社部長。月10日以上の出張。", image: "/images/personas/william-hughes.jpg", lifestyle: "効率を最優先。空港での時間を最小化したい。", interests: ["ラウンジ", "優先搭乗"] },
    ]
  },
  p1: {
    ratio: "25:75",
    score: 95,
    scoreLabel: "プレミアム志向",
    touchpoints: ["招待制イベント", "コンシェルジュ", "パーソナル案内"],
    motivations: ["最高級の体験", "専任サポート", "限定特典"],
    insight: "「他では得られない体験」を求める。価格は二の次で、唯一無二の価値に惹かれる。",
    personas: [
      { name: "伊藤 雅彦", age: "58 M", desc: "投資会社CEO。年間利用額3000万円以上。", image: "/images/personas/michael-chen.jpg", lifestyle: "最高の体験のみを追求。", interests: ["プライベートジェット", "美術品"] },
    ]
  },
  p2: {
    ratio: "45:55",
    score: 78,
    scoreLabel: "バランス志向",
    touchpoints: ["デジタル広告", "口コミ", "比較サイト"],
    motivations: ["コスパ", "幅広い特典", "安心感"],
    insight: "「賢い選択」を意識。特典の充実度と年会費のバランスを重視する傾向。",
    personas: [
      { name: "渡辺 恵", age: "34 F", desc: "メーカー勤務。旅行とグルメが趣味。", image: "/images/personas/emily-brown.jpg", lifestyle: "賢くお得に楽しみたい。", interests: ["ポイント", "旅行"] },
    ]
  },
}

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
  const PAD = { t: 50, b: 40, l: 130, r: 20 }

  // 最も多いノード数に合わせて高さを動的計算（最低間隔 52px - コンパクト化）
  const maxNodes = Math.max(TRIBES.length, TOUCHPOINTS.length, MOTIVES.length, PATTERNS.length)
  const ROW_GAP = 52
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
              r={18}
              fill="white"
              stroke={isHighlight(n.id) ? COL_COLORS.touchpoint : "#E2E8F0"}
              strokeWidth={isHighlight(n.id) ? 2 : 1}
              style={{ transition: "all 0.2s" }}
            />
            <text
              x={n.x}
              y={n.y + 3}
              textAnchor="middle"
              fontSize={9}
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
          const cardW = 44
          const cardH = 28
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
                r={34}
                fill={isHighlight(n.id) ? n.color : "#E2E8F0"}
                fillOpacity={0.12}
                stroke={isHighlight(n.id) ? n.color : "#CBD5E1"}
                strokeWidth={isHighlight(n.id) ? 2 : 1}
                style={{ transition: "all 0.2s" }}
              />
              {/* カード画像 */}
              <defs>
                <clipPath id={`card-clip-${n.id}`}>
                  <rect x={n.x - cardW / 2} y={n.y - 16} width={cardW} height={cardH} rx={3} />
                </clipPath>
              </defs>
              <image
                href={n.image}
                x={n.x - cardW / 2}
                y={n.y - 16}
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
                y={n.y + 20}
                textAnchor="middle"
                fontSize={8}
                fontWeight={700}
                fill={isHighlight(n.id) ? n.color : "#94A3B8"}
                style={{ transition: "all 0.2s" }}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 30}
                textAnchor="middle"
                fontSize={9}
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

      {/* パス別分析セクション */}
      {activeId && PATH_ANALYSIS[activeId] && (
        <div className="border-t border-slate-100 p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左カラム: 統計とタッチポイント */}
            <div className="space-y-4">
              {/* 統計 */}
              <div className="flex gap-4">
                <div className="bg-slate-50 rounded-lg px-4 py-3 text-center">
                  <p className="text-lg font-bold text-slate-800">{PATH_ANALYSIS[activeId].ratio}</p>
                  <p className="text-[10px] text-slate-500">LM/MH</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 text-center">
                  <p className="text-lg font-bold text-[#006FCF]">{PATH_ANALYSIS[activeId].score}</p>
                  <p className="text-[10px] text-slate-500">{PATH_ANALYSIS[activeId].scoreLabel}</p>
                </div>
              </div>

              {/* タッチポイント */}
              <div>
                <p className="text-xs font-semibold text-[#006FCF] mb-2">タッチポイント</p>
                <div className="flex flex-wrap gap-1.5">
                  {PATH_ANALYSIS[activeId].touchpoints.map(tp => (
                    <span key={tp} className="px-2 py-1 bg-slate-100 rounded text-[11px] text-slate-600">{tp}</span>
                  ))}
                </div>
              </div>

              {/* 申込み動機 */}
              <div>
                <p className="text-xs font-semibold text-[#006FCF] mb-2">申込み動機</p>
                <div className="flex flex-wrap gap-1.5">
                  {PATH_ANALYSIS[activeId].motivations.map(m => (
                    <span key={m} className="px-2 py-1 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-700">{m}</span>
                  ))}
                </div>
              </div>

              {/* AIインサイト */}
              <div className="bg-slate-50 rounded-lg p-3 border-l-2 border-[#006FCF]">
                <p className="text-[11px] text-slate-600 leading-relaxed">{PATH_ANALYSIS[activeId].insight}</p>
              </div>
            </div>

            {/* 右カラム: ペルソナプロフィール */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#006FCF]" />
                <p className="text-xs font-semibold text-slate-700">AIペルソナプロフィール</p>
                <span className="text-[10px] text-slate-400">— このパターンの代表的な顧客像</span>
              </div>

              {/* ペルソナ選択タブ */}
              <div className="flex gap-2 mb-4">
                {PATH_ANALYSIS[activeId].personas.map((p, i) => (
                  <button
                    key={p.name}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                      i === 0
                        ? "bg-[#006FCF] text-white border-[#006FCF]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#006FCF]"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    {p.name}・{p.age}
                  </button>
                ))}
              </div>

              {/* ペルソナ詳細 */}
              {PATH_ANALYSIS[activeId].personas[0] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* プロフィール */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={PATH_ANALYSIS[activeId].personas[0].image}
                        alt={PATH_ANALYSIS[activeId].personas[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{PATH_ANALYSIS[activeId].personas[0].name}</p>
                      <p className="text-xs text-slate-500">{PATH_ANALYSIS[activeId].personas[0].age}</p>
                      <p className="text-xs text-slate-600 mt-1">{PATH_ANALYSIS[activeId].personas[0].desc}</p>
                    </div>
                  </div>

                  {/* 詳細情報 */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-1">
                        <span className="text-sm">&#128100;</span> ライフスタイル
                      </p>
                      <p className="text-xs text-slate-600">{PATH_ANALYSIS[activeId].personas[0].lifestyle}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-1">
                        <span className="text-sm">&#10084;</span> 関心事
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {PATH_ANALYSIS[activeId].personas[0].interests.map(i => (
                          <span key={i} className="px-2 py-0.5 bg-rose-50 border border-rose-200 rounded text-[10px] text-rose-600">{i}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
