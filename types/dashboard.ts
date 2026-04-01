import type { LucideIcon } from "lucide-react"

// ペルソナ型
export interface Persona {
  name: string
  age: number
  gender: string
  occupation: string
  image: string
  segment?: string
  tags?: string[]
  behavior?: string
  dropReason?: string
}

// ファネルステージ型
export interface FunnelStage {
  id: string
  name: string
  color: string
  icon: LucideIcon
  count?: number
}

// 商品型
export interface Product {
  id: string
  name: string
  category: string
  image: string
  basePrice: number
}

// 素材型
export interface Material {
  id: string
  name: string
  nameEn: string
  category: string
  tags: string[]
  dna: string[] // 商品DNA感情ファクター
}

// 素材オプション型（シミュレーター用）
export interface MaterialOption {
  id: string
  name: string
  cost: number
  effects: {
    lm: number
    mh: number
    purchase: number
    regular: number
  }
}

// キャンペーンオプション型
export interface CampaignOption {
  id: string
  name: string
  cost: number
  effects: {
    lm: number
    mh: number
    purchase: number
    regular: number
  }
}

// トレンドアイテム型
export interface TrendItem {
  id: string
  name: string
  category: string
  status: "emerging" | "growing" | "stable" | "declining"
  changePercent: number
  volume: number
  description?: string
}

// サンキーフロー型
export interface SankeyFlow {
  from: string
  to: string
  value: number
  rate: number
}

// サンキー離脱型
export interface SankeyDropoff {
  stage: string
  value: number
  rate: number
}

// フロー詳細型
export interface FlowDetail {
  title: string
  description: string
  insights: string[]
  personas: Persona[]
}

// 離脱詳細型
export interface DropoffDetail {
  title: string
  description: string
  reasons: string[]
  recommendations: string[]
  personas: Persona[]
}

// IMCチャネル型
export interface IMCChannel {
  id: string
  name: string
  icon: LucideIcon
  selected: boolean
  reach: number
  cost: number
}

// DNAファクター型
export interface DNAFactor {
  id: string
  label: string
  icon: string
  color: string
}
