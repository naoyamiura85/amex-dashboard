"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ステージの定義
const stages = [
  { id: "lm", name: "LM(ポテンシャル小)", total: "4500万人", color: "bg-slate-100" },
  { id: "mh", name: "MH(ポテンシャル大)", total: "850万人", color: "bg-primary/20" },
  { id: "trial", name: "トライアル", total: "320万人", color: "bg-primary/40" },
  { id: "regular", name: "定期顧客", total: "170万人", color: "bg-primary/60" },
]

// ウェルネスレベルの定義
const wellnessLevels = [
  { id: "h", name: "H", range: "67-100" },
  { id: "m", name: "M", range: "34-66" },
  { id: "l", name: "L", range: "0-33" },
]

// セグメントデータ
const segmentData: Record<string, Record<string, {
  population: string
  personas: { id: string; name: string; image: string }[]
  demographics: {
    genderRatio: string
    avgAge: string
    marriedRate: string
    childRate: string
  }
  occupation: { name: string; rate: string }[]
  income: { range: string; rate: string }[]
  summary: string
}>> = {
  lm: {
    h: {
      population: "1200万人",
      personas: [
        { id: "1", name: "佐藤健一", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "田中正雄", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "山本洋子", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "山田美和", image: "/images/personas/persona-4.jpg" },
        { id: "5", name: "鈴木太郎", image: "/images/personas/persona-5.jpg" },
        { id: "6", name: "高橋由美", image: "/images/personas/persona-6.jpg" },
        { id: "7", name: "伊藤健", image: "/images/personas/persona-7.jpg" },
        { id: "8", name: "渡辺恵", image: "/images/personas/persona-8.jpg" },
        { id: "9", name: "小林誠", image: "/images/personas/persona-9.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "58歳", marriedRate: "72%", childRate: "65%" },
      occupation: [
        { name: "会社員（事務系）", rate: "28%" },
        { name: "専業主婦/主夫", rate: "22%" },
        { name: "パート・アルバイト", rate: "18%" },
        { name: "自営業", rate: "14%" },
      ],
      income: [
        { range: "300〜500万未満", rate: "31%" },
        { range: "500〜700万未満", rate: "27%" },
        { range: "700〜900万未満", rate: "18%" },
        { range: "300万未満", rate: "14%" },
      ],
      summary: "健康への関心はあるが継続行動に至っていない層。価格重視で比較検討を慎重に行う。テレビCMや薬局店頭がメインのタッチポイント。",
    },
    m: {
      population: "1800万人",
      personas: [
        { id: "1", name: "中村一郎", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "加藤美咲", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "吉田浩", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "佐々木花", image: "/images/personas/persona-4.jpg" },
        { id: "5", name: "山口大輔", image: "/images/personas/persona-5.jpg" },
        { id: "6", name: "松本理恵", image: "/images/personas/persona-6.jpg" },
        { id: "7", name: "井上翔", image: "/images/personas/persona-7.jpg" },
      ],
      demographics: { genderRatio: "女性やや多め", avgAge: "45歳", marriedRate: "65%", childRate: "55%" },
      occupation: [
        { name: "会社員（事務系）", rate: "32%" },
        { name: "会社員（技術系）", rate: "20%" },
        { name: "パート・アルバイト", rate: "18%" },
        { name: "専業主婦/主夫", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "26%" },
        { range: "700〜900万未満", rate: "22%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "日常的な健康意識は中程度。コンビニやスーパーでの購買が中心。SNSや口コミの影響を受けやすい。",
    },
    l: {
      population: "1500万人",
      personas: [
        { id: "1", name: "木村翔太", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "林美穂", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "清水健太", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "山崎愛", image: "/images/personas/persona-4.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "35歳", marriedRate: "45%", childRate: "30%" },
      occupation: [
        { name: "会社員（技術系）", rate: "35%" },
        { name: "会社員（事務系）", rate: "25%" },
        { name: "学生", rate: "15%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "300〜500万未満", rate: "35%" },
        { range: "500〜700万未満", rate: "30%" },
        { range: "300万未満", rate: "20%" },
        { range: "700〜900万未満", rate: "10%" },
      ],
      summary: "健康への関心は低く、味や価格を重視。衝動買いが多く、コンビニでの購買が中心。デジタル広告への接触が多い。",
    },
  },
  mh: {
    h: {
      population: "283万人",
      personas: [
        { id: "1", name: "石井康夫", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "前田由紀", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "藤田誠一", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "岡田さゆり", image: "/images/personas/persona-4.jpg" },
        { id: "5", name: "後藤健二", image: "/images/personas/persona-5.jpg" },
      ],
      demographics: { genderRatio: "女性やや多め", avgAge: "52歳", marriedRate: "78%", childRate: "70%" },
      occupation: [
        { name: "会社員（管理職）", rate: "30%" },
        { name: "専業主婦/主夫", rate: "25%" },
        { name: "会社員（事務系）", rate: "20%" },
        { name: "自営業", rate: "12%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "32%" },
        { range: "500〜700万未満", rate: "28%" },
        { range: "900万以上", rate: "22%" },
        { range: "300〜500万未満", rate: "12%" },
      ],
      summary: "健康意識が非常に高く、機能性表示食品に積極的。品質重視で価格感度は低め。専門店やECでの購買が多い。",
    },
    m: {
      population: "340万人",
      personas: [
        { id: "1", name: "村上大樹", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "近藤真理", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "坂本隆", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "遠藤美香", image: "/images/personas/persona-4.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "48歳", marriedRate: "70%", childRate: "60%" },
      occupation: [
        { name: "会社員（事務系）", rate: "28%" },
        { name: "会社員（技術系）", rate: "22%" },
        { name: "専業主婦/主夫", rate: "18%" },
        { name: "公務員", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "30%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "22%" },
        { range: "900万以上", rate: "15%" },
      ],
      summary: "健康意識は中〜高程度。定期的な運動習慣がある。ドラッグストアとスーパーでの購買が中心。",
    },
    l: {
      population: "227万人",
      personas: [
        { id: "1", name: "青木拓也", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "斎藤恵子", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "西村康平", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "福田あゆみ", image: "/images/personas/persona-4.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "38歳", marriedRate: "55%", childRate: "40%" },
      occupation: [
        { name: "会社員（技術系）", rate: "32%" },
        { name: "会社員（事務系）", rate: "25%" },
        { name: "フリーランス", rate: "15%" },
        { name: "自営業", rate: "12%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "300〜500万未満", rate: "28%" },
        { range: "700〜900万未満", rate: "20%" },
        { range: "300万未満", rate: "12%" },
      ],
      summary: "購買力はあるが健康意識は低め。ブランドや話題性で商品選択。ECでの購買比率が高い。",
    },
  },
  trial: {
    h: {
      population: "128万人",
      personas: [
        { id: "1", name: "原田正樹", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "小川美紀", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "三浦健司", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "中島愛子", image: "/images/personas/persona-4.jpg" },
        { id: "5", name: "阿部俊介", image: "/images/personas/persona-5.jpg" },
      ],
      demographics: { genderRatio: "女性多め", avgAge: "55歳", marriedRate: "80%", childRate: "72%" },
      occupation: [
        { name: "専業主婦/主夫", rate: "28%" },
        { name: "会社員（管理職）", rate: "25%" },
        { name: "会社員（事務系）", rate: "20%" },
        { name: "パート・アルバイト", rate: "15%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "30%" },
        { range: "900万以上", rate: "25%" },
        { range: "500〜700万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "15%" },
      ],
      summary: "既に当社商品を試用中。健康効果を実感しつつある層。継続購買への移行が期待できる。",
    },
    m: {
      population: "107万人",
      personas: [
        { id: "1", name: "橋本雄一", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "川村さくら", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "上田勝", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "森下恵美", image: "/images/personas/persona-4.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "50歳", marriedRate: "75%", childRate: "65%" },
      occupation: [
        { name: "会社員（事務系）", rate: "30%" },
        { name: "専業主婦/主夫", rate: "22%" },
        { name: "会社員（技術系）", rate: "18%" },
        { name: "パート・アルバイト", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "22%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "お試し購入段階。価格と効果のバランスを評価中。クーポンやキャンペーンに反応しやすい。",
    },
    l: {
      population: "85万人",
      personas: [
        { id: "1", name: "内田雅人", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "松井真由美", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "野村太一", image: "/images/personas/persona-3.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "40歳", marriedRate: "60%", childRate: "45%" },
      occupation: [
        { name: "会社員（技術系）", rate: "30%" },
        { name: "会社員（事務系）", rate: "28%" },
        { name: "フリーランス", rate: "15%" },
        { name: "自営業", rate: "12%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "30%" },
        { range: "700〜900万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "25%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "話題性やキャンペーンで初回購入。継続意向は低め。離脱リスクが高い。",
    },
  },
  regular: {
    h: {
      population: "79万人",
      personas: [
        { id: "1", name: "長谷川浩", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "菊地美佳", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "平野誠", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "石川由美子", image: "/images/personas/persona-4.jpg" },
        { id: "5", name: "渡部健一", image: "/images/personas/persona-5.jpg" },
        { id: "6", name: "杉山明美", image: "/images/personas/persona-6.jpg" },
      ],
      demographics: { genderRatio: "女性多め", avgAge: "58歳", marriedRate: "85%", childRate: "75%" },
      occupation: [
        { name: "専業主婦/主夫", rate: "30%" },
        { name: "会社員（管理職）", rate: "25%" },
        { name: "定年退職者", rate: "20%" },
        { name: "会社員（事務系）", rate: "15%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "28%" },
        { range: "900万以上", rate: "28%" },
        { range: "500〜700万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "12%" },
      ],
      summary: "当社のロイヤルカスタマー。定期購入を継続。口コミでの推奨も活発。LTVが最も高い層。",
    },
    m: {
      population: "57万人",
      personas: [
        { id: "1", name: "岩崎一馬", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "久保田恵", image: "/images/personas/persona-2.jpg" },
        { id: "3", name: "横山大輔", image: "/images/personas/persona-3.jpg" },
        { id: "4", name: "白石理恵", image: "/images/personas/persona-4.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "52歳", marriedRate: "78%", childRate: "68%" },
      occupation: [
        { name: "会社員（事務系）", rate: "28%" },
        { name: "専業主婦/主夫", rate: "25%" },
        { name: "会社員（管理職）", rate: "20%" },
        { name: "パート・アルバイト", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "900万以上", rate: "18%" },
        { range: "300〜500万未満", rate: "15%" },
      ],
      summary: "継続購買中だが、競合への乗り換えリスクあり。価格感度が比較的高い。",
    },
    l: {
      population: "34万人",
      personas: [
        { id: "1", name: "大野雄介", image: "/images/personas/persona-1.jpg" },
        { id: "2", name: "安藤玲子", image: "/images/personas/persona-2.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "42歳", marriedRate: "62%", childRate: "50%" },
      occupation: [
        { name: "会社員（技術系）", rate: "32%" },
        { name: "会社員（事務系）", rate: "28%" },
        { name: "自営業", rate: "15%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "30%" },
        { range: "500〜700万未満", rate: "28%" },
        { range: "900万以上", rate: "22%" },
        { range: "300〜500万未満", rate: "15%" },
      ],
      summary: "購買力はあるが健康モチベーションは低め。便利さや習慣で継続。離脱リスクは中程度。",
    },
  },
}

// AIペルソナの詳細データ
const aiPersonaDetails: Record<string, { age: number; gender: string; tags: string[] }> = {
  "佐藤健一": { age: 69, gender: "男性", tags: ["ゴルフ派", "日本酒派"] },
  "田中正雄": { age: 71, gender: "男性", tags: ["山歩き・ハイ", "ゴルフ派"] },
  "山本洋子": { age: 67, gender: "女性", tags: ["ゴルフ派", "美容・エイジ"] },
  "山田美和": { age: 70, gender: "女性", tags: ["ヨガ・太極拳", "オーガニック"] },
}

export function MarketOverviewContent() {
  const [selectedSegment, setSelectedSegment] = useState<{
    stageId: string
    stageName: string
    wellnessId: string
    wellnessName: string
  } | null>(null)

  const handleCellClick = (stageId: string, stageName: string, wellnessId: string, wellnessName: string) => {
    setSelectedSegment({ stageId, stageName, wellnessId, wellnessName })
  }

  const getSegmentData = () => {
    if (!selectedSegment) return null
    return segmentData[selectedSegment.stageId]?.[selectedSegment.wellnessId]
  }

  const segment = getSegmentData()

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* Matrix Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-xs text-muted-foreground border-b border-r">
                    <div className="flex flex-col">
                      <span>ステージ</span>
                      <span className="text-[10px] mt-1">ウェルネス</span>
                    </div>
                  </th>
                  {stages.map((stage, index) => (
                    <th key={stage.id} className="p-3 text-center border-b min-w-[180px]">
                      <div className="flex flex-col items-center gap-1">
                        <div 
                          className={`w-2.5 h-2.5 rounded-full ${
                            index === 0 ? "bg-slate-400" : "bg-primary"
                          }`} 
                        />
                        <span className={`text-sm font-medium ${index > 0 ? "text-primary" : "text-foreground"}`}>
                          {stage.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{stage.total}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wellnessLevels.map((wellness) => (
                  <tr key={wellness.id}>
                    <td className="p-3 border-r">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-primary">{wellness.name}</span>
                        <span className="text-[10px] text-muted-foreground">{wellness.range}</span>
                      </div>
                    </td>
                    {stages.map((stage, stageIndex) => {
                      const data = segmentData[stage.id]?.[wellness.id]
                      const bgColor = stageIndex === 0 
                        ? "bg-slate-50 hover:bg-slate-100" 
                        : `bg-primary/${10 + stageIndex * 15} hover:bg-primary/${15 + stageIndex * 15}`
                      
                      return (
                        <td 
                          key={`${stage.id}-${wellness.id}`}
                          className={`p-4 text-center cursor-pointer transition-colors ${
                            stageIndex > 0 ? "bg-sky-50 hover:bg-sky-100" : "bg-slate-50 hover:bg-slate-100"
                          } ${stageIndex > 1 ? "bg-sky-100 hover:bg-sky-200" : ""} ${stageIndex > 2 ? "bg-sky-200 hover:bg-sky-300" : ""}`}
                          onClick={() => handleCellClick(stage.id, stage.name, wellness.id, wellness.name)}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className={`text-xl font-bold ${stageIndex > 0 ? "text-primary" : "text-foreground"}`}>
                              {data?.population || "N/A"}
                            </span>
                            {/* Persona Avatars */}
                            <div className="flex flex-wrap justify-center gap-1 max-w-[140px]">
                              {data?.personas.slice(0, 6).map((persona, i) => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-white shadow-sm">
                                  <AvatarImage src={persona.image} alt={persona.name} />
                                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    {persona.name.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {data && data.personas.length > 6 && (
                                <div className="h-8 w-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs text-muted-foreground shadow-sm">
                                  +{data.personas.length - 6}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Segment Detail Dialog */}
      <Dialog open={!!selectedSegment} onOpenChange={() => setSelectedSegment(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center gap-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">セグメント分析</Badge>
              <Badge className="bg-primary text-primary-foreground">
                <Users className="h-3 w-3 mr-1" />
                ユーザー分析
              </Badge>
            </div>
            <DialogTitle className="text-lg font-semibold flex-1">
              {selectedSegment?.stageName} × ウェルネス {selectedSegment?.wellnessName.toUpperCase()}
              <span className="text-muted-foreground font-normal ml-2">
                推定 {segment?.population}
              </span>
            </DialogTitle>
          </DialogHeader>

          {segment && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">属性・概要</TabsTrigger>
                <TabsTrigger value="interests">興味関心</TabsTrigger>
                <TabsTrigger value="purchase">購買行動</TabsTrigger>
                <TabsTrigger value="wellness">ウェルネス傾向</TabsTrigger>
                <TabsTrigger value="docomo">docomo Data</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column - Demographics */}
                  <div className="col-span-2 space-y-6">
                    {/* Basic Demographics */}
                    <Card>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-muted-foreground">性別構成</span>
                          <span className="text-sm font-semibold">{segment.demographics.genderRatio}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-muted-foreground">平均年齢</span>
                          <span className="text-sm font-semibold">{segment.demographics.avgAge}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-muted-foreground">既婚率</span>
                          <span className="text-sm font-semibold">{segment.demographics.marriedRate}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">子あり率</span>
                          <span className="text-sm font-semibold">{segment.demographics.childRate}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Occupation and Income */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="text-sm font-semibold mb-3">職業</h4>
                          <div className="space-y-2">
                            {segment.occupation.map((item, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-primary" />
                                  {item.name}
                                </span>
                                <span className="text-xs font-medium">{item.rate}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="text-sm font-semibold mb-3">世帯年収</h4>
                          <div className="space-y-2">
                            {segment.income.map((item, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                                  {item.range}
                                </span>
                                <span className="text-xs font-medium">{item.rate}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Summary */}
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold mb-2">サマリー</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {segment.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column - AI Personas */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">
                      AIペルソナ（{segment.personas.length}名）
                    </h4>
                    <div className="space-y-3">
                      {segment.personas.slice(0, 5).map((persona, i) => {
                        const details = aiPersonaDetails[persona.name] || { age: 45 + i * 5, gender: i % 2 === 0 ? "男性" : "女性", tags: ["健康志向", "アウトドア"] }
                        return (
                          <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={persona.image} alt={persona.name} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {persona.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{persona.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {details.age}歳 / {details.gender}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {details.tags.slice(0, 2).map((tag, j) => (
                                  <Badge key={j} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary">
                                    {tag}
                                  </Badge>
                                ))}
                                {details.tags.length > 2 && (
                                  <span className="text-[10px] text-muted-foreground">+{details.tags.length - 2}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="interests" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  興味関心データは準備中です
                </div>
              </TabsContent>

              <TabsContent value="purchase" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  購買行動データは準備中です
                </div>
              </TabsContent>

              <TabsContent value="wellness" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  ウェルネス傾向データは準備中です
                </div>
              </TabsContent>

              <TabsContent value="docomo" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  docomo Dataは準備中です
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
