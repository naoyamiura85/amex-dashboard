// サントリーブランドカラー
export const SUNTORY_COLORS = {
  primary: "#0068B7",      // サントリーブルー（メイン）
  secondary: "#0088CC",    // ライトブルー
  accent: "#00A0E9",       // スカイブルー
  teal: "#00B894",         // ティール
  gold: "#F5A623",         // ゴールド
} as const

// ファネルステージの色定義（サントリーブランドカラー - 赤系グラデーション）
export const FUNNEL_COLORS = {
  search: "#C41E3A",       // 検索 - サントリーレッド（濃）
  visit: "#D84757",        // 来訪 - サントリーレッド
  cart: "#E25F6F",         // カート - サントリーレッド（中）
  purchase: "#ED8491",     // 購入 - サントリーレッド（淡）
  repeat: "#F7ADB7",       // リピート - サントリーレッド（薄）
  lm: "#64748B",           // LM(ポテンシャル小) - グレー
  mh: "#3B82F6",           // MH(ポテンシャル大) - ブルー
  regular: "#C41E3A",      // 定期購入 - サントリーレッド
} as const

// サンキーダイアグラム用グラデーション（温かみのある配色）
export const SANKEY_GRADIENTS = [
  { from: "#6366F1", to: "#8B5CF6" }, // 検索→来訪
  { from: "#8B5CF6", to: "#EC4899" }, // 来訪→カート
  { from: "#EC4899", to: "#10B981" }, // カート→購入
  { from: "#10B981", to: "#F59E0B" }, // 購入→リピート
] as const

// 商品DNA感情ファクター
export const DNA_FACTORS = [
  { id: "refresh", label: "リフレッシュ", icon: "Sparkles", color: "#0EA5E9" },
  { id: "confidence", label: "自信", icon: "Star", color: "#F59E0B" },
  { id: "vitality", label: "活力・元気", icon: "Zap", color: "#EF4444" },
  { id: "premium", label: "プレミアム感", icon: "Crown", color: "#8B5CF6" },
  { id: "joy", label: "喜び・幸福", icon: "Smile", color: "#EC4899" },
  { id: "security", label: "安心感", icon: "Heart", color: "#10B981" },
  { id: "relax", label: "リラックス", icon: "Coffee", color: "#06B6D4" },
  { id: "intelligence", label: "知的・賢さ", icon: "Brain", color: "#6366F1" },
  { id: "beauty", label: "美しさ", icon: "Gem", color: "#F472B6" },
  { id: "natural", label: "自然・ナチュラル", icon: "Leaf", color: "#22C55E" },
  { id: "trust", label: "信頼", icon: "Shield", color: "#3B82F6" },
  { id: "innovation", label: "革新", icon: "Lightbulb", color: "#A855F7" },
] as const

// トレンドステータス
export const TREND_STATUS = {
  emerging: { label: "急上昇", color: "#EF4444", bgColor: "#FEE2E2" },
  growing: { label: "成長中", color: "#10B981", bgColor: "#D1FAE5" },
  stable: { label: "安定", color: "#6B7280", bgColor: "#F3F4F6" },
  declining: { label: "下降", color: "#F59E0B", bgColor: "#FEF3C7" },
} as const

// ペルソナ画像（共通で使用）
export const PERSONA_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
] as const

// 商品画像（共通で使用）
export const PRODUCT_IMAGES = {
  menphys: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop",
  skincare: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&h=100&fit=crop",
  supplement: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
  drink: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=100&h=100&fit=crop",
} as const
