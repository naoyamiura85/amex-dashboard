import type { ClientConfig } from "@/types/client"

export const suntoryConfig: ClientConfig = {
  brand: {
    id: "suntory",
    name: "サントリー食品",
    shortName: "サントリー",
    logo: "/images/clients/suntory-logo.png",
    colors: {
      primary: "#0068B7",      // サントリーブルー
      secondary: "#00A0E9",    // ライトブルー
      accent: "#F5A623",       // ゴールド
    },
    dashboardTitle: "D2Cダッシュボード",
  },
  features: {
    showMarketOverview: true,
    showTrends: true,
    showDigitalShelf: true,
    showSimulator: true,
    showPersonaDetails: true,
    showCompetitorAnalysis: true,
  },
  data: {
    products: [
      {
        id: "menphys",
        name: "menphys",
        category: "健康ドリンク",
        image: "/images/products/menphys.png",
        description: "男性向け健康サポート飲料",
      },
      {
        id: "tokucha",
        name: "特茶/胡麻麦茶",
        category: "健康飲料",
        image: "/images/products/tokucha.png",
        description: "特定保健用食品",
      },
      {
        id: "sukkiri",
        name: "すっきりメンテナンス酢",
        category: "機能性表示食品",
        image: "/images/products/sukkiri.png",
        description: "内臓脂肪を減らす機能性表示食品",
      },
      {
        id: "coffee-roastery",
        name: "SUNTORY COFFEE ROASTERY",
        category: "プレミアムコーヒー",
        image: "/images/products/coffee-roastery.png",
        description: "こだわりの焙煎コーヒー",
      },
      {
        id: "zone",
        name: "ZONe",
        category: "エナジードリンク",
        image: "/images/products/zone.png",
        description: "ゲーマー向けエナジードリンク",
      },
    ],
    personas: [
      {
        id: "sato",
        name: "佐藤健一",
        age: 45,
        gender: "男性",
        occupation: "会社員",
        image: "/images/personas/sato.jpg",
        tags: ["健康志向", "情報収集型"],
        behavior: "成分効果を詳しく調査",
      },
      {
        id: "tanaka",
        name: "田中美和",
        age: 38,
        gender: "女性",
        occupation: "主婦",
        image: "/images/personas/tanaka.jpg",
        tags: ["家族の健康", "価格比較"],
        behavior: "複数商品を比較検討",
      },
      {
        id: "yamada",
        name: "山田拓也",
        age: 52,
        gender: "男性",
        occupation: "経営者",
        image: "/images/personas/yamada.jpg",
        tags: ["プレミアム志向", "時短"],
        behavior: "口コミ評価を重視",
      },
    ],
    funnelStages: [
      { id: "lm", name: "LM(ポテンシャル小)", color: "#64748B" },
      { id: "mh", name: "MH(ポテンシャル大)", color: "#3B82F6" },
      { id: "purchase", name: "購入ユーザー", color: "#10B981" },
      { id: "regular", name: "定期購入", color: "#F59E0B" },
    ],
    dnaFactors: [
      "リフレッシュ",
      "自信",
      "活力・元気",
      "プレミアム感",
      "喜び・幸福",
      "安心感",
      "知的・賢さ",
      "リラックス",
    ],
  },
}
