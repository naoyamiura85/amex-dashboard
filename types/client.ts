// クライアント設定の型定義

export type ClientId = "suntory" | "kirin" | "amex"

// ブランド設定
export interface BrandConfig {
  id: ClientId
  name: string                    // 会社名
  shortName: string               // 短縮名
  logo?: string                   // ロゴ画像パス
  colors: {
    primary: string               // プライマリカラー
    secondary: string             // セカンダリカラー
    accent: string                // アクセントカラー
  }
  dashboardTitle: string          // ダッシュボードタイトル
  darkMode?: boolean              // ダークモードを使用するか
}

// 機能フラグ
export interface FeatureFlags {
  showMarketOverview: boolean     // 市場概況
  showTrends: boolean             // トレンド分析
  showDigitalShelf: boolean       // デジタルシェルフ
  showSimulator: boolean          // AIシミュレーター
  showPersonaDetails: boolean     // ペルソナ詳細
  showCompetitorAnalysis: boolean // 競合分析
}

// 商品情報
export interface ProductData {
  id: string
  name: string
  category: string
  image: string
  description?: string
}

// ペルソナ情報
export interface PersonaData {
  id: string
  name: string
  age: number
  gender: "男性" | "女性"
  occupation: string
  image: string
  tags: string[]
  behavior?: string
  description?: string
}

// ファネルステージ設定
export interface FunnelStageConfig {
  id: string
  name: string
  color: string
}

// クライアント固有データ
export interface ClientData {
  products: ProductData[]
  personas: PersonaData[]
  funnelStages: FunnelStageConfig[]
  dnaFactors: string[]            // 商品DNA要素
}

// 完全なクライアント設定
export interface ClientConfig {
  brand: BrandConfig
  features: FeatureFlags
  data: ClientData
}
