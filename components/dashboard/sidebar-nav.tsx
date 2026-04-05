"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useMemo } from "react"
import {
  Settings,
  ChevronDown,
  LogOut,
  Bell,
  TrendingUp,
  MonitorSmartphone,
  Lightbulb,
  FlaskConical,
  Boxes,
  ChevronRight,
  Users,
} from "lucide-react"
import { getClientConfig } from "@/lib/client-config"

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

// Section-based navigation structure (AMEX Financial Analytics)
const navSections = [
  {
    label: "OVERVIEW",
    defaultOpen: true,
    items: [
      { title: "エグゼクティブサマリー", icon: Users, href: "/dashboard" },
      { title: "会員分析", icon: TrendingUp, href: "/dashboard/market-overview" },
      { title: "カード利用分析", icon: MonitorSmartphone, href: "/dashboard/digital-shelf" },
    ],
  },
  {
    label: "AI ANALYTICS",
    defaultOpen: true,
    items: [
      { title: "AIインサイト・予測", icon: Lightbulb, href: "/ai/predictions" },
      { title: "競合・市場分析", icon: FlaskConical, href: "/ai/competitors" },
      { title: "相関分析", icon: Boxes, href: "/ai/correlations" },
    ],
  },
  {
    label: "SIMULATION",
    defaultOpen: true,
    items: [
      { title: "審査シミュレーター", icon: FlaskConical, href: "/ai/simulator" },
      { title: "コンセプト生成", icon: Lightbulb, href: "/ai/concept-generator" },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const clientConfig = useMemo(() => getClientConfig(), [])
  const { brand } = clientConfig
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    navSections.reduce((acc, section) => ({ ...acc, [section.label]: section.defaultOpen }), {})
  )

  const isActive = (href: string) => pathname === href

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <Sidebar className="border-r border-sidebar-border" style={{ backgroundColor: 'var(--sidebar)' }}>
      {/* Header with Logo */}
      <SidebarHeader className="p-0 border-b border-sidebar-border" style={{ backgroundColor: 'var(--sidebar)' }}>
        <Link href="/" className="flex items-center gap-3 px-4 py-3">
          {brand.logo ? (
            <Image 
              src={brand.logo}
              alt={brand.name}
              width={100} 
              height={24}
              className="object-contain object-left brightness-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: brand.colors.primary }}
            >
              {brand.shortName.charAt(0)}
            </div>
          )}
          <div className="flex flex-col border-l border-white/20 pl-3">
            <span className="text-xs font-bold text-sidebar-foreground leading-tight">{brand.dashboardTitle}</span>
            <span className="text-[10px] text-sidebar-foreground/60 leading-tight">{brand.name}</span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-3 py-4" style={{ backgroundColor: 'var(--sidebar)' }}>
        {navSections.map((section) => (
          <Collapsible
            key={section.label}
            open={openSections[section.label]}
            onOpenChange={() => toggleSection(section.label)}
            className="mb-3"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1.5 text-[10px] font-bold tracking-widest text-sidebar-foreground/50 uppercase hover:text-sidebar-foreground/80 transition-colors">
              <span>{section.label}</span>
              <ChevronDown 
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
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
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold hover:bg-sidebar-primary/90" 
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span className="text-sm leading-tight">{item.title}</span>
                          </span>
                          {active && <ChevronRight className="h-4 w-4 shrink-0 opacity-80" />}
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

      <SidebarSeparator className="bg-sidebar-border" />

      {/* Footer with User Profile */}
      <SidebarFooter className="p-3" style={{ backgroundColor: 'var(--sidebar)' }}>
        <div className="flex items-center justify-between">
          {/* User Avatar and Name */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg p-2 text-left hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/avatar-businessman.jpg" />
                  <AvatarFallback className="bg-sidebar-primary/30 text-sidebar-foreground text-xs">TY</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-sidebar-foreground">山田 太郎</span>
                  <span className="text-[10px] text-sidebar-foreground/50">マーケティ...</span>
                </div>
                <ChevronDown className="h-4 w-4 text-sidebar-foreground/50 ml-1" />
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
            <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
