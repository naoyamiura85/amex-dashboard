"use client"

import { useState } from "react"
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
  PieChart,
  FlaskConical,
  Package,
  Target,
  Clock,
  Users,
  MapPin,
  Utensils,
  Pill,
  ShoppingBag,
  ShoppingCart,
  Globe,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeft } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/trends",
    subItems: [
      { title: "Top Trends", icon: TrendingUp, href: "/dashboard/trends" },
      { title: "Trend Spotlight", icon: Eye, href: "/dashboard/spotlight" },
      { title: "Category Dashboard", icon: PieChart, href: "/dashboard/category" },
    ],
  },
  {
    title: "Explore",
    icon: Search,
    href: "/explore",
    subItems: [
      { title: "成分・原材料", icon: FlaskConical, href: "/explore/ingredients" },
      { title: "商品タイプ", icon: Package, href: "/explore/products" },
      { title: "消費者ニーズ", icon: Target, href: "/explore/needs" },
      { title: "消費モーメント", icon: Clock, href: "/explore/moments" },
      { title: "デモグラフィック", icon: Users, href: "/explore/demographics" },
      { title: "地域", icon: MapPin, href: "/explore/regions" },
    ],
  },
  {
    title: "Channels",
    icon: Store,
    href: "/channels",
    subItems: [
      { title: "概要", icon: PieChart, href: "/channels" },
      { title: "外食メニュー", icon: Utensils, href: "/channels/foodservice" },
      { title: "ドラッグストア", icon: Pill, href: "/channels/drugstore" },
      { title: "コンビニ", icon: ShoppingBag, href: "/channels/cvs" },
      { title: "EC", icon: Globe, href: "/channels/ec" },
      { title: "GMS/スーパー", icon: ShoppingCart, href: "/channels/gms" },
    ],
  },
  {
    title: "Solutions",
    icon: Zap,
    href: "/solutions",
  },
  {
    title: "Drive",
    icon: FolderOpen,
    href: "/drive",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>(["Dashboard"])
  const { toggleSidebar, open } = useSidebar()

  const toggleMenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (item: typeof navItems[0]) => {
    if (isActive(item.href)) return true
    return item.subItems?.some(sub => isActive(sub.href))
  }

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary shadow-sm">
              <span className="text-sm font-bold text-primary-foreground">Y</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground tracking-tight">YAPPI</span>
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

      <SidebarSeparator />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openMenus.includes(item.title)}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`gap-3 h-10 justify-between ${
                            isParentActive(item) ? "bg-sidebar-accent text-primary font-medium" : ""
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openMenus.includes(item.title) ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.href)}
                              >
                                <Link href={subItem.href} className="flex items-center gap-2">
                                  <subItem.icon className="h-3.5 w-3.5" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      className="gap-3 h-10"
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-1 items-center gap-3 rounded-lg p-2 text-left hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=yappi" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">YP</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">山田 花子</p>
                  <p className="text-xs text-muted-foreground truncate">yamada@company.co.jp</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              アカウント設定
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
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">設定</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
