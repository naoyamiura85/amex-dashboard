"use client"

import { useState } from "react"
import { Plus, Sparkles, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTrends, TrendStatus } from "@/contexts/trends-context"
import { useCategoryMode } from "@/contexts/category-mode-context"

const categories = [
  { value: "food", label: "食品" },
  { value: "beverage", label: "飲料" },
  { value: "cosmetics", label: "化粧品" },
  { value: "supplement", label: "サプリメント" },
  { value: "toiletry", label: "トイレタリー" },
  { value: "wellness", label: "ウェルネス" },
]

export function AddTrendDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addTrend } = useTrends()
  const { mode } = useCategoryMode()

  // Pre-select category based on current mode
  const defaultCategory = mode !== "all" ? mode : ""

  const handleSubmit = async () => {
    if (!name || !category) return

    setIsSubmitting(true)

    const categoryLabel = categories.find(c => c.value === category)?.label || category

    // Add trend with initial estimated values
    addTrend({
      name,
      category,
      categoryLabel,
      socialShare: "0.0%",
      yoyGrowth: "調査中",
      growthType: "up",
      status: "Emerging" as TrendStatus,
      mentions: "調査中",
      description: description || `${name}に関するトレンド分析を実行中...`,
      popularityScore: 0,
    })

    // Reset form
    setName("")
    setCategory(defaultCategory)
    setDescription("")
    setIsSubmitting(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          トレンドを追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            新しいトレンドを追加
          </DialogTitle>
          <DialogDescription>
            トレンドキーワードを入力すると、AIが自動でディープリサーチを実行します。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">トレンド名 *</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="例: グルテンフリーパスタ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">カテゴリ *</Label>
            <Select value={category || defaultCategory} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">説明（オプション）</Label>
            <Textarea
              id="description"
              placeholder="このトレンドについての概要や調査したいポイントを入力..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="font-medium text-foreground">AIディープリサーチ</p>
                <p className="mt-1">
                  追加後、以下の分析が自動実行されます：
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>SNS言及数・成長率の分析</li>
                  <li>関連成分・原材料の特定</li>
                  <li>ターゲットデモグラフィック</li>
                  <li>地域別トレンド分布</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!name || !category || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                処理中...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                追加してリサーチ開始
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
