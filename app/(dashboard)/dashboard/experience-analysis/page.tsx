"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Plane, Utensils, Music } from "lucide-react"

const EXPERIENCE_PATHS = [
  {
    tribe: "プレミアム旅行派",
    category: "Travel",
    icon: Plane,
    color: "#006FCF",
    experiences: ["ラグジュアリーリゾート", "ビジネスクラス体験", "プライベートツアー"],
    specs: ["空港ラウンジアクセス", "トラベル保険", "海外利用ポイント2倍"],
    conversion: "プラチナカード申込",
    rate: "12.5%",
  },
  {
    tribe: "美食探求派",
    category: "Dining",
    icon: Utensils,
    color: "#B4975A",
    experiences: ["ミシュラン星レストラン", "ワインペアリング", "プライベートシェフ"],
    specs: ["レストラン優先予約", "ダイニングクレジット", "ポイント還元率"],
    conversion: "ゴールドカード申込",
    rate: "8.2%",
  },
  {
    tribe: "エンタメ愛好派",
    category: "Entertainment",
    icon: Music,
    color: "#00175A",
    experiences: ["VIPコンサート", "プレミアムシート", "バックステージアクセス"],
    specs: ["先行チケット予約", "イベント優待", "エンタメクレジット"],
    conversion: "グリーンカード申込",
    rate: "6.8%",
  },
]

export default function ExperienceAnalysisPage() {
  return (
    <>
      <DashboardHeader 
        title="Experience Analysis" 
        breadcrumb={["Japan Market", "Experience Analysis"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          トライブを起点とした体験 → 商品スペック → 加入申し込みに至るパス分析
        </p>

        <div className="space-y-6">
          {EXPERIENCE_PATHS.map((path, i) => {
            const Icon = path.icon
            return (
              <Card key={i} className="border shadow-sm overflow-hidden">
                <CardHeader className="pb-3" style={{ borderLeft: `4px solid ${path.color}` }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${path.color}15` }}>
                      <Icon className="h-5 w-5" style={{ color: path.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{path.tribe}</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">{path.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    {/* 体験 */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">体験</p>
                      <div className="space-y-1">
                        {path.experiences.map((exp, j) => (
                          <Badge key={j} variant="outline" className="text-xs mr-1">{exp}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* スペック */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">商品スペック</p>
                      <div className="space-y-1">
                        {path.specs.map((spec, j) => (
                          <Badge key={j} className="text-xs mr-1" style={{ backgroundColor: `${path.color}20`, color: path.color }}>{spec}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* コンバージョン */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">コンバージョン</p>
                      <div className="p-3 rounded-lg border" style={{ borderColor: path.color }}>
                        <p className="font-semibold text-sm">{path.conversion}</p>
                        <p className="text-2xl font-bold mt-1" style={{ color: path.color }}>{path.rate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}
