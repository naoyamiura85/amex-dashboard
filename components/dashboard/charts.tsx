"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "1月", revenue: 3200000 },
  { month: "2月", revenue: 2800000 },
  { month: "3月", revenue: 3500000 },
  { month: "4月", revenue: 4100000 },
  { month: "5月", revenue: 3800000 },
  { month: "6月", revenue: 4523000 },
]

const categoryData = [
  { name: "電子機器", value: 35 },
  { name: "アパレル", value: 25 },
  { name: "食品", value: 20 },
  { name: "その他", value: 20 },
]

const weeklyData = [
  { day: "月", orders: 120 },
  { day: "火", orders: 150 },
  { day: "水", orders: 180 },
  { day: "木", orders: 140 },
  { day: "金", orders: 200 },
  { day: "土", orders: 280 },
  { day: "日", orders: 220 },
]

const COLORS = ["#171717", "#404040", "#737373", "#a3a3a3"]

export function RevenueChart() {
  return (
    <Card className="border-border/40 shadow-sm col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">売上推移</CardTitle>
        <CardDescription>過去6ヶ月の売上データ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#171717" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={{ stroke: "#e5e5e5" }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={{ stroke: "#e5e5e5" }}
                tickLine={false}
                tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value: number) => [`¥${value.toLocaleString()}`, "売上"]}
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#171717"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryChart() {
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">カテゴリ別売上</CardTitle>
        <CardDescription>売上構成比率</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, "構成比"]}
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categoryData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function WeeklyOrdersChart() {
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">週間注文数</CardTitle>
        <CardDescription>今週の注文推移</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
              <XAxis 
                dataKey="day" 
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={{ stroke: "#e5e5e5" }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={{ stroke: "#e5e5e5" }}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [value, "注文数"]}
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                }}
              />
              <Bar 
                dataKey="orders" 
                fill="#171717" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
