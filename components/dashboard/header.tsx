"use client"

import { usePathname } from "next/navigation"
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
  Package,
  type LucideIcon 
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// カード商品の定義（AMEX）
const products = [
  { id: "all", name: "全カード", category: "", image: "" },
  { id: "platinum", name: "プラチナ・カード", category: "プレミアムカード", image: "/images/products/amex-platinum.png" },
  { id: "gold", name: "ゴールド・カード", category: "プレミアムカード", image: "/images/products/amex-gold.png" },
  { id: "green", name: "グリーン・カード", category: "スタンダードカード", image: "/images/products/amex-green.png" },
  { id: "blue", name: "ブルー・カード", category: "エントリーカード", image: "/images/products/amex-blue.png" },
  { id: "business-gold", name: "ビジネス・ゴールド", category: "法人カード", image: "/images/products/amex-business.png" },
]

interface DashboardHeaderProps {
  title: string
  description?: string
  breadcrumb?: string[]
  icon?: LucideIcon
  selectedProduct?: string
  onProductChange?: (productId: string) => void
}

// Map routes to icons and descriptions (AMEX Financial Analytics)
const pageConfig: Record<string, { icon: LucideIcon; description: string }> = {
  "/dashboard": { 
    icon: BarChart3, 
    description: "会員数・利用動向・収益KPIのエグゼクティブサマリー" 
  },
  "/dashboard/market-overview": { 
    icon: Users, 
    description: "会員セグメント・ファネル・ペルソナ別の詳細分析" 
  },
  "/dashboard/trends": { 
    icon: TrendingUp, 
    description: "会員行動トレンドと市場変化の時系列分析" 
  },
  "/dashboard/digital-shelf": { 
    icon: MonitorSmartphone, 
    description: "カード利用カテゴリ・チャネル別の消費行動分析" 
  },
  "/ai/correlations": { 
    icon: Cpu, 
    description: "会員属性×利用行動の相関分析とシナジー検出" 
  },
  "/ai/predictions": { 
    icon: BarChart3, 
    description: "AI による解約予測・アップグレード予測・チャーン分析" 
  },
  "/ai/competitors": { 
    icon: Swords, 
    description: "競合カード会社の動向・シェア変化・差別化分析" 
  },
  "/ai/concept-generator": { 
    icon: Lightbulb, 
    description: "会員ターゲット×ベネフィットからのカードコンセプト自動生成" 
  },
  "/ai/materials": { 
    icon: FlaskConical, 
    description: "特典・サービスデータベースとトレンド相関分析" 
  },
  "/ai/simulator": { 
    icon: Boxes, 
    description: "審査基準変更の影響シミュレーションと収益予測" 
  },
  "/insights/explorer": { 
    icon: Search, 
    description: "自然言語による会員データ統合検索" 
  },
  "/channels": { 
    icon: Store, 
    description: "申込チャネル別のコンバージョン・コスト分析" 
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

export function DashboardHeader({ title, description, breadcrumb, icon, selectedProduct, onProductChange }: DashboardHeaderProps) {
  const pathname = usePathname()
  const config = pageConfig[pathname] || { icon: BarChart3, description: "" }
  const Icon = icon || config.icon
  const desc = description || config.description

  // カード利用分析ページかどうかを判定
  const isDigitalShelfPage = pathname === "/dashboard/digital-shelf"
  const currentProduct = products.find(p => p.id === selectedProduct)

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border bg-background px-6">
      <div className="flex items-center justify-between w-full">
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

        {/* 商品選択（デジタルシェルフ分析ページのみ） */}
        {isDigitalShelfPage && onProductChange && (
          <div className="flex items-center gap-4">
            {currentProduct && currentProduct.id !== "all" && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{currentProduct.name}</p>
                  <p className="text-xs text-muted-foreground">{currentProduct.category}</p>
                </div>
              </div>
            )}
            <Select value={selectedProduct} onValueChange={onProductChange}>
              <SelectTrigger className="w-[220px] bg-background">
                <SelectValue placeholder="商品を選択" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center gap-2">
                      {product.image ? (
                        <div className="w-5 h-5 rounded overflow-hidden bg-white border flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <Package className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span>{product.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </header>
  )
}
