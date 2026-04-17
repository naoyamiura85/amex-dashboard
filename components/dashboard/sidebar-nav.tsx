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
  ChevronRight,
  Network,
  Globe,
  BarChart2,
  UserSearch,
  Target,
  PieChart,
  Route,
  Swords,
  Layers,
  BrainCircuit,
  SlidersHorizontal,
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
    label: "GLOBAL VIEW",
    defaultOpen: true,
    items: [
      { title: "Market Overview",        icon: Globe,          href: "/dashboard" },
      { title: "Trend Analysis",         icon: TrendingUp,     href: "/dashboard/trends" },
    ],
  },
  {
    label: "JAPAN MARKET",
    defaultOpen: true,
    items: [
      { title: "Market Analysis",        icon: PieChart,       href: "/dashboard/market-overview" },
      { title: "Tribe Analysis",         icon: Network,        href: "/dashboard/tribe-analysis" },
      { title: "Experience Analysis",    icon: Route,          href: "/dashboard/experience-analysis" },
      { title: "Insight Analysis",       icon: BrainCircuit,   href: "/dashboard/micro-simulation" },
    ],
  },
  {
    label: "JAPAN BRAND PLAN",
    defaultOpen: true,
    items: [
      { title: "Scenario Generator（準備中）", icon: Target,           href: "#", disabled: true },
      { title: "Macro Simulation",            icon: SlidersHorizontal, href: "/dashboard/macro-simulation" },
      { title: "Competitor Analysis",         icon: Swords,            href: "/dashboard/competitor-analysis" },
      { title: "Plan Simulation",             icon: Layers,            href: "/dashboard/media-allocation" },
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
        <Link href="/" className="flex items-center gap-2 px-3 py-2.5">
          {brand.logo ? (
            <Image 
              src={brand.logo}
              alt={brand.name}
              width={68} 
              height={20}
              className="object-contain object-left shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div 
              className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: brand.colors.primary }}
            >
              {brand.shortName.charAt(0)}
            </div>
          )}
          <div className="flex flex-col border-l border-sidebar-border pl-2 min-w-0">
            <span className="text-[11px] font-bold text-sidebar-foreground leading-tight truncate">{brand.dashboardTitle}</span>
            <span className="text-[9px] text-sidebar-foreground/60 leading-tight truncate">{brand.name}</span>
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
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1.5 text-[10px] font-bold tracking-widest text-sidebar-foreground/40 uppercase hover:text-sidebar-foreground transition-colors">
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
                  const isDisabled = 'disabled' in item && item.disabled
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild={!isDisabled}
                        tooltip={{ children: null, hidden: true }}
                        className={`gap-3 h-10 rounded-lg transition-all ${
                          isDisabled
                            ? "text-sidebar-foreground/40 cursor-not-allowed"
                            : active 
                              ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold hover:bg-sidebar-primary/90" 
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }`}
                      >
                        {isDisabled ? (
                          <span className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span className="text-sm leading-tight">{item.title}</span>
                          </span>
                        ) : (
                          <Link href={item.href} className="flex items-center justify-between">
                            <span className="flex items-center gap-3">
                              <item.icon className="h-4 w-4 shrink-0" />
                              <span className="text-sm leading-tight">{item.title}</span>
                            </span>
                            {active && <ChevronRight className="h-4 w-4 shrink-0 opacity-80" />}
                          </Link>
                        )}
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
