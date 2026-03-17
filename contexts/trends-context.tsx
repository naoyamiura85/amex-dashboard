"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"

export type TrendStatus = "Growing" | "Stable" | "Emerging" | "Declining"
export type ResearchStatus = "queued" | "researching" | "completed" | "failed"

export interface Trend {
  id: string
  name: string
  category: string
  categoryLabel: string
  socialShare: string
  yoyGrowth: string
  growthType: "up" | "down"
  status: TrendStatus
  mentions: string
  description: string
  popularityScore: number
  imageUrl?: string
  researchStatus?: ResearchStatus
  researchProgress?: number
  createdAt?: Date
  researchData?: {
    summary?: string
    popularIngredients?: { name: string; share: string; growth: string }[]
    trendingIngredients?: { name: string; growth: string }[]
    demographics?: { age: string; percentage: number }[]
    regions?: { name: string; percentage: number }[]
  }
}

interface TrendsContextType {
  trends: Trend[]
  researchQueue: Trend[]
  addTrend: (trend: Omit<Trend, "id" | "researchStatus" | "researchProgress" | "createdAt">) => void
  removeTrend: (id: string) => void
  getTrendById: (id: string) => Trend | undefined
  isResearching: boolean
}

const TrendsContext = createContext<TrendsContextType | undefined>(undefined)

