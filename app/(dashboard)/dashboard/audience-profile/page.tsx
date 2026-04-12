"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const COUNTRIES = [
  { id: "jp", name: "日本", flag: "🇯🇵" },
  { id: "us", name: "US", flag: "🇺🇸" },
  { id: "uk", name: "UK", flag: "🇬🇧" },
  { id: "mx", name: "メキシコ", flag: "🇲🇽" },
  { id: "ca", name: "カナダ", flag: "🇨🇦" },
]

const AUDIENCE_DATA: Record<string, { personas: { name: string; age: string; occupation: string; income: string; interests: string[]; quote: string; avatar: string }[]; demographics: { label: string; value: string }[] }> = {
  jp: {
    personas: [
      { name: "田中 健一", age: "42歳", occupation: "外資系企業 部長", income: "1,500万円+", interests: ["ゴルフ", "高級ダイニング", "海外旅行"], quote: "ステータスと実用性を兼ね備えたカードを求めています", avatar: "/placeholder.svg" },
      { name: "佐藤 美咲", age: "35歳", occupation: "医師", income: "1,200万円+", interests: ["ワイン", "アート", "ウェルネス"], quote: "特別な体験と手厚いサービスが決め手です", avatar: "/placeholder.svg" },
    ],
    demographics: [
      { label: "平均年齢", value: "38歳" },
      { label: "平均世帯年収", value: "1,250万円" },
      { label: "男女比", value: "65:35" },
      { label: "都市部居住率", value: "78%" },
    ],
  },
  us: {
    personas: [
      { name: "Michael Chen", age: "45", occupation: "Tech Executive", income: "$250K+", interests: ["Travel", "Fine Dining", "Golf"], quote: "I value premium rewards and global acceptance", avatar: "/placeholder.svg" },
      { name: "Sarah Williams", age: "38", occupation: "Investment Banker", income: "$300K+", interests: ["Luxury Shopping", "Spa", "Art"], quote: "The concierge service is unmatched", avatar: "/placeholder.svg" },
    ],
    demographics: [
      { label: "Avg Age", value: "42" },
      { label: "Avg Income", value: "$220K" },
      { label: "Gender Ratio", value: "58:42" },
      { label: "Urban Rate", value: "82%" },
    ],
  },
  uk: {
    personas: [
      { name: "James Thompson", age: "48", occupation: "Barrister", income: "£180K+", interests: ["Theatre", "Wine", "Travel"], quote: "Heritage and prestige matter to me", avatar: "/placeholder.svg" },
    ],
    demographics: [
      { label: "Avg Age", value: "44" },
      { label: "Avg Income", value: "£165K" },
      { label: "Gender Ratio", value: "62:38" },
      { label: "Urban Rate", value: "75%" },
    ],
  },
  mx: {
    personas: [
      { name: "Carlos Rodriguez", age: "40", occupation: "Empresario", income: "$2M MXN+", interests: ["Viajes", "Gastronomía", "Golf"], quote: "Busco exclusividad y reconocimiento global", avatar: "/placeholder.svg" },
    ],
    demographics: [
      { label: "Edad Promedio", value: "39" },
      { label: "Ingreso Promedio", value: "$1.8M MXN" },
      { label: "Género", value: "68:32" },
      { label: "Zona Urbana", value: "85%" },
    ],
  },
  ca: {
    personas: [
      { name: "David Martin", age: "43", occupation: "Entrepreneur", income: "$200K CAD+", interests: ["Skiing", "Fine Dining", "Travel"], quote: "Cross-border benefits are essential", avatar: "/placeholder.svg" },
    ],
    demographics: [
      { label: "Avg Age", value: "41" },
      { label: "Avg Income", value: "$185K CAD" },
      { label: "Gender Ratio", value: "60:40" },
      { label: "Urban Rate", value: "80%" },
    ],
  },
}

export default function AudienceProfilePage() {
  return (
    <>
      <DashboardHeader 
        title="Audience Profile" 
        breadcrumb={["Global View", "Audience Profile"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          主要5ヶ国のターゲットプロファイル（各国の調査データ）
        </p>

        <Tabs defaultValue="jp" className="space-y-4">
          <TabsList>
            {COUNTRIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                <span className="mr-1">{c.flag}</span> {c.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {COUNTRIES.map((country) => {
            const data = AUDIENCE_DATA[country.id]
            return (
              <TabsContent key={country.id} value={country.id} className="space-y-6">
                {/* Demographics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.demographics.map((d, i) => (
                    <Card key={i} className="border shadow-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-muted-foreground">{d.label}</p>
                        <p className="text-xl font-bold text-[#006FCF] mt-1">{d.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Personas */}
                <div className="grid md:grid-cols-2 gap-4">
                  {data.personas.map((p, i) => (
                    <Card key={i} className="border shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={p.avatar} />
                            <AvatarFallback className="bg-[#006FCF] text-white">{p.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm text-muted-foreground">{p.age} / {p.occupation}</p>
                            <p className="text-sm text-muted-foreground">年収: {p.income}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {p.interests.map((int, j) => (
                                <Badge key={j} variant="secondary" className="text-xs">{int}</Badge>
                              ))}
                            </div>
                            <p className="text-sm italic text-muted-foreground mt-3 border-l-2 border-[#006FCF] pl-3">
                              &ldquo;{p.quote}&rdquo;
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </>
  )
}
