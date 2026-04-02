import type { ClientConfig } from "@/types/client"

export const kirinConfig: ClientConfig = {
  brand: {
    id: "kirin",
    name: "キリンビバレッジ",
    shortName: "キリン",
    logo: "/images/clients/kirin-logo.png",
    colors: {
      primary: "#E60012",      // キリンレッド
      secondary: "#006934",    // グリーン
      accent: "#FFD700",       // ゴールド
    },
    dashboardTitle: "D2Cダッシュボード",
  },
  features: {
    showMarketOverview: true,
    showTrends: true,
    showDigitalShelf: true,
    showSimulator: true,
    showPersonaDetails: true,
    showCompetitorAnalysis: false, // キリンでは競合分析を非表示
  },
  data: {
    products: [
      {
        id: "nama-cha",
        name: "生茶",
        category: "緑茶飲料",
        image: "/images/products/nama-cha.png",
        description: "生茶葉のおいしさ",
      },
      {
        id: "gogo-tea",
        name: "午後の紅茶",
        category: "紅茶飲料",
        image: "/images/products/gogo-tea.png",
        description: "午後のひととき",
      },
      {
        id: "imuse",
        name: "iMUSE",
        category: "機能性表示食品",
        image: "/images/products/imuse.png",
        description: "プラズマ乳酸菌配合",
      },
      {
        id: "tropicana",
        name: "トロピカーナ",
        category: "果汁飲料",
        image: "/images/products/tropicana.png",
        description: "100%果汁ジュース",
      },
      {
        id: "fire",
        name: "FIRE",
        category: "缶コーヒー",
        image: "/images/products/fire.png",
        description: "直火仕上げの香ばしさ",
      },
    ],
    personas: [
      {
        id: "suzuki",
        name: "鈴木太郎",
        age: 35,
        gender: "男性",
        occupation: "営業職",
        image: "/images/personas/suzuki.jpg",
        tags: ["外出多い", "コーヒー好き"],
        behavior: "自販機で手軽に購入",
      },
      {
        id: "ito",
        name: "伊藤花子",
        age: 28,
        gender: "女性",
        occupation: "OL",
        image: "/images/personas/ito.jpg",
        tags: ["美容意識", "SNS活用"],
        behavior: "新商品をチェック",
      },
      {
        id: "watanabe",
        name: "渡辺健太",
        age: 42,
        gender: "男性",
        occupation: "エンジニア",
        image: "/images/personas/watanabe.jpg",
        tags: ["免疫ケア", "定期購入派"],
        behavior: "機能性重視で選択",
      },
    ],
    funnelStages: [
      { id: "awareness", name: "認知", color: "#E60012" },
      { id: "interest", name: "興味関心", color: "#FF6B6B" },
      { id: "purchase", name: "購入", color: "#006934" },
      { id: "loyalty", name: "ロイヤル顧客", color: "#FFD700" },
    ],
    dnaFactors: [
      "爽快感",
      "リラックス",
      "健康",
      "おいしさ",
      "手軽さ",
      "品質",
      "伝統",
      "革新",
    ],
  },
}
