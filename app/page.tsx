import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RevenueChart, CategoryChart, WeeklyOrdersChart } from "@/components/dashboard/charts"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">ダッシュボード</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  ビジネスの概要とパフォーマンスを確認できます
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <RevenueChart />
              <CategoryChart />
            </div>

            {/* Bottom Section */}
            <div className="grid gap-6 lg:grid-cols-3">
              <RecentOrders />
              <div className="space-y-6">
                <WeeklyOrdersChart />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
