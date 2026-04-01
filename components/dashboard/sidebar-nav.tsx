"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
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
  MonitorSmartphone,
  Brain,
  Lightbulb,
  BarChart3,
  Swords,
  FileBarChart,
  FlaskConical,
  Boxes,
  Cpu,
  ChevronRight,
  Users,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Section-based navigation structure (Suntory style)
const navSections = [
  {
    label: "ANALYTICS",
    defaultOpen: true,
    items: [
      { title: "Market Overview", icon: Users, href: "/dashboard/market-overview" },
      { title: "トレンド一覧", icon: TrendingUp, href: "/dashboard/trends" },
      { title: "デジタルシェルフ分析", icon: MonitorSmartphone, href: "/dashboard/digital-shelf" },
    ],
  },
  {
    label: "AI ANALYSIS",
    defaultOpen: true,
    items: [
      { title: "相関発見", icon: Cpu, href: "/ai/correlations" },
      { title: "トレンド予測", icon: BarChart3, href: "/ai/predictions" },
      { title: "競合分析", icon: Swords, href: "/ai/competitors" },
    ],
  },
  {
    label: "DEVELOPMENT",
    defaultOpen: true,
    items: [
      { title: "コンセプト生成", icon: Lightbulb, href: "/ai/concept-generator" },
      { title: "素材データベース", icon: FlaskConical, href: "/ai/materials" },
      { title: "改定シミュレーター", icon: Boxes, href: "/ai/simulator" },
    ],
  },
  {
    label: "INSIGHTS",
    defaultOpen: false,
    items: [
      { title: "統合エクスプローラー", icon: Search, href: "/insights/explorer" },
      { title: "チャネル分析", icon: Store, href: "/channels" },
    ],
  },
  {
    label: "REPORTS",
    defaultOpen: false,
    items: [
      { title: "自動生成", icon: Zap, href: "/reports" },
      { title: "ドライブ", icon: FolderOpen, href: "/drive" },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    navSections.reduce((acc, section) => ({ ...acc, [section.label]: section.defaultOpen }), {})
  )

  const isActive = (href: string) => pathname === href

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      {/* Header with Logo - Match sidebar background */}
      <SidebarHeader className="p-0 border-b border-sidebar-border">
        <Link href="/" className="block bg-sidebar pl-3 pr-2 py-1.5">
          <Image 
            src="/images/suntory-logo.png" 
            alt="SUNTORY BEVERAGE & FOOD" 
            width={130} 
            height={24}
            className="object-contain object-left"
          />
        </Link>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-3 py-4">
        {navSections.map((section) => (
          <Collapsible
            key={section.label}
            open={openSections[section.label]}
            onOpenChange={() => toggleSection(section.label)}
            className="mb-2"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-semibold tracking-wider text-primary uppercase hover:text-primary/80 transition-colors">
              <span>{section.label}</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  openSections[section.label] ? "" : "-rotate-90"
                }`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu className="mt-1">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`gap-3 h-10 rounded-lg transition-all ${
                          active 
                            ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90" 
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.title}</span>
                          </span>
                          {active && <ChevronRight className="h-4 w-4" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer with User Profile */}
      <SidebarFooter className="p-3">
        <div className="flex items-center justify-between">
          {/* User Avatar and Name */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg p-2 text-left hover:bg-muted transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/avatar-businessman.jpg" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">TY</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">山田 太郎</span>
                  <span className="text-[10px] text-muted-foreground">マーケティ...</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  アカウント設定
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notification and Settings Icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