// Initial trends data
const initialTrends: Trend[] = [
  // Cosmetics
  {
    id: "retinol-serum",
    name: "レチノール美容液",
    category: "cosmetics",
    categoryLabel: "化粧品",
    socialShare: "0.8%",
    yoyGrowth: "+112%",
    growthType: "up",
    status: "Growing",
    mentions: "210K",
    description: "エイジングケア成分として急成長中。敏感肌向け低刺激処方が人気。",
    popularityScore: 85,
    imageUrl: "/images/retinol-serum.jpg",
    researchStatus: "completed",
    researchData: {
      summary: "レチノール美容液は2024年に急成長したスキンケアトレンドです。特に20-40代女性の間でエイジングケア意識の高まりとともに需要が拡大しています。",
      popularIngredients: [
        { name: "バクチオール", share: "15%", growth: "+142%" },
        { name: "レチナール", share: "12%", growth: "+108%" },
        { name: "エクトイン", share: "6.9%", growth: "+100%" },
        { name: "CICA", share: "5.7%", growth: "+80%" },
        { name: "グルタチオン", share: "4.9%", growth: "+78%" },
      ],
      trendingIngredients: [
        { name: "バクチオール", growth: "+142%" },
        { name: "レチナール", growth: "+108%" },
        { name: "エクトイン", growth: "+100%" },
        { name: "CICA", growth: "+80%" },
        { name: "グルタチオン", growth: "+78%" },
      ],
      demographics: [
        { age: "20-29歳", percentage: 25 },
        { age: "30-39歳", percentage: 35 },
        { age: "40-49歳", percentage: 28 },
        { age: "50歳以上", percentage: 12 },
      ],
      regions: [
        { name: "関東", percentage: 42 },
        { name: "関西", percentage: 28 },
        { name: "中部", percentage: 15 },
        { name: "その他", percentage: 15 },
      ],
    },
  },
  {
    id: "cica-cream",
    name: "シカクリーム",
    category: "cosmetics",
    categoryLabel: "化粧品",
    socialShare: "1.2%",
    yoyGrowth: "+89%",
    growthType: "up",
    status: "Growing",
    mentions: "320K",
    description: "韓国発の肌鎮静成分。敏感肌・ニキビケアに特化。",
    popularityScore: 92,
    imageUrl: "/images/cica-cream.jpg",
    researchStatus: "completed",
  },
  {
    id: "ceramide-moisturizer",
    name: "セラミド保湿",
    category: "cosmetics",
    categoryLabel: "化粧品",
    socialShare: "0.9%",
    yoyGrowth: "+34%",
    growthType: "up",
    status: "Stable",
    mentions: "185K",
    description: "バリア機能強化成分。乾燥肌対策として定着。",
    popularityScore: 79,
    imageUrl: "/images/ceramide-moisturizer.jpg",
    researchStatus: "completed",
  },
  // Food
  {
    id: "protein-bar",
    name: "プロテインバー",
    category: "food",
    categoryLabel: "食品",
    socialShare: "2.1%",
    yoyGrowth: "+67%",
    growthType: "up",
    status: "Growing",
    mentions: "450K",
    description: "手軽な高タンパク補給。フレーバー多様化が進む。",
    popularityScore: 88,
    imageUrl: "/images/protein-bar.jpg",
    researchStatus: "completed",
  },
  {
    id: "fermented-food",
    name: "発酵食品",
    category: "food",
    categoryLabel: "食品",
    socialShare: "1.8%",
    yoyGrowth: "-5%",
    growthType: "down",
    status: "Declining",
    mentions: "340K",
    description: "腸活ブームは一服。定番化フェーズへ移行。",
    popularityScore: 65,
    imageUrl: "/images/fermented-food.jpg",
    researchStatus: "completed",
  },
  {
    id: "complete-nutrition-food",
    name: "完全栄養食",
    category: "food",
    categoryLabel: "食品",
    socialShare: "1.3%",
    yoyGrowth: "+95%",
    growthType: "up",
    status: "Growing",
    mentions: "180K",
    description: "1食で必要な栄養素を摂取。忙しい現代人に人気。",
    popularityScore: 82,
    imageUrl: "/images/complete-nutrition-food.jpg",
    researchStatus: "completed",
  },
  {
    id: "plant-based-meat",
    name: "プラントベースミート",
    category: "food",
    categoryLabel: "食品",
    socialShare: "0.9%",
    yoyGrowth: "+42%",
    growthType: "up",
    status: "Stable",
    mentions: "150K",
    description: "環境配慮型の代替肉。食感・味の改良が進む。",
    popularityScore: 71,
    imageUrl: "/images/plant-based-meat.jpg",
    researchStatus: "completed",
  },
  // Beverage
  {
    id: "oat-milk",
    name: "オーツミルク",
    category: "beverage",
    categoryLabel: "飲料",
    socialShare: "1.5%",
    yoyGrowth: "+45%",
    growthType: "up",
    status: "Stable",
    mentions: "280K",
    description: "植物性ミルクの新定番。カフェでの採用拡大。",
    popularityScore: 76,
    imageUrl: "/images/oat-milk.jpg",
    researchStatus: "completed",
  },
  {
    id: "kombucha",
    name: "コンブチャ",
    category: "beverage",
    categoryLabel: "飲料",
    socialShare: "0.7%",
    yoyGrowth: "+58%",
    growthType: "up",
    status: "Growing",
    mentions: "120K",
    description: "発酵茶飲料。腸活・美容目的で20-30代女性に人気。",
    popularityScore: 74,
    imageUrl: "/images/kombucha.jpg",
    researchStatus: "completed",
  },
  {
    id: "functional-water",
    name: "機能性ウォーター",
    category: "beverage",
    categoryLabel: "飲料",
    socialShare: "1.1%",
    yoyGrowth: "+32%",
    growthType: "up",
    status: "Stable",
    mentions: "200K",
    description: "ビタミン・ミネラル配合水。スポーツ・美容シーンで需要増。",
    popularityScore: 68,
    imageUrl: "/images/functional-water.jpg",
    researchStatus: "completed",
  },
  // Supplement
  {
    id: "cbd-supplement",
    name: "CBDサプリ",
    category: "supplement",
    categoryLabel: "サプリメント",
    socialShare: "0.4%",
    yoyGrowth: "+156%",
    growthType: "up",
    status: "Emerging",
    mentions: "95K",
    description: "リラックス・睡眠改善目的で注目。規制緩和の動きも。",
    popularityScore: 72,
    imageUrl: "/images/cbd-supplement.jpg",
    researchStatus: "completed",
  },
  {
    id: "magnesium-supplement",
    name: "マグネシウムサプリ",
    category: "supplement",
    categoryLabel: "サプリメント",
    socialShare: "0.6%",
    yoyGrowth: "+78%",
    growthType: "up",
    status: "Growing",
    mentions: "120K",
    description: "睡眠・ストレス対策で注目。グリシネート形態が人気。",
    popularityScore: 81,
    imageUrl: "/images/magnesium-supplement.jpg",
    researchStatus: "completed",
  },
  {
    id: "nmn-supplement",
    name: "NMNサプリ",
    category: "supplement",
    categoryLabel: "サプリメント",
    socialShare: "0.5%",
    yoyGrowth: "+210%",
    growthType: "up",
    status: "Emerging",
    mentions: "85K",
    description: "アンチエイジング成分。NAD+前駆体として注目。",
    popularityScore: 78,
    imageUrl: "/images/nmn-supplement.jpg",
    researchStatus: "completed",
  },
  // Toiletry
  {
    id: "solid-shampoo",
    name: "固形シャンプー",
    category: "toiletry",
    categoryLabel: "トイレタリー",
    socialShare: "0.4%",
    yoyGrowth: "+125%",
    growthType: "up",
    status: "Emerging",
    mentions: "75K",
    description: "脱プラスチック。旅行・エコ志向層に支持拡大。",
    popularityScore: 69,
    imageUrl: "/images/solid-shampoo.jpg",
    researchStatus: "completed",
  },
  {
    id: "enzyme-toothpaste",
    name: "酵素歯磨き",
    category: "toiletry",
    categoryLabel: "トイレタリー",
    socialShare: "0.6%",
    yoyGrowth: "+48%",
    growthType: "up",
    status: "Growing",
    mentions: "110K",
    description: "口腔ケア意識の高まり。ホワイトニング効果も訴求。",
    popularityScore: 73,
    imageUrl: "/images/enzyme-toothpaste.jpg",
    researchStatus: "completed",
  },
  // Wellness
  {
    id: "sleep-tech",
    name: "スリープテック",
    category: "wellness",
    categoryLabel: "ウェルネス",
    socialShare: "0.8%",
    yoyGrowth: "+88%",
    growthType: "up",
    status: "Growing",
    mentions: "140K",
    description: "睡眠の質向上デバイス・アプリ。睡眠負債解消ニーズ。",
    popularityScore: 84,
    imageUrl: "/images/sleep-tech.jpg",
    researchStatus: "completed",
  },
  {
    id: "mindfulness-app",
    name: "マインドフルネスアプリ",
    category: "wellness",
    categoryLabel: "ウェルネス",
    socialShare: "0.7%",
    yoyGrowth: "+52%",
    growthType: "up",
    status: "Stable",
    mentions: "130K",
    description: "瞑想・ストレス管理。企業の福利厚生導入も増加。",
    popularityScore: 77,
    imageUrl: "/images/mindfulness-app.jpg",
    researchStatus: "completed",
  },
]

