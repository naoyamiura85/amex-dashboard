"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type CategoryMode = "all" | "food" | "beverage" | "cosmetics" | "supplement" | "toiletry" | "wellness"

interface CategoryModeContextType {
  mode: CategoryMode
  setMode: (mode: CategoryMode) => void
  modeLabel: string
  modeColor: string
}

const categoryModeConfig: Record<CategoryMode, { label: string; color: string; bgColor: string }> = {
  all: { label: "すべて", color: "text-foreground", bgColor: "bg-muted" },
  food: { label: "食品", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  beverage: { label: "飲料", color: "text-sky-600", bgColor: "bg-sky-50" },
  cosmetics: { label: "化粧品", color: "text-rose-500", bgColor: "bg-rose-50" },
  supplement: { label: "サプリメント", color: "text-amber-600", bgColor: "bg-amber-50" },
  toiletry: { label: "トイレタリー", color: "text-blue-600", bgColor: "bg-blue-50" },
  wellness: { label: "ウェルネス", color: "text-violet-600", bgColor: "bg-violet-50" },
}

const CategoryModeContext = createContext<CategoryModeContextType | undefined>(undefined)

export function CategoryModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CategoryMode>("all")

  const config = categoryModeConfig[mode]

  return (
    <CategoryModeContext.Provider
      value={{
        mode,
        setMode,
        modeLabel: config.label,
        modeColor: config.color,
      }}
    >
      {children}
    </CategoryModeContext.Provider>
  )
}

export function useCategoryMode() {
  const context = useContext(CategoryModeContext)
  if (context === undefined) {
    throw new Error("useCategoryMode must be used within a CategoryModeProvider")
  }
  return context
}

export { categoryModeConfig }
