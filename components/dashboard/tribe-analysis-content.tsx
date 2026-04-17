"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, Users, TrendingUp, CreditCard, Star, ChevronRight, Trophy, Plane, Palette, Wine, Zap, Mountain, Car, Fish, Music, Cpu, Network } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// ---- データ定義 ----

// 横軸：ステージ
const STAGES = [
  { key: "bc_low",   label: "未会員（BC低）", fullLabel: "未会員（Brand Consideration 低）" },
  { key: "bc_high",  label: "未会員（BC高）", fullLabel: "未会員（Brand Consideration 高）" },
  { key: "new",      label: "新規会員",       fullLabel: "新規会員" },
  { key: "premium",  label: "プレミアム",     fullLabel: "プレミアム" },
] as const
type StageKey = typeof STAGES[number]["key"]

// 縦軸：平均世帯年収
const INCOME_LEVELS = [
  { key: "high",   label: "H", sublabel: "1,500万〜", minIncome: 1500 },
  { key: "medium", label: "M", sublabel: "1,000万〜", minIncome: 1000 },
  { key: "low",    label: "L", sublabel: "500万〜",   minIncome: 500 },
] as const
type IncomeKey = typeof INCOME_LEVELS[number]["key"]

interface Persona {
  id: string
  name: string
  age: number
  gender: string
  image: string
  occupation: string
  income: string
  background: string
  lifestyle: string
  interests: string[]
  cardGoal: string
  tribe: string
}

type LucideIcon = React.ComponentType<{ className?: string }>

type TribeCategory = "travel" | "dining" | "entertainment"

const CATEGORY_META: Record<TribeCategory, { label: string; color: string; bg: string }> = {
  travel:        { label: "トラベル",          color: "#006FCF", bg: "rgba(0,111,207,0.18)" },
  dining:        { label: "ダイニング",         color: "#B4975A", bg: "rgba(180,151,90,0.18)" },
  entertainment: { label: "エンターテイメント", color: "#9B2335", bg: "rgba(155,35,53,0.18)" },
}

interface Tribe {
  id: string
  name: string
  icon: LucideIcon
  category: TribeCategory
  members: number        // 万人
  engagementScore: number   // 0–100 (y軸: 上=高)
  spendPotential: number    // 0–100 (x軸: 右=高)
  incomeLevel: IncomeKey    // 年収レベル
  description: string
  avgSpend: string
  upgradeRate: string
  churnRisk: "低" | "中" | "高"
  features: { label: string; value: string }[]
  personas: Persona[]
  stageDistribution: { stage: string; pct: number; color: string }[]
}

