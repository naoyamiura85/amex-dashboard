"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const COUNTRIES = [
  { id: "jp", name: "日本", flag: "🇯🇵" },
  { id: "us", name: "US", flag: "🇺🇸" },
  { id: "uk", name: "UK", flag: "🇬🇧" },
  { id: "mx", name: "メキシコ", flag: "🇲🇽" },
  { id: "ca", name: "カナダ", flag: "🇨🇦" },
]

const KPI_METRICS = [
  { id: "ad-recall", name: "Ad Recall", color: "#006FCF" },
  { id: "ltcs", name: "LTCS", color: "#B4975A" },
  { id: "brand-consideration", name: "Brand Consideration", color: "#00175A" },
]

// サンプルデータ（月次）
const MONTHLY_DATA = [
  { month: "Jan", jp_ar: 42, us_ar: 58, uk_ar: 51, mx_ar: 38, ca_ar: 55, jp_ltcs: 68, us_ltcs: 72, uk_ltcs: 65, mx_ltcs: 61, ca_ltcs: 70, jp_bc: 32, us_bc: 45, uk_bc: 40, mx_bc: 28, ca_bc: 42 },
  { month: "Feb", jp_ar: 44, us_ar: 59, uk_ar: 52, mx_ar: 40, ca_ar: 56, jp_ltcs: 69, us_ltcs: 73, uk_ltcs: 66, mx_ltcs: 62, ca_ltcs: 71, jp_bc: 33, us_bc: 46, uk_bc: 41, mx_bc: 29, ca_bc: 43 },
  { month: "Mar", jp_ar: 45, us_ar: 61, uk_ar: 53, mx_ar: 41, ca_ar: 57, jp_ltcs: 70, us_ltcs: 74, uk_ltcs: 67, mx_ltcs: 63, ca_ltcs: 72, jp_bc: 34, us_bc: 47, uk_bc: 42, mx_bc: 30, ca_bc: 44 },
  { month: "Apr", jp_ar: 47, us_ar: 62, uk_ar: 54, mx_ar: 43, ca_ar: 58, jp_ltcs: 71, us_ltcs: 75, uk_ltcs: 68, mx_ltcs: 64, ca_ltcs: 73, jp_bc: 35, us_bc: 48, uk_bc: 43, mx_bc: 31, ca_bc: 45 },
  { month: "May", jp_ar: 48, us_ar: 63, uk_ar: 55, mx_ar: 44, ca_ar: 59, jp_ltcs: 72, us_ltcs: 76, uk_ltcs: 69, mx_ltcs: 65, ca_ltcs: 74, jp_bc: 36, us_bc: 49, uk_bc: 44, mx_bc: 32, ca_bc: 46 },
  { month: "Jun", jp_ar: 50, us_ar: 65, uk_ar: 56, mx_ar: 46, ca_ar: 60, jp_ltcs: 73, us_ltcs: 77, uk_ltcs: 70, mx_ltcs: 66, ca_ltcs: 75, jp_bc: 37, us_bc: 50, uk_bc: 45, mx_bc: 33, ca_bc: 47 },
]

const CURRENT_KPI = {
  jp: { ar: 50, ar_change: 8, ltcs: 73, ltcs_change: 5, bc: 37, bc_change: 5 },
  us: { ar: 65, ar_change: 7, ltcs: 77, ltcs_change: 5, bc: 50, bc_change: 5 },
  uk: { ar: 56, ar_change: 5, ltcs: 70, ltcs_change: 5, bc: 45, bc_change: 5 },
  mx: { ar: 46, ar_change: 8, ltcs: 66, ltcs_change: 5, bc: 33, bc_change: 5 },
  ca: { ar: 60, ar_change: 5, ltcs: 75, ltcs_change: 5, bc: 47, bc_change: 5 },
}

export default function KpiTrackingPage() {
  return (
    <>
      <DashboardHeader 
        title="KPI Tracking" 
        breadcrumb={["Global View", "KPI Tracking"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          主要5ヶ国のKPIを「Ad Recall」「LTCS」「Brand Consideration」の3指標で追跡
        </p>

        <Tabs defaultValue="ad-recall" className="space-y-4">
          <TabsList>
            {KPI_METRICS.map((m) => (
              <TabsTrigger key={m.id} value={m.id}>{m.name}</TabsTrigger>
            ))}
          </TabsList>

          {KPI_METRICS.map((metric) => (
            <TabsContent key={metric.id} value={metric.id} className="space-y-6">
              {/* 国別KPIカード */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {COUNTRIES.map((c) => {
                  const kpi = CURRENT_KPI[c.id as keyof typeof CURRENT_KPI]
                  const value = metric.id === "ad-recall" ? kpi.ar : metric.id === "ltcs" ? kpi.ltcs : kpi.bc
                  const change = metric.id === "ad-recall" ? kpi.ar_change : metric.id === "ltcs" ? kpi.ltcs_change : kpi.bc_change
                  return (
                    <Card key={c.id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{c.flag}</span>
                          <span className="text-sm font-medium">{c.name}</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: metric.color }}>{value}%</p>
                        <div className="flex items-center gap-1 mt-1">
                          {change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className={`text-xs font-medium ${change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                            {change >= 0 ? "+" : ""}{change}% YoY
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* トレンドチャート */}
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">{metric.name} トレンド（月次）</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={MONTHLY_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {COUNTRIES.map((c, i) => {
                        const key = `${c.id}_${metric.id === "ad-recall" ? "ar" : metric.id === "ltcs" ? "ltcs" : "bc"}`
                        const colors = ["#006FCF", "#B4975A", "#00175A", "#38A169", "#E53E3E"]
                        return (
                          <Line
                            key={c.id}
                            type="monotone"
                            dataKey={key}
                            name={c.name}
                            stroke={colors[i]}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
