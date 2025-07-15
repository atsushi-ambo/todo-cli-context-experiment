# ToDo管理CLIツール開発実験 (MCP Server)

このプロジェクトは、コンテクストエンジニアリングの実験として、VS Code Agent ModeとMCP (Model Context Protocol) サーバーを使用してToDo管理CLIツールを開発するものです。

## プロジェクト概要
TypeScript製のToDo管理MCPサーバー

## セットアップ方法

1. 依存関係のインストール:
```bash
npm install
```

2. プロジェクトのビルド:
```bash
npm run build
```

3. MCPサーバーの起動:
```bash
npm run mcp
```

## MCP設定

このプロジェクトはMCPサーバーとして動作します。`mcp.json`ファイルには以下の開発特化型サーバーが設定されています：

### 実験対象サーバー
- **todo-cli**: メインのToDo管理MCPサーバー（実験の主要対象）

### 開発支援サーバー
- **filesystem**: プロジェクト構造とファイルへの安全なアクセス
- **brave-search**: TypeScript/CLI例とドキュメント検索
- **puppeteer**: ブラウザ自動化によるテストとドキュメント取得
- **everything**: MCP プロトコル全機能のリファレンス実装

### 認知支援サーバー
- **memory**: セッション間での開発コンテクスト永続化
- **sequential-thinking**: 複雑な開発タスクの構造化問題解決
- **inspector**: MCP プロトコルデバッグとトラブルシューティング

## 利用可能なツール

MCPサーバーは以下のツールを提供します：

- `add_todo`: 新しいタスクを追加
- `list_todos`: タスクの一覧表示（フィルタリング可能）
- `complete_todo`: タスクを完了状態にマーク
- `delete_todo`: タスクを削除
- `update_todo`: タスクの更新

## データ形式

タスクは`todos.json`ファイルに以下の形式で保存されます：

```json
{
  "id": "unique_id",
  "title": "タスクのタイトル",
  "description": "タスクの説明（オプション）",
  "completed": false,
  "createdAt": "ISO日時",
  "updatedAt": "ISO日時",
  "priority": "low|medium|high"
}
```

## 技術制約
- Node.js 18+ 対応
- TypeScript 5.x 使用
- 外部依存は最小限（commander.js, chalk程度）
- ES modules 使用
- package.json には scripts設定も含める
- 実際にnpm run buildで動作すること

## 機能要件
- タスク追加（add <task>）
- タスク一覧表示（list）
- タスク完了マーク（done <id>）
- タスク削除（delete <id>）
- データはJSONファイルで永続化（./todos.json）
- IDは自動採番

## コード品質要求
- TypeScript strict mode 有効
- 適切な型定義とインターフェース
- エラーハンドリング実装（ファイル操作、不正な引数など）
- ユーザーフレンドリーなメッセージ（成功・エラー時）
- コマンドヘルプの充実（--help）
- カラフルな出力（chalk使用）

## プロジェクト構造
```
todo-cli-context-experiment/
├── src/                      # ソースコード
│   └── index.ts             # MCPサーバーエントリーポイント
├── dist/                    # ビルド出力 (gitignore)
├── docs/                    # ドキュメント
│   ├── CONTEXT.md          # 開発コンテクストと品質基準
│   ├── EXPERIMENT.md       # 実験実行ガイド
│   └── MCP_SETUP.md        # MCP設定・テスト手順
├── scripts/                 # ユーティリティスクリプト
│   ├── mcp-troubleshoot.sh # MCP診断ツール
│   └── test-mcp-servers.sh # MCPサーバー接続テスト
├── .vscode/                 # VS Code設定
│   ├── mcp.json           # MCP開発支援サーバー設定
│   └── settings.json      # エディタ設定
├── node_modules/           # 依存関係 (gitignore)
├── .gitignore             # Git除外設定
├── package.json           # プロジェクト設定
├── package-lock.json      # 依存関係ロック
├── tsconfig.json          # TypeScript設定
├── todo-cli.code-workspace # VS Codeワークスペース
├── todos.json             # ToDoデータストレージ
└── README.md              # プロジェクト概要（このファイル）
```

## データ型定義
```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

interface TodoStorage {
  todos: Todo[];
  nextId: number;
}
```

## 実装パターン
- コマンドパターンの使用
- 各コマンドは独立したモジュール
- 共通のストレージユーティリティ
- 一貫したエラーハンドリング

## 期待する使用例
```bash
npm install
npm run build
npm run start add "買い物に行く"
npm run start list
npm run start done 1
npm run start delete 1
```

## 実験の目的
VS Code Agent Modeが、豊富なコンテクスト情報（README、package.json、tsconfig.json、MCP開発支援サーバー群）を活用して、どの程度完成度の高いアプリケーションを生成できるかを検証する。

### コンテクストエンジニアリングの検証項目
1. **静的コンテクスト**: プロジェクトファイル（README、設定ファイル等）の活用度
2. **動的コンテクスト**: MCP検索・ブラウザ自動化による即座の情報収集
3. **認知支援**: memory・sequential-thinking による開発プロセス向上
4. **品質保証**: inspector・everything による動作検証と問題解決
