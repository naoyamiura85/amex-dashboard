"use client"

import { useState } from "react"
import Image from "next/image"
import { X, User, MapPin, Star, Heart, Users, Briefcase, ChevronRight, TrendingUp, Download, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// ----------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------
type EngagementLevel = "H" | "M" | "L"
type StageKey = "prospect" | "new" | "active" | "premium"

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
  tribe: string[]
  cardGoal: string
}

interface SegmentAttributes {
  genderRatio: string
  avgAge: number
  marriedRate: string
  avgSpend: string
  occupations: { label: string; pct: number }[]
  incomes: { label: string; pct: number }[]
  cards: { label: string; pct: number; color: string }[]
  cardNote?: string
  summary: string
}

interface Segment {
  engagement: EngagementLevel
  stage: StageKey
  count: string
  personas: Persona[]
  attributes: SegmentAttributes
}

// ----------------------------------------------------------------
// 軸マスタ
// ----------------------------------------------------------------
// 列（ステージ）ごとの背景色 — 左から右へ水色が濃くなる
const stageBg: Record<StageKey, { cell: string; cellHover: string; cellSelected: string; count: string; dot: string }> = {
  prospect: {
    cell:         "bg-slate-50",
    cellHover:    "hover:bg-slate-100",
    cellSelected: "bg-slate-400",
    count:        "text-slate-500",
    dot:          "bg-slate-400",
  },
  new: {
    cell:         "bg-[#D6EAFA]",
    cellHover:    "hover:bg-[#C2E0F7]",
    cellSelected: "bg-[#006FCF]",
    count:        "text-[#006FCF]",
    dot:          "bg-[#4AABEE]",
  },
  active: {
    cell:         "bg-[#A8D4F5]",
    cellHover:    "hover:bg-[#8EC6F0]",
    cellSelected: "bg-[#0059AA]",
    count:        "text-[#0059AA]",
    dot:          "bg-[#1D8CD9]",
  },
  premium: {
    cell:         "bg-[#6DB8EF]",
    cellHover:    "hover:bg-[#55ACEA]",
    cellSelected: "bg-[#00175A]",
    count:        "text-[#00175A]",
    dot:          "bg-[#006FCF]",
  },
}

const stages: { key: StageKey; label: string; sub: string }[] = [
  { key: "prospect", label: "未会員（Brand Consideration 低）", sub: "890万人" },
  { key: "new",      label: "未会員（Brand Consideration 高）", sub: "430万人" },
  { key: "active",   label: "新規会員",                         sub: "210万人" },
  { key: "premium",  label: "プレミアム",                       sub: "56万人"  },
]

const engagements: { key: EngagementLevel; label: string; sublabel: string; color: string; dot: string }[] = [
  { key: "H", label: "H", sublabel: "世帯年収 高", color: "text-[#006FCF]", dot: "bg-[#006FCF]" },
  { key: "M", label: "M", sublabel: "世帯年収 中", color: "text-amber-500",  dot: "bg-amber-400"   },
  { key: "L", label: "L", sublabel: "世帯年収 低", color: "text-slate-400",  dot: "bg-slate-300"   },
]

