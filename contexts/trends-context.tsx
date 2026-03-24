"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from "react"
import { initialTrends, generateMockResearchData } from "@/data/trends-data"

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
  relatedProducts?: { name: string; image: string }[]
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

export function TrendsProvider({ children }: { children: ReactNode }) {
  const [trends, setTrends] = useState<Trend[]>(() => initialTrends)
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
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setTrends(prev => prev.map(t => 
          t.id === currentTrend.id 
            ? { ...t, researchProgress: progress }
            : t
        ))
      }

      // Complete research with mock data
      const mockResearchData = generateMockResearchData(currentTrend.name, currentTrend.categoryLabel)

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

  const value = useMemo(() => ({
    trends,
    researchQueue,
    addTrend,
    removeTrend,
    getTrendById,
    isResearching
  }), [trends, researchQueue, addTrend, removeTrend, getTrendById, isResearching])

  return (
    <TrendsContext.Provider value={value}>
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
