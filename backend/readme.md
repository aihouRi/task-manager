# Task Manager Backend

Go + Echo + Clean Architecture を用いて実装した、タスク管理アプリケーションのバックエンドです。

本项目は、クリーンアーキテクチャの原則に基づいた設計により、ビジネスロジックと外部フレームワークを分離し、保守性とテスト性の高い構成を目指して開発されました。

---

## 技術スタック

| カテゴリ | 使用技術 |
| :--- | :--- |
| **Language** | Go (1.21+) |
| **Framework** | [Echo](https://echo.labstack.com/) |
| **ORM** | [GORM](https://gorm.io/) |
| **Database** | MySQL 8.0 |
| **Migration** | [Goose](https://github.com/pressly/goose) |
| **Auth** | JWT (JSON Web Token) |
| **DevOps** | Docker / Docker Compose |

---

## アーキテクチャ (Clean Architecture)

レイヤー間の依存関係を整理し、単方向の依存を実現しています。


```text
internal/
 ├─ domain        // エンティティ定義（User / Task）、他レイヤに依存しない核心
 ├─ repository    // データアクセス層（GORM による DB 操作）
 ├─ usecase       // ビジネスロジック層（業務ルールをカプセル化）
 ├─ handler       // プレゼンテーション層（HTTP リクエスト/レスポンス処理）
 ├─ middleware    // JWT 認証・認可、Context への情報注入
 ├─ router        // ルーティング定義と依存関係の注入
 └─ auth          // JWT 生成・検証ロジック
```

## 主な機能

- **JWT 認証機能**
  - **ユーザー管理**: Bcrypt によるハッシュ化を用いた安全なパスワード保存とユーザー登録。
  - **認証**: ログイン時に JWT トークンを発行。
  - **検証**: カスタムミドルウェアによるトークン検証と、認証済み `userID` の Context への自動注入。
- **タスク管理 (CRUD)**
  - **フル機能**: タスクの作成、取得、更新、削除をサポート。
  - **データ隔離**: 認可ロジックにより、他のユーザーのタスクへのアクセスを防止するセキュアな設計。

---

## API エンドポイント

### 認証 (Public)
| メソッド | パス | 説明 |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | 新規ユーザー登録 |
| `POST` | `/auth/login` | ログイン（トークンとユーザー情報の返却） |

### タスク (Private - JWT 必須)
| メソッド | パス | 説明 |
| :--- | :--- | :--- |
| `GET` | `/tasks` | ログインユーザーの全タスク取得 |
| `POST` | `/tasks` | 新規タスク作成 |
| `GET` | `/tasks/:taskID` | 特定タスクの詳細取得 |
| `PUT` | `/tasks/:taskID` | タスクの更新（タイトル、ステータス等） |
| `DELETE` | `/tasks/:taskID` | タスクの削除 |

---

## セットアップ

### 1. 環境変数の設定
プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の内容を設定してください。

```env
DB_DSN="appuser:apppass@tcp(127.0.0.1:3306)/task_manager?parseTime=true"
JWT_SECRET="your-secret-key"
```
### 2. データベースの起動 (Docker)

```bash
docker compose up -d
```

### 3. マイグレーションの実行
Goose を使用してデータベースのスキーマを構築します。

```Bash
goose -dir ./migrations mysql "$DB_DSN" up
```

### 4. API サーバーの起動

```Bash
go run ./cmd/server
```