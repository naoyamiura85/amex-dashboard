"use client"

import { useState } from "react"
import { 
  TrendingUp, 
  Share2, 
  Download, 
  Heart, 
  MessageCircle,
  ExternalLink,
  Lightbulb,
  Users,
  Clock,
  Sparkles
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts"

// Time series data
const timeSeriesData = [
  { month: "2025/04", sns: 45000, menu: 120, ec: 8500, pos: 12000 },
  { month: "2025/05", sns: 52000, menu: 145, ec: 9200, pos: 13500 },
  { month: "2025/06", sns: 61000, menu: 168, ec: 11000, pos: 15200 },
  { month: "2025/07", sns: 78000, menu: 195, ec: 13500, pos: 18000 },
  { month: "2025/08", sns: 92000, menu: 220, ec: 16000, pos: 21000 },
  { month: "2025/09", sns: 115000, menu: 265, ec: 19500, pos: 25500 },
  { month: "2025/10", sns: 135000, menu: 310, ec: 23000, pos: 29000 },
  { month: "2025/11", sns: 148000, menu: 345, ec: 26500, pos: 32000 },
  { month: "2025/12", sns: 162000, menu: 380, ec: 30000, pos: 35500 },
  { month: "2026/01", sns: 178000, menu: 420, ec: 34000, pos: 39000 },
  { month: "2026/02", sns: 195000, menu: 465, ec: 38500, pos: 43000 },
  { month: "2026/03", sns: 210000, menu: 510, ec: 42000, pos: 47000 },
]

// Demand Drivers
const demandDrivers = [
  { 
    type: "Functional", 
    label: "機能的要因",
    items: ["エイジングケア効果", "シワ・たるみ改善", "肌のターンオーバー促進"],
    score: 85,
    color: "#6C3AED"
  },
  { 
    type: "Emotional", 
    label: "感情的要因",
    items: ["自己投資としての美容", "エイジングへの前向きな姿勢", "高級感・特別感"],
    score: 72,
    color: "#8B5CF6"
  },
  { 
    type: "Social", 
    label: "社会的要因",
    items: ["SNSでの成功体験共有", "韓国美容トレンドの影響", "専門家推奨の拡散"],
    score: 68,
    color: "#A78BFA"
  },
  { 
    type: "Contextual", 
    label: "文脈的要因",
    items: ["在宅時間でのスキンケア習慣", "低刺激処方の普及", "価格帯の多様化"],
    score: 61,
    color: "#C4B5FD"
  },
]

// Consumption Moments
const consumptionMoments = [
  { time: "朝", weekday: 15, weekend: 8 },
  { time: "昼", weekday: 5, weekend: 12 },
  { time: "夜", weekday: 65, weekend: 58 },
  { time: "深夜", weekday: 15, weekend: 22 },
]

// Demographics
const demographicsData = [
  { age: "10代", value: 5 },
  { age: "20代", value: 25 },
  { age: "30代", value: 35 },
  { age: "40代", value: 25 },
  { age: "50代+", value: 10 },
]

// Related ingredients
const relatedIngredients = [
  { name: "ヒアルロン酸", correlation: 0.85 },
  { name: "ビタミンC", correlation: 0.78 },
  { name: "ナイアシンアミド", correlation: 0.72 },
  { name: "セラミド", correlation: 0.68 },
  { name: "ペプチド", correlation: 0.64 },
]

// SNS Posts
const snsPosts = [
  {
    platform: "Instagram",
    content: "レチノール始めて3ヶ月、明らかに毛穴が目立たなくなった...",
    likes: 2340,
    comments: 89,
    date: "2026/03/14",
  },
  {
    platform: "X",
    content: "敏感肌だから怖かったけど、低濃度から始めたら全然大丈夫だった",
    likes: 1560,
    comments: 234,
    date: "2026/03/13",
  },
  {
    platform: "TikTok",
    content: "【Before/After】レチノール3ヶ月チャレンジの結果がすごい",
    likes: 45200,
    comments: 1230,
    date: "2026/03/12",
  },
]

const COLORS = ["#6C3AED", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"]

export function TrendSpotlightContent() {
  const [selectedTrend] = useState("レチノール美容液")

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-foreground">{selectedTrend}</h2>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Growing</Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl">
              エイジングケア成分として注目度上昇中。敏感肌向け低刺激処方の普及により、幅広い層に浸透。
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">+67%</span>
                <span className="text-xs text-muted-foreground">成長率</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">1.2M</span>
                <span className="text-xs text-muted-foreground">言及量</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">85</span>
                <span className="text-xs text-muted-foreground">Popularity Score</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            共有
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Series Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">時系列推移</CardTitle>
                <CardDescription>データソース別の言及・販売推移</CardDescription>
              </div>
              <Select defaultValue="12m">
                <SelectTrigger className="w-[100px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3ヶ月</SelectItem>
                  <SelectItem value="6m">6ヶ月</SelectItem>
                  <SelectItem value="12m">12ヶ月</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sns" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="sns" className="text-xs">SNS</TabsTrigger>
                <TabsTrigger value="ec" className="text-xs">EC</TabsTrigger>
                <TabsTrigger value="pos" className="text-xs">POS</TabsTrigger>
                <TabsTrigger value="all" className="text-xs">全て</TabsTrigger>
              </TabsList>
              <TabsContent value="sns" className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorSns" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C3AED" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6C3AED" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} />
                    <Tooltip 
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value: number) => [value.toLocaleString(), "SNS言及数"]}
                    />
                    <Area type="monotone" dataKey="sns" stroke="#6C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorSns)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="ec" className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorEc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} />
                    <Tooltip 
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value: number) => [value.toLocaleString(), "EC販売数"]}
                    />
                    <Area type="monotone" dataKey="ec" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorEc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="pos" className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} />
                    <Tooltip 
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value: number) => [value.toLocaleString(), "POS販売数"]}
                    />
                    <Area type="monotone" dataKey="pos" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorPos)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="all" className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Legend />
                    <Area type="monotone" dataKey="sns" name="SNS" stroke="#6C3AED" fill="#6C3AED" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="ec" name="EC" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="pos" name="POS" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demand Drivers */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Demand Drivers
            </CardTitle>
            <CardDescription>トレンドの背景にある消費者動機</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demandDrivers.map((driver) => (
              <div key={driver.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{driver.label}</span>
                  <span className="text-xs text-muted-foreground">{driver.score}/100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ width: `${driver.score}%`, backgroundColor: driver.color }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {driver.items.map((item) => (
                    <Badge key={item} variant="secondary" className="text-[10px] font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Consumption Moments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Consumption Moments</CardTitle>
            <CardDescription>使用タイミングの分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consumptionMoments} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="time" type="category" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={40} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="weekday" name="平日" fill="#6C3AED" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="weekend" name="休日" fill="#A78BFA" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              夜のスキンケアルーティンとして定着。平日の使用率が高い。
            </p>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">デモグラフィック</CardTitle>
            <CardDescription>年代別の関心度分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ age, value }) => `${age}: ${value}%`}
                    labelLine={false}
                  >
                    {demographicsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              30代が最も高い関心を示し、20-40代で全体の85%を占める。
            </p>
          </CardContent>
        </Card>

        {/* Related Ingredients */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">関連成分ネットワーク</CardTitle>
            <CardDescription>共起頻度の高い成分</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatedIngredients.map((ingredient) => (
                <div key={ingredient.name} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{ingredient.name}</span>
                      <span className="text-xs text-muted-foreground">{(ingredient.correlation * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${ingredient.correlation * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SNS Posts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">関連SNS投稿</CardTitle>
          <CardDescription>リアルタイムの消費者の声</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {snsPosts.map((post, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {post.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {post.comments.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
