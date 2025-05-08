# Jalali MCP Server

A simple, fast Node.js server for processing **Jalali (Persian) dates**, holidays, and special events — optimized for ModelContextProtocol (MCP) applications.

## 📦 Install

Clone the repository and install the dependencies:

```bash
git clone https://github.com/pfndesign/jalali-mcp-server.git
cd jalali-mcp-server
npm install
```

## 🚀 Run

Start the server normally:
```bash
npm start
```
Or start using ModelContextProtocol UVX server (requires Python and uv):
```bash
npm run install # to install uv and mcpo
npm run server
```

# Usage with Claude Desktop

Setup
Add this to your claude_desktop_config.json:

NPX
```json
{
  "mcpServers": {
    "jalaliCalendar": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/pfndesign/jalali-mcp-server.git"
      ]
    }
  }
}
```

# VS Code Installation Instructions

For quick installation, use one of the one-click installation buttons below:

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=memory&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22git+https://github.com/pfndesign/jalali-mcp-server.git%22%5D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=memory&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22git+https://github.com/pfndesign/jalali-mcp-server.git%22%5D%7D&quality=insiders)


For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others. 

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

#### NPX

```json
{
  "mcp": {
    "servers": {
      "memory": {
        "command": "npx",
        "args": [
          "-y",
          "git+https://github.com/pfndesign/jalali-mcp-server.git"
        ]
      }
    }
  }
}
```


## ✨ About

This project is designed for MCP-based AI systems that need fast, accurate Jalali (Persian) date processing, holiday awareness, and smart event tracking.