export function TrendsProvider({ children }: { children: ReactNode }) {
  const [trends, setTrends] = useState<Trend[]>(initialTrends)
  const [researchQueue, setResearchQueue] = useState<Trend[]>([])
  const [isResearching, setIsResearching] = useState(false)

  // Process research queue
  useEffect(() => {
    if (researchQueue.length === 0 || isResearching) return

    const processResearch = async () => {
      setIsResearching(true)
      const currentTrend = researchQueue[0]

      // Update status to researching
      setTrends(prev => prev.map(t => 
        t.id === currentTrend.id 
          ? { ...t, researchStatus: "researching" as ResearchStatus, researchProgress: 0 }
          : t
      ))

      // Simulate research progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setTrends(prev => prev.map(t => 
          t.id === currentTrend.id 
            ? { ...t, researchProgress: progress }
            : t
        ))
      }

      // Complete research with mock data
      const mockResearchData = {
        summary: `${currentTrend.name}は注目の${currentTrend.categoryLabel}トレンドです。SNSでの言及が増加しており、消費者の関心が高まっています。`,
        popularIngredients: [
          { name: "成分A", share: "15%", growth: "+120%" },
          { name: "成分B", share: "12%", growth: "+95%" },
          { name: "成分C", share: "8%", growth: "+78%" },
          { name: "成分D", share: "6%", growth: "+65%" },
          { name: "成分E", share: "5%", growth: "+52%" },
        ],
        trendingIngredients: [
          { name: "新成分1", growth: "+180%" },
          { name: "新成分2", growth: "+145%" },
          { name: "新成分3", growth: "+120%" },
          { name: "新成分4", growth: "+98%" },
          { name: "新成分5", growth: "+85%" },
        ],
        demographics: [
          { age: "20-29歳", percentage: 30 },
          { age: "30-39歳", percentage: 35 },
          { age: "40-49歳", percentage: 25 },
          { age: "50歳以上", percentage: 10 },
        ],
        regions: [
          { name: "関東", percentage: 40 },
          { name: "関西", percentage: 30 },
          { name: "中部", percentage: 18 },
          { name: "その他", percentage: 12 },
        ],
      }

      setTrends(prev => prev.map(t => 
        t.id === currentTrend.id 
          ? { 
              ...t, 
              researchStatus: "completed" as ResearchStatus, 
              researchProgress: 100,
              researchData: mockResearchData 
            }
          : t
      ))

      // Remove from queue
      setResearchQueue(prev => prev.slice(1))
      setIsResearching(false)
    }

    processResearch()
  }, [researchQueue, isResearching])

  const addTrend = useCallback((newTrend: Omit<Trend, "id" | "researchStatus" | "researchProgress" | "createdAt">) => {
    const id = `trend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const trend: Trend = {
      ...newTrend,
      id,
      researchStatus: "queued",
      researchProgress: 0,
      createdAt: new Date(),
    }
    
    setTrends(prev => [trend, ...prev])
    setResearchQueue(prev => [...prev, trend])
  }, [])

  const removeTrend = useCallback((id: string) => {
    setTrends(prev => prev.filter(t => t.id !== id))
    setResearchQueue(prev => prev.filter(t => t.id !== id))
  }, [])

  const getTrendById = useCallback((id: string) => {
    return trends.find(t => t.id === id)
  }, [trends])

  return (
    <TrendsContext.Provider value={{ 
      trends, 
      researchQueue, 
      addTrend, 
      removeTrend, 
      getTrendById,
      isResearching 
    }}>
      {children}
    </TrendsContext.Provider>
  )
}

export function useTrends() {
  const context = useContext(TrendsContext)
  if (context === undefined) {
    throw new Error("useTrends must be used within a TrendsProvider")
  }
  return context
}
