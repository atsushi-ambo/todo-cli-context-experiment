# Phase 3 実験実行ガイド

## 事前準備確認

### 1. 必要なファイルの配置
- [x] README.md（詳細仕様）
- [x] package.json（プロジェクト設定）
- [x] tsconfig.json（TypeScript設定）
- [x] .gitignore（除外設定）
- [x] .vscode/settings.json（エディタ設定）
- [x] CONTEXT.md（開発コンテクスト）
- [x] mcp.json（MCP開発支援サーバー設定）

### 2. VS Code設定
1. プロジェクトをVS Codeで開く
2. MCP拡張が有効になっていることを確認
3. TypeScript設定が読み込まれていることを確認

## 実験実行

### Agent Modeへの依頼プロンプト（推奨版）

```
このプロジェクトのREADME.mdに記載された仕様に従って、完全に動作するToDo管理CLIツールを実装してください。

## 利用可能なコンテクスト情報

### 静的コンテクスト
- README.md: 詳細な技術仕様とファイル構造
- package.json: プロジェクト設定とスクリプト
- tsconfig.json: TypeScript厳密設定
- CONTEXT.md: 開発背景と品質基準
- .vscode/settings.json: 開発環境設定

### 動的コンテクスト（MCP開発支援）
- filesystem: プロジェクト構造とファイルアクセス
- brave-search: TypeScript/CLI関連ドキュメント検索
- puppeteer: ブラウザ自動化による情報収集
- everything: MCP機能リファレンス
- memory: セッション間コンテクスト保持
- sequential-thinking: 構造化問題解決
- inspector: リアルタイムデバッグ

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

#### 基本開発プロセス
1. **ファイル作成順序**: どのファイルから作成するか
2. **依存関係解決**: package.jsonの更新タイミング
3. **エラー検知と修正**: ビルドエラーへの対応
4. **設定ファイル活用**: tsconfig.jsonやVS Code設定の参照

#### MCP開発支援活用度
5. **filesystem利用**: プロジェクト構造の理解度
6. **brave-search活用**: 外部ドキュメント検索の頻度・精度
7. **puppeteer使用**: ブラウザ自動化による情報収集
8. **memory機能**: セッション間でのコンテクスト保持
9. **sequential-thinking**: 複雑タスクの構造化分解
10. **inspector活用**: 問題解決・デバッグプロセス

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
