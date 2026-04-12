"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Send, User, Bot } from "lucide-react"

const AI_PERSONAS = [
  { id: "tanaka", name: "田中 健一", age: "42歳", profile: "外資系部長 / 年収1,500万円+ / ゴルフ・海外旅行好き", avatar: "/placeholder.svg" },
  { id: "sato", name: "佐藤 美咲", age: "35歳", profile: "医師 / 年収1,200万円+ / ワイン・アート好き", avatar: "/placeholder.svg" },
  { id: "yamamoto", name: "山本 洋子", age: "58歳", profile: "主婦 / 世帯年収800万円 / 健康志向", avatar: "/placeholder.svg" },
]

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function MicroSimulationPage() {
  const [selectedPersona, setSelectedPersona] = useState(AI_PERSONAS[0])
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `こんにちは、${AI_PERSONAS[0].name}です。AMEXカードについてのご質問があればお聞きください。私の視点からお答えします。` },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    
    // シミュレートされた応答
    setTimeout(() => {
      const responses: Record<string, string[]> = {
        tanaka: [
          "私のようなビジネスパーソンには、空港ラウンジアクセスが非常に魅力的です。海外出張が多いので。",
          "ステータス感も重要ですね。取引先との会食でプラチナカードを出すと、やはり印象が違います。",
          "年会費は気にしません。それに見合うサービスがあれば投資と考えています。",
        ],
        sato: [
          "コンシェルジュサービスで予約が取りにくいレストランを押さえられるのが助かります。",
          "医療関連の保険や緊急サポートも安心感がありますね。",
          "ポイントはマイルに交換して、休暇の旅行に使っています。",
        ],
        yamamoto: [
          "正直、年会費が高いのが気になります。日常使いでどれだけお得になるかが重要です。",
          "スーパーやドラッグストアでのポイント還元があると嬉しいですね。",
          "夫がプラチナカードを持っていて、家族カードで十分かもしれません。",
        ],
      }
      const personaResponses = responses[selectedPersona.id] || responses.tanaka
      const randomResponse = personaResponses[Math.floor(Math.random() * personaResponses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
    }, 1000)
    
    setInput("")
  }

  const handlePersonaChange = (persona: typeof AI_PERSONAS[0]) => {
    setSelectedPersona(persona)
    setMessages([
      { role: "assistant", content: `こんにちは、${persona.name}です。AMEXカードについてのご質問があればお聞きください。私の視点からお答えします。` },
    ])
  }

  return (
    <>
      <DashboardHeader 
        title="Micro Simulation" 
        breadcrumb={["Plan Simulation", "Micro Simulation"]}
      />
      <div className="p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          AIペルソナとのインタビューシミュレーション
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ペルソナ選択 */}
          <Card className="border shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">AIペルソナ選択</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {AI_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaChange(p)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPersona.id === p.id
                      ? "border-[#006FCF] bg-[#006FCF]/5"
                      : "border-border hover:border-[#006FCF]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={p.avatar} />
                      <AvatarFallback className="bg-[#006FCF] text-white text-sm">{p.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.age}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{p.profile}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* チャット */}
          <Card className="border shadow-sm lg:col-span-2 flex flex-col" style={{ height: "500px" }}>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#006FCF] text-white text-sm">{selectedPersona.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{selectedPersona.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{selectedPersona.profile}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-[#006FCF] text-white text-sm">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-[#006FCF] text-white"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-slate-600 text-white text-sm">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="質問を入力..."
                  className="flex-1"
                />
                <Button onClick={handleSend} className="bg-[#006FCF] hover:bg-[#005bb5]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
