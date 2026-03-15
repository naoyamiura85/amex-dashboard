"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Category = "all" | "food" | "cosmetics" | "toiletry" | "supplement" | "wellness" | "cross"

interface CategoryFilterProps {
  onCategoryChange?: (category: Category) => void
}

const categories: { id: Category; label: string; color?: string }[] = [
  { id: "all", label: "すべて" },
  { id: "food", label: "食品・飲料", color: "bg-emerald-500" },
  { id: "cosmetics", label: "化粧品", color: "bg-pink-500" },
  { id: "toiletry", label: "トイレタリー", color: "bg-blue-500" },
  { id: "supplement", label: "サプリ", color: "bg-orange-500" },
  { id: "wellness", label: "ウェルネス", color: "bg-violet-500" },
  { id: "cross", label: "クロスカテゴリ" },
]

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category)
    onCategoryChange?.(category)
  }

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "secondary" : "ghost"}
          size="sm"
          className={`h-8 px-3 text-xs font-medium transition-all ${
            activeCategory === category.id 
              ? "bg-background shadow-sm text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.color && (
            <span className={`w-2 h-2 rounded-full ${category.color} mr-1.5`} />
          )}
          {category.label}
        </Button>
      ))}
    </div>
  )
}
