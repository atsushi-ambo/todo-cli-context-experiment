# Phase 3 実験実行ガイド

## 事前準備確認

### 1. 必要なファイルの配置
- [x] README.md（詳細仕様）
- [x] package.json（プロジェクト設定）
- [x] tsconfig.json（TypeScript設定）
- [x] .gitignore（除外設定）
- [x] .vscode/settings.json（エディタ設定）
- [x] CONTEXT.md（開発コンテクスト）
- [x] mcp-config.json（MCP設定）

### 2. VS Code設定
1. プロジェクトをVS Codeで開く
2. MCP拡張が有効になっていることを確認
3. TypeScript設定が読み込まれていることを確認

## 実験実行

### Agent Modeへの依頼プロンプト（推奨版）

```
このプロジェクトのREADME.mdに記載された仕様に従って、完全に動作するToDo管理CLIツールを実装してください。

## 利用可能なコンテクスト情報
- README.md: 詳細な技術仕様とファイル構造
- package.json: プロジェクト設定とスクリプト
- tsconfig.json: TypeScript厳密設定
- CONTEXT.md: 開発背景と品質基準
- .vscode/settings.json: 開発環境設定
- MCP: 時間情報とファイルシステムアクセス

## 要求事項
1. TypeScript strict mode完全準拠
2. ES modules使用（重要：.jsインポート必須）
3. commander.js + chalk使用
4. 指定されたディレクトリ構造の厳密な実装
5. npm install → npm run build → npm run start の完全動作

## 検証項目
- ビルドエラーなし
- 全コマンド動作確認（add/list/done/delete）
- エラーハンドリング動作確認
- データ永続化確認

開発プロセス中にエラーが発生した場合は、必ず修正してから次のステップに進んでください。
最終的に実用レベルで動作するアプリケーションの完成を目指してください。
```

### 記録すべき観察ポイント
1. **ファイル作成順序**: どのファイルから作成するか
2. **依存関係解決**: package.jsonの更新タイミング
3. **エラー検知と修正**: ビルドエラーへの対応
4. **設定ファイル活用**: tsconfig.jsonやVS Code設定の参照
5. **MCP利用**: 時間情報やファイルシステム情報の活用

### 実験後の検証
```bash
# 基本動作確認
npm install
npm run build
npm run start --help

# 機能テスト
npm run start add "テストタスク"
npm run start list
npm run start done 1
npm run start list
npm run start delete 1
npm run start list
```
