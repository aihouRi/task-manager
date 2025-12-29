# Task Manager Frontend

React + TypeScript + MUI を用いて実装した、タスク管理アプリケーションのフロントエンドです。  
JWT 認証を前提としたログイン / ユーザー登録 / タスク CRUD 機能を備えた実運用を想定した構成になっています。

---

## 技術スタック

- React
- TypeScript
- Vite
- Material UI (MUI)
- Axios
- React Router

---

## 主な機能

### 認証関連
- ユーザー登録
- ログイン
- JWT トークン管理（localStorage）
- 未認証時のルートガード
- ログアウト機能

### タスク管理
- タスク一覧表示（Table レイアウト）
- タスク作成
- タスク編集（タイトル / 説明）
- タスク削除（確認ダイアログ付き）
- タスク完了状態の切り替え（即時反映 + 失敗時ロールバック）

### UI / UX
- Dashboard レイアウト
- Dialog を用いた Create / Edit の共通 UI
- Optimistic UI によるスムーズな操作感
- 空状態（タスク未登録時）の表示

---

## 画面構成

- `/login`  
  ログイン画面

- `/register`  
  ユーザー登録画面

- `/tasks`  
  タスク一覧・管理画面（認証必須）

---

## 環境変数

`.env` ファイルをプロジェクトルートに作成してください。

```
VITE_API_BASE_URL=http://localhost:8080
```
---

## 起動方法
```Bash
npm install
npm run dev
```

ブラウザで以下にアクセスします。
```Bash
http://localhost:5173
```