# MCP Server Testing Guide

## VS CodeでのMCP設定

### 1. ワークスペースを開く
```bash
code todo-cli.code-workspace
```

### 2. MCP設定の確認
以下のファイルを確認してください：

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

#### `mcp.json`
```json
{
  "mcpServers": {
    "todo-cli": {
      "command": "node",
      "args": ["dist/index.js"],
      "description": "Todo CLI MCP server for managing tasks",
      "cwd": "/Users/usr0200783/atsushi/personal/github/todo-cli-context-experiment"
    }
  }
}
```

### 3. サーバーの手動テスト

#### ビルド
```bash
npm run build
```

#### 初期化テスト
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"roots":{"listChanged":true},"sampling":{}},"clientInfo":{"name":"test","version":"1.0"}}}' | node dist/index.js
```

#### ツール一覧取得テスト
```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | node dist/index.js
```

### 4. 利用可能なツール

- `add_todo`: タスクの追加
- `list_todos`: タスクの一覧表示
- `complete_todo`: タスクの完了
- `delete_todo`: タスクの削除
- `update_todo`: タスクの更新

### 5. トラブルシューティング

#### サーバーが表示されない場合
1. VS Codeを再起動
2. コマンドパレット（Cmd+Shift+P）で "MCP: Reload Servers" を実行
3. "MCP: Show Server List" でサーバー一覧を確認

#### サーバーが起動しない場合
1. `npm run build` でビルドエラーがないか確認
2. `node dist/index.js` で直接実行してエラーを確認
3. パスが正しいか確認

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
