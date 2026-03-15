"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  ShoppingCart,
  Store,
  Globe,
  BarChart3,
  Star,
  MessageSquare,
  Package,
  Filter
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

// Mock data for retailers
const retailers = [
  { 
    id: 1, 
    name: "Amazon Japan", 
    type: "EC", 
    marketShare: 28.5, 
    trend: "up",
    products: 15420,
    avgRating: 4.2,
    reviews: 892340,
    topCategory: "Health Foods"
  },
  { 
    id: 2, 
    name: "Rakuten", 
    type: "EC", 
    marketShare: 22.1, 
    trend: "up",
    products: 12380,
    avgRating: 4.0,
    reviews: 654210,
    topCategory: "Supplements"
  },
  { 
    id: 3, 
    name: "Matsumoto Kiyoshi", 
    type: "Drugstore", 
    marketShare: 12.8, 
    trend: "stable",
    products: 8540,
    avgRating: 4.3,
    reviews: 125680,
    topCategory: "Cosmetics"
  },
  { 
    id: 4, 
    name: "AEON", 
    type: "Supermarket", 
    marketShare: 10.2, 
    trend: "down",
    products: 6230,
    avgRating: 3.9,
    reviews: 89450,
    topCategory: "Food"
  },
  { 
    id: 5, 
    name: "Welcia", 
    type: "Drugstore", 
    marketShare: 8.5, 
    trend: "up",
    products: 5120,
    avgRating: 4.1,
    reviews: 67230,
    topCategory: "Toiletry"
  },
  { 
    id: 6, 
    name: "Lohaco", 
    type: "EC", 
    marketShare: 6.4, 
    trend: "up",
    products: 4280,
    avgRating: 4.4,
    reviews: 45120,
    topCategory: "Wellness"
  },
]

const channelTypeData = [
  { name: "EC", value: 56.8, color: "hsl(var(--chart-1))" },
  { name: "Drugstore", value: 21.3, color: "hsl(var(--chart-2))" },
  { name: "Supermarket", value: 15.4, color: "hsl(var(--chart-3))" },
  { name: "Convenience", value: 6.5, color: "hsl(var(--chart-4))" },
]

const reviewTrendsData = [
  { month: "Oct", positive: 78, negative: 12, neutral: 10 },
  { month: "Nov", positive: 75, negative: 15, neutral: 10 },
  { month: "Dec", positive: 82, negative: 10, neutral: 8 },
  { month: "Jan", positive: 79, negative: 11, neutral: 10 },
  { month: "Feb", positive: 85, negative: 8, neutral: 7 },
  { month: "Mar", positive: 88, negative: 7, neutral: 5 },
]

const topMentions = [
  { keyword: "natural ingredients", count: 8542, sentiment: "positive" },
  { keyword: "fast delivery", count: 6234, sentiment: "positive" },
  { keyword: "good value", count: 5891, sentiment: "positive" },
  { keyword: "packaging issue", count: 2145, sentiment: "negative" },
  { keyword: "effective results", count: 4521, sentiment: "positive" },
]

export function ChannelsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredRetailers = retailers.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || r.type === selectedType
    return matchesSearch && matchesType
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "EC": return <Globe className="h-4 w-4" />
      case "Drugstore": return <Store className="h-4 w-4" />
      case "Supermarket": return <ShoppingCart className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Channel Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Retailer performance and review analytics across distribution channels
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BarChart3 className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Channel Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Retailers</p>
                <p className="text-2xl font-semibold">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Products Tracked</p>
                <p className="text-2xl font-semibold">52.4K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-semibold">4.1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reviews Analyzed</p>
                <p className="text-2xl font-semibold">2.1M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Channel Type Distribution</CardTitle>
            <CardDescription>Market share by channel type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {channelTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Review Sentiment Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Review Sentiment Trends</CardTitle>
            <CardDescription>6-month sentiment analysis across channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reviewTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="positive" stackId="a" fill="hsl(var(--chart-2))" name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill="hsl(var(--chart-5))" name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill="hsl(var(--destructive))" name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="retailers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="retailers">Retailers</TabsTrigger>
          <TabsTrigger value="mentions">Top Mentions</TabsTrigger>
          <TabsTrigger value="products">Product Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="retailers" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search retailers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              {["EC", "Drugstore", "Supermarket"].map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Retailers Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Retailer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Market Share</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Avg Rating</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Top Category</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRetailers.map((retailer) => (
                    <TableRow key={retailer.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {retailer.name}
                          {getTrendIcon(retailer.trend)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {getTypeIcon(retailer.type)}
                          <span>{retailer.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={retailer.marketShare} className="w-16 h-2" />
                          <span className="text-sm">{retailer.marketShare}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{retailer.products.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {retailer.avgRating}
                        </div>
                      </TableCell>
                      <TableCell>{retailer.reviews.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{retailer.topCategory}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Keyword Mentions in Reviews</CardTitle>
              <CardDescription>Most frequently mentioned terms across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMentions.map((mention, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-40">{mention.keyword}</span>
                    <div className="flex-1">
                      <Progress 
                        value={(mention.count / 10000) * 100} 
                        className={`h-2 ${mention.sentiment === 'negative' ? '[&>div]:bg-red-500' : ''}`}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {mention.count.toLocaleString()}
                    </span>
                    <Badge 
                      variant={mention.sentiment === "positive" ? "default" : "destructive"}
                      className="w-20 justify-center"
                    >
                      {mention.sentiment}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground py-8">
                Product rankings feature coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
