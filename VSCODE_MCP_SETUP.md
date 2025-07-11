# VS Code MCP Setup Instructions

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

### VS CodeでのMCP設定確認手順

1. **コマンドパレットを開く**: `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows/Linux)

2. **MCPコマンドを確認**:
   - `MCP: Show Server List` - サーバー一覧を表示
   - `MCP: Reload Servers` - サーバーを再読み込み
   - `MCP: Enable/Disable Server` - サーバーの有効/無効切り替え

3. **設定の確認**:
   - `Preferences: Open Settings (JSON)` で設定ファイルを開く
   - MCPの設定が正しく記載されているか確認

### 正しい設定例

#### ユーザー設定 (`settings.json`)
```json
{
  "mcp.enabled": true,
  "mcp.servers": {
    "todo-cli": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/Users/usr0200783/atsushi/personal/github/todo-cli-context-experiment",
      "enabled": true,
      "autoStart": true
    }
  }
}
```

#### ワークスペース設定 (`.vscode/settings.json`)
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

## トラブルシューティング

### サーバーが表示されない場合

1. **VS Codeを再起動**
2. **拡張機能の確認**: GitHub Copilotが有効になっているか確認
3. **設定ファイルの確認**: JSONの構文エラーがないか確認
4. **パスの確認**: `cwd`パスが正しいか確認
5. **ビルドの確認**: `npm run build`が成功しているか確認

### エラーメッセージの確認方法

1. **開発者ツールを開く**: `Help > Toggle Developer Tools`
2. **コンソールタブ**でエラーメッセージを確認
3. **出力パネル**（`View > Output`）でMCP関連のログを確認

### 手動テスト

サーバーが正常に動作するか、ターミナルで直接テスト：

```bash
# プロジェクトをビルド
npm run build

# サーバーをテスト
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | node dist/index.js
```

成功すると、初期化レスポンスが返ります。

## 使用方法

MCPサーバーが正常に設定されると、GitHub CopilotがToDo管理機能を使用できるようになります：

- チャットで「新しいタスクを追加して」と依頼
- 「現在のタスク一覧を表示して」と依頼
- 「タスクを完了にして」と依頼

MCPサーバーが自動的にタスク管理を処理します。
