"use client"

import { cn } from "@/lib/utils"

export interface FilterTab {
  key: string
  label: string
  color?: string // 選択時のアクセントカラー（任意）
  icon?: string // アイコン画像URL（任意）
}

interface FilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (key: string) => void
  variant?: "pill" | "rounded" // pill: 丸みの強いボタン, rounded: 角丸ボタン
  size?: "sm" | "md"
  className?: string
}

export function FilterTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "pill",
  size = "md",
  className,
}: FilterTabsProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  }

  const variantClasses = {
    pill: "rounded-full",
    rounded: "rounded-lg",
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        const accentColor = tab.color || "#006FCF"

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "font-medium border transition-all flex items-center gap-2",
              sizeClasses[size],
              variantClasses[variant],
              isActive
                ? "text-white border-transparent shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            )}
            style={
              isActive
                ? { backgroundColor: accentColor, borderColor: accentColor }
                : undefined
            }
          >
            {tab.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tab.icon} alt="" className="w-5 h-4 object-cover rounded-sm" />
            )}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
