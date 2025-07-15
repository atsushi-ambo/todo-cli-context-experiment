#!/bin/bash

echo "🔧 MCP Troubleshooting for VS Code"
echo "=================================="
echo ""

echo "📋 Current Configuration Status:"
echo "- MCP Config (User): $(test -f ~/Library/Application\ Support/Code/User/mcp.json && echo "✅ Present" || echo "❌ Missing")"
echo "- MCP Config (Project): $(test -f ./mcp.json && echo "✅ Present" || echo "❌ Missing")"
echo "- VS Code Settings: $(test -f ~/Library/Application\ Support/Code/User/settings.json && echo "✅ Present" || echo "❌ Missing")"
echo ""

echo "🔍 MCP Server Installation Check:"
for server in "@modelcontextprotocol/server-filesystem" "@modelcontextprotocol/server-memory" "@modelcontextprotocol/server-sequential-thinking" "mcp-smart-crawler" "@modelcontextprotocol/inspector"; do
    if npm list -g "$server" >/dev/null 2>&1; then
        echo "✅ $server: Installed"
    else
        echo "❌ $server: Not installed"
    fi
done
echo ""

echo "🚀 Troubleshooting Steps:"
echo "1. Restart VS Code completely"
echo "2. Open Command Palette (Cmd+Shift+P)"
echo "3. Run: 'Developer: Reload Window'"
echo "4. Check Extensions: Ensure GitHub Copilot is enabled"
echo "5. Open Copilot Chat and ask: 'What MCP servers are available?'"
echo ""

echo "🛠️ Manual MCP Configuration Update:"
echo "If servers still don't appear, try updating VS Code settings:"
echo ""
echo "Add to VS Code User Settings (Cmd+Shift+P → 'Preferences: Open Settings (JSON)'):"
cat << 'SETTINGS'
{
  "github.copilot.chat.mcp.enabled": true,
  "chat.mcp.enabled": true,
  "chat.mcp.serverSampling": {
    "filesystem": true,
    "memory": true,
    "sequential-thinking": true
  }
}
SETTINGS
echo ""

echo "🔄 Alternative: Try these VS Code commands:"
echo "1. 'MCP: Restart Servers'"
echo "2. 'MCP: Show Server Status'"
echo "3. 'Developer: Restart Extension Host'"
echo ""

echo "📊 Quick Test:"
echo "Open GitHub Copilot Chat and try these queries:"
echo "- 'List available MCP servers'"
echo "- 'What tools can you access?'"
echo "- 'Analyze this project structure'"
