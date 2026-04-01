"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { X, Users, User, ChevronDown, Briefcase, Heart, ShoppingBag } from "lucide-react"
import { FUNNEL_COLORS } from "@/lib/constants"

// ステージの定義（共通定数の色を使用）
const stages = [
  { id: "lm", name: "LM(ポテンシャル小)", total: "4500万人", color: FUNNEL_COLORS.lm },
  { id: "mh", name: "MH(ポテンシャル大)", total: "850万人", color: FUNNEL_COLORS.mh },
  { id: "trial", name: "購入ユーザー", total: "320万人", color: FUNNEL_COLORS.purchase },
  { id: "regular", name: "定期購入ユーザー", total: "170万人", color: FUNNEL_COLORS.regular },
]

// 商品の定義（サントリーD2C商品）
const products = [
  { id: "sesamin", name: "menphys", category: "健康ドリンク", image: "/images/products/menphys.jpg" },
  { id: "dha", name: "特茶/胡麻麦茶", category: "健康飲料", image: "/images/products/tokucha.jpg" },
  { id: "omega", name: "すっきりメンテナン酢", category: "機能性表示食品", image: "/images/products/maintenansu.jpg" },
  { id: "coffee", name: "SUNTORY COFFEE ROASTERY", category: "プレミアムコーヒー", image: "/images/products/coffee-roastery.jpg" },
  { id: "zone", name: "ZONe", category: "エナジードリンク", image: "/images/products/zone.jpg" },
]

