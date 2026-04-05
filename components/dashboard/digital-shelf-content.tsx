"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  CreditCard,
  Plane,
  Utensils,
  ShoppingBag,
  Hotel,
  Smartphone,
  Car,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
} from "lucide-react"

// カード種別タブ
const cardTypes = [
  { id: "all", name: "全カード" },
  { id: "platinum", name: "プラチナ" },
  { id: "gold", name: "ゴールド" },
  { id: "green", name: "グリーン" },
  { id: "business", name: "ビジネス" },
]

// 利用カテゴリランキング
const categoryRanking = [
  { name: "トラベル・交通", amount: 48200, share: 28.4, trend: "up", delta: 12.3, icon: Plane, color: "#006FCF" },
  { name: "ダイニング", amount: 31500, share: 18.6, trend: "up", delta: 8.7, icon: Utensils, color: "#00175A" },
  { name: "ショッピング", amount: 29800, share: 17.6, trend: "stable", delta: 2.1, icon: ShoppingBag, color: "#B4975A" },
  { name: "ホテル・宿泊", amount: 22100, share: 13.0, trend: "up", delta: 15.4, icon: Hotel, color: "#64B5F6" },
  { name: "デジタルサービス", amount: 18400, share: 10.9, trend: "up", delta: 22.6, icon: Smartphone, color: "#4CAF50" },
  { name: "交通・モビリティ", amount: 12200, share: 7.2, trend: "down", delta: -3.8, icon: Car, color: "#FF7043" },
  { name: "その他", amount: 7900, share: 4.3, trend: "stable", delta: 0.5, icon: CreditCard, color: "#90A4AE" },
]

// 月次利用推移
const monthlyTrend = [
  { month: "10月", travel: 3820, dining: 2410, shopping: 2650, hotel: 1580 },
  { month: "11月", travel: 4120, dining: 2680, shopping: 3240, hotel: 1720 },
  { month: "12月", travel: 5380, dining: 3920, shopping: 5120, hotel: 2340 },
  { month: "1月", travel: 3980, dining: 2540, shopping: 2410, hotel: 1680 },
  { month: "2月", travel: 4120, dining: 2720, shopping: 2680, hotel: 1820 },
  { month: "3月", travel: 5280, dining: 3180, shopping: 2890, hotel: 2180 },
]

// カード種別×カテゴリ利用額
const cardCategoryMatrix = [
  { category: "トラベル", platinum: 12400, gold: 8200, green: 3100, business: 24500 },
  { category: "ダイニング", platinum: 9800, gold: 7600, green: 4200, business: 9900 },
  { category: "ショッピング", platinum: 7200, gold: 9100, green: 6800, business: 6700 },
  { category: "ホテル", platinum: 8400, gold: 5100, green: 1800, business: 6800 },
  { category: "デジタル", platinum: 3200, gold: 4800, green: 6900, business: 3500 },
]

// 海外 vs 国内 比率（パイ）
const domesticVsOverseas = [
  { name: "国内利用", value: 61.4, color: "#006FCF" },
  { name: "海外利用", value: 38.6, color: "#B4975A" },
]

const COLORS = ["#006FCF", "#00175A", "#B4975A", "#64B5F6"]

export function DigitalShelfContent() {
  const [selectedCard, setSelectedCard] = useState("all")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            カード利用チャネル分析
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            カード種別×利用カテゴリ別の消費行動・チャネルシェア分析
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            更新
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* カード種別タブ */}
      <div className="flex gap-2 flex-wrap">
        {cardTypes.map((ct) => (
          <button
            key={ct.id}
            onClick={() => setSelectedCard(ct.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              selectedCard === ct.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/30 text-foreground border-border hover:border-primary/50"
            }`}
          >
            {ct.name}
          </button>
        ))}
      </div>

      {/* 利用カテゴリランキング */}
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">利用カテゴリ別シェア（直近30日）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categoryRanking.map((cat) => (
              <div key={cat.name} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}18` }}>
                  <cat.icon className="h-4 w-4" style={{ color: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${
                        cat.trend === "up" ? "text-emerald-600" :
                        cat.trend === "down" ? "text-destructive" :
                        "text-muted-foreground"
                      }`}>
                        {cat.trend === "up" ? <TrendingUp className="h-3 w-3" /> :
                         cat.trend === "down" ? <TrendingDown className="h-3 w-3" /> : null}
                        {cat.delta > 0 ? "+" : ""}{cat.delta}%
                      </span>
                      <span className="text-sm font-bold text-foreground w-20 text-right">
                        ¥{cat.amount.toLocaleString()}万
                      </span>
                      <span className="text-xs text-muted-foreground w-12 text-right">{cat.share}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${cat.share * 3}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月次カテゴリ推移 */}
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">主要カテゴリ月次推移（億円）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} unit="百万" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Line type="monotone" dataKey="travel" name="トラベル" stroke="#006FCF" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="dining" name="ダイニング" stroke="#00175A" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="shopping" name="ショッピング" stroke="#B4975A" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="hotel" name="ホテル" stroke="#64B5F6" strokeWidth={2} dot={false} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 海外 vs 国内 パイ */}
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">国内・海外利用比率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={domesticVsOverseas}
                    innerRadius={60}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {domesticVsOverseas.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-4">
                {domesticVsOverseas.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{d.value}%</p>
                      <p className="text-xs text-muted-foreground">{d.name}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">海外利用は前月比</p>
                  <p className="text-sm font-bold text-emerald-600">+4.2pt 増加</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* カード×カテゴリ積み上げバー */}
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">カード種別×利用カテゴリ比較（百万円）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cardCategoryMatrix} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} unit="万" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="platinum" name="プラチナ" stackId="a" fill="#006FCF" radius={[0, 0, 0, 0]} />
                <Bar dataKey="gold" name="ゴールド" stackId="a" fill="#B4975A" />
                <Bar dataKey="green" name="グリーン" stackId="a" fill="#00175A" />
                <Bar dataKey="business" name="ビジネス" stackId="a" fill="#64B5F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
