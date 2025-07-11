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

このプロジェクトはMCPサーバーとして動作します。`mcp.json`ファイルには以下の設定があります：

- **todo-cli**: メインのToDo管理MCPサーバー
- **filesystem**: ファイルシステムアクセス用
- **memory**: 永続的メモリ機能
- **sequential-thinking**: 構造化された問題解決機能
- **smart-crawler**: Webコンテンツ抽出
- **inspector**: MCP プロトコルデバッグツール

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

## 期待するファイル構造
```
project-root/
├── src/
│   ├── index.ts (エントリーポイント)
│   ├── commands/
│   │   ├── add.ts
│   │   ├── list.ts
│   │   ├── done.ts
│   │   └── delete.ts
│   ├── types/
│   │   └── todo.ts
│   └── utils/
│       └── storage.ts
├── dist/                 # ビルド出力
├── package.json
├── tsconfig.json
└── README.md
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
VS Code Agent Modeが、このREADMEとpackage.json、tsconfig.jsonの情報を活用して、どの程度完成度の高いアプリケーションを生成できるかを検証する。
