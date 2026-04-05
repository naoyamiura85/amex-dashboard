"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, Users, TrendingUp, CreditCard, Star, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// ---- データ定義 ----

const CARD_STAGES = ["全体", "見込み", "新規", "アクティブ", "プレミアム"] as const
type CardStage = typeof CARD_STAGES[number]

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

interface Tribe {
  id: string
  name: string
  members: number       // 万人
  engagementScore: number  // 0–100 (y軸)
  spendPotential: number   // 0–100 (x軸)
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
    name: "ゴルフ・クラブ派",
    members: 42,
    engagementScore: 85,
    spendPotential: 88,
    description: "国内外の名門コースを年10回以上ラウンドする層。メンバーシップ費・ゴルフ旅行での高額カード決済が多い。",
    avgSpend: "¥68万/月",
    upgradeRate: "38%",
    churnRisk: "低",
    features: [
      { label: "健康への関心", value: "高" },
      { label: "旅行頻度", value: "年12回以上" },
      { label: "購買意欲", value: "積極的" },
    ],
    personas: [
      { id: "p1", name: "田中 誠司", age: 58, gender: "男性", image: "/images/personas/persona-01.jpg", occupation: "上場企業 代表取締役", income: "3,000万円以上", background: "30代から経営に携わり、接待ゴルフで人脈を構築。週末は会員制コースでラウンド。", lifestyle: "健康管理に投資。毎朝トレーニング。国内外のゴルフリゾートへ年12回以上。", interests: ["ゴルフ", "ワイン", "クラシック音楽"], cardGoal: "ゴルフ場ラウンジ特典とコンシェルジュ活用", tribe: "ゴルフ・クラブ派" },
      { id: "p2", name: "佐藤 隆一", age: 62, gender: "男性", image: "/images/personas/persona-03.jpg", occupation: "投資家", income: "5,000万円以上", background: "早期リタイア後、ゴルフと投資を中心とした生活。海外メジャーコースへの遠征が年3回。", lifestyle: "アクティブリタイア。健康に投資。仲間との交流を重視。", interests: ["ゴルフ", "海外旅行", "美食"], cardGoal: "海外ゴルフ遠征の優待と手荷物サービス", tribe: "ゴルフ・クラブ派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 8, color: "#B3D9FF" },
      { stage: "新規", pct: 15, color: "#66B3FF" },
      { stage: "アクティブ", pct: 44, color: "#006FCF" },
      { stage: "プレミアム", pct: 33, color: "#00175A" },
    ],
  },
  {
    id: "globe-trotter",
    name: "グローブトロッター派",
    members: 38,
    engagementScore: 90,
    spendPotential: 92,
    description: "年間20カ国以上を渡航するハイパー旅行者。ビジネスクラス・プライベートジェットの利用が多く、空港ラウンジ利用頻度が最高水準。",
    avgSpend: "¥95万/月",
    upgradeRate: "51%",
    churnRisk: "低",
    features: [
      { label: "渡航頻度", value: "年20回以上" },
      { label: "宿泊単価", value: "¥8万/泊以上" },
      { label: "情報感度", value: "最高" },
    ],
    personas: [
      { id: "p3", name: "山本 洋子", age: 45, gender: "女性", image: "/images/personas/persona-02.jpg", occupation: "ファッションデザイナー", income: "2,000万円以上", background: "パリ・ミラノを拠点に活動。コレクション期は月3カ国以上移動。プライベートでもアジアリゾートへ頻繁に。", lifestyle: "感度の高いライフスタイル。最新トレンドの最前線にいることが仕事であり喜び。", interests: ["ファッション", "現代アート", "グルメ"], cardGoal: "ラウンジアクセスとホテルアップグレード特典", tribe: "グローブトロッター派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 5, color: "#B3D9FF" },
      { stage: "新規", pct: 10, color: "#66B3FF" },
      { stage: "アクティブ", pct: 38, color: "#006FCF" },
      { stage: "プレミアム", pct: 47, color: "#00175A" },
    ],
  },
  {
    id: "art-collector",
    name: "アートコレクター派",
    members: 18,
    engagementScore: 78,
    spendPotential: 95,
    description: "国内外のオークションやギャラリーで現代アートを購入。単価が高く、VIPイベントへの招待を重視。アート×旅行の複合支出が多い。",
    avgSpend: "¥120万/月",
    upgradeRate: "44%",
    churnRisk: "低",
    features: [
      { label: "健康への関心", value: "中" },
      { label: "文化投資", value: "最高" },
      { label: "購買意欲", value: "厳選型" },
    ],
    personas: [
      { id: "p4", name: "木村 奈緒", age: 52, gender: "女性", image: "/images/personas/persona-12.jpg", occupation: "実業家", income: "1億円以上", background: "IT企業を売却後、アート投資に注力。バーゼル・アート・フェアには毎年参加。", lifestyle: "文化的投資とプライベートコレクション構築。アートを通じた国際的人脈形成。", interests: ["現代アート", "建築", "ワイン"], cardGoal: "アートフェアの優先入場とVIPラウンジ", tribe: "アートコレクター派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 4, color: "#B3D9FF" },
      { stage: "新規", pct: 8, color: "#66B3FF" },
      { stage: "アクティブ", pct: 35, color: "#006FCF" },
      { stage: "プレミアム", pct: 53, color: "#00175A" },
    ],
  },
  {
    id: "fine-dining",
    name: "美食・グルメ派",
    members: 55,
    engagementScore: 72,
    spendPotential: 78,
    description: "ミシュラン星付きレストランでの食事が月4回以上。プライベートシェフ体験やワインセラーオーナーシップへの関心が急上昇中。",
    avgSpend: "¥52万/月",
    upgradeRate: "28%",
    churnRisk: "中",
    features: [
      { label: "外食頻度", value: "月16回以上" },
      { label: "ワイン知識", value: "ソムリエ級" },
      { label: "SNS発信", value: "活発" },
    ],
    personas: [
      { id: "p5", name: "中村 健太", age: 41, gender: "男性", image: "/images/personas/persona-06.jpg", occupation: "外資系コンサルタント", income: "1,500万円以上", background: "世界60カ国以上の食体験を持つ。ミシュランガイドは創刊年から収集。", lifestyle: "週末はシェフのカウンター席でペアリングディナー。食の探求が人生の軸。", interests: ["グルメ", "ワイン", "料理"], cardGoal: "ダイニング特典と予約コンシェルジュ", tribe: "美食・グルメ派" },
      { id: "p6", name: "伊藤 裕子", age: 38, gender: "女性", image: "/images/personas/persona-04.jpg", occupation: "フードジャーナリスト", income: "800万円以上", background: "食専門メディアを主宰。年間200軒以上のレストランを訪問。新規開店情報に精通。", lifestyle: "試食・取材・発信のサイクルが生活リズム。インフルエンサーとしての影響力も大。", interests: ["グルメ", "食文化", "旅行"], cardGoal: "ダイニング優先予約と海外レストランのアクセス", tribe: "美食・グルメ派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 15, color: "#B3D9FF" },
      { stage: "新規", pct: 22, color: "#66B3FF" },
      { stage: "アクティブ", pct: 48, color: "#006FCF" },
      { stage: "プレミアム", pct: 15, color: "#00175A" },
    ],
  },
  {
    id: "wellness-premium",
    name: "プレミアムウェルネス派",
    members: 31,
    engagementScore: 68,
    spendPotential: 74,
    description: "バイオハッキング・長寿クリニック・リトリートなど、健康への投資額が突出して高い層。最新の健康テクノロジーへの関心が強い。",
    avgSpend: "¥45万/月",
    upgradeRate: "22%",
    churnRisk: "中",
    features: [
      { label: "医療・健康支出", value: "年500万円以上" },
      { label: "情報収集力", value: "高" },
      { label: "ブランドロイヤルティ", value: "中" },
    ],
    personas: [
      { id: "p7", name: "松田 誠", age: 47, gender: "男性", image: "/images/personas/persona-09.jpg", occupation: "外科医", income: "2,500万円以上", background: "医療知識を活かし自身の健康最適化に投資。最新のバイオマーカー検査を定期受診。", lifestyle: "睡眠・栄養・運動を科学的に管理。年2回の完全プレミアムリトリートに参加。", interests: ["バイオハッキング", "登山", "瞑想"], cardGoal: "海外医療機関・スパリゾートの優待", tribe: "プレミアムウェルネス派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 18, color: "#B3D9FF" },
      { stage: "新規", pct: 25, color: "#66B3FF" },
      { stage: "アクティブ", pct: 42, color: "#006FCF" },
      { stage: "プレミアム", pct: 15, color: "#00175A" },
    ],
  },
  {
    id: "impact-investor",
    name: "インパクト投資家派",
    members: 14,
    engagementScore: 60,
    spendPotential: 88,
    description: "ESG・インパクト投資に積極的で、サステナブルラグジュアリーへの支出が増加中。カード利用でのポイントを社会貢献に充当するニーズが高い。",
    avgSpend: "¥82万/月",
    upgradeRate: "35%",
    churnRisk: "低",
    features: [
      { label: "サステナビリティ関心", value: "最高" },
      { label: "投資リテラシー", value: "高" },
      { label: "ブランド倫理", value: "重視" },
    ],
    personas: [
      { id: "p8", name: "橋本 明子", age: 44, gender: "女性", image: "/images/personas/persona-05.jpg", occupation: "ベンチャーキャピタリスト", income: "3,000万円以上", background: "テックスタートアップへの投資とNPO支援を並行。グリーンエネルギーと農業テックが専門領域。", lifestyle: "目的ある消費を実践。エコロジカルフットプリントの最小化と質の高い体験の両立を追求。", interests: ["サステナブルツーリズム", "現代アート", "瞑想"], cardGoal: "植林・環境保護へのポイント充当とサステナブル特典", tribe: "インパクト投資家派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 10, color: "#B3D9FF" },
      { stage: "新規", pct: 18, color: "#66B3FF" },
      { stage: "アクティブ", pct: 40, color: "#006FCF" },
      { stage: "プレミアム", pct: 32, color: "#00175A" },
    ],
  },
  {
    id: "sport-adventure",
    name: "アドベンチャースポーツ派",
    members: 22,
    engagementScore: 55,
    spendPotential: 62,
    description: "ヘリスキー・極地探検・深海ダイビングなど非日常のアドベンチャーに高額支出する層。体験の希少性を最優先する価値観。",
    avgSpend: "¥38万/月",
    upgradeRate: "18%",
    churnRisk: "中",
    features: [
      { label: "体験希少性", value: "最重視" },
      { label: "海外渡航", value: "年10回以上" },
      { label: "SNS発信", value: "高" },
    ],
    personas: [
      { id: "p9", name: "渡辺 大介", age: 36, gender: "男性", image: "/images/personas/persona-07.jpg", occupation: "IT起業家", income: "1,200万円以上", background: "会社売却後の資産でアドベンチャー体験に投資。七大陸最高峰の登頂を目指している。", lifestyle: "非日常体験のキュレーターとして生きる。希少体験のコミュニティ形成にも積極的。", interests: ["登山", "スカイダイビング", "ヘリスキー"], cardGoal: "旅行保険の充実と緊急時のコンシェルジュ対応", tribe: "アドベンチャースポーツ派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 22, color: "#B3D9FF" },
      { stage: "新規", pct: 30, color: "#66B3FF" },
      { stage: "アクティブ", pct: 38, color: "#006FCF" },
      { stage: "プレミアム", pct: 10, color: "#00175A" },
    ],
  },
  {
    id: "tech-early-adopter",
    name: "テック最先端派",
    members: 27,
    engagementScore: 48,
    spendPotential: 70,
    description: "最新デバイス・メタバース・AIサービスへの先行投資が多い若手富裕層。デジタル決済への親和性が最も高く、新サービスの早期採用者。",
    avgSpend: "¥41万/月",
    upgradeRate: "31%",
    churnRisk: "中",
    features: [
      { label: "デジタル親和性", value: "最高" },
      { label: "平均年齢", value: "34歳" },
      { label: "ポイント活用", value: "積極的" },
    ],
    personas: [
      { id: "p10", name: "鈴木 彩夏", age: 29, gender: "女性", image: "/images/personas/persona-10.jpg", occupation: "AIスタートアップ CEO", income: "800万円以上", background: "シリコンバレー帰りのAI研究者。Y Combinator卒業後に日本でスタートアップを創業。", lifestyle: "テクノロジーとラグジュアリーを融合させた生活スタイル。スマートホームと海外移動が日常。", interests: ["AI/テクノロジー", "電子音楽", "サーフィン"], cardGoal: "デジタル特典とサブスクサービスのポイント還元", tribe: "テック最先端派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 20, color: "#B3D9FF" },
      { stage: "新規", pct: 28, color: "#66B3FF" },
      { stage: "アクティブ", pct: 38, color: "#006FCF" },
      { stage: "プレミアム", pct: 14, color: "#00175A" },
    ],
  },
  {
    id: "legacy-wealth",
    name: "レガシー資産家派",
    members: 11,
    engagementScore: 42,
    spendPotential: 82,
    description: "代々続く資産家で、カード利用の変化は少ないが高額支出の単発取引が多い。不動産・クラシックカー・ビンテージワインへの支出が特徴的。",
    avgSpend: "¥98万/月",
    upgradeRate: "12%",
    churnRisk: "低",
    features: [
      { label: "平均年齢", value: "68歳" },
      { label: "資産規模", value: "10億円以上" },
      { label: "ブランドロイヤルティ", value: "最高" },
    ],
    personas: [
      { id: "p11", name: "安田 武雄", age: 72, gender: "男性", image: "/images/personas/persona-11.jpg", occupation: "資産家・名誉会長", income: "1億円以上", background: "祖父の代から続く老舗製造業を守り発展させた。現在は孫への資産承継を計画中。", lifestyle: "伝統と格式を重んじ、変化より安定を好む。能・歌舞伎・日本画を愛好。", interests: ["日本伝統文化", "クラシックカー", "ビンテージワイン"], cardGoal: "プライベートバンキング連携と資産管理サービス", tribe: "レガシー資産家派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 3, color: "#B3D9FF" },
      { stage: "新規", pct: 5, color: "#66B3FF" },
      { stage: "アクティブ", pct: 30, color: "#006FCF" },
      { stage: "プレミアム", pct: 62, color: "#00175A" },
    ],
  },
  {
    id: "nomadic-elite",
    name: "ノマドエリート派",
    members: 16,
    engagementScore: 65,
    spendPotential: 68,
    description: "拠点を複数国に持つデジタルノマドの上位層。月の半分以上を海外で過ごし、世界中のプレミアムコワーキングとラグジュアリーホテルを渡り歩く。",
    avgSpend: "¥56万/月",
    upgradeRate: "25%",
    churnRisk: "中",
    features: [
      { label: "海外滞在率", value: "50%以上" },
      { label: "多言語対応", value: "3カ国語以上" },
      { label: "フレキシビリティ重視", value: "最高" },
    ],
    personas: [
      { id: "p12", name: "林 真奈美", age: 37, gender: "女性", image: "/images/personas/persona-08.jpg", occupation: "クリエイティブディレクター", income: "1,000万円以上", background: "東京・バリ・リスボンの3拠点生活。ブランドのグローバルキャンペーンを手がける。", lifestyle: "場所に縛られない自由な働き方を実践。美しい環境でのクリエイティブワークが最優先。", interests: ["アート", "瞑想", "サーフィン"], cardGoal: "多通貨決済と世界中のラウンジアクセス", tribe: "ノマドエリート派" },
    ],
    stageDistribution: [
      { stage: "見込み", pct: 15, color: "#B3D9FF" },
      { stage: "新規", pct: 25, color: "#66B3FF" },
      { stage: "アクティブ", pct: 42, color: "#006FCF" },
      { stage: "プレミアム", pct: 18, color: "#00175A" },
    ],
  },
]

// ---- サブコンポーネント: ペルソナモーダル ----
function PersonaModal({ persona, open, onClose }: { persona: Persona | null; open: boolean; onClose: () => void }) {
  if (!persona) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">
        {/* ヘッダー */}
        <div className="bg-primary px-6 pt-6 pb-5 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/40 shrink-0">
            <AvatarImage src={persona.image} alt={persona.name} />
            <AvatarFallback className="bg-primary-foreground/20 text-white text-lg">
              {persona.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-white text-xl font-bold">{persona.name}</DialogTitle>
            <p className="text-white/70 text-sm mt-0.5">{persona.age}歳 / {persona.gender}</p>
            <p className="text-white/60 text-xs mt-0.5">{persona.occupation}</p>
          </div>
        </div>
        {/* ボディ */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
              <Star className="h-3 w-3" /> 背景・経歴
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted rounded-lg px-3 py-2">
              {persona.background}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ライフスタイル
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted rounded-lg px-3 py-2">
              {persona.lifestyle}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
              <Users className="h-3 w-3" /> 所属トライブ・趣味
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
            <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
              <CreditCard className="h-3 w-3" /> カード活用ゴール
            </p>
            <p className="text-sm text-foreground font-medium bg-accent/10 rounded-lg px-3 py-2 border border-accent/20">
              {persona.cardGoal}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground text-center pt-1">
            このAIペルソナはマーケティング分析用に生成された架空の人物です
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---- メインコンポーネント ----
export function TribeAnalysisContent() {
  const [selectedStage, setSelectedStage] = useState<CardStage>("全体")
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null)
  const [detailTab, setDetailTab] = useState("overview")
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [personaModalOpen, setPersonaModalOpen] = useState(false)

  // ステージフィルター（将来的なデータフィルタリング用、今は全量表示）
  const filteredTribes = useMemo(() => ALL_TRIBES, [selectedStage])

  const totalMembers = filteredTribes.reduce((s, t) => s + t.members, 0)
  const totalTribes = filteredTribes.length

  const handleBubbleClick = (tribe: Tribe) => {
    setSelectedTribe(prev => prev?.id === tribe.id ? null : tribe)
    setDetailTab("overview")
  }

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona)
    setPersonaModalOpen(true)
  }

  // バブル: メンバー数→半径マッピング
  const minR = 28, maxR = 68
  const maxMem = Math.max(...filteredTribes.map(t => t.members))
  const getBubbleRadius = (members: number) =>
    minR + ((members / maxMem) * (maxR - minR))

  // x/y をパーセント座標に変換（余白を確保）
  const toX = (v: number) => 8 + v * 0.84   // %
  const toY = (v: number) => 92 - v * 0.84  // % (反転: 上=高)

  const churnColor: Record<string, string> = { 低: "text-emerald-600 bg-emerald-50", 中: "text-amber-600 bg-amber-50", 高: "text-red-600 bg-red-50" }

  return (
    <div className="p-6 space-y-4">
      {/* サマリーバー */}
      <div className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground text-lg">{totalTribes}</span>
          <span>トライブ</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground text-lg">{totalMembers}万人</span>
          <span>推定会員</span>
        </div>
        <div className="ml-auto">
          {/* ステージフィルター */}
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            {CARD_STAGES.map(stage => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedStage === stage
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* メインレイアウト */}
      <div className={`flex gap-4 transition-all duration-300 ${selectedTribe ? "" : ""}`}>
        {/* クラスターマップ */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* 軸ラベル上部 */}
            <div className="flex justify-between px-8 pt-3 pb-1 text-[10px] text-muted-foreground font-medium">
              <span>高エンゲージメント・低利用額ポテンシャル</span>
              <span>高エンゲージメント・高利用額ポテンシャル</span>
            </div>

            {/* マップ本体 */}
            <div className="relative mx-4 mb-4" style={{ height: 440 }}>
              {/* 4象限グリッド */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                {["bg-blue-50/40", "bg-primary/5", "bg-muted/30", "bg-blue-50/60"].map((cls, i) => (
                  <div key={i} className={`${cls} border border-border/40`} />
                ))}
              </div>
              {/* 縦軸ラベル */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-muted-foreground font-medium whitespace-nowrap pointer-events-none select-none" style={{ transformOrigin: "center center", left: -28 }}>
                エンゲージメントスコア →
              </div>
              {/* バブル */}
              {filteredTribes.map((tribe) => {
                const r = getBubbleRadius(tribe.members)
                const x = toX(tribe.spendPotential)
                const y = toY(tribe.engagementScore)
                const isSelected = selectedTribe?.id === tribe.id
                return (
                  <button
                    key={tribe.id}
                    onClick={() => handleBubbleClick(tribe)}
                    className="absolute group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: r * 2,
                      height: r * 2,
                      marginLeft: -r,
                      marginTop: -r,
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full flex flex-col items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "bg-primary border-2 border-primary shadow-lg shadow-primary/30 scale-110"
                          : "bg-primary/25 border border-primary/40 hover:bg-primary/40 hover:scale-105"
                      }`}
                    >
                      <span className={`text-[10px] font-bold leading-tight text-center px-1 ${isSelected ? "text-white" : "text-primary"}`}>
                        {tribe.name.replace(/派$/, "")}
                      </span>
                      <span className={`text-[9px] ${isSelected ? "text-white/80" : "text-primary/70"}`}>
                        {tribe.members}万人
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* 軸ラベル下部 */}
            <div className="flex justify-between px-8 pb-3 pt-1 text-[10px] text-muted-foreground font-medium border-t border-border/30">
              <span>低エンゲージメント・低利用額ポテンシャル</span>
              <span>低エンゲージメント・高利用額ポテンシャル</span>
            </div>
            <div className="text-center pb-2 text-[10px] text-muted-foreground">
              ← 利用額ポテンシャル →
            </div>
          </div>
        </div>

        {/* 詳細パネル */}
        {selectedTribe && (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">
            {/* パネルヘッダー */}
            <div className="flex items-start justify-between px-5 py-4 border-b border-border bg-primary/5">
              <div>
                <p className="font-bold text-foreground text-base">{selectedTribe.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedTribe.members}万人の会員</p>
              </div>
              <button
                onClick={() => setSelectedTribe(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* タブ */}
            <Tabs value={detailTab} onValueChange={setDetailTab} className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto px-4 pt-2 gap-1 justify-start">
                {[
                  { value: "overview", label: "概要" },
                  { value: "personas", label: "所属ユーザー" },
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
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-[10px] text-muted-foreground">平均利用額</p>
                    <p className="text-sm font-bold text-primary">{selectedTribe.avgSpend}</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-[10px] text-muted-foreground">アップグレード率</p>
                    <p className="text-sm font-bold text-primary">{selectedTribe.upgradeRate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">主な特徴</p>
                  <div className="space-y-2">
                    {selectedTribe.features.map(f => (
                      <div key={f.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{f.label}</span>
                        <span className="font-medium text-foreground">{f.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">解約リスク</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${churnColor[selectedTribe.churnRisk]}`}>
                        {selectedTribe.churnRisk}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-primary text-primary-foreground gap-2">
                  <ChevronRight className="h-3 w-3" />
                  トライブにヒアリング
                </Button>
              </TabsContent>

              {/* ペルソナタブ */}
              <TabsContent value="personas" className="flex-1 px-5 py-4 m-0 overflow-y-auto">
                <p className="text-xs text-muted-foreground mb-3">
                  AIペルソナ（{selectedTribe.personas.length}名）
                </p>
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
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-foreground">{d.stage}</span>
                        <span className="text-muted-foreground">{d.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">推定会員数</p>
                  <p className="text-base font-bold text-foreground">{selectedTribe.members}万人</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    プレミアム構成比: {selectedTribe.stageDistribution.find(d => d.stage === "プレミアム")?.pct ?? 0}%
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
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
