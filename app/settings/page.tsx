"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { YappiChat } from "@/components/dashboard/yappi-chat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Palette, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">設定</h1>
              <p className="text-sm text-muted-foreground mt-1">アカウントと環境設定を管理</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  プロフィール
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  通知
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="h-4 w-4" />
                  表示
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Shield className="h-4 w-4" />
                  セキュリティ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">プロフィール情報</CardTitle>
                    <CardDescription>基本情報を更新します</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=yappi" />
                        <AvatarFallback className="text-lg">YP</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">画像を変更</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">名前</Label>
                        <Input id="name" defaultValue="山田 花子" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" type="email" defaultValue="yamada@company.co.jp" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">会社名</Label>
                        <Input id="company" defaultValue="株式会社サンプル" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">部署</Label>
                        <Input id="department" defaultValue="マーケティング部" />
                      </div>
                    </div>
                    <Button className="bg-primary">変更を保存</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">通知設定</CardTitle>
                    <CardDescription>通知の受け取り方法を設定します</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">トレンドアラート</p>
                        <p className="text-sm text-muted-foreground">新しいトレンドが検出された時に通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">週次レポート</p>
                        <p className="text-sm text-muted-foreground">毎週のサマリーレポートをメールで受信</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">チームメンション</p>
                        <p className="text-sm text-muted-foreground">チームメンバーからメンションされた時に通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">システム通知</p>
                        <p className="text-sm text-muted-foreground">メンテナンスや更新情報の通知</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">表示設定</CardTitle>
                    <CardDescription>UIの表示方法をカスタマイズします</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">言語</p>
                        <p className="text-sm text-muted-foreground">インターフェースの言語</p>
                      </div>
                      <Select defaultValue="ja">
                        <SelectTrigger className="w-[180px]">
                          <Globe className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">コンパクトモード</p>
                        <p className="text-sm text-muted-foreground">UIの表示密度を高くする</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">セキュリティ設定</CardTitle>
                    <CardDescription>アカウントのセキュリティを管理します</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">二要素認証</p>
                        <p className="text-sm text-muted-foreground">ログイン時に追加の認証を要求</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="outline">パスワードを変更</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
