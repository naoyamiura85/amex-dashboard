"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { 
  MessageCircle, 
  X, 
  Send, 
  Maximize2, 
  Minimize2,
  Sparkles,
  BarChart3,
  FileText,
  ChevronRight,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const suggestedQuestions = [
  "Z世代で伸びている美容成分トップ10は?",
  "腸活トレンドの食品・サプリ・化粧品での比較",
  "プロテイン×和菓子のPopularity Scoreは?",
  "コンビニの菓子棚の空白領域を分析して",
]

export function YappiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, input = "", handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/yappi-chat',
    initialMessages: [
      {
        id: "init",
        role: "assistant",
        content: "こんにちは! YappiGPTです。消費者インサイトやトレンド分析について、何でもお聞きください。",
      }
    ]
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input || !input.trim()) return
    handleSubmit(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) {
        handleSend({ preventDefault: () => {} } as React.FormEvent)
      }
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
    setTimeout(() => {
      const form = inputRef.current?.form
      if (form) {
        handleSend({ preventDefault: () => {} } as React.FormEvent)
      }
    }, 100)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-2 border-background">
          AI
        </Badge>
      </Button>
    )
  }

  return (
    <div
      className={`fixed z-50 bg-background border border-border shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded
          ? "inset-4 rounded-xl"
          : "bottom-6 right-6 w-[380px] h-[560px] rounded-xl"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">YappiGPT</h3>
            <p className="text-[10px] text-muted-foreground">AI Consumer Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground mb-2">おすすめの質問:</p>
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full text-left px-3 py-2 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors flex items-center justify-between group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {question}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="質問を入力してください..."
            disabled={isLoading}
            className="flex-1 h-10 bg-background border-border/50 focus-visible:ring-primary/30 disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={!input || !input.trim() || isLoading}
            size="icon"
            className="h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          Cmd+K で全画面モードに切り替え
        </p>
      </form>
    </div>
  )
}
