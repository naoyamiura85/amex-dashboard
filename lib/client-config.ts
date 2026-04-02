import type { ClientConfig, ClientId } from "@/types/client"

// クライアント設定をインポート
import { suntoryConfig } from "./clients/suntory"
import { kirinConfig } from "./clients/kirin"

// クライアント設定マップ
const clientConfigs: Record<ClientId, ClientConfig> = {
  suntory: suntoryConfig,
  kirin: kirinConfig,
  asahi: suntoryConfig, // 仮: 後で追加可能
}

// 環境変数からクライアントIDを取得
export function getClientId(): ClientId {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as ClientId | undefined
  return clientId && clientId in clientConfigs ? clientId : "suntory"
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
