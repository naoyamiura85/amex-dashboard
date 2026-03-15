import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { CategoryFilter } from "@/components/dashboard/category-filter"
import { TrendCard } from "@/components/dashboard/trend-card"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { TrendingSummary } from "@/components/dashboard/trending-summary"

const trendData = [
  {
    name: "レチノール美容液",
    growthRate: 67,
    lifecycleStage: "growing" as const,
    mentionVolume: "1.2M",
    demandDriverSummary: "エイジングケア需要の高まり。敏感肌でも使える低刺激処方への関心が特に増加。",
    popularityScore: 85,
    category: "cosmetics" as const,
    sparklineData: [20, 25, 30, 35, 45, 55, 65, 75, 80, 85],
  },
  {
    name: "オートミール",
    growthRate: 45,
    lifecycleStage: "peaking" as const,
    mentionVolume: "890K",
    demandDriverSummary: "健康的な朝食ニーズ。ダイエット・腸活文脈での利用が定着。米化レシピが人気。",
    popularityScore: 78,
    category: "food" as const,
    sparklineData: [40, 50, 60, 70, 80, 85, 88, 90, 89, 88],
  },
  {
    name: "NMNサプリ",
    growthRate: 89,
    lifecycleStage: "emerging" as const,
    mentionVolume: "340K",
    demandDriverSummary: "アンチエイジング訴求が40-50代男性に浸透。高価格帯でも購入意欲が高い。",
    popularityScore: 72,
    category: "supplement" as const,
    sparklineData: [10, 15, 20, 30, 40, 50, 65, 78, 85, 92],
  },
  {
    name: "シカ(CICA)クリーム",
    growthRate: 23,
    lifecycleStage: "peaking" as const,
    mentionVolume: "2.1M",
    demandDriverSummary: "韓国コスメからの波及が定着。敏感肌・肌荒れケアの定番ポジションを確立。",
    popularityScore: 91,
    category: "cosmetics" as const,
    sparklineData: [60, 65, 70, 80, 90, 95, 98, 96, 94, 93],
  },
  {
    name: "プロテインバー",
    growthRate: 38,
    lifecycleStage: "growing" as const,
    mentionVolume: "1.5M",
    demandDriverSummary: "間食のヘルシー化需要。コンビニでの購入が増加。味のバリエーション拡大中。",
    popularityScore: 82,
    category: "food" as const,
    sparklineData: [30, 35, 40, 48, 55, 62, 70, 75, 80, 84],
  },
  {
    name: "CBD製品",
    growthRate: 112,
    lifecycleStage: "emerging" as const,
    mentionVolume: "180K",
    demandDriverSummary: "睡眠・リラックス需要。規制緩和への期待。美容・ウェルネス領域で注目度上昇。",
    popularityScore: 58,
    category: "wellness" as const,
    sparklineData: [5, 10, 15, 22, 35, 50, 68, 85, 100, 115],
  },
  {
    name: "腸活ヨーグルト",
    growthRate: 18,
    lifecycleStage: "peaking" as const,
    mentionVolume: "3.2M",
    demandDriverSummary: "腸内環境への関心定着。機能性表示食品の増加。新菌株への関心が継続。",
    popularityScore: 88,
    category: "food" as const,
    sparklineData: [70, 75, 78, 82, 85, 88, 90, 91, 90, 89],
  },
  {
    name: "ナイアシンアミド",
    growthRate: 56,
    lifecycleStage: "growing" as const,
    mentionVolume: "780K",
    demandDriverSummary: "毛穴・美白効果への期待。韓国・欧米での人気が日本に波及。低刺激で使いやすい。",
    popularityScore: 79,
    category: "cosmetics" as const,
    sparklineData: [25, 30, 38, 45, 52, 60, 68, 74, 78, 82],
  },
]

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader 
            title="Top Trends" 
            breadcrumb={["Dashboard", "Top Trends"]}
          />
          
          <main className="flex-1 p-6 space-y-6">
            {/* Summary Section */}
            <TrendingSummary />
            
            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CategoryFilter />
              <p className="text-sm text-muted-foreground">
                {trendData.length} トレンドを表示中
              </p>
            </div>

            {/* Trend Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trendData.map((trend, index) => (
                <TrendCard key={index} {...trend} />
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
      
      {/* YappiGPT Floating Chat */}
      <YappiChat />
    </SidebarProvider>
  )
}
