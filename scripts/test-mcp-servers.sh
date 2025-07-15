#!/bin/bash

echo "🧪 Testing MCP Server Connectivity"
echo "=================================="
echo ""

echo "📡 Testing Filesystem Server:"
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | timeout 5s npx @modelcontextprotocol/server-filesystem . 2>/dev/null | head -1 && echo "✅ Filesystem server responds" || echo "❌ Filesystem server not responding"

echo ""
echo "🧠 Testing Memory Server:"
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | timeout 5s npx @modelcontextprotocol/server-memory 2>/dev/null | head -1 && echo "✅ Memory server responds" || echo "❌ Memory server not responding"

echo ""
echo "🤔 Testing Sequential Thinking Server:"
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | timeout 5s npx @modelcontextprotocol/server-sequential-thinking 2>/dev/null | head -1 && echo "✅ Sequential thinking server responds" || echo "❌ Sequential thinking server not responding"

echo ""
echo "📁 Current Configuration Files:"
echo "- .vscode/mcp.json: $(test -f .vscode/mcp.json && echo "✅" || echo "❌")"
echo "- .vscode/settings.json: $(test -f .vscode/settings.json && echo "✅" || echo "❌")"
echo "- mcp.json: $(test -f mcp.json && echo "✅" || echo "❌")"

echo ""
echo "🚀 Next Steps:"
echo "1. Restart VS Code completely (Cmd+Q, then reopen)"
echo "2. Open Command Palette (Cmd+Shift+P)"
echo "3. Look for these commands:"
echo "   - 'GitHub Copilot: Reset Configuration'"
echo "   - 'Developer: Restart Extension Host'"
echo "4. Try Copilot Chat again"