// ----------------------------------------------------------------
// ペルソナマスタ
// ----------------------------------------------------------------
const allPersonas: Persona[] = [
  {
    id: "p01", name: "田中 誠一", age: 58, gender: "男性",
    image: "/images/personas/persona-01.jpg",
    occupation: "大企業役員", income: "2,000万円以上",
    background: "製造業大手の執行役員。出張が多く空港ラウンジを週2〜3回利用。",
    lifestyle: "ゴルフと海外旅行を趣味とし、週末は都内高級レストランで接待を行う。",
    interests: ["ビジネス航空", "ゴルフ", "ワイン"],
    tribe: ["エグゼクティブ派", "インターナショナル派"],
    cardGoal: "出張コスト最適化・ステータス維持",
  },
  {
    id: "p02", name: "山本 恵子", age: 45, gender: "女性",
    image: "/images/personas/persona-02.jpg",
    occupation: "外資系コンサルタント", income: "1,500〜2,000万円",
    background: "戦略コンサルティングファームのパートナー。ロンドン・NYに頻繁に渡航。",
    lifestyle: "美術館・オペラなど文化的体験を重視。高級スパでリカバリーを行う。",
    interests: ["現代アート", "クラシック音楽", "ラグジュアリースパ"],
    tribe: ["カルチャー派", "グローバルエリート派"],
    cardGoal: "海外利用特典・コンシェルジュ活用",
  },
  {
    id: "p03", name: "鈴木 隆雄", age: 64, gender: "男性",
    image: "/images/personas/persona-03.jpg",
    occupation: "上場企業オーナー経営者", income: "3,000万円以上",
    background: "IT系スタートアップを上場させた創業者。現在は複数会社の会長職を兼務。",
    lifestyle: "プライベートジェット手配やプレミアムホテルスイートを常用。",
    interests: ["プライベートジェット", "高級不動産", "アート投資"],
    tribe: ["オーナー経営者派", "インベスター派"],
    cardGoal: "プレミアムコンシェルジュ・特別入場権",
  },
  {
    id: "p04", name: "佐藤 彩花", age: 33, gender: "女性",
    image: "/images/personas/persona-04.jpg",
    occupation: "IT企業マネージャー", income: "700〜900万円",
    background: "都内テック企業のプロダクトマネージャー。リモートワーク活用���旅しながら働く。",
    lifestyle: "ブティックホテルや隠れ家レストランを好む。SNSでの情報発信も積極的。",
    interests: ["ブティックホテル", "グルメ体験", "デジタルノマド"],
    tribe: ["ミレニアル富裕層", "ライフスタイル発信派"],
    cardGoal: "グルメ特典・ホテルアップグレード",
  },
  {
    id: "p05", name: "伊藤 雅子", age: 52, gender: "女性",
    image: "/images/personas/persona-05.jpg",
    occupation: "医師（開業医）", income: "1,800〜2,500万円",
    background: "都内クリニック院長。業務の合間に高級旅行や文化体験を楽しむ。",
    lifestyle: "一流ホテルのラウンジやクラブフロアを愛用。健康・美容への投資を惜しまない。",
    interests: ["ウェルネスリトリート", "一流ホテル", "日本料理"],
    tribe: ["プロフェッショナル派", "ウェルネス重視派"],
    cardGoal: "国内高級ホテル特典・ヘルス関連サービス",
  },
  {
    id: "p06", name: "中村 健太", age: 41, gender: "男性",
    image: "/images/personas/persona-06.jpg",
    occupation: "金融機関管理職", income: "1,200〜1,500万円",
    background: "大手証券会社のVP。海外出張が月複数回あり、ポイント利用に精通。",
    lifestyle: "出張でマイル・ポイントを最大化。家族旅行でも特典を積極活用。",
    interests: ["マイレージ最適化", "ファミリー旅行", "グルメ"],
    tribe: ["ポイント最適化派", "ファミリー重視���"],
    cardGoal: "出張費ポ���ント還元・家族旅行へ転換",
  },
  {
    id: "p07", name: "渡辺 拓也", age: 28, gender: "男性",
    image: "/images/personas/persona-07.jpg",
    occupation: "スタートアップ創業者", income: "500〜700万円",
    background: "シード調達済みのスタートアップCEO。VCや海外パートナーとの会食が多い。",
    lifestyle: "トレンドのレストランや体験型イベントへの参加を重視。ステータス形成を意識。",
    interests: ["スタートアップ交流", "最先端体験", "ネットワーキング"],
    tribe: ["若手起業家派", "トレンドセッター派"],
    cardGoal: "ステータス・ビジネスダイニング特典",
  },
  {
    id: "p08", name: "小林 幸子", age: 67, gender: "女性",
    image: "/images/personas/persona-08.jpg",
    occupation: "資産家（元会社役員）", income: "2,500万円以上",
    background: "大手流通業を退職後、資産運用と趣味の旅行に注力。クルーズ旅行を年2回実施。",
    lifestyle: "五つ星ホテルとクルーズ旅行が中心。孫と過ごすファミリー旅行も重視。",
    interests: ["クルーズ旅行", "高級旅館", "ファインアート"],
    tribe: ["シニア富裕層", "クルーズ愛好派"],
    cardGoal: "旅行付帯保険・高齢者向けコンシェルジュ",
  },
  {
    id: "p09", name: "高橋 真一", age: 55, gender: "男性",
    image: "/images/personas/persona-09.jpg",
    occupation: "医療法人理事長", income: "3,000万円以上",
    background: "複数クリニックを経営。法人カードと個人カードを使い分け事業経費を最適化。",
    lifestyle: "医師仲間とのゴルフや高級料亭での会食が多い。長期バケーションは欧州旅行。",
    interests: ["法人経費管理", "ゴルフ", "欧州旅行"],
    tribe: ["医療経営者派", "プレステージ派"],
    cardGoal: "法人カード経費精算・プラチナ特典",
  },
  {
    id: "p10", name: "松田 優子", age: 38, gender: "女性",
    image: "/images/personas/persona-10.jpg",
    occupation: "クリエイティブディレクター", income: "900〜1,200万円",
    background: "広告代理店のクリエイティブ責任者。トレンド発掘のため世界各地を旅する。",
    lifestyle: "デザインホテルやポップアップ体験を好む。アートフェア・ファッションウィークに参加。",
    interests: ["デザインホテル", "現代アート", "ファッション"],
    tribe: ["クリエイティブ派", "カルチャー消費派"],
    cardGoal: "文化体験特典・トレンドアクセス",
  },
  {
    id: "p11", name: "藤本 和夫", age: 72, gender: "男性",
    image: "/images/personas/persona-11.jpg",
    occupation: "元上場企業社長", income: "年金＋資産収入3,000万円超",
    background: "製薬会社の元社長。現在は複数の社外取締役と慈善活動に従事。",
    lifestyle: "高級温泉旅館への季節ごとの滞在。孫��のプレ��ントに高額百貨店を愛用。",
    interests: ["高級旅館", "百貨店優待", "フィランソロピー"],
    tribe: ["シニアプレステージ派", "百貨店常連派"],
    cardGoal: "百貨店優待・温泉リゾート特典",
  },
  {
    id: "p12", name: "岡田 理沙", age: 44, gender: "女性",
    image: "/images/personas/persona-12.jpg",
    occupation: "投資家・連続起業家", income: "変動（平均2,000万円超）",
    background: "3社を売却した連続起業家。現在はエンジェル投資家として活動。",
    lifestyle: "カンファレンスと豪華リトリートを組み合わせた旅を好む。コミュニティ形成を重視。",
    interests: ["投資コミュニティ", "プライベートリトリート", "次世代テクノロジー"],
    tribe: ["エンジェル投資家派", "コミュニティビルダー派"],
    cardGoal: "VIPイベント招待・プレミアムコミュニティ",
  },
]

