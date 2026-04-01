"use client"

import { 
  BarChart3, 
  TrendingUp, 
  MonitorSmartphone, 
  Cpu, 
  Swords, 
  Lightbulb, 
  FlaskConical, 
  Boxes, 
  Search, 
  Store, 
  Zap, 
  FolderOpen,
  Users,
  type LucideIcon 
} from "lucide-react"

interface DashboardHeaderProps {
  title: string
  description?: string
  breadcrumb?: string[]
  icon?: LucideIcon
}

// Map routes to icons and descriptions
const pageConfig: Record<string, { icon: LucideIcon; description: string }> = {
  "/dashboard/market-overview": { 
    icon: Users, 
    description: "定期顧客化ポテンシャルとウェルネスレベルごとのペルソナ分布" 
  },
  "/dashboard/trends": { 
    icon: TrendingUp, 
    description: "未購入ユーザーの興味関心から検出した消費財カテゴリの成長トレンド" 
  },
  "/dashboard/digital-shelf": { 
    icon: MonitorSmartphone, 
    description: "購入ユーザーのペルソナデータとEC行動データの統合分析" 
  },
  "/ai/correlations": { 
    icon: Cpu, 
    description: "クロスカテゴリー相関と素材シナジーの自動検出" 
  },
  "/ai/predictions": { 
    icon: BarChart3, 
    description: "トレンド到来予測と寿命分析" 
  },
  "/ai/competitors": { 
    icon: Swords, 
    description: "競合新商品の自動検知と成分比較分析" 
  },
  "/ai/concept-generator": { 
    icon: Lightbulb, 
    description: "トレンド×ターゲット×素材からコンセプト自動生成" 
  },
  "/ai/materials": { 
    icon: FlaskConical, 
    description: "原材料マスタ管理とトレンド相関分析" 
  },
  "/ai/simulator": { 
    icon: Boxes, 
    description: "What-If分析と製品改定シミュレーション" 
  },
  "/insights/explorer": { 
    icon: Search, 
    description: "自然言語による統合データ検索" 
  },
  "/channels": { 
    icon: Store, 
    description: "販売チャネル別のパフォーマンス分析" 
  },
  "/reports": { 
    icon: Zap, 
    description: "週次・月次レポートの自動生成" 
  },
  "/drive": { 
    icon: FolderOpen, 
    description: "レポートとドキュメントの管理" 
  },
}

export function DashboardHeader({ title, description, breadcrumb, icon }: DashboardHeaderProps) {
  // Get current path from window if available
  const path = typeof window !== "undefined" ? window.location.pathname : ""
  const config = pageConfig[path] || { icon: BarChart3, description: "" }
  const Icon = icon || config.icon
  const desc = description || config.description

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        
        {/* Title and Description */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {desc && (
            <p className="text-sm text-muted-foreground">{desc}</p>
          )}
        </div>
      </div>
    </header>
  )
}
