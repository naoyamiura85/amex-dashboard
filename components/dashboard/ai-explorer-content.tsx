'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Sparkles, TrendingUp, Users, Zap, Share2, Download } from 'lucide-react'

export function AIExplorerContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const recommendations = [
    {
      id: 1,
      type: 'correlation',
      title: '睡眠サプリ × スキンケア',
      description: '睡眠品質の改善がスキンケア需要を42%増加させる相関を発見',
      confidence: 92,
      icon: Sparkles,
    },
    {
      id: 2,
      type: 'material',
      title: 'バクチオール × ナイアシンアミド',
      description: '相乗効果により肌改善効果が56%向上する素材ペアを検出',
      confidence: 88,
      icon: Zap,
    },
    {
      id: 3,
      type: 'trend',
      title: '韓国コスメ × 敏感肌ケア',
      description: '韓国コスメ市場で敏感肌向け商品が前年比+73%で成長中',
      confidence: 95,
      icon: TrendingUp,
    },
    {
      id: 4,
      type: 'segment',
      title: '20代女性の透明感志向',
      description: '美白・透明感重視層で検索ボリュームが急速に成長、対応商品不足',
      confidence: 87,
      icon: Users,
    },
  ]

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rec.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || rec.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">統合エクスプローラー</h1>
        <p className="text-muted-foreground">
          AIが発見した相関、トレンド、機会をワンプレイスで探索・検索できます
        </p>
      </div>

      {/* Search & Filter */}
      <Card className="rounded-xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="相関、素材、ニーズを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'correlation', 'material', 'trend', 'segment'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full"
                >
                  {cat === 'all' && 'すべて'}
                  {cat === 'correlation' && '相関発見'}
                  {cat === 'material' && '素材シナジー'}
                  {cat === 'trend' && 'トレンド'}
                  {cat === 'segment' && 'セグメント'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecommendations.map((rec) => {
          const IconComponent = rec.icon
          return (
            <Card key={rec.id} className="rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold line-clamp-1">{rec.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">確信度</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${rec.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right">{rec.confidence}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs rounded-lg">
                    詳細
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {filteredRecommendations.length === 0 && (
        <Card className="rounded-xl border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">検索に一致する結果がありません</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
