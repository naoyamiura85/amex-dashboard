# YAPPI リファクタリング計画

## 現状の問題点

### 1. パフォーマンス問題
- **lazy() importの不適切な使用**: 各ページでReact.lazyを使用しているが、named exportとの相性が悪くエラーを引き起こしている
- **重複するボイラープレート**: 全ページで同じSidebarProvider/DashboardSidebar/DashboardHeaderパターンを繰り返し
- **コンポーネントの肥大化**: 一部のコンテンツコンポーネントが200行以上

### 2. 構造の問題
- **ページ数の過多**: 38ページ（探索8ページ、チャネル6ページ、ソリューション8ページ等）
- **機能の重複**: 探索ページとAI機能で類似機能が分散
- **ナビゲーションの複雑さ**: サイドバーに20+項目

### 3. コードの問題
- **lazy import問題**: named exportをlazy()でインポートする際のエラー
- **一貫性のないパターン**: ページによってレイアウト構造が異なる

---

## リファクタリング計画

### Phase 1: 即時修正（エラー解消）

#### 1.1 lazy importの修正
**問題**: `lazy(() => import(...).then(m => ({ default: m.NamedExport })))` パターンが不安定

**解決策**: 直接importに変更
```tsx
// Before (問題あり)
const Content = lazy(() => import("...").then(m => ({ default: m.AICorrelationsContent })))

// After (安定)
import { AICorrelationsContent } from "@/components/dashboard/ai-correlations-content"
```

**対象ファイル**:
- app/ai/correlations/page.tsx
- app/ai/predictions/page.tsx
- app/ai/competitors/page.tsx
- app/ai/concept-generator/page.tsx
- app/ai/materials/page.tsx
- app/ai/simulator/page.tsx
- app/insights/explorer/page.tsx
- app/reports/page.tsx

### Phase 2: 構造最適化

#### 2.1 共通レイアウトの抽出
**作成**: `app/(dashboard)/layout.tsx` - 共通レイアウトコンポーネント

```tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
      <YappiChat />
    </SidebarProvider>
  )
}
```

#### 2.2 ページの統合・削減

| 削除対象 | 統合先 | 理由 |
|----------|--------|------|
| /explore/moments | /insights/explorer | 使用頻度低い |
| /explore/popularity | /insights/explorer | AI機能に統合 |
| /explore/demographics | /insights/explorer | AI機能に統合 |
| /explore/regions | /insights/explorer | AI機能に統合 |
| /solutions/ai-survey | /ai/concept-generator | 機能重複 |
| /solutions/persona-generator | /ai/concept-generator | 機能重複 |
| /solutions/target-strategy | /ai/concept-generator | 機能重複 |

**結果**: 38ページ → 25ページ

#### 2.3 ナビゲーションの簡素化

**新構造**:
```
ダッシュボード
  └─ トレンド一覧
  └─ トレンド詳細

AI分析 [NEW]
  └─ 相関発見
  └─ トレンド予測
  └─ 競合分析

商品開発支援 [NEW]
  └─ コンセプト生成
  └─ 素材データベース
  └─ 改定シミュレーター

インサイト
  └─ 統合エクスプローラー
  └─ チャネル分析

レポート [NEW]
  └─ 自動生成
  └─ ドライブ
```

**結果**: 20+項目 → 12項目

### Phase 3: パフォーマンス最適化

#### 3.1 コンポーネント分割
- 200行以上のコンポーネントを分割
- 再利用可能な小さなコンポーネントに

#### 3.2 データフェッチングの最適化
- SWRの適切な使用
- プリフェッチの活用

#### 3.3 バンドルサイズの削減
- 不要なページ・コンポーネントの削除
- dynamic importの適切な使用

---

## 実装優先順位

1. **即時**: Phase 1 - lazy importエラーの修正
2. **短期**: Phase 2.1 - 共通レイアウトの抽出
3. **中期**: Phase 2.2-2.3 - ページ統合・ナビ簡素化
4. **長期**: Phase 3 - パフォーマンス最適化

---

## 期待される効果

| 指標 | Before | After | 改善 |
|------|--------|-------|------|
| ページ数 | 38 | 25 | -34% |
| ナビ項目 | 20+ | 12 | -40% |
| エラー | 複数 | 0 | 100%解消 |
| 初回ロード | 遅い | 高速 | 改善 |
| コード重複 | 多い | 最小 | 改善 |
