"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Store,
  Zap,
  FolderOpen,
  Settings,
  ChevronDown,
  LogOut,
  Bell,
  TrendingUp,
  Eye,
  Brain,
  Lightbulb,
  BarChart3,
  Swords,
  FileBarChart,
  FlaskConical,
  Boxes,
  Cpu,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { PanelLeftClose } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCategoryMode, categoryModeConfig, CategoryMode } from "@/contexts/category-mode-context"
import { 
  Apple, 
  Coffee, 
  Sparkles, 
  Pill as PillIcon, 
  Bath, 
  Heart,
  Layers
} from "lucide-react"

const categoryModeIcons: Record<CategoryMode, React.ElementType> = {
  all: Layers,
  food: Apple,
  beverage: Coffee,
  cosmetics: Sparkles,
  supplement: PillIcon,
  toiletry: Bath,
  wellness: Heart,
}

function CategoryModeSelector() {
  const { mode, setMode, modeLabel } = useCategoryMode()
  const Icon = categoryModeIcons[mode]
  const config = categoryModeConfig[mode]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-sidebar-accent transition-colors">
          <div className={`flex h-8 w-8 items-center justify-center rounded-md ${config.bgColor}`}>
            <Icon className={`h-4 w-4 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">表示モード</p>
            <p className={`text-sm font-semibold ${config.color}`}>{modeLabel}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" className="w-[220px]">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          カテゴリを選択
        </div>
        <DropdownMenuSeparator />
        {(Object.keys(categoryModeConfig) as CategoryMode[]).map((key) => {
          const itemConfig = categoryModeConfig[key]
          const ItemIcon = categoryModeIcons[key]
          const isSelected = mode === key
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => setMode(key)}
              className={`gap-3 ${isSelected ? "bg-sidebar-accent" : ""}`}
            >
              <div className={`flex h-6 w-6 items-center justify-center rounded ${itemConfig.bgColor}`}>
                <ItemIcon className={`h-3.5 w-3.5 ${itemConfig.color}`} />
              </div>
              <span className={isSelected ? "font-medium" : ""}>{itemConfig.label}</span>
              {isSelected && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Section-based navigation structure (like Suntory design)
const navSections = [
  {
    label: "ANALYTICS",
    items: [
      { title: "トレンド一覧", icon: TrendingUp, href: "/dashboard/trends" },
      { title: "トレンド詳細", icon: Eye, href: "/dashboard/spotlight" },
    ],
  },
  {
    label: "AI ANALYSIS",
    items: [
      { title: "相関発見", icon: Cpu, href: "/ai/correlations" },
      { title: "トレンド予測", icon: BarChart3, href: "/ai/predictions" },
      { title: "競合分析", icon: Swords, href: "/ai/competitors" },
    ],
  },
  {
    label: "DEVELOPMENT",
    items: [
      { title: "コンセプト生成", icon: Lightbulb, href: "/ai/concept-generator" },
      { title: "素材データベース", icon: FlaskConical, href: "/ai/materials" },
      { title: "改定シミュレーター", icon: Boxes, href: "/ai/simulator" },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      { title: "統合エクスプローラー", icon: Search, href: "/insights/explorer" },
      { title: "チャネル分析", icon: Store, href: "/channels" },
    ],
  },
  {
    label: "REPORTS",
    items: [
      { title: "自動生成", icon: Zap, href: "/reports" },
      { title: "ドライブ", icon: FolderOpen, href: "/drive" },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  const isActive = (href: string) => pathname === href

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
              <span className="text-base font-bold text-primary-foreground">Y</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight">YAPPI</span>
              <span className="text-[10px] text-muted-foreground leading-tight">Consumer Intelligence</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
          >
            <PanelLeftClose className="h-4 w-4" />
            <span className="sr-only">サイドバーを閉じる</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {navSections.map((section) => (
          <SidebarGroup key={section.label} className="py-2">
            <SidebarGroupLabel className="px-3 text-[11px] font-semibold tracking-wider text-primary/70 uppercase">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`gap-3 h-10 rounded-lg transition-all ${
                          active 
                            ? "bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90" 
                            : "text-foreground/80 hover:bg-sidebar-accent hover:text-foreground"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            <item.icon className={`h-4 w-4 ${active ? "" : "text-muted-foreground"}`} />
                            <span>{item.title}</span>
                          </span>
                          {active && <ChevronRight className="h-4 w-4" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-3 space-y-3">
        {/* Category Mode Selector */}
        <CategoryModeSelector />
        
        {/* User Profile */}
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-1 min-w-0 items-center gap-2 rounded-lg p-2 text-left hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=yappi" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">YP</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">山田 花子</p>
                  <p className="text-[11px] text-muted-foreground truncate">yamada@company.co.jp</p>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  アカウント設定
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                通知設定
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