// ----------------------------------------------------------------
// セグメントデータ
// ----------------------------------------------------------------
const segments: Segment[] = [
  {
    engagement: "H", stage: "prospect", count: "142万人",
    personas: [allPersonas[3], allPersonas[6], allPersonas[9]],
    attributes: {
      genderRatio: "男性56% / 女性44%", avgAge: 38, marriedRate: "44%", avgSpend: "未計測",
      occupations: [{ label: "IT・テック", pct: 32 }, { label: "金融", pct: 24 }, { label: "専門職", pct: 18 }, { label: "経営者", pct: 12 }],
      incomes: [{ label: "500〜900万円", pct: 48 }, { label: "900〜1,500万円", pct: 30 }, { label: "1,500万円以上", pct: 22 }],
      cards: [
        { label: "三井住友プラチナ", pct: 38, color: "#1A5276" },
        { label: "JCBザ・クラス", pct: 28, color: "#145A32" },
        { label: "ダイナースプレミアム", pct: 18, color: "#6E2F1A" },
        { label: "楽天プレミアム", pct: 12, color: "#C0392B" },
      ],
      cardNote: "保有カード（他社）",
      summary: "高い情報感度を持つ30〜40代。競合プレミアムカードのヘビーユーザーだが、AMEX特典への関心が急上昇。デジタル接点でのエンゲージメントが高く、SNSや比較サイトからの流入が多い。",
    },
  },
  {
    engagement: "H", stage: "new", count: "58万人",
    personas: [allPersonas[1], allPersonas[5], allPersonas[7]],
    attributes: {
      genderRatio: "男性48% / 女性52%", avgAge: 41, marriedRate: "58%", avgSpend: "¥32万円/月",
      occupations: [{ label: "管理職", pct: 36 }, { label: "専門職", pct: 28 }, { label: "経営者", pct: 20 }, { label: "その他", pct: 16 }],
      incomes: [{ label: "900〜1,500万円", pct: 42 }, { label: "1,500〜2,000万円", pct: 35 }, { label: "2,000万円以上", pct: 23 }],
      cards: [
        { label: "三井住友プラチナ", pct: 42, color: "#1A5276" },
        { label: "ダイナースプレミアム", pct: 26, color: "#6E2F1A" },
        { label: "JCBゴールド", pct: 20, color: "#145A32" },
        { label: "その他プレミアム", pct: 12, color: "#7F8C8D" },
      ],
      cardNote: "入会前の保有カード（他社）",
      summary: "申込後3ヶ月以内の高エンゲージメント新規会員。入会特典を積極利用しており継続率が高い。コンシェルジュや空港ラウンジの初回利用率が他セグメント比2.3倍。",
    },
  },
  {
    engagement: "H", stage: "active", count: "89万人",
    personas: [allPersonas[0], allPersonas[4], allPersonas[8]],
    attributes: {
      genderRatio: "男性62% / 女性38%", avgAge: 52, marriedRate: "74%", avgSpend: "¥87万円/月",
      occupations: [{ label: "経営者", pct: 34 }, { label: "医師・士業", pct: 26 }, { label: "金融", pct: 22 }, { label: "管理職", pct: 18 }],
      incomes: [{ label: "1,500〜2,000万円", pct: 38 }, { label: "2,000〜3,000万円", pct: 34 }, { label: "3,000万円以上", pct: 28 }],
      cards: [
        { label: "AMEX グリーン", pct: 44, color: "#006FCF" },
        { label: "AMEX ゴールド", pct: 35, color: "#B4975A" },
        { label: "AMEX プラチナ検討中", pct: 21, color: "#8E44AD" },
      ],
      cardNote: "保有AMEXカード / 検討中",
      summary: "利用額・頻度ともに最上位層。出張・グルメ・旅行の3カテゴリで全消費の72%を占める。プラチナカードへのアップグレード見込みが高く、コンシェルジュ満足度も最高水準。",
    },
  },
  {
    engagement: "H", stage: "premium", count: "31万人",
    personas: [allPersonas[2], allPersonas[8], allPersonas[11]],
    attributes: {
      genderRatio: "男性68% / 女性32%", avgAge: 57, marriedRate: "82%", avgSpend: "¥210万円/月",
      occupations: [{ label: "オーナー経営者", pct: 44 }, { label: "資���家", pct: 32 }, { label: "医師", pct: 14 }, { label: "士業", pct: 10 }],
      incomes: [{ label: "3,000万円以上", pct: 68 }, { label: "2,000〜3,000万円", pct: 26 }, { label: "1,500〜2,000万円", pct: 6 }],
      cards: [
        { label: "AMEX センチュリオン", pct: 52, color: "#1C1C1C" },
        { label: "AMEX プラチナ", pct: 34, color: "#8E44AD" },
        { label: "AMEX ビジネスプラチナ", pct: 14, color: "#2E4057" },
      ],
      cardNote: "保有AMEXカード",
      summary: "センチュリオン・プラチナ会員の中核。年間消費額は平均2,500万円超。プライベートジェットや専用コンシェルジュの利用率が高く、特別招待イベントが最重要リテンション施策。",
    },
  },
  {
    engagement: "M", stage: "prospect", count: "287万人",
    personas: [allPersonas[5], allPersonas[9], allPersonas[3]],
    attributes: {
      genderRatio: "男性53% / 女性47%", avgAge: 45, marriedRate: "61%", avgSpend: "未計��",
      occupations: [{ label: "会社員", pct: 38 }, { label: "専門職", pct: 22 }, { label: "自営業", pct: 20 }, { label: "経営者", pct: 14 }],
      incomes: [{ label: "500〜700万円", pct: 42 }, { label: "700〜900万円", pct: 34 }, { label: "900万円以上", pct: 24 }],
      cards: [
        { label: "楽天プレミアム", pct: 36, color: "#C0392B" },
        { label: "三井住友ゴールド", pct: 28, color: "#1A5276" },
        { label: "イオンゴールド", pct: 22, color: "#F39C12" },
        { label: "その他一般カード", pct: 14, color: "#7F8C8D" },
      ],
      cardNote: "保有カード（他社）",
      summary: "比較検討中の中 Brand Consideration 層。マイル・ポイント還元率への関心が高く、年会費対比コスパを重視する傾向。適切な特典訴求で申込意向が高まる可能性がある。",
    },
  },
  {
    engagement: "M", stage: "new", count: "112万人",
    personas: [allPersonas[6], allPersonas[3], allPersonas[1]],
    attributes: {
      genderRatio: "男性51% / 女性49%", avgAge: 39, marriedRate: "55%", avgSpend: "¥18万円/月",
      occupations: [{ label: "会社員", pct: 44 }, { label: "専門職", pct: 24 }, { label: "自営業", pct: 18 }, { label: "その他", pct: 14 }],
      incomes: [{ label: "700〜900万円", pct: 38 }, { label: "900〜1,200万円", pct: 32 }, { label: "1,200万円以上", pct: 30 }],
      cards: [
        { label: "JCBゴールド", pct: 36, color: "#145A32" },
        { label: "三井住友ゴールド", pct: 32, color: "#1A5276" },
        { label: "ダイナースクラブ", pct: 22, color: "#6E2F1A" },
        { label: "その他", pct: 10, color: "#7F8C8D" },
      ],
      cardNote: "入会前の保有カード（他社）",
      summary: "入会後に利用が伸び悩んでいる中間層。グルメ特典や国内ホテル優待の認知が低く、特典案内メールの開封率が低い。オンボーディング施策の改善で活性化できる可能性が高い。",
    },
  },
  {
    engagement: "M", stage: "active", count: "76万人",
    personas: [allPersonas[4], allPersonas[7], allPersonas[10]],
    attributes: {
      genderRatio: "男性57% / 女性43%", avgAge: 49, marriedRate: "68%", avgSpend: "¥45万円/月",
      occupations: [{ label: "管理職", pct: 32 }, { label: "医師・士業", pct: 24 }, { label: "経営者", pct: 22 }, { label: "その他", pct: 22 }],
      incomes: [{ label: "1,200〜1,800万円", pct: 44 }, { label: "1,800〜2,500万円", pct: 32 }, { label: "2,500万円以上", pct: 24 }],
      cards: [
        { label: "AMEX ゴールド", pct: 58, color: "#B4975A" },
        { label: "AMEX グリーン", pct: 28, color: "#006FCF" },
        { label: "AMEX プラチナ検討中", pct: 14, color: "#8E44AD" },
      ],
      cardNote: "保有AMEXカード / 検討中",
      summary: "安定した利用実績を持つ中間アクティブ層。旅行・グルメでの利用が中心で法人カードとの併用率が高い。コンシェルジュ利用は少ないが特典認知が上がれば利用拡大の余地が大きい。",
    },
  },
  {
    engagement: "M", stage: "premium", count: "15万人",
    personas: [allPersonas[10], allPersonas[7], allPersonas[4]],
    attributes: {
      genderRatio: "男性60% / 女性40%", avgAge: 60, marriedRate: "78%", avgSpend: "¥120万円/月",
      occupations: [{ label: "資産家", pct: 36 }, { label: "経営者", pct: 30 }, { label: "医師", pct: 20 }, { label: "士業", pct: 14 }],
      incomes: [{ label: "2,000〜3,000万円", pct: 48 }, { label: "3,000万円以上", pct: 40 }, { label: "1,500〜2,000万円", pct: 12 }],
      cards: [
        { label: "AMEX プラチナ", pct: 62, color: "#8E44AD" },
        { label: "AMEX センチュリオン", pct: 24, color: "#1C1C1C" },
        { label: "AMEX ビジネスプラチナ", pct: 14, color: "#2E4057" },
      ],
      cardNote: "保有AMEXカード",
      summary: "プレミアム会員ながら特典の活用頻度が低下しているセグメント。長期会員のため継続意向は高いが最新特典の認知が低い。パーソナライズされたリテンションアプローチが有効。",
    },
  },
  {
    engagement: "L", stage: "prospect", count: "461万人",
    personas: [allPersonas[10], allPersonas[11], allPersonas[7]],
    attributes: {
      genderRatio: "男性49% / 女性51%", avgAge: 51, marriedRate: "63%", avgSpend: "未計測",
      occupations: [{ label: "会社員", pct: 46 }, { label: "専門職", pct: 20 }, { label: "自営業", pct: 18 }, { label: "主婦・主夫", pct: 16 }],
      incomes: [{ label: "300〜500万円", pct: 38 }, { label: "500〜700万円", pct: 36 }, { label: "700万円以上", pct: 26 }],
      cards: [
        { label: "楽天カード", pct: 44, color: "#C0392B" },
        { label: "PayPayカード", pct: 28, color: "#F39C12" },
        { label: "イオンカード", pct: 18, color: "#1ABC9C" },
        { label: "その他一般カード", pct: 10, color: "#7F8C8D" },
      ],
      cardNote: "保有カード（他社）",
      summary: "低関与だが潜在的な需要を持つ大規模セグメント。特定のライフイベント（昇進・結婚・海外赴任）でのタッチポイント設計が転換の鍵。",
    },
  },
  {
    engagement: "L", stage: "new", count: "128万人",
    personas: [allPersonas[11], allPersonas[3], allPersonas[6]],
    attributes: {
      genderRatio: "男性48% / 女性52%", avgAge: 36, marriedRate: "48%", avgSpend: "¥8万円/月",
      occupations: [{ label: "会社員", pct: 52 }, { label: "専門職", pct: 20 }, { label: "自営業", pct: 16 }, { label: "その他", pct: 12 }],
      incomes: [{ label: "500〜700万円", pct: 44 }, { label: "700〜900万円", pct: 32 }, { label: "900万円以上", pct: 24 }],
      cards: [
        { label: "三井住友一般", pct: 38, color: "#1A5276" },
        { label: "JCB一般", pct: 30, color: "#145A32" },
        { label: "楽天カード", pct: 22, color: "#C0392B" },
        { label: "その他", pct: 10, color: "#7F8C8D" },
      ],
      cardNote: "入会前の保有カード（他社）",
      summary: "入会後の休眠リスクが最も高いセグメント。初月以降の利用が急減しており3ヶ月以内の離脱率が32%に上る。初回特典消化後の次のアクションを促すコミュニケーション設計が急務。",
    },
  },
  {
    engagement: "L", stage: "active", count: "45万人",
    personas: [allPersonas[10], allPersonas[5], allPersonas[2]],
    attributes: {
      genderRatio: "男性55% / 女性45%", avgAge: 55, marriedRate: "72%", avgSpend: "¥22万円/月",
      occupations: [{ label: "管理職", pct: 28 }, { label: "経営者", pct: 26 }, { label: "医師・士業", pct: 24 }, { label: "その他", pct: 22 }],
      incomes: [{ label: "1,200〜1,800万円", pct: 40 }, { label: "1,800万円以上", pct: 38 }, { label: "1,000〜1,200万円", pct: 22 }],
      cards: [
        { label: "AMEX ゴールド", pct: 46, color: "#B4975A" },
        { label: "AMEX グリーン", pct: 32, color: "#006FCF" },
        { label: "AMEX プラチナ検討中", pct: 22, color: "#8E44AD" },
      ],
      cardNote: "保有AMEXカード / 検討中",
      summary: "収入は高いが利用頻度が低い要注目セグメント。他社カードとの使い分けが多く、特典訴求によってシェアオブウォレット拡大の余地が大きい。",
    },
  },
  {
    engagement: "L", stage: "premium", count: "10万人",
    personas: [allPersonas[2], allPersonas[10], allPersonas[0]],
    attributes: {
      genderRatio: "男性70% / 女性30%", avgAge: 65, marriedRate: "85%", avgSpend: "¥55万円/月",
      occupations: [{ label: "退職経営者", pct: 42 }, { label: "資産家", pct: 34 }, { label: "士業", pct: 14 }, { label: "その他", pct: 10 }],
      incomes: [{ label: "3,000万円以上（資産）", pct: 56 }, { label: "2,000〜3,000万円", pct: 30 }, { label: "1,500〜2,000万円", pct: 14 }],
      cards: [
        { label: "AMEX プラチナ", pct: 54, color: "#8E44AD" },
        { label: "AMEX センチュリオン", pct: 30, color: "#1C1C1C" },
        { label: "AMEX ゴールド（併用）", pct: 16, color: "#B4975A" },
      ],
      cardNote: "保有AMEXカード",
      summary: "プレミアム会員だが利用額が著しく低下しているシニア層。百貨店優待・旅館特典など国内向けのサービス訴求と専任担当者による関係維持が有効。",
    },
  },
]