const ALL_TRIBES: Tribe[] = [
  {
    id: "golf",
    name: "ゴルフ派",
    icon: Trophy,
    category: "travel",
    members: 42,
    engagementScore: 85,
    spendPotential: 88,
    incomeLevel: "high",
    description: "国内外の名門コースを年10回以上ラウンドする層。メンバーシップ費・ゴルフ遠征での高額カード決済が多く、コンシェルジュ活用率も最高水準。",
    avgSpend: "¥68万/月",
    upgradeRate: "38%",
    churnRisk: "低",
    features: [
      { label: "旅行頻度", value: "年12回以上" },
      { label: "接待ゴルフ比率", value: "62%" },
      { label: "コンシェルジュ利用", value: "月4回以上" },
    ],
    personas: [
      {
        id: "p1", name: "田中 誠司", age: 58, gender: "男性",
        image: "/images/personas/persona-01.jpg",
        occupation: "上場企業 代表取締役", income: "3,000万円以上",
        background: "30代から経営に携わり、接待ゴルフで人脈を構築。週末は会員制コースでラウンド。名門コースのメンバーシップを5つ保有。",
        lifestyle: "毎朝トレーニング。国内外のゴルフリゾートへ年12回以上。ゴルフ後の美食と銘酒が至福の時間。",
        interests: ["ゴルフ", "ワイン", "クラシック音楽"], cardGoal: "名門コース優先予約とコンシェルジュによる手荷物サービス",
        tribe: "ゴルフ派"
      },
      {
        id: "p2", name: "佐藤 隆一", age: 62, gender: "男性",
        image: "/images/personas/persona-03.jpg",
        occupation: "投資家", income: "5,000万円以上",
        background: "早期リタイア後、ゴルフと投資を中心とした生活。海外メジャーコースへの遠征が年3回。セントアンドリュースでのラウンドが夢。",
        lifestyle: "アクティブリタイア。健康に投資し仲間との交流を重視。ゴルフを通じた経営者ネットワーク形成に積極的。",
        interests: ["ゴルフ", "海外旅行", "美食"], cardGoal: "海外ゴルフ遠征の優待と緊急コンシェルジュ対応",
        tribe: "ゴルフ派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 8, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 15, color: "#66B3FF" },
      { stage: "新規会員", pct: 44, color: "#006FCF" },
      { stage: "プレミアム", pct: 33, color: "#00175A" },
    ],
  },
  {
    id: "globe-trotter",
    name: "ジェットセッター派",
    icon: Plane,
    category: "travel",
    members: 38,
    engagementScore: 90,
    spendPotential: 92,
    incomeLevel: "high",
    description: "年間20カ国以上を渡航するハイパートラベラー。ビジネスクラス・プライベートジェット利用が多く、空港ラウンジ利用頻度が全トライブ中最高。",
    avgSpend: "¥95万/月",
    upgradeRate: "51%",
    churnRisk: "低",
    features: [
      { label: "渡航頻度", value: "年20カ国以上" },
      { label: "宿泊単価", value: "¥8万/泊以上" },
      { label: "ビジネスクラス比率", value: "91%" },
    ],
    personas: [
      {
        id: "p3", name: "山本 洋子", age: 45, gender: "女性",
        image: "/images/personas/persona-02.jpg",
        occupation: "ファッションデザイナー", income: "2,000万円以上",
        background: "パリ・ミラノを拠点に活動。コレクション期は月3カ国以上移動。世界各地のプライベートヴィラに滞在し、ローカルアーティストと交流。",
        lifestyle: "感度の高いライフスタイルを体現。最新トレンドの最前線にいることが仕事であり喜び。",
        interests: ["ファッション", "現代アート", "グルメ"], cardGoal: "ラウンジアクセスとスイートルームアップグレード特典",
        tribe: "ジェットセッター派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 5, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 10, color: "#66B3FF" },
      { stage: "新規会員", pct: 38, color: "#006FCF" },
      { stage: "プレミアム", pct: 47, color: "#00175A" },
    ],
  },
  {
    id: "art-collector",
    name: "アートコレクター派",
    icon: Palette,
    category: "entertainment",
    members: 18,
    engagementScore: 78,
    spendPotential: 95,
    incomeLevel: "high",
    description: "国内外のオークションやギャラリーで現代アートを購入。単価が高く、VIPイベントへの招待を重視。アート×旅行の複合支出が特徴的で解約率が最も低い。",
    avgSpend: "¥120万/月",
    upgradeRate: "44%",
    churnRisk: "低",
    features: [
      { label: "年間アート支出", value: "1,000万円以上" },
      { label: "アートフェア参加", value: "年5回以上" },
      { label: "VIPイベント重視度", value: "最高" },
    ],
    personas: [
      {
        id: "p4", name: "木村 奈緒", age: 52, gender: "女性",
        image: "/images/personas/persona-12.jpg",
        occupation: "実業家", income: "1億円以上",
        background: "IT企業を売却後、アート投資に注力。アート・バーゼル・マイアミには毎年VIPパスで参加。現代美術と建築が主な収集対象。",
        lifestyle: "文化的投資とプライベートコレクション構築。アートを通じた国際的人脈形成に積極的。",
        interests: ["現代アート", "建築", "ワイン"], cardGoal: "アートフェアVIP入場とギャラリープライベートビューイング",
        tribe: "アートコレクター派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 4, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 8, color: "#66B3FF" },
      { stage: "新規会員", pct: 35, color: "#006FCF" },
      { stage: "プレミアム", pct: 53, color: "#00175A" },
    ],
  },
  {
    id: "fine-dining",
    name: "美食・グルメ派",
    icon: Wine,
    category: "dining",
    members: 55,
    engagementScore: 72,
    spendPotential: 78,
    incomeLevel: "medium",
    description: "ミシュラン星付きレストランでの食事が月4回以上。プライベートシェフ体験やワインセラーオーナーシップへの関心が急上昇中。",
    avgSpend: "¥52万/月",
    upgradeRate: "28%",
    churnRisk: "中",
    features: [
      { label: "外食頻度", value: "月16回以上" },
      { label: "ワインセラー保有", value: "41%" },
      { label: "シェフズテーブル経験", value: "年6回以上" },
    ],
    personas: [
      {
        id: "p5", name: "中村 健太", age: 41, gender: "男性",
        image: "/images/personas/persona-06.jpg",
        occupation: "外資系コンサルタント", income: "1,500万円以上",
        background: "世界60カ国以上の食体験を持つ美食家。ミシュランガイドは創刊年から収集。ソムリエ資格を保有。",
        lifestyle: "週末はカウンター席でペアリングディナー。食の探求が人生の軸。新星シェフの発掘が趣味。",
        interests: ["グルメ", "ワイン", "料理"], cardGoal: "ダイニング特典とプライベートシェフ予約コンシェルジュ",
        tribe: "美食・グルメ派"
      },
      {
        id: "p6", name: "伊藤 裕子", age: 38, gender: "女性",
        image: "/images/personas/persona-04.jpg",
        occupation: "フードジャーナリスト", income: "800万円以上",
        background: "食専門メディアを主宰。年間200軒以上のレストランを訪問。国際的なガストロノミーイベントの常連。",
        lifestyle: "試食・取材・発信のサイクルが生活リズム。インフルエンサーとしての食業界への影響力も大。",
        interests: ["グルメ", "食文化", "旅行"], cardGoal: "海外ミシュランレストランの優先予約と食体験ツアー",
        tribe: "美食・グルメ派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 15, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 22, color: "#66B3FF" },
      { stage: "新規会員", pct: 48, color: "#006FCF" },
      { stage: "プレミアム", pct: 15, color: "#00175A" },
    ],
  },
  {
    id: "f1-motor",
    name: "F1・モータースポーツ派",
    icon: Car,
    category: "entertainment",
    members: 24,
    engagementScore: 76,
    spendPotential: 85,
    incomeLevel: "high",
    description: "F1グランプリへの年間サーキット観戦が常態化。スーパーカーの購入・サブスク利用や、サーキット走行体験への支出が突出して高い。",
    avgSpend: "¥78万/月",
    upgradeRate: "41%",
    churnRisk: "低",
    features: [
      { label: "F1観戦回数", value: "年4戦以上" },
      { label: "保有車両台数", value: "平均3.2台" },
      { label: "VIPパドック利用", value: "78%" },
    ],
    personas: [
      {
        id: "p7", name: "渡辺 隆", age: 45, gender: "男性",
        image: "/images/personas/persona-09.jpg",
        occupation: "製造業 オーナー経営者", income: "2,000万円以上",
        background: "フェラーリとポルシェを所有。モナコGPにはプライベートヨットで参戦。サーキット走行ライセンスも保有。",
        lifestyle: "週末はサーキットかドライビング体験。F1チームのスポンサーを通じた人脈形成に積極的。",
        interests: ["F1", "スーパーカー", "ヨット"], cardGoal: "F1 VIPパドックパスとスーパーカーレンタル優待",
        tribe: "F1・モータースポーツ派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 10, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 18, color: "#66B3FF" },
      { stage: "新規会員", pct: 46, color: "#006FCF" },
      { stage: "プレミアム", pct: 26, color: "#00175A" },
    ],
  },
  {
    id: "polo-equestrian",
    name: "ポロ・乗馬派",
    icon: Trophy,
    category: "entertainment",
    members: 9,
    engagementScore: 82,
    spendPotential: 96,
    incomeLevel: "high",
    description: "ポロ競技への参加・観戦と乗馬クラブへの所属が中心。馬の購入・管理費を含む支出が最高水準で、英国・アルゼンチンへの遠征が年次化。",
    avgSpend: "¥145万/月",
    upgradeRate: "55%",
    churnRisk: "低",
    features: [
      { label: "年間ポロ関連支出", value: "2,000万円以上" },
      { label: "乗馬クラブ会員", value: "複数保有" },
      { label: "英国滞在", value: "年2回以上" },
    ],
    personas: [
      {
        id: "p8", name: "橋本 明子", age: 44, gender: "女性",
        image: "/images/personas/persona-05.jpg",
        occupation: "ベンチャーキャピタリスト", income: "3,000万円以上",
        background: "英国留学中にポロに目覚め、帰国後も定期的に競技参加。競走馬のオーナーでもあり、有馬記念には毎年来賓として招待される。",
        lifestyle: "週末は乗馬クラブで過ごし、ポロシーズンには英国ウィンザーへ。馬を通じた上流社会との交流を楽しむ。",
        interests: ["ポロ", "乗馬", "競馬"], cardGoal: "英国・アルゼンチン遠征の手配とVIPホスピタリティ",
        tribe: "ポロ・乗馬派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 3, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 7, color: "#66B3FF" },
      { stage: "新規会員", pct: 30, color: "#006FCF" },
      { stage: "プレミアム", pct: 60, color: "#00175A" },
    ],
  },
  {
    id: "private-aviation",
    name: "プライベートアビエーション派",
    icon: Plane,
    category: "travel",
    members: 12,
    engagementScore: 88,
    spendPotential: 98,
    incomeLevel: "high",
    description: "プライベートジェットをメインの移動手段とする超富裕層。チャーター便の手配・フラクショナルオーナーシップが中心で、AMEX Platinumとの親和性が最高。",
    avgSpend: "¥210万/月",
    upgradeRate: "62%",
    churnRisk: "低",
    features: [
      { label: "月間フライト回数", value: "8回以上" },
      { label: "チャーター利用比率", value: "95%" },
      { label: "AMEX Platinum保有率", value: "100%" },
    ],
    personas: [
      {
        id: "p9", name: "安田 武雄", age: 72, gender: "男性",
        image: "/images/personas/persona-11.jpg",
        occupation: "資産家・名誉会長", income: "10億円以上",
        background: "国内工場視察から海外子会社訪問まで、すべてプライベートジェット��移動。��ルフストリームG650のオーナーで、機体管理チームを保有。",
        lifestyle: "時間を最も贅沢なものと考え、待ち時間ゼロを徹底。同じ価値観を持つエグゼクティブとのネットワーク構築に注力。",
        interests: ["プライベートジェット", "ゴルフ", "ヴィンテージワイン"], cardGoal: "FBO（プライベートターミナル）サービスとジェット手配コンシェルジュ",
        tribe: "プライベートアビエーション派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 2, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 5, color: "#66B3FF" },
      { stage: "新規会員", pct: 28, color: "#006FCF" },
      { stage: "プレミアム", pct: 65, color: "#00175A" },
    ],
  },
  {
    id: "adventure-sport",
    name: "アドベンチャースポーツ派",
    icon: Mountain,
    category: "travel",
    members: 22,
    engagementScore: 55,
    spendPotential: 62,
    incomeLevel: "medium",
    description: "ヘリスキー・極地探検・深海ダイビングなど非日常のアドベンチャーに高額支出する層。体験の希少性・独自性を最優先とする価値観。",
    avgSpend: "¥38万/月",
    upgradeRate: "18%",
    churnRisk: "中",
    features: [
      { label: "希少体験年間支出", value: "500万円以上" },
      { label: "海外遠征回数", value: "年8回以上" },
      { label: "旅行保険重要度", value: "最高" },
    ],
    personas: [
      {
        id: "p10", name: "渡辺 大介", age: 36, gender: "男性",
        image: "/images/personas/persona-07.jpg",
        occupation: "IT起業家", income: "1,200万円以上",
        background: "会社売却後の資産で世界の希少体験に投資。七大陸最高峰の登頂を目指しており、残り2峰。南極点到達も達成。",
        lifestyle: "非日常体験のキュレーターとして生きる。体験コミュニティを形成し同好の士とグループ遠征を企画。",
        interests: ["登山", "ヘリスキー", "ダイビング"], cardGoal: "極地・高山での緊急対応コンシェルジュと充実した旅行保険",
        tribe: "アドベンチャースポーツ派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 22, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 30, color: "#66B3FF" },
      { stage: "新規会員", pct: 38, color: "#006FCF" },
      { stage: "プレミアム", pct: 10, color: "#00175A" },
    ],
  },
  {
    id: "classical-music",
    name: "クラシック・オペラ派",
    icon: Music,
    category: "entertainment",
    members: 16,
    engagementScore: 65,
    spendPotential: 72,
    incomeLevel: "medium",
    description: "ウィーン国立歌劇場・ザルツブルク音楽祭などへの毎年参加が定着。VIPボックス席・楽屋訪問への需要が高く、アーティストとの交流を重視。",
    avgSpend: "¥48万/月",
    upgradeRate: "26%",
    churnRisk: "低",
    features: [
      { label: "年間音楽体験支出", value: "300万円以上" },
      { label: "海外音楽祭参加", value: "年3回以上" },
      { label: "VIPホスピタリティ重視", value: "高" },
    ],
    personas: [
      {
        id: "p11", name: "林 真奈美", age: 56, gender: "女性",
        image: "/images/personas/persona-08.jpg",
        occupation: "実業家", income: "1,500万円以上",
        background: "幼少期よりピアノを習い、現在は後援者として若手音楽家を支援。ウィーン・フィルのゴールドスポンサーとしてバックステージアクセスを保有。",
        lifestyle: "文化投資を通じた人脈形成。世界の一流ホールで聴く体験を年間の軸に据え、旅行計画もすべて音楽祭に合わせる。",
        interests: ["クラシック音楽", "オペラ", "バレエ"], cardGoal: "音楽祭VIPパッケージとアーティスト交流イベントへのアクセス",
        tribe: "クラシック・オペラ派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 12, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 20, color: "#66B3FF" },
      { stage: "新規会員", pct: 46, color: "#006FCF" },
      { stage: "プレミアム", pct: 22, color: "#00175A" },
    ],
  },
  {
    id: "tech-investor",
    name: "テック投資家派",
    icon: Cpu,
    category: "entertainment",
    members: 27,
    engagementScore: 48,
    spendPotential: 70,
    incomeLevel: "medium",
    description: "AI・宇宙・バイオテクノロジーへの先行投資が多い若手富裕層。デジタル決済への親和性が最も高く、次世代サービスの早期採用者として注目。",
    avgSpend: "¥41万/月",
    upgradeRate: "31%",
    churnRisk: "中",
    features: [
      { label: "スタートアップ投資件数", value: "年10件以上" },
      { label: "平均年齢", value: "36歳" },
      { label: "デジタル特典重視", value: "最高" },
    ],
    personas: [
      {
        id: "p12", name: "鈴木 彩夏", age: 29, gender: "女性",
        image: "/images/personas/persona-10.jpg",
        occupation: "AIスタートアップ CEO", income: "800万円以上",
        background: "シリコンバレー帰りのAI研究者。Y Combinator卒業後に日本でスタートアップを創業。宇宙旅行の予約を完了済み。",
        lifestyle: "テクノロジーとラグジュアリーを融合させた生活スタイル。スマートホームと国際移動が日常。",
        interests: ["AI/テクノロジー", "宇宙旅行", "サーフィン"], cardGoal: "テックイベントVIPアクセスとスタートアップエコシステム特典",
        tribe: "テック投資家派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 20, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 28, color: "#66B3FF" },
      { stage: "新規会員", pct: 38, color: "#006FCF" },
      { stage: "プレミアム", pct: 14, color: "#00175A" },
    ],
  },
  // ---- 新規追加トライブ ----
  {
    id: "luxury-resort",
    name: "ラグジュアリーリゾート派",
    icon: Plane,
    category: "travel",
    members: 48,
    engagementScore: 78,
    spendPotential: 75,
    incomeLevel: "high",
    description: "年3〜5回の長期滞在型リゾートを好む層。モルディブ・バリ・アマンリゾートなどを定宿とし、スパ・ヴィラ・プライベートプール付き宿泊が標準。",
    avgSpend: "¥58万/月",
    upgradeRate: "33%",
    churnRisk: "低",
    features: [
      { label: "平均滞在日数", value: "10泊以上/回" },
      { label: "スイート利用率", value: "88%" },
      { label: "アマン滞在経験", value: "76%" },
    ],
    personas: [
      {
        id: "p13", name: "西村 奈津", age: 48, gender: "女性",
        image: "/images/personas/persona-02.jpg",
        occupation: "医師（美容外科院長）", income: "2,000万円以上",
        background: "診療の合間に年4回の海外リゾ��ト滞在。アマングループの全施設制覇を目指している。スパと食体験を旅の核に据える。",
        lifestyle: "非日常の静寂と美を求める旅スタイル。SNSには載せないプライベート重視型旅行者。",
        interests: ["スパ", "ヨガ", "美食"], cardGoal: "プレミアムリゾート優先予約とヴィラアップグレード",
        tribe: "ラグジュアリーリゾート派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 12, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 20, color: "#66B3FF" },
      { stage: "新規会員", pct: 46, color: "#006FCF" },
      { stage: "プレミアム", pct: 22, color: "#00175A" },
    ],
  },
  {
    id: "wine-sommelier",
    name: "ワイン・ソムリエ派",
    icon: Wine,
    category: "dining",
    members: 31,
    engagementScore: 62,
    spendPotential: 68,
    incomeLevel: "medium",
    description: "ボルドー・ブルゴーニュの一級畑を定期購入し、ワインセラーへの長期投資が特徴。テイスティングツアーや醸造家との私的交流を重視する層。",
    avgSpend: "¥44万/月",
    upgradeRate: "24%",
    churnRisk: "中",
    features: [
      { label: "年間ワイン支出", value: "500万円以上" },
      { label: "セラー保有本数", value: "平均800本" },
      { label: "産地訪問", value: "年2回以上" },
    ],
    personas: [
      {
        id: "p14", name: "松本 裕二", age: 52, gender: "男性",
        image: "/images/personas/persona-03.jpg",
        occupation: "不動産オーナー", income: "1,800万円以上",
        background: "ブルゴーニュ愛好家。DRCのアロケーションを持つ数少ない日本人の一人。ヴォーヌ=ロマネ村に別荘を購入し醸造家と交友。",
        lifestyle: "食事ごとにテーマを決めペアリングを設計。仲間とのヴィンテージ垂直試飲会が月次の楽しみ。",
        interests: ["ワイン", "フランス料理", "旅行"], cardGoal: "ワイナリーVIPツアーと希少ヴィンテー���の優先購入",
        tribe: "ワイン・ソムリエ派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 18, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 24, color: "#66B3FF" },
      { stage: "新規会員", pct: 42, color: "#006FCF" },
      { stage: "プレミアム", pct: 16, color: "#00175A" },
    ],
  },
  {
    id: "private-chef",
    name: "プライベートダイニング派",
    icon: Fish,
    category: "dining",
    members: 19,
    engagementScore: 45,
    spendPotential: 55,
    incomeLevel: "medium",
    description: "自宅でのプライベートシェフ招聘や貸し切りレストランでのホスト体験に傾倒。ゲストをもてなす「主催者」としてのアイデンティティが強い層。",
    avgSpend: "¥36万/月",
    upgradeRate: "20%",
    churnRisk: "中",
    features: [
      { label: "プライベートシェフ頻度", value: "月2回以上" },
      { label: "ホームパーティ規模", value: "平均12名" },
      { label: "貸し切りレストラン経験", value: "年4回以上" },
    ],
    personas: [
      {
        id: "p15", name: "吉田 理恵", age: 44, gender: "女性",
        image: "/images/personas/persona-04.jpg",
        occupation: "広告代理店 Creative Director", income: "1,200万円以上",
        background: "食を通じた人脈形成が得意。芸術家・経営者・シェフを同じテーブルに集めるサロン文化を自宅で実践。",
        lifestyle: "週末のホームダイニングが社交の軸。プレートデザインにも拘り、テーブルセッティングは毎回テーマを設ける。",
        interests: ["料理", "インテリア", "現代アート"], cardGoal: "著名シェフのプライベートディナー手配とコンシェルジュ支援",
        tribe: "プライベートダイニング派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 24, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 32, color: "#66B3FF" },
      { stage: "新規会員", pct: 36, color: "#006FCF" },
      { stage: "プレミアム", pct: 8, color: "#00175A" },
    ],
  },
  {
    id: "yacht-sailing",
    name: "ヨット・セーリング派",
    icon: Fish,
    category: "travel",
    members: 14,
    engagementScore: 30,
    spendPotential: 42,
    incomeLevel: "high",
    description: "地中海・カリブ海をヨットでクルーズするライフスタイル層。船舶オーナーシップまたはチャーター利用が中心で、マリーナ拠点の移動生活が特徴。",
    avgSpend: "¥62万/月",
    upgradeRate: "27%",
    churnRisk: "低",
    features: [
      { label: "年間航海日数", value: "60日以上" },
      { label: "保有/チャーター艇長", value: "40ft以上" },
      { label: "地中海滞在", value: "年1回以上" },
    ],
    personas: [
      {
        id: "p16", name: "石川 健一", age: 58, gender: "男性",
        image: "/images/personas/persona-09.jpg",
        occupation: "商社 元役員", income: "2,500万円以上",
        background: "定年後にヨットを購入し地中海縦断を達成。現在は地中海と日本を季節ごとに往来するノマドライフを実践。",
        lifestyle: "「家はヨット」をモットーに国境なき生活。寄港地の市場で食材を調達し自炊することが最大の楽しみ。",
        interests: ["セーリング", "釣り", "料理"], cardGoal: "マリーナ優先接岸とヨット修繕コンシェルジュ対応",
        tribe: "ヨット・セーリング派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 14, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 22, color: "#66B3FF" },
      { stage: "新規会員", pct: 42, color: "#006FCF" },
      { stage: "プレミアム", pct: 22, color: "#00175A" },
    ],
  },
  {
    id: "live-music",
    name: "ライブ・フェス派",
    icon: Music,
    category: "entertainment",
    members: 35,
    engagementScore: 35,
    spendPotential: 38,
    incomeLevel: "low",
    description: "コーチェラ・グラストンベリー・フジロックなど国内外の音楽フェスをVIP席で体験。アーティストとのバックステージ交流や限定体験に高い支出意欲を持つ。",
    avgSpend: "¥28万/月",
    upgradeRate: "16%",
    churnRisk: "高",
    features: [
      { label: "年間フェス参加数", value: "8回以上" },
      { label: "VIPパッケージ利用率", value: "72%" },
      { label: "平均年齢", value: "34歳" },
    ],
    personas: [
      {
        id: "p17", name: "小林 雄太", age: 32, gender: "男性",
        image: "/images/personas/persona-07.jpg",
        occupation: "音楽プロデューサー", income: "900万円以上",
        background: "国内外の音楽シーンを渡り歩くプロデューサー。フェスはビジネスと趣味が重なる場所で、年間渡航の半分がフェス目的。",
        lifestyle: "音楽と旅が不可分。フェスの前後に1週間の現地滞在を設け、ローカル音楽シーンも探訪。",
        interests: ["音楽", "旅行", "写真"], cardGoal: "フェスVIPパスと現地ホテル優先予約",
        tribe: "ライブ・フェス派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 28, color: "#B3D9FF" },
      { stage: "未��員（Brand Consideration 高）", pct: 34, color: "#66B3FF" },
      { stage: "新規会員", pct: 30, color: "#006FCF" },
      { stage: "プレミアム", pct: 8, color: "#00175A" },
    ],
  },
  {
    id: "theater-film",
    name: "シアター・映画派",
    icon: Star,
    category: "entertainment",
    members: 28,
    engagementScore: 22,
    spendPotential: 28,
    incomeLevel: "low",
    description: "ブロードウェイ・ウエストエンドの初演VIP席やカンヌ映画祭への参加を年間行事とする層。映画・演劇プロデュースへの出資経験を持つ者も多い。",
    avgSpend: "¥22万/月",
    upgradeRate: "13%",
    churnRisk: "高",
    features: [
      { label: "年間観劇本数", value: "30本以上" },
      { label: "海外シアター参加", value: "年2回以上" },
      { label: "クリエイティブ投資", value: "42%が経験あり" },
    ],
    personas: [
      {
        id: "p18", name: "川島 麻衣", age: 38, gender: "女性",
        image: "/images/personas/persona-05.jpg",
        occupation: "映像ディレクター", income: "800万円以上",
        background: "カンヌ映画祭に5年連続参加。ブロードウェイ新作の開幕初日チケットを毎シーズン確保。映画と演劇への出資も行う。",
        lifestyle: "アートと物語への感受性が生活の核。映画・演劇・写真・文学が交差する文化的生活圏で生きる。",
        interests: ["映画", "演劇", "写真"], cardGoal: "初演VIPシートとカンヌ映画祭パスのコンシェルジュ手配",
        tribe: "シアター・映画派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 32, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 36, color: "#66B3FF" },
      { stage: "新規会員", pct: 26, color: "#006FCF" },
      { stage: "プレミアム", pct: 6, color: "#00175A" },
    ],
  },
  {
    id: "local-gourmet",
    name: "ローカルグルメ探訪派",
    icon: Fish,
    category: "dining",
    members: 44,
    engagementScore: 15,
    spendPotential: 32,
    incomeLevel: "low",
    description: "世界各地の隠れた名店・ストリートフードの探求を旅の主目的とする層。口コミゼロの秘境レストランや伝統市場での体験を最優先する新しいグルメ観。",
    avgSpend: "¥18万/月",
    upgradeRate: "11%",
    churnRisk: "高",
    features: [
      { label: "訪問国数", value: "年15カ国以上" },
      { label: "SNS発信頻度", value: "週5投稿以上" },
      { label: "平均年齢", value: "31歳" },
    ],
    personas: [
      {
        id: "p19", name: "田村 さくら", age: 27, gender: "女性",
        image: "/images/personas/persona-10.jpg",
        occupation: "フードコンテンツクリエイター", income: "600万円以上",
        background: "フォロワー80万人のグルメインフルエンサー。ミシュランより「地元民しか知らない名店」を優先。現地調達・現地消費が信条。",
        lifestyle: "旅＝食の探求。言語の壁を越えてシェフと会話し、レシピを記録・発信することで生計を立てる。",
        interests: ["グルメ", "旅行", "写真"], cardGoal: "旅行中の食体験優待と海外でのコンシェルジュ対応",
        tribe: "ローカルグルメ探訪派"
      },
    ],
    stageDistribution: [
      { stage: "未会員（Brand Consideration 低）", pct: 35, color: "#B3D9FF" },
      { stage: "未会員（Brand Consideration 高）", pct: 38, color: "#66B3FF" },
      { stage: "新規会員", pct: 22, color: "#006FCF" },
      { stage: "プレミアム", pct: 5, color: "#00175A" },
    ],
  },
]

// ---- ペルソナモーダル ----
function PersonaModal({ persona, open, onClose }: { persona: Persona | null; open: boolean; onClose: () => void }) {
  if (!persona) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">
        <div className="bg-primary px-6 pt-6 pb-5 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/40 shrink-0">
            <AvatarImage src={persona.image} alt={persona.name} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {persona.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-white text-xl font-bold">{persona.name}</DialogTitle>
            <p className="text-white/75 text-sm mt-0.5">{persona.age}歳 / {persona.gender}</p>
            <p className="text-white/60 text-xs mt-0.5">{persona.occupation}</p>
            <p className="text-white/50 text-xs">{persona.income}</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <p className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" /> 背景・経歴
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted rounded-lg px-3 py-2.5">
              {persona.background}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" /> ライフスタイル
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted rounded-lg px-3 py-2.5">
              {persona.lifestyle}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> 趣味・関心
            </p>
            <div className="flex flex-wrap gap-2">
              {persona.interests.map(i => (
                <Badge key={i} variant="outline" className="text-primary border-primary/30 bg-primary/5 text-xs">
                  {i}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" /> カード活用ゴール
            </p>
            <p className="text-sm text-foreground font-medium bg-primary/5 rounded-lg px-3 py-2.5 border border-primary/15">
              {persona.cardGoal}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground text-center pt-1 border-t border-border">
            このAIペルソナはマーケティング分析用に生成された架空の人物です
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---- メインコンポーネント ----
export function TribeAnalysisContent() {
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null)
  const [detailTab, setDetailTab] = useState("overview")
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [personaModalOpen, setPersonaModalOpen] = useState(false)

  const totalMembers = ALL_TRIBES.reduce((s, t) => s + t.members, 0)
  const totalTribes = ALL_TRIBES.length

  // マトリクスのセルごとにトライブを取得
  const getTribesForCell = (income: IncomeKey, stage: StageKey) => {
    const stageFullLabel = STAGES.find(s => s.key === stage)?.fullLabel ?? ""
    return ALL_TRIBES.filter(t => 
      t.incomeLevel === income && 
      t.stageDistribution.some(s => s.stage === stageFullLabel && s.pct > 15)
    )
  }

  const handleTribeClick = (tribe: Tribe) => {
    setSelectedTribe(prev => prev?.id === tribe.id ? null : tribe)
    setDetailTab("overview")
  }

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona)
    setPersonaModalOpen(true)
  }

  const churnBadge: Record<string, string> = {
    低: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    中: "text-amber-700 bg-amber-50 border border-amber-200",
    高: "text-red-700 bg-red-50 border border-red-200"
  }

  // ステージ背景色
  const stageBg: Record<StageKey, string> = {
    bc_low: "bg-white",
    bc_high: "bg-[#E8F4FD]",
    new: "bg-[#C5E4FC]",
    premium: "bg-[#8ACDF6]",
  }

  return (
    <div className="p-6 space-y-4">
      {/* サマリーバー */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">{totalTribes}</span>
          <span className="text-sm text-muted-foreground">トライブ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">{totalMembers}万人</span>
          <span className="text-sm text-muted-foreground">推定会員</span>
        </div>
        {/* カテゴリ凡例 */}
        <div className="ml-auto flex items-center gap-4">
          {(Object.entries(CATEGORY_META) as [TribeCategory, typeof CATEGORY_META[TribeCategory]][]).map(([, meta]) => (
            <div key={meta.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: meta.bg, borderColor: meta.color }} />
              <span className="text-xs font-medium" style={{ color: meta.color }}>{meta.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* メインレイアウト: マトリクス + 詳細パネル */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* マトリクス表：縦軸=平均世帯年収、横軸=ステージ */}
        <div className="min-w-0">
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* ヘッダー行 */}
            <div className="grid grid-cols-[80px_repeat(4,1fr)]">
              <div className="p-3 border-b border-r border-border bg-slate-50">
                <p className="text-[10px] text-muted-foreground text-center">ステージ</p>
                <p className="text-[10px] text-muted-foreground text-center">世帯年収</p>
              </div>
              {STAGES.map((s) => (
                <div key={s.key} className={`p-3 border-b border-r last:border-r-0 border-border text-center ${stageBg[s.key]}`}>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className={`w-2 h-2 rounded-full ${s.key === "bc_low" ? "bg-slate-400" : "bg-[#006FCF]"}`} />
                  </div>
                  <p className={`text-xs font-bold ${s.key === "bc_low" ? "text-slate-600" : "text-[#006FCF]"}`}>{s.label}</p>
                </div>
              ))}
            </div>
            {/* ボディ行 */}
            {INCOME_LEVELS.map((income) => (
              <div key={income.key} className="grid grid-cols-[80px_repeat(4,1fr)]">
                <div className="p-3 border-r border-b last:border-b-0 border-border bg-slate-50 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-[#006FCF]">{income.label}</span>
                  <span className="text-[10px] text-muted-foreground">{income.sublabel}</span>
                </div>
                {STAGES.map((stage) => {
                  const tribes = getTribesForCell(income.key, stage.key)
                  return (
                    <div
                      key={stage.key}
                      className={`p-2 border-r border-b last:border-r-0 last:border-b-0 border-border/50 min-h-[120px] ${stageBg[stage.key]}`}
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {tribes.map((tribe) => {
                          const isSelected = selectedTribe?.id === tribe.id
                          const catColor = CATEGORY_META[tribe.category].color
                          const catBg = CATEGORY_META[tribe.category].bg
                          return (
                            <button
                              key={tribe.id}
                              onClick={() => handleTribeClick(tribe)}
                              className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${
                                isSelected
                                  ? "ring-2 ring-offset-1 shadow-md scale-105"
                                  : "hover:scale-105 hover:shadow-sm"
                              }`}
                              style={{
                                backgroundColor: isSelected ? catColor : catBg,
                                color: isSelected ? "white" : catColor,
                                borderWidth: 1,
                                borderColor: catColor,
                                borderStyle: "solid",
                              }}
                            >
                              {tribe.name.replace(/派$/, "")}
                            </button>
                          )
                        })}
                        {tribes.length === 0 && (
                          <span className="text-[10px] text-muted-foreground/50">-</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 詳細パネル：常に320px幅を確保し、選択なし時はプレースホルダーを表示 */}
        <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
          {!selectedTribe ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[460px] gap-3 text-muted-foreground px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Network className="h-5 w-5 text-muted-foreground/60" />
              </div>
              <p className="text-sm font-medium">トライブを選択してください</p>
              <p className="text-xs text-muted-foreground/70">マトリクス上のトライブをクリックすると詳細が表示されます</p>
            </div>
          ) : (
          <>
            {/* パネルヘッダー */}
            <div
              className="flex items-start justify-between px-5 py-4 border-b border-border"
              style={{ backgroundColor: CATEGORY_META[selectedTribe.category].color + "12" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg" style={{ backgroundColor: CATEGORY_META[selectedTribe.category].color + "20", color: CATEGORY_META[selectedTribe.category].color }}>
                  {(() => { const Icon = selectedTribe.icon; return <Icon className="h-4 w-4" /> })()}
                </div>
                <div>
                  <p className="font-bold text-foreground text-[15px]">{selectedTribe.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedTribe.members}万人の会員</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTribe(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted mt-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* タブ */}
            <Tabs value={detailTab} onValueChange={setDetailTab} className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto px-4 pt-2 gap-1 justify-start shrink-0">
                {[
                  { value: "overview", label: "概要" },
                  { value: "personas", label: "ペルソナ" },
                  { value: "distribution", label: "ステージ分布" },
                ].map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs px-3 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* 概要タブ */}
              <TabsContent value="overview" className="flex-1 px-5 py-4 space-y-4 m-0 overflow-y-auto">
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted rounded-lg px-3 py-3">
                  {selectedTribe.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3 border border-border">
                    <p className="text-[10px] text-muted-foreground mb-1">平均利用額</p>
                    <p className="text-sm font-bold" style={{ color: selectedTribe.color }}>{selectedTribe.avgSpend}</p>
                  </div>
                  <div className="rounded-lg p-3 border border-border">
                    <p className="text-[10px] text-muted-foreground mb-1">アップグレード率</p>
                    <p className="text-sm font-bold" style={{ color: selectedTribe.color }}>{selectedTribe.upgradeRate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2.5">主な特徴</p>
                  <div className="space-y-2.5">
                    {selectedTribe.features.map(f => (
                      <div key={f.label} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{f.label}</span>
                        <span className="font-semibold text-foreground text-xs">{f.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-sm pt-1 border-t border-border">
                      <span className="text-muted-foreground">解約リスク</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${churnBadge[selectedTribe.churnRisk]}`}>
                        {selectedTribe.churnRisk}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full gap-2 text-xs">
                  <ChevronRight className="h-3.5 w-3.5" />
                  トライブにヒアリング
                </Button>
              </TabsContent>

              {/* ペルソナタブ */}
              <TabsContent value="personas" className="flex-1 px-5 py-4 m-0 overflow-y-auto">
                <p className="text-xs text-muted-foreground mb-3">AIペルソナ（{selectedTribe.personas.length}名）</p>
                <div className="space-y-3">
                  {selectedTribe.personas.map(persona => (
                    <button
                      key={persona.id}
                      onClick={() => handlePersonaClick(persona)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                    >
                      <Avatar className="h-11 w-11 shrink-0">
                        <AvatarImage src={persona.image} alt={persona.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {persona.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">{persona.name}</p>
                        <p className="text-xs text-muted-foreground">{persona.age}歳 / {persona.gender}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {persona.interests.slice(0, 2).map(i => (
                            <span key={i} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{i}</span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </button>
                  ))}
                </div>
              </TabsContent>

              {/* ステージ分布タブ */}
              <TabsContent value="distribution" className="flex-1 px-5 py-4 m-0 overflow-y-auto">
                <p className="text-xs text-muted-foreground mb-4">カードステージ別の会員構成</p>
                <div className="space-y-3">
                  {selectedTribe.stageDistribution.map(d => (
                    <div key={d.stage}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-foreground">{d.stage}</span>
                        <span className="text-muted-foreground">{d.pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-3.5 bg-muted rounded-xl">
                  <p className="text-xs text-muted-foreground">推定会員数</p>
                  <p className="text-lg font-bold text-foreground">{selectedTribe.members}万人</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    プレミアム構成比: {selectedTribe.stageDistribution.find(d => d.stage === "プレミアム")?.pct ?? 0}%
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </>
          )}
        </div>
      </div>

      {/* ペルソナモーダル */}
      <PersonaModal
        persona={selectedPersona}
        open={personaModalOpen}
        onClose={() => setPersonaModalOpen(false)}
      />
    </div>
  )
}
