"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Sparkles, 
  Target, 
  Lightbulb, 
  Megaphone, 
  Tv, 
  Smartphone, 
  ShoppingBag,
  Radio,
  Globe,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  BarChart3,
  Users,
  Play,
  RefreshCw,
  Check,
  ChevronRight,
  TrendingUp,
  Zap
} from "lucide-react"

// IMCチャネルデータ
const imcChannels = [
  { id: "tv", name: "TV CM", icon: Tv, reach: 85, cost: "高", effectiveness: 78 },
  { id: "digital", name: "デジタル広告", icon: Globe, reach: 72, cost: "中", effectiveness: 82 },
  { id: "sns", name: "SNS", icon: Instagram, reach: 68, cost: "低", effectiveness: 75 },
  { id: "youtube", name: "YouTube", icon: Youtube, reach: 65, cost: "中", effectiveness: 80 },
  { id: "radio", name: "ラジオ", icon: Radio, reach: 35, cost: "低", effectiveness: 45 },
  { id: "retail", name: "店頭POP", icon: ShoppingBag, reach: 55, cost: "低", effectiveness: 60 },
  { id: "line", name: "LINE", icon: MessageCircle, reach: 70, cost: "低", effectiveness: 72 },
  { id: "mail", name: "メールマガジン", icon: Mail, reach: 40, cost: "低", effectiveness: 55 },
]

// ペルソナデータ
const targetPersonas = [
  { id: "1", name: "佐藤健一", age: 69, segment: "アクティブシニア", image: "/images/personas/senior_man1.jpg" },
  { id: "2", name: "山本洋子", age: 67, segment: "美容意識層", image: "/images/personas/senior_woman1.jpg" },
  { id: "3", name: "田村雅彦", age: 50, segment: "健康志向ミドル", image: "/images/personas/middle_man1.jpg" },
  { id: "4", name: "高田美咲", age: 32, segment: "若年層女性", image: "/images/personas/young_woman1.jpg" },
]