function getSegment(eng: EngagementLevel, stage: StageKey) {
  return segments.find(s => s.engagement === eng && s.stage === stage)
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// AvatarGrid — スクリーンショット準拠の格子状アバター配置
// ----------------------------------------------------------------
function AvatarGrid({
  personas,
  isSelected,
  onPersonaClick,
}: {
  personas: Persona[]
  isSelected: boolean
  onPersonaClick: (p: Persona) => void
}) {
  // 最大5枚表示、残りを +N バッジで表示
  const MAX = 5
  const show = personas.slice(0, MAX)
  const extra = personas.length - MAX
  return (
    <div className="flex flex-wrap justify-center gap-1" style={{ maxWidth: 120 }}>
      {show.map(p => (
        <button
          key={p.id}
          onClick={e => { e.stopPropagation(); onPersonaClick(p) }}
          title={p.name}
          className={cn(
            "relative w-9 h-9 rounded-full overflow-hidden border-2 hover:scale-110 transition-transform shadow-sm shrink-0",
            isSelected ? "border-white/70" : "border-white"
          )}
        >
          <Image src={p.image} alt={p.name} fill className="object-cover" />
        </button>
      ))}
      {extra > 0 && (
        <div className={cn(
          "w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm shrink-0",
          isSelected
            ? "bg-white/20 border-white/40 text-white"
            : "bg-white border-slate-200 text-slate-500"
        )}>
          +{extra}
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------------------
// PersonaModal
// ----------------------------------------------------------------
function PersonaModal({
  persona,
  open,
  onClose,
}: {
  persona: Persona | null
  open: boolean
  onClose: () => void
}) {
  if (!persona) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl gap-0">
        {/* ヘッダー */}
        <div className="bg-[#006FCF] px-5 pt-5 pb-4 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 shrink-0">
            <Image src={persona.image} alt={persona.name} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-white leading-snug">{persona.name}</p>
            <p className="text-sm text-blue-100 flex items-center gap-1 mt-0.5">
              <User className="w-3 h-3 shrink-0" />
              {persona.age}歳 / {persona.gender}
            </p>
            <p className="text-xs text-blue-200 mt-0.5">{persona.occupation}</p>
          </div>
          <button onClick={onClose} className="ml-auto text-white/60 hover:text-white shrink-0 self-start">
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* 本文 */}
        <div className="px-5 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <p className="text-[11px] font-semibold text-[#006FCF] flex items-center gap-1 mb-1.5 uppercase tracking-wide">
              <MapPin className="w-3 h-3" /> 背景・経歴
            </p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 leading-relaxed">{persona.background}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#006FCF] flex items-center gap-1 mb-1.5 uppercase tracking-wide">
              <Star className="w-3 h-3" /> ライフスタイル
            </p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 leading-relaxed">{persona.lifestyle}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#006FCF] flex items-center gap-1 mb-1.5 uppercase tracking-wide">
              <Heart className="w-3 h-3" /> 興味・関心
            </p>
            <div className="flex flex-wrap gap-1.5">
              {persona.interests.map(i => (
                <Badge key={i} className="bg-blue-50 text-[#006FCF] border-0 text-xs">{i}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#006FCF] flex items-center gap-1 mb-1.5 uppercase tracking-wide">
              <Users className="w-3 h-3" /> 所属トライブ
            </p>
            <div className="flex flex-wrap gap-1.5">
              {persona.tribe.map(t => (
                <Badge key={t} variant="outline" className="border-[#006FCF]/30 text-[#006FCF] text-xs">{t}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#006FCF] flex items-center gap-1 mb-1.5 uppercase tracking-wide">
              <Briefcase className="w-3 h-3" /> カード活用ゴール
            </p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5">{persona.cardGoal}</p>
          </div>
          <p className="text-[10px] text-slate-400 text-center pb-1">
            このAIペルソナはマーケティング分析用に生成された架空の人物です
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ----------------------------------------------------------------
// SegmentDetailPanel
// ----------------------------------------------------------------
function SegmentDetailPanel({
  segment,
  stageLabel,
  engKey,
  onClose,
  onPersonaClick,
}: {
  segment: Segment
  stageLabel: string
  engKey: EngagementLevel
  onClose: () => void
  onPersonaClick: (p: Persona) => void
}) {
  const [tab, setTab] = useState("attributes")
  const engMeta = engagements.find(e => e.key === engKey)!

  return (
    <div className="mt-4 rounded-xl border border-[#006FCF]/20 bg-white shadow-md overflow-hidden">
      {/* タイトルバー */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#006FCF]/5 border-b border-[#006FCF]/10">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#006FCF]" />
          <span className="text-sm font-semibold text-slate-700">
            {stageLabel}
            <span className="mx-1.5 text-slate-300">×</span>
            世帯年収
            <span className={cn("ml-1 font-black", engMeta.color)}>{engKey}</span>
            <span className="ml-2 text-[#006FCF] font-bold">推定 {segment.count}</span>
          </span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="p-4">
        <TabsList className="mb-4 h-8">
          <TabsTrigger value="attributes" className="text-xs">属性・概要</TabsTrigger>
          <TabsTrigger value="personas" className="text-xs">AIペルソナ</TabsTrigger>
        </TabsList>

        {/* 属性・概要タブ */}
        <TabsContent value="attributes">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              {[
                { label: "性別構成",       value: segment.attributes.genderRatio },
                { label: "平均年齢",       value: `${segment.attributes.avgAge}歳` },
                { label: "既婚率",         value: segment.attributes.marriedRate },
                { label: "平均月間利用額", value: segment.attributes.avgSpend },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{row.label}</span>
                  <span className="font-semibold text-slate-800">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">職業</p>
                <div className="space-y-1.5">
                  {segment.attributes.occupations.map(o => (
                    <div key={o.label} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#006FCF] shrink-0" />
                      <span className="text-xs text-slate-600 flex-1">{o.label}</span>
                      <span className="text-xs font-semibold text-slate-700 w-8 text-right">{o.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">世帯年収</p>
                <div className="space-y-1.5">
                  {segment.attributes.incomes.map(i => (
                    <div key={i.label} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="text-xs text-slate-600 flex-1">{i.label}</span>
                      <span className="text-xs font-semibold text-slate-700 w-8 text-right">{i.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 保有/検討カード状況 */}
          <div className="mt-4 border border-slate-100 rounded-lg p-3.5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">
              {segment.attributes.cardNote ?? "保有/検討カード状況"}
            </p>
            <div className="space-y-2">
              {segment.attributes.cards.map(c => (
                <div key={c.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-slate-600 flex-1">{c.label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color, opacity: 0.7 }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 w-7 text-right">{c.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 bg-slate-50 rounded-lg p-3.5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">サマリー</p>
            <p className="text-sm text-slate-700 leading-relaxed">{segment.attributes.summary}</p>
          </div>
        </TabsContent>

        {/* ペルソナタブ */}
        <TabsContent value="personas">
          <p className="text-xs text-slate-400 mb-3">アイコンをクリックして詳細プロフィールを表示</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {segment.personas.map(p => (
              <button
                key={p.id}
                onClick={() => onPersonaClick(p)}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-[#006FCF]/40 hover:bg-blue-50/50 transition-all text-left"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.age}歳 / {p.gender}</p>
                  <Badge className="mt-1 text-[9px] px-1.5 py-0 bg-blue-50 text-[#006FCF] border-0 font-normal">
                    {p.interests[0]}
                  </Badge>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ----------------------------------------------------------------
// メインコンポーネント
// ----------------------------------------------------------------
export function MarketOverviewContent() {
  const [selectedCell, setSelectedCell] = useState<{ eng: EngagementLevel; stage: StageKey } | null>(null)
  const [modalPersona, setModalPersona] = useState<Persona | null>(null)

  const handleCellClick = (eng: EngagementLevel, stage: StageKey) => {
    if (selectedCell?.eng === eng && selectedCell?.stage === stage) {
      setSelectedCell(null)
    } else {
      setSelectedCell({ eng, stage })
    }
  }

  const selectedSegment = selectedCell ? getSegment(selectedCell.eng, selectedCell.stage) : null
  const selectedStageLabel = selectedCell ? (stages.find(s => s.key === selectedCell.stage)?.label ?? "") : ""

  return (
    <div className="p-6 space-y-4">
      {/* ツールバー */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">2026年10月 | データ更新: 本日 09:15</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
            <Filter className="h-3.5 w-3.5" /> フィルター
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
            <Download className="h-3.5 w-3.5" /> エクスポート
          </Button>
        </div>
      </div>

      {/* グリッドテーブル */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {/* 軸ラベルセル */}
              <th className="w-28 p-3 border-b border-r border-slate-200 bg-slate-50 align-bottom">
                <div className="flex flex-col items-stretch text-[10px] text-slate-400 font-normal">
                  <span className="text-right">ステージ</span>
                  <div className="border-t border-slate-300 my-1.5" />
                  <span className="text-left">世帯年収</span>
                </div>
              </th>
              {stages.map(s => (
                <th key={s.key} className={cn("p-3 border-b border-r border-slate-200 text-center min-w-[170px]", stageBg[s.key].cell)}>
                  <div className={cn("w-2.5 h-2.5 rounded-full mx-auto mb-1.5", stageBg[s.key].dot)} />
                  <p className={cn("text-sm font-bold leading-snug", s.key === "prospect" ? "text-slate-600" : s.key === "premium" ? "text-white" : "text-[#006FCF]")}>
                    {(s.key === "prospect" || s.key === "new")
                      ? <>未会員<br />（{s.key === "prospect" ? "Brand Consideration 低" : "Brand Consideration 高"}）</>
                      : s.label}
                  </p>
                  <p className={cn("text-xs font-normal mt-0.5", s.key === "premium" ? "text-white/80" : "text-slate-400")}>{s.sub}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {engagements.map(eng => (
              <tr key={eng.key}>
                {/* 行ヘッダー */}
                <td className="p-3 border-b border-r border-slate-200 bg-slate-50 text-center">
                  <span className={cn("text-3xl font-black leading-none", eng.color)}>{eng.label}</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">{eng.sublabel}</p>
                </td>
                {stages.map(s => {
                  const seg = getSegment(eng.key, s.key)
                  if (!seg) return <td key={s.key} className="border-b border-r border-slate-200" />
                  const isSelected = selectedCell?.eng === eng.key && selectedCell?.stage === s.key

                  const bg = stageBg[s.key]
                  return (
                    <td
                      key={s.key}
                      onClick={() => handleCellClick(eng.key, s.key)}
                      className={cn(
                        "p-4 border-b border-r border-slate-200 cursor-pointer transition-colors",
                        isSelected ? bg.cellSelected : cn(bg.cell, bg.cellHover)
                      )}
                    >
                      <div className="flex flex-col items-center justify-center gap-2 h-full">
                        <p className={cn(
                          "text-xl font-black leading-tight",
                          isSelected ? "text-white" : bg.count
                        )}>
                          {seg.count}
                        </p>
                        <AvatarGrid
                          personas={seg.personas}
                          isSelected={isSelected}
                          onPersonaClick={p => setModalPersona(p)}
                        />
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* セグメント詳細パネル */}
      {selectedSegment && selectedCell && (
        <SegmentDetailPanel
          segment={selectedSegment}
          stageLabel={selectedStageLabel}
          engKey={selectedCell.eng}
          onClose={() => setSelectedCell(null)}
          onPersonaClick={p => setModalPersona(p)}
        />
      )}

      {/* ペルソナモーダル */}
      <PersonaModal
        persona={modalPersona}
        open={!!modalPersona}
        onClose={() => setModalPersona(null)}
      />
    </div>
  )
}