// セグメントデータ
const segmentData: Record<string, Record<string, {
  population: string
  personas: { id: string; name: string; image: string }[]
  demographics: {
    genderRatio: string
    avgAge: string
    marriedRate: string
    childRate: string
  }
  occupation: { name: string; rate: string }[]
  income: { range: string; rate: string }[]
  summary: string
  interests: string[]
  purchaseBehavior: { label: string; value: string }[]
}>> = {
  lm: {
    sesamin: {
      population: "1200万人",
      personas: [
        { id: "1", name: "佐藤健一", image: "/images/personas/senior_man1.jpg" },
        { id: "2", name: "田中正雄", image: "/images/personas/casual_man1.jpg" },
        { id: "3", name: "山本洋子", image: "/images/personas/senior_woman1.jpg" },
        { id: "4", name: "山田美和", image: "/images/personas/housewife2.jpg" },
        { id: "5", name: "鈴木太郎", image: "/images/personas/middle_woman1.jpg" },
        { id: "6", name: "高橋由美", image: "/images/personas/housewife1.jpg" },
        { id: "7", name: "伊藤健", image: "/images/personas/young_man1.jpg" },
        { id: "8", name: "渡辺恵", image: "/images/personas/young_mother1.jpg" },
        { id: "9", name: "小林誠", image: "/images/personas/student1.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "58歳", marriedRate: "72%", childRate: "65%" },
      occupation: [
        { name: "会社員（事務系）", rate: "28%" },
        { name: "専業主婦/主夫", rate: "22%" },
        { name: "パート・アルバイト", rate: "18%" },
        { name: "自営業", rate: "14%" },
      ],
      income: [
        { range: "300〜500万未満", rate: "31%" },
        { range: "500〜700万未満", rate: "27%" },
        { range: "700〜900万未満", rate: "18%" },
        { range: "300万未満", rate: "14%" },
      ],
      summary: "健康への関心はあるが継続行動に至っていない層。価格重視で比較検討を慎重に行う。テレビCMや薬局店頭がメインのタッチポイント。",
      interests: ["健康情報番組", "料理・レシピ", "旅行", "園芸", "ゴルフ"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "ドラッグストア・スーパー" },
        { label: "購買頻度", value: "月1-2回" },
        { label: "価格感度", value: "高い" },
        { label: "ブランドロイヤルティ", value: "中程度" },
      ],
    },
    dha: {
      population: "1800万人",
      personas: [
        { id: "1", name: "中村一郎", image: "/images/personas/casual_man1.jpg" },
        { id: "2", name: "加藤美咲", image: "/images/personas/young_woman1.jpg" },
        { id: "3", name: "吉田浩", image: "/images/personas/young_man1.jpg" },
        { id: "4", name: "佐々木花", image: "/images/personas/housewife1.jpg" },
        { id: "5", name: "山口大輔", image: "/images/personas/senior_man1.jpg" },
        { id: "6", name: "松本理恵", image: "/images/personas/young_mother1.jpg" },
        { id: "7", name: "井上翔", image: "/images/personas/student1.jpg" },
      ],
      demographics: { genderRatio: "女性やや多め", avgAge: "45歳", marriedRate: "65%", childRate: "55%" },
      occupation: [
        { name: "会社員（事務系）", rate: "32%" },
        { name: "会社員（技術系）", rate: "20%" },
        { name: "パート・アルバイト", rate: "18%" },
        { name: "専業主婦/主夫", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "26%" },
        { range: "700〜900万未満", rate: "22%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "日常的な健康意識は中程度。コンビニやスーパーでの購買が中心。SNSや口コミの影響を受けやすい。",
      interests: ["SNS", "美容", "ファッション", "グルメ", "子育て"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ・スーパー" },
        { label: "購買頻度", value: "週1-2回" },
        { label: "価格感度", value: "中程度" },
        { label: "ブランドロイヤルティ", value: "低め" },
      ],
    },
    omega: {
      population: "1500万人",
      personas: [
        { id: "1", name: "木村翔太", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "林美穂", image: "/images/personas/student1.jpg" },
        { id: "3", name: "清水健太", image: "/images/personas/casual_man1.jpg" },
        { id: "4", name: "山崎愛", image: "/images/personas/young_woman1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "35歳", marriedRate: "45%", childRate: "30%" },
      occupation: [
        { name: "会社員（技術系）", rate: "35%" },
        { name: "会社員（事務系）", rate: "25%" },
        { name: "学生", rate: "15%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "300〜500万未満", rate: "35%" },
        { range: "500〜700万未満", rate: "30%" },
        { range: "300万未満", rate: "20%" },
        { range: "700〜900万未満", rate: "10%" },
      ],
      summary: "健康への関心は低く、味や価格を重視。衝動買いが多く、コンビニでの購買が中心。デジタル広告への接触が多い。",
      interests: ["ゲーム", "動画配信", "音楽", "スポーツ観戦", "外食"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ" },
        { label: "購買頻度", value: "週3回以上" },
        { label: "価格感度", value: "低め" },
        { label: "ブランドロイヤルティ", value: "低い" },
      ],
    },
    coffee: {
      population: "980万人",
      personas: [
        { id: "1", name: "田村雅彦", image: "/images/personas/casual_man1.jpg" },
        { id: "2", name: "佐野智子", image: "/images/personas/middle_woman1.jpg" },
        { id: "3", name: "井上拓海", image: "/images/personas/young_man1.jpg" },
        { id: "4", name: "高田美咲", image: "/images/personas/young_woman1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "42歳", marriedRate: "58%", childRate: "45%" },
      occupation: [
        { name: "会社員（事務系）", rate: "35%" },
        { name: "会社員（技術系）", rate: "25%" },
        { name: "自営業", rate: "15%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "300〜500万未満", rate: "28%" },
        { range: "700〜900万未満", rate: "22%" },
        { range: "300万未満", rate: "10%" },
      ],
      summary: "コーヒー愛好家だが普段は缶コーヒーで済ませる層。プレミアムコーヒーへの関心はあるが購買には至っていない。",
      interests: ["カフェ巡り", "仕事効率化", "読書", "音楽", "ドライブ"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ・自販機" },
        { label: "購買頻度", value: "週5回以上" },
        { label: "価格感度", value: "高い" },
        { label: "ブランドロイヤルティ", value: "低め" },
      ],
    },
    zone: {
      population: "1350万人",
      personas: [
        { id: "1", name: "鈴木翔", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "山本彩", image: "/images/personas/student1.jpg" },
        { id: "3", name: "中田健太", image: "/images/personas/casual_man1.jpg" },
        { id: "4", name: "小林美優", image: "/images/personas/young_woman1.jpg" },
      ],
      demographics: { genderRatio: "男性多め", avgAge: "25歳", marriedRate: "22%", childRate: "8%" },
      occupation: [
        { name: "学生", rate: "35%" },
        { name: "会社員（技術系）", rate: "28%" },
        { name: "フリーター", rate: "18%" },
        { name: "フリーランス", rate: "10%" },
      ],
      income: [
        { range: "300万未満", rate: "45%" },
        { range: "300〜500万未満", rate: "30%" },
        { range: "500〜700万未満", rate: "18%" },
        { range: "700〜900万未満", rate: "5%" },
      ],
      summary: "ゲームやeスポーツに関心が高い若年層。エナジードリンクは競合ブランドを愛用中。新しいものへの好奇心は強い。",
      interests: ["ゲーム", "eスポーツ", "アニメ", "動画配信", "音楽フェス"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ" },
        { label: "購買頻度", value: "週2-3回" },
        { label: "価格感度", value: "中程度" },
        { label: "ブランドロイヤルティ", value: "競合愛用" },
      ],
    },
  },
  mh: {
    sesamin: {
      population: "283万人",
      personas: [
        { id: "1", name: "石井康夫", image: "/images/personas/middle_woman1.jpg" },
        { id: "2", name: "前田由紀", image: "/images/personas/housewife2.jpg" },
        { id: "3", name: "藤田誠一", image: "/images/personas/senior_man1.jpg" },
        { id: "4", name: "岡田さゆり", image: "/images/personas/senior_woman1.jpg" },
        { id: "5", name: "後藤健二", image: "/images/personas/casual_man1.jpg" },
      ],
      demographics: { genderRatio: "女性やや多め", avgAge: "52歳", marriedRate: "78%", childRate: "70%" },
      occupation: [
        { name: "会社員（管理職）", rate: "30%" },
        { name: "専業主婦/主夫", rate: "25%" },
        { name: "会社員（事務系）", rate: "20%" },
        { name: "自営業", rate: "12%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "32%" },
        { range: "500〜700万未満", rate: "28%" },
        { range: "900万以上", rate: "22%" },
        { range: "300〜500万未満", rate: "12%" },
      ],
      summary: "健康意識が非常に高く、機能性表示食品に積極的。品質重視で価格感度は低め。専門店やECでの購買が多い。",
      interests: ["健康食品", "オーガニック", "ヨガ・ピラティス", "ランニング", "料理"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "専門店・EC" },
        { label: "購買頻度", value: "月2-3回" },
        { label: "価格感度", value: "低い" },
        { label: "ブランドロイヤルティ", value: "高い" },
      ],
    },
    dha: {
      population: "340万人",
      personas: [
        { id: "1", name: "村上大樹", image: "/images/personas/housewife1.jpg" },
        { id: "2", name: "近藤真理", image: "/images/personas/young_mother1.jpg" },
        { id: "3", name: "坂本隆", image: "/images/personas/casual_man1.jpg" },
        { id: "4", name: "遠藤美香", image: "/images/personas/middle_woman1.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "48歳", marriedRate: "70%", childRate: "60%" },
      occupation: [
        { name: "会社員（事務系）", rate: "28%" },
        { name: "会社員（技術系）", rate: "22%" },
        { name: "専業主婦/主夫", rate: "18%" },
        { name: "公務員", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "30%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "22%" },
        { range: "900万以上", rate: "15%" },
      ],
      summary: "健康意識は中〜高程度。定期的な運動習慣がある。ドラッグストアとスーパーでの購買が中心。",
      interests: ["スポーツ", "アウトドア", "旅行", "読書", "家庭菜園"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "ドラッグストア・スーパー" },
        { label: "購買頻度", value: "週1回" },
        { label: "価格感度", value: "中程度" },
        { label: "ブランドロイヤルティ", value: "中〜高" },
      ],
    },
    omega: {
      population: "227万人",
      personas: [
        { id: "1", name: "青木拓也", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "斎藤恵子", image: "/images/personas/young_woman1.jpg" },
        { id: "3", name: "西村康平", image: "/images/personas/student1.jpg" },
        { id: "4", name: "福田あゆみ", image: "/images/personas/housewife1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "38歳", marriedRate: "55%", childRate: "40%" },
      occupation: [
        { name: "会社員（技術系）", rate: "32%" },
        { name: "会社員（事務系）", rate: "25%" },
        { name: "フリーランス", rate: "15%" },
        { name: "自営業", rate: "12%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "300〜500万未満", rate: "28%" },
        { range: "700〜900万未満", rate: "20%" },
        { range: "300万未満", rate: "12%" },
      ],
      summary: "購買力はあるが健康意識は低め。ブランドや話題性で商品選択。ECでの購買比率が高い。",
      interests: ["テクノロジー", "ガジェット", "投���", "ゲーム", "外食"],
      purchaseBehavior: [
        { label: "主��購買チャネル", value: "EC・コンビニ" },
        { label: "購買頻度", value: "週2回" },
        { label: "価格感度", value: "低め" },
        { label: "ブランドロイヤルティ", value: "話題性重視" },
      ],
    },
    coffee: {
      population: "185万人",
      personas: [
        { id: "1", name: "北村誠一", image: "/images/personas/casual_man1.jpg" },
        { id: "2", name: "藤井恵子", image: "/images/personas/middle_woman1.jpg" },
        { id: "3", name: "松田健", image: "/images/personas/senior_man1.jpg" },
        { id: "4", name: "川口美穂", image: "/images/personas/housewife1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "45歳", marriedRate: "65%", childRate: "50%" },
      occupation: [
        { name: "会社員（管理職）", rate: "32%" },
        { name: "会社員（事務系）", rate: "28%" },
        { name: "自営業", rate: "18%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "35%" },
        { range: "500〜700万未満", rate: "28%" },
        { range: "900万以上", rate: "22%" },
        { range: "300〜500万未満", rate: "10%" },
      ],
      summary: "コーヒーにこだわり��持つ層。スペシャルティコーヒーやプレミアム商品に関心が高い。カフェ文化を好む。",
      interests: ["スペシャルティコーヒー", "カフェ巡り", "グルメ", "読書", "旅行"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "専門店・EC" },
        { label: "購買頻度", value: "週3-4回" },
        { label: "価格感度", value: "低い" },
        { label: "ブランドロイヤルティ", value: "高い" },
      ],
    },
    zone: {
      population: "142万人",
      personas: [
        { id: "1", name: "岡��翔太", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "吉川彩香", image: "/images/personas/student1.jpg" },
        { id: "3", name: "池田健太", image: "/images/personas/casual_man1.jpg" },
      ],
      demographics: { genderRatio: "男性多め", avgAge: "28歳", marriedRate: "25%", childRate: "10%" },
      occupation: [
        { name: "会社員（技術系）", rate: "38%" },
        { name: "フリーランス", rate: "22%" },
        { name: "学生", rate: "20%" },
        { name: "クリエイター", rate: "12%" },
      ],
      income: [
        { range: "300〜500万未満", rate: "35%" },
        { range: "500〜700万未満", rate: "30%" },
        { range: "300万未満", rate: "20%" },
        { range: "700〜900万未満", rate: "12%" },
      ],
      summary: "ゲームやクリエイティブワークに没頭する層。集中力を高める目的でエナジードリンクを愛用。ブランドへの関心が高い。",
      interests: ["ゲーム", "プログラミング", "クリエイティブ", "eスポーツ", "音楽"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ・EC" },
        { label: "購買頻度", value: "週3回以上" },
        { label: "価格感度", value: "低め" },
        { label: "ブランドロイヤルティ", value: "高い" },
      ],
    },
  },
  trial: {
    sesamin: {
      population: "128万人",
      personas: [
        { id: "1", name: "原田正樹", image: "/images/personas/senior_woman1.jpg" },
        { id: "2", name: "小川美紀", image: "/images/personas/housewife2.jpg" },
        { id: "3", name: "三浦健司", image: "/images/personas/senior_man1.jpg" },
        { id: "4", name: "中島愛子", image: "/images/personas/middle_woman1.jpg" },
        { id: "5", name: "阿部俊介", image: "/images/personas/casual_man1.jpg" },
      ],
      demographics: { genderRatio: "女性多め", avgAge: "55歳", marriedRate: "80%", childRate: "72%" },
      occupation: [
        { name: "専業主婦/主夫", rate: "28%" },
        { name: "会社員（管理職）", rate: "25%" },
        { name: "会社員（事務系）", rate: "20%" },
        { name: "パート・アルバイト", rate: "15%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "30%" },
        { range: "900万以上", rate: "25%" },
        { range: "500〜700万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "15%" },
      ],
      summary: "既に当社商品を試用中。健康効果を実感しつつある層。継続購買への移行が期待できる。",
      interests: ["健康食品", "美容", "旅行", "ガーデニング", "料理"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "EC・専門店" },
        { label: "購買頻度", value: "月1回" },
        { label: "価格感度", value: "低め" },
        { label: "ブランドロイヤルティ", value: "構築中" },
      ],
    },
    dha: {
      population: "107万人",
      personas: [
        { id: "1", name: "橋本雄一", image: "/images/personas/housewife1.jpg" },
        { id: "2", name: "川村さくら", image: "/images/personas/young_mother1.jpg" },
        { id: "3", name: "上田勝", image: "/images/personas/senior_man1.jpg" },
        { id: "4", name: "森下恵美", image: "/images/personas/young_woman1.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "50歳", marriedRate: "75%", childRate: "65%" },
      occupation: [
        { name: "会社員（事務系）", rate: "30%" },
        { name: "専業主婦/主夫", rate: "22%" },
        { name: "会社員（技術系）", rate: "18%" },
        { name: "パート・アルバイト", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "22%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "お試し購入段階。価格と効果のバランスを評価中。クーポンやキャンペーンに反応しやすい。",
      interests: ["クーポン・セール", "口コミサイト", "健康番組", "料理", "旅行"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "ドラッグストア・EC" },
        { label: "購買頻度", value: "月1回" },
        { label: "価格感度", value: "高い" },
        { label: "ブランドロイヤルティ", value: "評価中" },
      ],
    },
    omega: {
      population: "85万人",
      personas: [
        { id: "1", name: "内田雅人", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "松井真由美", image: "/images/personas/student1.jpg" },
        { id: "3", name: "野村太一", image: "/images/personas/casual_man1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "40歳", marriedRate: "60%", childRate: "45%" },
      occupation: [
        { name: "会社員（技術系）", rate: "30%" },
        { name: "会社員（事務系）", rate: "28%" },
        { name: "フリーランス", rate: "15%" },
        { name: "自営業", rate: "12%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "30%" },
        { range: "700〜900万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "25%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "話題性やキャンペーンで初回購入。継続意向は低め。離脱リスクが高い。",
      interests: ["SNS", "話題の商品", "ガジェット", "エンタメ", "外食"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "EC・コンビニ" },
        { label: "購買頻度", value: "不定期" },
        { label: "価格感度", value: "中程度" },
        { label: "ブランドロイヤルティ", value: "低い" },
      ],
    },
    coffee: {
      population: "52万人",
      personas: [
        { id: "1", name: "大西健太", image: "/images/personas/casual_man1.jpg" },
        { id: "2", name: "森山美咲", image: "/images/personas/young_woman1.jpg" },
        { id: "3", name: "高木誠", image: "/images/personas/senior_man1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "40歳", marriedRate: "55%", childRate: "42%" },
      occupation: [
        { name: "会社員（事務系）", rate: "32%" },
        { name: "会社員（管理職）", rate: "25%" },
        { name: "自営業", rate: "18%" },
        { name: "フリーランス", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "300〜500万未満", rate: "22%" },
        { range: "900万以上", rate: "12%" },
      ],
      summary: "プレミアムコーヒーを試用中。味や品質に満足し、リピートを検討中。定期購入への移行可能性が高い。",
      interests: ["コーヒー", "グルメ", "カフェ", "読書", "ビジネス"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "EC・コンビニ" },
        { label: "購買頻度", value: "月2-3回" },
        { label: "価格感度", value: "中程度" },
        { label: "ブランドロイヤルティ", value: "構築中" },
      ],
    },
    zone: {
      population: "68万人",
      personas: [
        { id: "1", name: "小野翔", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "田辺彩", image: "/images/personas/student1.jpg" },
        { id: "3", name: "金子健太", image: "/images/personas/casual_man1.jpg" },
      ],
      demographics: { genderRatio: "男性多め", avgAge: "24歳", marriedRate: "15%", childRate: "5%" },
      occupation: [
        { name: "学生", rate: "35%" },
        { name: "会社員（技術系）", rate: "30%" },
        { name: "フリーター", rate: "18%" },
        { name: "クリエイター", rate: "10%" },
      ],
      income: [
        { range: "300万未満", rate: "42%" },
        { range: "300〜500万未満", rate: "32%" },
        { range: "500〜700万未満", rate: "18%" },
        { range: "700〜900万未満", rate: "5%" },
      ],
      summary: "ZONeを試用中のユーザー。ゲームや作業中の集中力向上に効果を実感。他ブランドからの切り替えも進行中。",
      interests: ["ゲーム", "eスポーツ", "プログラミング", "動画制作", "音楽"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ" },
        { label: "購買頻度", value: "週2回" },
        { label: "価格感度", value: "低め" },
        { label: "ブランドロイヤルティ", value: "評価中" },
      ],
    },
  },
  regular: {
    sesamin: {
      population: "79万人",
      personas: [
        { id: "1", name: "長谷川浩", image: "/images/personas/senior_man1.jpg" },
        { id: "2", name: "菊地美佳", image: "/images/personas/senior_woman1.jpg" },
        { id: "3", name: "平野誠", image: "/images/personas/housewife2.jpg" },
        { id: "4", name: "石川由美子", image: "/images/personas/middle_woman1.jpg" },
        { id: "5", name: "渡邊健一", image: "/images/personas/casual_man1.jpg" },
        { id: "6", name: "杉山明美", image: "/images/personas/housewife1.jpg" },
      ],
      demographics: { genderRatio: "女性多め", avgAge: "58歳", marriedRate: "85%", childRate: "75%" },
      occupation: [
        { name: "専業主婦/主夫", rate: "30%" },
        { name: "会社員（管理職）", rate: "25%" },
        { name: "定年退職者", rate: "20%" },
        { name: "会社員（事務系）", rate: "15%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "28%" },
        { range: "900万以上", rate: "28%" },
        { range: "500〜700万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "12%" },
      ],
      summary: "当社のロイヤルカスタマー。定期購入を継続。口コミでの推奨も活発。LTVが最も高い層。",
      interests: ["健康管理", "家族", "旅行", "ガーデニング", "料理教室"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "定期購入・EC" },
        { label: "購買頻度", value: "月1回（定期）" },
        { label: "価格感度", value: "低い" },
        { label: "ブランドロイヤルティ", value: "非常に高い" },
      ],
    },
    dha: {
      population: "57万人",
      personas: [
        { id: "1", name: "岩崎一馬", image: "/images/personas/young_mother1.jpg" },
        { id: "2", name: "久保田恵", image: "/images/personas/housewife1.jpg" },
        { id: "3", name: "横山大輔", image: "/images/personas/senior_man1.jpg" },
        { id: "4", name: "白石理恵", image: "/images/personas/middle_woman1.jpg" },
      ],
      demographics: { genderRatio: "男女ほぼ同率", avgAge: "52歳", marriedRate: "78%", childRate: "68%" },
      occupation: [
        { name: "会社員（事務系）", rate: "28%" },
        { name: "専業主婦/主夫", rate: "25%" },
        { name: "会社員（管理職）", rate: "20%" },
        { name: "パート・アルバイト", rate: "15%" },
      ],
      income: [
        { range: "500〜700万未満", rate: "32%" },
        { range: "700〜900万未満", rate: "28%" },
        { range: "900万以上", rate: "18%" },
        { range: "300〜500万未満", rate: "15%" },
      ],
      summary: "継続購買中だが、競合への乗り換えリスクあり。価格感度が比較的高い。",
      interests: ["コスパ", "比較サイト", "クーポン", "健康番組", "旅行"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "ドラッグストア・EC" },
        { label: "購買頻度", value: "月1-2回" },
        { label: "価格感度", value: "中〜高" },
        { label: "ブランドロイヤルティ", value: "中程度" },
      ],
    },
    omega: {
      population: "34万人",
      personas: [
        { id: "1", name: "大野雄介", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "安藤玲子", image: "/images/personas/young_woman1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "42歳", marriedRate: "62%", childRate: "50%" },
      occupation: [
        { name: "会社員（技術系）", rate: "32%" },
        { name: "会社員（事務系）", rate: "28%" },
        { name: "自営業", rate: "15%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "30%" },
        { range: "500〜700万未満", rate: "28%" },
        { range: "900万以上", rate: "22%" },
        { range: "300〜500万未満", rate: "15%" },
      ],
      summary: "購買力はあるが健康モチベーショ��は低め��便利さや習慣で継続。離脱リスクは中程度。",
      interests: ["テクノロジー", "仕事効率化", "投資", "ゲーム", "外食"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "EC・定期購入" },
        { label: "購買頻度", value: "月1回（定期）" },
        { label: "価格感度", value: "低め" },
        { label: "ブランドロイヤルティ", value: "習慣的" },
      ],
    },
    coffee: {
      population: "28万人",
      personas: [
        { id: "1", name: "山下誠一", image: "/images/personas/casual_man1.jpg" },
        { id: "2", name: "中川恵子", image: "/images/personas/middle_woman1.jpg" },
        { id: "3", name: "岸田健", image: "/images/personas/senior_man1.jpg" },
        { id: "4", name: "宮本美咲", image: "/images/personas/housewife1.jpg" },
      ],
      demographics: { genderRatio: "男性やや多め", avgAge: "48歳", marriedRate: "68%", childRate: "55%" },
      occupation: [
        { name: "会社員（管理職）", rate: "35%" },
        { name: "会社員（事務系）", rate: "25%" },
        { name: "自営業", rate: "20%" },
        { name: "フリーランス", rate: "12%" },
      ],
      income: [
        { range: "700〜900万未満", rate: "32%" },
        { range: "900万以上", rate: "28%" },
        { range: "500〜700万未満", rate: "25%" },
        { range: "300〜500万未満", rate: "10%" },
      ],
      summary: "SUNTORY COFFEE ROASTERYのロイヤルカスタマー。プレミアムコーヒーの品質に満足し定期購入継続中。",
      interests: ["コーヒー", "グルメ", "ワイン", "旅行", "ゴルフ"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "定期購入・EC" },
        { label: "購買頻度", value: "月2回（定期）" },
        { label: "価格感度", value: "低い" },
        { label: "ブランドロイヤルティ", value: "非常に高い" },
      ],
    },
    zone: {
      population: "45万人",
      personas: [
        { id: "1", name: "村田翔", image: "/images/personas/young_man1.jpg" },
        { id: "2", name: "佐々木彩", image: "/images/personas/student1.jpg" },
        { id: "3", name: "原田健太", image: "/images/personas/casual_man1.jpg" },
        { id: "4", name: "橋本美優", image: "/images/personas/young_woman1.jpg" },
      ],
      demographics: { genderRatio: "男性多め", avgAge: "26歳", marriedRate: "18%", childRate: "6%" },
      occupation: [
        { name: "会社員（技術系）", rate: "35%" },
        { name: "学生", rate: "25%" },
        { name: "クリエイター", rate: "18%" },
        { name: "フリーランス", rate: "15%" },
      ],
      income: [
        { range: "300〜500万未満", rate: "35%" },
        { range: "500〜700万未満", rate: "28%" },
        { range: "300万未満", rate: "22%" },
        { range: "700〜900万未満", rate: "10%" },
      ],
      summary: "ZONeのコアファン。ゲームや作業時の必需品として定着。ブランドへの愛着が強く、SNSでの推奨も活発。",
      interests: ["ゲーム", "eスポーツ", "プログラミング", "動画配信", "音楽フェス"],
      purchaseBehavior: [
        { label: "主要購買チャネル", value: "コンビニ・EC" },
        { label: "購買頻度", value: "週3回以上" },
        { label: "価格感度", value: "低い" },
        { label: "ブランドロイヤルティ", value: "非常に高い" },
      ],
    },
  },
}

// AIペルソナの詳細データ
const aiPersonaDetails: Record<string, { 
  age: number
  gender: string
  occupation: string
  income: string
  tags: string[]
  purchaseReason: string
  preferredChannel: string
}> = {
  "佐藤健一": { age: 69, gender: "男性", occupation: "会社役員（退職）", income: "900万以上", tags: ["ゴルフ派", "日本酒派"], purchaseReason: "健康維持のため", preferredChannel: "定期購入" },
  "田中正雄": { age: 71, gender: "男性", occupation: "自営業", income: "700〜900万", tags: ["山歩き・ハイキング", "ゴルフ派"], purchaseReason: "活力維持のため", preferredChannel: "EC" },
  "山本洋子": { age: 67, gender: "女性", occupation: "専業主婦", income: "500〜700万", tags: ["ゴルフ派", "美容・エイジング"], purchaseReason: "美容と健康のため", preferredChannel: "定期購入" },
  "山田美和": { age: 70, gender: "女性", occupation: "パート", income: "300〜500万", tags: ["ヨガ・太極拳", "オーガニック"], purchaseReason: "自然派志向", preferredChannel: "店舗" },
  "鈴木太郎": { age: 65, gender: "男性", occupation: "会社員（管理職）", income: "700〜900万", tags: ["釣り", "健康志向"], purchaseReason: "体調管理のため", preferredChannel: "EC" },
  "高橋由美": { age: 63, gender: "女性", occupation: "フリーランス", income: "500〜700万", tags: ["料理", "ガーデニング"], purchaseReason: "栄養補給のため", preferredChannel: "店舗" },
  "伊藤健": { age: 68, gender: "男性", occupation: "年金受給者", income: "300〜500万", tags: ["ウォーキング", "読書"], purchaseReason: "健康寿命延伸のため", preferredChannel: "定期購入" },
  "渡辺恵": { age: 66, gender: "女性", occupation: "専業主婦", income: "500〜700万", tags: ["ヨガ", "美容"], purchaseReason: "美容目的", preferredChannel: "EC" },
  "小林誠": { age: 64, gender: "男性", occupation: "会社員", income: "700〜900万", tags: ["テニス", "旅行"], purchaseReason: "体力維持のため", preferredChannel: "コンビニ" },
  "田村雅彦": { age: 50, gender: "男性", occupation: "会社員（管理職）", income: "700〜900万", tags: ["ビジネス", "ゴルフ"], purchaseReason: "集中力向上のため", preferredChannel: "EC" },
  "佐野智子": { age: 48, gender: "女性", occupation: "会社員", income: "500〜700万", tags: ["料理", "健康管理"], purchaseReason: "家族の健康のため", preferredChannel: "定期購入" },
  "井上拓海": { age: 35, gender: "男性", occupation: "会社員（技術系）", income: "500〜700万", tags: ["ゲーム", "テクノロジー"], purchaseReason: "仕事効率化のため", preferredChannel: "コンビニ" },
  "高田美咲": { age: 32, gender: "女性", occupation: "会社員", income: "400〜600万", tags: ["ヨガ", "美容"], purchaseReason: "美容と健康のため", preferredChannel: "EC" },
  "鈴木翔": { age: 24, gender: "男性", occupation: "学生", income: "〜200万", tags: ["ゲーム", "eスポーツ"], purchaseReason: "集中力のため", preferredChannel: "コンビニ" },
  "山本彩": { age: 22, gender: "女性", occupation: "学生", income: "〜200万", tags: ["SNS", "動画配信"], purchaseReason: "勉強の集中力のため", preferredChannel: "コンビニ" },
  "中田健太": { age: 28, gender: "男性", occupation: "フリーランス", income: "400〜600万", tags: ["プログラミング", "音楽"], purchaseReason: "作業効率化のため", preferredChannel: "EC" },
  "小林美優": { age: 26, gender: "女性", occupation: "会社員", income: "300〜500万", tags: ["カフェ", "旅行"], purchaseReason: "リフレッシュのため", preferredChannel: "コンビニ" },
  "北村誠一": { age: 52, gender: "男性", occupation: "会社経営", income: "900万以上", tags: ["コーヒー", "ワイン"], purchaseReason: "上質な味わいのため", preferredChannel: "EC" },
  "藤井恵子": { age: 55, gender: "女性", occupation: "会社員", income: "600〜800万", tags: ["グルメ", "旅行"], purchaseReason: "贅沢な時間のため", preferredChannel: "定期購入" },
  "岡本翔太": { age: 27, gender: "男性", occupation: "エンジニア", income: "500〜700万", tags: ["ゲーム", "eスポーツ"], purchaseReason: "パフォーマンス向上のため", preferredChannel: "EC" },
}

export function MarketOverviewContent() {
  const [selectedSegment, setSelectedSegment] = useState<{
    stageId: string
    stageName: string
    productId: string
    productName: string
  } | null>(null)

  const handleCellClick = (stageId: string, stageName: string, productId: string, productName: string) => {
    if (selectedSegment?.stageId === stageId && selectedSegment?.productId === productId) {
      setSelectedSegment(null)
    } else {
      setSelectedSegment({ stageId, stageName, productId, productName })
    }
  }

  const getSegmentData = () => {
    if (!selectedSegment) return null
    return segmentData[selectedSegment.stageId]?.[selectedSegment.productId]
  }

  const segment = getSegmentData()

  return (
    <main className="flex-1 p-6 space-y-6 bg-muted/30">
      {/* Matrix Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-xs text-muted-foreground border-b border-r">
                    <div className="flex flex-col">
                      <span>ステージ</span>
                      <span className="text-[10px] mt-1">商品</span>
                    </div>
                  </th>
                  {stages.map((stage, index) => (
                    <th key={stage.id} className="p-3 text-center border-b min-w-[180px]">
                      <div className="flex flex-col items-center gap-1">
                        <div 
                          className={`w-2.5 h-2.5 rounded-full ${
                            index === 0 ? "bg-slate-400" : 
                            index === 1 ? "bg-blue-500" : 
                            index === 2 ? "bg-emerald-500" : 
                            "bg-amber-500"
                          }`} 
                        />
                        <span className={`text-sm font-medium ${
                          index === 0 ? "text-slate-700" : 
                          index === 1 ? "text-blue-600" : 
                          index === 2 ? "text-emerald-600" : 
                          "text-amber-600"
                        }`}>
                          {stage.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{stage.total}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="p-3 border-r min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-primary">{product.name}</span>
                          <span className="text-[10px] text-muted-foreground">{product.category}</span>
                        </div>
                      </div>
                    </td>
                    {stages.map((stage, stageIndex) => {
                      const data = segmentData[stage.id]?.[product.id]
                      const isSelected = selectedSegment?.stageId === stage.id && selectedSegment?.productId === product.id
                      
                      return (
                        <td 
                          key={`${stage.id}-${product.id}`}
                          className={`p-4 text-center cursor-pointer transition-all ${
                            stageIndex === 0 ? "bg-slate-50 hover:bg-slate-100" : 
                            stageIndex === 1 ? "bg-blue-50 hover:bg-blue-100" : 
                            stageIndex === 2 ? "bg-emerald-50 hover:bg-emerald-100" : 
                            "bg-amber-50 hover:bg-amber-100"
                          } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
                          onClick={() => handleCellClick(stage.id, stage.name, product.id, product.name)}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className={`text-xl font-bold ${
                              stageIndex === 0 ? "text-slate-700" : 
                              stageIndex === 1 ? "text-blue-600" : 
                              stageIndex === 2 ? "text-emerald-600" : 
                              "text-amber-600"
                            }`}>
                              {data?.population || "N/A"}
                            </span>
                            {/* Persona Avatars */}
                            <div className="flex flex-wrap justify-center gap-1 max-w-[140px]">
                              {data?.personas.slice(0, 6).map((persona, i) => {
                                const personaDetail = aiPersonaDetails[persona.name]
                                return (
                                  <Popover key={i}>
                                    <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <button className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
                                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                                          <AvatarImage src={persona.image} alt={persona.name} />
                                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                            {persona.name.slice(0, 2)}
                                          </AvatarFallback>
                                        </Avatar>
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72 p-0" align="center" side="top">
                                      <div className="p-4">
                                        {/* Header with avatar and name */}
                                        <div className="flex items-center gap-3 mb-4">
                                          <Avatar className="h-14 w-14 border-2 border-primary/20">
                                            <AvatarImage src={persona.image} alt={persona.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                              {persona.name.slice(0, 2)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <h4 className="font-bold text-foreground">{persona.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                              {personaDetail?.age}歳 / {personaDetail?.gender}
                                            </p>
                                          </div>
                                          <Badge variant="secondary" className="ml-auto text-[10px]">AIペルソナ</Badge>
                                        </div>
                                        
                                        {/* Profile details */}
                                        {personaDetail && (
                                          <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-muted-foreground">職業:</span>
                                              <span className="font-medium">{personaDetail.occupation}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                              <User className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-muted-foreground">年収:</span>
                                              <span className="font-medium">{personaDetail.income}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-muted-foreground">購買理由:</span>
                                              <span className="font-medium">{personaDetail.purchaseReason}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                              <Heart className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-muted-foreground">チャネル:</span>
                                              <span className="font-medium">{personaDetail.preferredChannel}</span>
                                            </div>
                                            <div className="pt-2 border-t">
                                              <p className="text-xs text-muted-foreground mb-2">興味・関心</p>
                                              <div className="flex flex-wrap gap-1">
                                                {personaDetail.tags.map((tag, idx) => (
                                                  <Badge key={idx} variant="outline" className="text-[10px]">
                                                    {tag}
                                                  </Badge>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                )
                              })}
                              {data && data.personas.length > 6 && (
                                <div className="h-8 w-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs text-muted-foreground shadow-sm">
                                  +{data.personas.length - 6}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <ChevronDown className="h-4 w-4 text-primary mt-1" />
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Segment Detail Panel - Inline below matrix */}
      {selectedSegment && segment && (
        <Card className="border-0 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">セグメント分析</Badge>
                  <Badge className="bg-primary text-primary-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    ユーザー分析
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold">
                  {selectedSegment.stageName} × {selectedSegment.productName}
                  <span className="text-muted-foreground font-normal ml-2">
                    推定 {segment.population}
                  </span>
                </h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedSegment(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">属性・概要</TabsTrigger>
                <TabsTrigger value="interests">興味関心</TabsTrigger>
                <TabsTrigger value="purchase">購買行動</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Demographics & Occupation/Income */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Demographics */}
                    <div className="border rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">性別構成</span>
                          <span className="font-medium">{segment.demographics.genderRatio}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">平均年齢</span>
                          <span className="font-medium">{segment.demographics.avgAge}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">既婚率</span>
                          <span className="font-medium">{segment.demographics.marriedRate}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">子あり率</span>
                          <span className="font-medium">{segment.demographics.childRate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Occupation & Income */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">職業</h4>
                        <div className="space-y-2">
                          {segment.occupation.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="text-sm text-muted-foreground flex-1">{item.name}</span>
                              <span className="text-sm font-medium">{item.rate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">世帯年収</h4>
                        <div className="space-y-2">
                          {segment.income.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-sky-400" />
                              <span className="text-sm text-muted-foreground flex-1">{item.range}</span>
                              <span className="text-sm font-medium">{item.rate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-medium mb-2">サマリー</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {segment.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right: AI Personas */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-4">AIペルソナ（{segment.personas.length}名）</h4>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {segment.personas.slice(0, 5).map((persona) => {
                        const details = aiPersonaDetails[persona.name]
                        return (
                          <div key={persona.id} className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border">
                              <AvatarImage src={persona.image} alt={persona.name} />
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {persona.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{persona.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {details?.age || 50}歳 / {details?.gender || "不明"}
                              </p>
                              {details?.tags && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {details.tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="interests" className="mt-0">
                <div className="border rounded-lg p-6">
                  <h4 className="font-medium mb-4">興味・関心カテゴリ</h4>
                  <div className="flex flex-wrap gap-2">
                    {segment.interests?.map((interest, i) => (
                      <Badge key={i} variant="outline" className="text-sm py-1.5 px-3">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    このセグメントの主要な興味関心領域です。広告ターゲティングやコンテンツ企画の参考にご活用ください。
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="purchase" className="mt-0">
                <div className="border rounded-lg p-6">
                  <h4 className="font-medium mb-4">購買行動パターン</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {segment.purchaseBehavior?.map((item, i) => (
                      <div key={i} className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium mt-1">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>


            </Tabs>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
