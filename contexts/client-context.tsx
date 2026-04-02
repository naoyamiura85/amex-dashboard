"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { ClientConfig } from "@/types/client"
import { getClientConfig } from "@/lib/client-config"

const ClientContext = createContext<ClientConfig | null>(null)

export function ClientProvider({ children }: { children: ReactNode }) {
  const config = useMemo(() => getClientConfig(), [])
  
  return (
    <ClientContext.Provider value={config}>
      {children}
    </ClientContext.Provider>
  )
}

export function useClient(): ClientConfig {
  const context = useContext(ClientContext)
  if (!context) {
    // フォールバック: コンテキスト外で使用された場合
    return getClientConfig()
  }
  return context
}

// 便利なフック
export function useClientBrand() {
  return useClient().brand
}

export function useClientFeatures() {
  return useClient().features
}

export function useClientData() {
  return useClient().data
}
