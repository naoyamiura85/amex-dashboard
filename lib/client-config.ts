import type { ClientConfig, ClientId } from "@/types/client"

// クライアント設定をインポート
import { suntoryConfig } from "./clients/suntory"
import { kirinConfig } from "./clients/kirin"
import { amexConfig } from "./clients/amex"

// クライアント設定マップ
const clientConfigs: Record<ClientId, ClientConfig> = {
  suntory: suntoryConfig,
  kirin: kirinConfig,
  amex: amexConfig,
}

// 環境変数からクライアントIDを取得
export function getClientId(): ClientId {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as ClientId | undefined
  // デフォルトをamexに設定（デモ用）
  return clientId && clientId in clientConfigs ? clientId : "amex"
}

// 現在のクライアント設定を取得
export function getClientConfig(): ClientConfig {
  const clientId = getClientId()
  return clientConfigs[clientId]
}

// 特定のクライアント設定を取得
export function getClientConfigById(clientId: ClientId): ClientConfig {
  return clientConfigs[clientId]
}

// 利用可能なクライアント一覧
export function getAvailableClients(): ClientId[] {
  return Object.keys(clientConfigs) as ClientId[]
}
