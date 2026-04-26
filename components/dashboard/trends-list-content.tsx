"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Grid3X3,
  List,
  ArrowUpRight,
  Flame,
  Clock,
  Loader2,
  Bell,
} from "lucide-react"
import { useCategoryMode, categoryModeConfig } from "@/contexts/category-mode-context"
import { useTrends } from "@/contexts/trends-context"
import { AddTrendDialog } from "./add-trend-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterTabs } from "@/components/ui/filter-tabs"

// メインタブ定義: All / Travel / Dining / Entertainment
const MAIN_TABS = [
  { key: "all",           label: "すべて",        categories: ["space", "expedition", "culture", "sciencetech"] },
  { key: "travel",        label: "Travel",        categories: ["space", "expedition"] },
  { key: "dining",        label: "Dining",        categories: ["culture"] },
  { key: "entertainment", label: "Entertainment", categories: ["sciencetech"] },
] as const
type MainTabKey = typeof MAIN_TABS[number]["key"]

// Category mapping — 体験軸・5〜10年後の兆しトレンド
const categoryModeMapping: Record<string, string[]> = {
  all:         [],
  space:       ["space"],
  expedition:  ["expedition"],
  culture:     ["culture"],
  sciencetech: ["sciencetech"],
}

const categoryColors: Record<string, string> = {
  space:       "bg-indigo-100 text-indigo-700",
  expedition:  "bg-sky-100 text-sky-700",
  culture:     "bg-amber-100 text-amber-800",
  sciencetech: "bg-emerald-100 text-emerald-700",
}

const statusColors: Record<string, string> = {
  Growing: "bg-emerald-100 text-emerald-700",
  Stable: "bg-blue-100 text-blue-700",
  Emerging: "bg-amber-100 text-amber-700",
  Declining: "bg-red-100 text-red-700",
}

// 国タブ定義
const COUNTRIES = [
  { code: "all", name: "すべて", flag: "" },
  { code: "jp", name: "日本", flag: "/images/flags/jp.jpg" },
  { code: "us", name: "US", flag: "/images/flags/us.jpg" },
  { code: "uk", name: "UK", flag: "/images/flags/uk.jpg" },
  { code: "mx", name: "メキシコ", flag: "/images/flags/mx.jpg" },
  { code: "ca", name: "カナダ", flag: "/images/flags/ca.jpg" },
]

