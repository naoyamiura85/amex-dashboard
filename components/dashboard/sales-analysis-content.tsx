"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Package,
  DollarSign,
  ShoppingCart,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock product data
const products = [
  {
    id: 1,
    name: "伊右衛門 緑茶",
    category: "緑茶",
    image: "/images/products/green-tea.jpg",
    currentSales: 2850000,
    previousSales: 2650000,
    growth: 7.5,
    units: 285000,
    avgPrice: 150,
    marketShare: 18.5,
    trend: "up",
    channels: { cvs: 45, supermarket: 35, vending: 20 },
  },
  {
    id: 2,
    name: "サントリー天然水",
    category: "ミネラルウォーター",
    image: "/images/products/mineral-water.jpg",
    currentSales: 3200000,
    previousSales: 2980000,
    growth: 7.4,
    units: 420000,
    avgPrice: 110,
    marketShare: 22.3,
    trend: "up",
    channels: { cvs: 40, supermarket: 40, vending: 20 },
  },
  {
    id: 3,
    name: "BOSS カフェオレ",
    category: "コーヒー",
    image: "/images/products/coffee.jpg",
    currentSales: 1950000,
    previousSales: 2100000,
    growth: -7.1,
    units: 156000,
    avgPrice: 140,
    marketShare: 12.8,
    trend: "down",
    channels: { cvs: 55, supermarket: 25, vending: 20 },
  },
  {
    id: 4,
    name: "オランジーナ",
    category: "炭酸飲料",
    image: "/images/products/orangina.jpg",
    currentSales: 1450000,
    previousSales: 1420000,
    growth: 2.1,
    units: 98000,
    avgPrice: 160,
    marketShare: 8.2,
    trend: "stable",
    channels: { cvs: 50, supermarket: 35, vending: 15 },
  },
  {
    id: 5,
    name: "C.C.レモン",
    category: "炭酸飲料",
    image: "/images/products/cc-lemon.jpg",
    currentSales: 1680000,
    previousSales: 1550000,
    growth: 8.4,
    units: 112000,
    avgPrice: 150,
    marketShare: 9.5,
    trend: "up",
    channels: { cvs: 45, supermarket: 40, vending: 15 },
  },
  {
    id: 6,
    name: "ペプシコーラ",
    category: "炭酸飲料",
    image: "/images/products/pepsi.jpg",
    currentSales: 2100000,
    previousSales: 2250000,
    growth: -6.7,
    units: 175000,
    avgPrice: 140,
    marketShare: 11.2,
    trend: "down",
    channels: { cvs: 50, supermarket: 30, vending: 20 },
  },
]

// Monthly sales trend data
const monthlySalesData = [
  { month: "1月", 伊右衛門: 2200, 天然水: 2800, BOSS: 1900, オランジーナ: 1200 },
  { month: "2月", 伊右衛門: 2350, 天然水: 2750, BOSS: 1850, オランジーナ: 1180 },
  { month: "3月", 伊右衛門: 2500, 天然水: 2900, BOSS: 1950, オランジーナ: 1250 },
  { month: "4月", 伊右衛門: 2650, 天然水: 3000, BOSS: 2000, オランジーナ: 1300 },
  { month: "5月", 伊右衛門: 2750, 天然水: 3100, BOSS: 2050, オランジーナ: 1380 },
  { month: "6月", 伊右衛門: 2850, 天然水: 3200, BOSS: 1950, オランジーナ: 1450 },
]

// Category breakdown data
const categoryData = [
  { name: "緑茶", value: 28, color: "#00A0D2" },
  { name: "ミネラルウォーター", value: 25, color: "#4DD0E1" },
  { name: "コーヒー", value: 22, color: "#81D4FA" },
  { name: "炭酸飲料", value: 18, color: "#B3E5FC" },
  { name: "その他", value: 7, color: "#E1F5FE" },
]

// Channel performance data
const channelData = [
  { channel: "コンビニ", sales: 4500, growth: 5.2 },
  { channel: "スーパー", sales: 3800, growth: 3.8 },
  { channel: "自動販売機", sales: 2200, growth: -2.1 },
  { channel: "EC", sales: 1500, growth: 15.3 },
]

export function SalesAnalysisContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("sales")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendBadge = (growth: number) => {
    if (growth > 5) {
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">好調</Badge>
    } else if (growth < -5) {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">要注意</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">安定</Badge>
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalSales = products.reduce((sum, p) => sum + p.currentSales, 0)
  const totalUnits = products.reduce((sum, p) => sum + p.units, 0)
  const avgGrowth = products.reduce((sum, p) => sum + p.growth, 0) / products.length

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">総売上高</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalSales)}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% 前月比
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">総販売数</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(totalUnits)}本</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.8% 前月比
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">商品数</p>
                <p className="text-2xl font-bold text-foreground">{products.length}品目</p>
                <p className="text-xs text-muted-foreground mt-1">アクティブ商品</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均成長率</p>
                <p className="text-2xl font-bold text-foreground">{avgGrowth.toFixed(1)}%</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  前年同期比
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">売上推移</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="伊右衛門" stroke="#00A0D2" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="天然水" stroke="#4DD0E1" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="BOSS" stroke="#FF7043" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="オランジーナ" stroke="#FFB74D" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">カテゴリ別構成比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">チャネル別販売実績</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 12 }} stroke="#9CA3AF" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="#00A0D2" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product List */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">商品別販売状況</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="商品を検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="カテゴリ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="緑茶">緑茶</SelectItem>
                  <SelectItem value="ミネラルウォーター">ミネラルウォーター</SelectItem>
                  <SelectItem value="コーヒー">コーヒー</SelectItem>
                  <SelectItem value="炭酸飲料">炭酸飲料</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                エクスポート
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">商品</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead className="text-right">売上高</TableHead>
                <TableHead className="text-right">販売数</TableHead>
                <TableHead className="text-right">成長率</TableHead>
                <TableHead className="text-right">市場シェア</TableHead>
                <TableHead>ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">平均単価: {formatCurrency(product.avgPrice)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(product.currentSales)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(product.units)}本
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {getTrendIcon(product.trend)}
                      <span className={product.growth >= 0 ? "text-emerald-600" : "text-red-600"}>
                        {product.growth >= 0 ? "+" : ""}{product.growth}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.marketShare}%
                  </TableCell>
                  <TableCell>
                    {getTrendBadge(product.growth)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
