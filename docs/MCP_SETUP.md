# MCP Setup and Testing Guide

## 必要な拡張機能

VS CodeでMCPサーバーを使用するためには、MCP対応の拡張機能が必要です。

### 推奨拡張機能

1. **GitHub Copilot** (必須)
   - Extension ID: `GitHub.copilot`
   - MCPサポートが含まれています

2. **MCP Inspector** (デバッグ用)
   - Extension ID: `modelcontextprotocol.mcp-inspector`
   - MCPサーバーのデバッグに役立ちます

### インストール方法

1. VS Codeを開く
2. 拡張機能パネル（Ctrl+Shift+X / Cmd+Shift+X）を開く
3. 上記の拡張機能を検索してインストール

## MCP設定

### ワークスペースを開く
```bash
code todo-cli.code-workspace
```

### 設定ファイルの確認

#### `.vscode/settings.json`
```json
{
  "mcp.enabled": true,
  "mcp.servers": {
    "todo-cli": {
      "enabled": true,
      "autoStart": true,
      "priority": "high"
    }
  }
}
```

#### `.vscode/mcp.json` - 開発支援サーバー群
```json
{
  "mcpServers": {
    "todo-cli": {
      "command": "node", 
      "args": ["dist/index.js"],
      "description": "Todo CLI MCP server - 実験対象"
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "--allowed-directories", ".", "../../"],
      "description": "プロジェクト構造アクセス"
    },
    "brave-search": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "description": "TypeScript/CLI ドキュメント検索"
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"], 
      "description": "ブラウザ自動化"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "セッション間コンテクスト保持"
    },
    "sequential-thinking": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "description": "構造化問題解決"
    },
    "inspector": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/inspector"],
      "description": "MCP デバッグツール"
    }
  }
}
```

## VS CodeでのMCP設定確認手順

1. **コマンドパレットを開く**: `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows/Linux)

2. **MCPコマンドを確認**:
   - `MCP: Show Server List` - サーバー一覧を表示
   - `MCP: Reload Servers` - サーバーを再読み込み
   - `MCP: Enable/Disable Server` - サーバーの有効/無効切り替え

3. **設定の確認**:
   - `Preferences: Open Settings (JSON)` で設定ファイルを開く
   - MCPの設定が正しく記載されているか確認

## 手動テスト

### ビルド
```bash
npm run build
```

### 初期化テスト
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"roots":{"listChanged":true},"sampling":{}},"clientInfo":{"name":"test","version":"1.0"}}}' | node dist/index.js
```

### ツール一覧取得テスト
```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | node dist/index.js
```

### 利用可能なツール

- `add_todo`: タスクの追加
- `list_todos`: タスクの一覧表示
- `complete_todo`: タスクの完了
- `delete_todo`: タスクの削除
- `update_todo`: タスクの更新

## トラブルシューティング

詳細な診断については、scriptsディレクトリのツールを使用してください：
```bash
# MCP診断ツール
bash scripts/mcp-troubleshoot.sh

# サーバー接続テスト
bash scripts/test-mcp-servers.sh
```

### サーバーが表示されない場合

1. **VS Codeを再起動**
2. **拡張機能の確認**: GitHub Copilotが有効になっているか確認
3. **設定ファイルの確認**: JSONの構文エラーがないか確認
4. **パスの確認**: `cwd`パスが正しいか確認
5. **ビルドの確認**: `npm run build`が成功しているか確認
6. **コマンドパレット**: `MCP: Reload Servers` を実行
7. **サーバー一覧確認**: `MCP: Show Server List` でサーバー一覧を確認

### サーバーが起動しない場合

1. `npm run build` でビルドエラーがないか確認
2. `node dist/index.js` で直接実行してエラーを確認
3. パスが正しいか確認

### エラーメッセージの確認方法

1. **開発者ツールを開く**: `Help > Toggle Developer Tools`
2. **コンソールタブ**でエラーメッセージを確認
3. **出力パネル**（`View > Output`）でMCP関連のログを確認

## 使用例

### タスクの追加
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "add_todo",
    "arguments": {
      "title": "プロジェクトの完成",
      "description": "MCPサーバーとVS Codeの統合を完了する",
      "priority": "high"
    }
  }
}
```

### タスクの一覧表示
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "list_todos",
    "arguments": {
      "filter": "all"
    }
  }
}
```

## 使用方法

MCPサーバーが正常に設定されると、GitHub CopilotがToDo管理機能を使用できるようになります：

- チャットで「新しいタスクを追加して」と依頼
- 「現在のタスク一覧を表示して」と依頼
- 「タスクを完了にして」と依頼

MCPサーバーが自動的にタスク管理を処理します。