export function AIConceptGeneratorContent() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["tv", "digital", "sns"])
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(["1", "2"])
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)

  const runIMCSimulation = () => {
    setIsSimulating(true)
    setSimulationComplete(false)
    setTimeout(() => {
      setIsSimulating(false)
      setSimulationComplete(true)
    }, 2000)
  }

  const toggleChannel = (id: string) => {
    setSelectedChannels(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
    setSimulationComplete(false)
  }

  const togglePersona = (id: string) => {
    setSelectedPersonas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
    setSimulationComplete(false)
  }

  return (
    <div className="space-y-6 p-6">
      <Tabs defaultValue="imc" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">コンセプト生成</TabsTrigger>
          <TabsTrigger value="imc">IMCプロトタイピング</TabsTrigger>
          <TabsTrigger value="history">生成履歴</TabsTrigger>
        </TabsList>

        {/* コンセプト生成タブ */}
        <TabsContent value="generator" className="space-y-4">
          <Card className="rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                商品コンセプト自動生成
              </CardTitle>
              <CardDescription>
                トレンド、ターゲット、素材から最適な商品コンセプトを自動生成します。
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">新規コンセプト生成</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">トレンド選択</label>
                  <Button variant="outline" className="w-full mt-2">
                    トレンドを選択
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium">ターゲット層</label>
                  <Button variant="outline" className="w-full mt-2">
                    ターゲットを設定
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium">使用可能素材</label>
                  <Button variant="outline" className="w-full mt-2">
                    素材を選択
                  </Button>
                </div>
              </div>
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                コンセプト生成
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-base">生成されたコンセプト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "輝く肌", desc: "光反射技術で肌の透明感を強調", score: "92%" },
                { name: "深呼吸スキンケア", desc: "アロマテラピー×保湿ケア", score: "87%" },
                { name: "時間逆行美容", desc: "夜間修復機能を強化", score: "85%" },
              ].map((concept, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{concept.name}</div>
                    <Badge className="bg-primary">{concept.score}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{concept.desc}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    詳細を見る
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* IMCプロトタイピングタブ */}
        <TabsContent value="imc" className="space-y-6">
          {/* ヘッダー */}
          <Card className="rounded-xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                IMCプロトタイピング
              </CardTitle>
              <CardDescription>
                統合マーケティングコミュニケーション戦略をシミュレーションし、最適なチャネルミックスを発見します。
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左カラム: チャネル選択 */}
            <div className="space-y-4">
              <Card className="rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    コミュニケーションチャネル
                  </CardTitle>
                  <CardDescription className="text-xs">
                    使用するチャネルを選択
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {imcChannels.map((channel) => {
                    const Icon = channel.icon
                    const isSelected = selectedChannels.includes(channel.id)
                    return (
                      <button
                        key={channel.id}
                        onClick={() => toggleChannel(channel.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary/10" : "bg-muted"
                          }`}>
                            <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                            {channel.name}
                          </span>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* ターゲットペルソナ選択 */}
              <Card className="rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    ターゲットペルソナ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {targetPersonas.map((persona) => {
                    const isSelected = selectedPersonas.includes(persona.id)
                    return (
                      <button
                        key={persona.id}
                        onClick={() => togglePersona(persona.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={persona.image} alt={persona.name} />
                            <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                              {persona.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{persona.age}歳 / {persona.segment}</p>
                          </div>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* シミュレーション実行ボタン */}
              <Button
                className="w-full gap-2 h-12"
                onClick={runIMCSimulation}
                disabled={isSimulating || selectedChannels.length === 0}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    シミュレーション中...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    IMCシミュレーション実行
                  </>
                )}
              </Button>
            </div>

            {/* 中央・右カラム: 結果表示 */}
            <div className="lg:col-span-2 space-y-4">
              {/* チャネルミックス効果 */}
              <Card className="rounded-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      チャネルミックス効果予測
                    </CardTitle>
                    {simulationComplete && (
                      <Badge variant="outline" className="text-primary border-primary">
                        シミュレーション完了
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedChannels.map((channelId) => {
                      const channel = imcChannels.find(c => c.id === channelId)
                      if (!channel) return null
                      const Icon = channel.icon
                      const simulatedReach = simulationComplete 
                        ? Math.min(100, channel.reach + Math.floor(Math.random() * 15))
                        : channel.reach
                      const simulatedEffectiveness = simulationComplete
                        ? Math.min(100, channel.effectiveness + Math.floor(Math.random() * 10))
                        : channel.effectiveness
                      
                      return (
                        <div key={channelId} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{channel.name}</p>
                              <p className="text-xs text-muted-foreground">コスト: {channel.cost}</p>
                            </div>
                            {simulationComplete && (
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">{simulatedEffectiveness}%</p>
                                <p className="text-[10px] text-muted-foreground">効果スコア</p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">リーチ</span>
                              <span className="font-medium">{simulatedReach}%</span>
                            </div>
                            <Progress value={simulatedReach} className="h-2" />
                          </div>
                        </div>
                      )
                    })}

                    {selectedChannels.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Globe className="h-10 w-10 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">チャネルを選択してください</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* シナジー効果 */}
              {simulationComplete && (
                <Card className="rounded-xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      シナジー効果分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-2xl font-bold text-primary">+23%</p>
                        <p className="text-xs text-muted-foreground">統合リーチ増加</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-2xl font-bold text-emerald-600">+18%</p>
                        <p className="text-xs text-muted-foreground">コンバージョン予測</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-2xl font-bold text-amber-600">2.4x</p>
                        <p className="text-xs text-muted-foreground">ROI予測</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-background rounded-lg">
                      <p className="text-sm font-medium mb-2">推奨アクション</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          TV CMとデジタル広告の連携で認知から購買までの導線を強化
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          SNSでのUGC促進キャンペーンを並行実施
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          LINEでのリターゲティングでコンバージョン率向上
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ペルソナ別到達予測 */}
              {simulationComplete && selectedPersonas.length > 0 && (
                <Card className="rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      ペルソナ別到達予測
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedPersonas.map((personaId) => {
                        const persona = targetPersonas.find(p => p.id === personaId)
                        if (!persona) return null
                        const reachScore = 65 + Math.floor(Math.random() * 25)
                        const engagementScore = 50 + Math.floor(Math.random() * 35)
                        
                        return (
                          <div key={personaId} className="p-4 rounded-lg border">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-10 w-10 border-2 border-primary/20">
                                <AvatarImage src={persona.image} alt={persona.name} />
                                <AvatarFallback>{persona.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{persona.name}</p>
                                <p className="text-[10px] text-muted-foreground">{persona.segment}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">到達率</span>
                                <span className="font-medium text-primary">{reachScore}%</span>
                              </div>
                              <Progress value={reachScore} className="h-1.5" />
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">エンゲージメント</span>
                                <span className="font-medium text-emerald-600">{engagementScore}%</span>
                              </div>
                              <Progress value={engagementScore} className="h-1.5 [&>div]:bg-emerald-500" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 生成履歴タブ */}
        <TabsContent value="history" className="space-y-4">
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-base">最近の生成</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "2024年3月24日", name: "ナチュラルスキンケアコンセプト", type: "コンセプト" },
                  { date: "2024年3月24日", name: "シニア向けIMC戦略", type: "IMC" },
                  { date: "2024年3月23日", name: "敏感肌向けコンセプト", type: "コンセプト" },
                  { date: "2024年3月22日", name: "若年層向けデジタルキャンペーン", type: "IMC" },
                  { date: "2024年3月22日", name: "アンチエイジング", type: "コンセプト" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.type === "IMC" ? "bg-emerald-100" : "bg-primary/10"
                      }`}>
                        {item.type === "IMC" 
                          ? <Megaphone className="h-4 w-4 text-emerald-600" />
                          : <Lightbulb className="h-4 w-4 text-primary" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