export function TrendsListContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("growth")
  const [selectedTab, setSelectedTab] = useState<MainTabKey>("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const { mode, modeLabel } = useCategoryMode()
  const modeConfig = categoryModeConfig[mode]
  const { trends } = useTrends()
  
  const currentTabConfig = MAIN_TABS.find(t => t.key === selectedTab)!

  // First filter by main tab, then by additional filters
  const filteredTrends = useMemo(() => {
    return trends
      .filter(trend => {
        // Apply main tab filter first
        const matchesTab = currentTabConfig.categories.includes(trend.category)
        
        // Apply country filter
        const matchesCountry = selectedCountry === "all" || !trend.country || trend.country === selectedCountry
        
        // Apply category mode filter
        const modeCategories = categoryModeMapping[mode]
        const matchesMode = modeCategories.length === 0 || modeCategories.includes(trend.category)
        
        // Then apply search filter
        const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             trend.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Then apply additional category filter (only if mode is "all")
        const matchesCategory = mode !== "all" || selectedCategories.length === 0 || selectedCategories.includes(trend.category)
        
        return matchesTab && matchesCountry && matchesMode && matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === "growth") {
          const aGrowth = parseFloat(a.yoyGrowth.replace(/[^-\d.]/g, '')) || 0
          const bGrowth = parseFloat(b.yoyGrowth.replace(/[^-\d.]/g, '')) || 0
          return bGrowth - aGrowth
        } else if (sortBy === "mentions") {
          const aMentions = parseInt(a.mentions.replace(/[^\d]/g, '')) || 0
          const bMentions = parseInt(b.mentions.replace(/[^\d]/g, '')) || 0
          return bMentions - aMentions
        } else if (sortBy === "popularity") {
          return b.popularityScore - a.popularityScore
        }
        return 0
      })
  }, [trends, mode, searchQuery, selectedCategories, sortBy, currentTabConfig, selectedCountry])

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      <div className="w-full space-y-6">
          {/* Filters Row */}
          <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Main Tabs: Travel / Dining / Entertainment */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {MAIN_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                    selectedTab === tab.key
                      ? "bg-white text-[#006FCF] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {mode !== "all" && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${modeConfig.bgColor} ${modeConfig.color}`}>
                {modeLabel}モード
              </span>
            )}
          </div>
          <AddTrendDialog />
        </div>

        {/* 国タブ */}
        <FilterTabs
          tabs={COUNTRIES.map(c => ({ key: c.code, label: c.name, icon: c.flag }))}
          activeTab={selectedCountry}
          onTabChange={setSelectedCountry}
          variant="pill"
        />

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="トレンドを検索..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {mode === "all" && (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  カテゴリ
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {[
                  { value: "space",       label: "宇宙体験" },
                  { value: "expedition",  label: "フィールド探検" },
                  { value: "culture",     label: "カルチャー体験" },
                  { value: "sciencetech", label: "サイエンス体験" },
                ].map(({ value, label }) => (
                  <DropdownMenuCheckboxItem
                    key={value}
                    checked={selectedCategories.includes(value)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories(prev =>
                        checked ? [...prev, value] : prev.filter(c => c !== value)
                      )
                    }}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            )}

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">成長率順</SelectItem>
                <SelectItem value="mentions">言及量順</SelectItem>
                <SelectItem value="popularity">人気度順</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="px-2">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-2">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Trends Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTrends.map((trend) => (
            <Link key={trend.id} href={`/dashboard/trends/${trend.id}`}>
              <Card className={`shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group h-full overflow-hidden ${
                trend.researchStatus === "researching" ? "border-primary/50 animate-pulse" : ""
              } ${trend.researchStatus === "queued" ? "opacity-70" : ""}`}>
                {/* Image */}
                {trend.imageUrl && (
                  <div className="h-32 bg-muted overflow-hidden relative">
                    <img 
                      src={trend.imageUrl} 
                      alt={trend.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={categoryColors[trend.category]}>
                      {trend.categoryLabel}
                    </Badge>
                    {trend.researchStatus === "researching" ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        分析中
                      </Badge>
                    ) : trend.researchStatus === "queued" ? (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 gap-1">
                        <Clock className="h-3 w-3" />
                        待機中
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className={statusColors[trend.status]}>
                        {trend.status}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-semibold mt-2 group-hover:text-primary transition-colors flex items-center gap-1">
                    {trend.name}
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {trend.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">YoY Growth</p>
                      <p className={`text-sm font-semibold flex items-center gap-1 ${
                        trend.growthType === "up" ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {trend.growthType === "up" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {trend.yoyGrowth}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Mentions</p>
                      <p className="text-sm font-semibold">{trend.mentions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredTrends.map((trend) => (
                <Link key={trend.id} href={`/dashboard/trends/${trend.id}`}>
                  <div className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group ${
                    trend.researchStatus === "researching" ? "bg-primary/5" : ""
                  } ${trend.researchStatus === "queued" ? "opacity-70" : ""}`}>
                    {/* Image Thumbnail */}
                    {trend.imageUrl && (
                      <div className="h-16 w-16 rounded-lg bg-muted shrink-0 overflow-hidden">
                        <img 
                          src={trend.imageUrl} 
                          alt={trend.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className={categoryColors[trend.category]}>
                          {trend.categoryLabel}
                        </Badge>
                        {trend.researchStatus === "researching" ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            分析中
                          </Badge>
                        ) : trend.researchStatus === "queued" ? (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 gap-1">
                            <Clock className="h-3 w-3" />
                            待機中
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className={statusColors[trend.status]}>
                            {trend.status}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {trend.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{trend.description}</p>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div>
                        <p className="text-xs text-muted-foreground">YoY Growth</p>
                        <p className={`text-sm font-semibold flex items-center gap-1 ${
                          trend.growthType === "up" ? "text-emerald-600" : "text-red-600"
                        }`}>
                          {trend.growthType === "up" ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {trend.yoyGrowth}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mentions</p>
                        <p className="text-sm font-semibold">{trend.mentions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Social Share</p>
                        <p className="text-sm font-semibold">{trend.socialShare}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </main>
  )
}
