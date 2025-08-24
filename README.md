# Student Leave MCP App With Github Copilot Agent

## mcp-student-leave-copilot-ab (<domain>-student-leave-<client>-ab)

A lightweight MCP server in Node.js, integrated with Github Copilot, to manage student leave requests and approvals.

## Getting Started

### Create a project

> mkdir mcp-student-leave-copilot-ab

> cd mcp-student-leave-copilot-ab

> npm init -y

> npm i @modelcontextprotocol/sdk zod

> node server.js

Student Leave MCP server (stdio) and Github Copilot agent ready!

### Create server.js

### Add npm scripts (optional)

```
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

### Wire it up in Github Copilot (VS Code)

Github Copilot looks for MCP servers in its settings.json

```
"mcpServers": {
  "mcp-student-leave-copilot-ab": {
    "command": "node",
    "args": [
      "/Users/abhijeetgiram/Workspace/Personal/mcp-student-leave-copilot-ab/server.js"
    ],
    "alwaysAllow": [
      "list_students",
      "get_student_details",
      "approve_leave"
    ],
    "disabled": false
  }
}
```

### Use it from Github Copilot

In a Github Copilot chat, just ask things like:

- “Show me the student list.” → Github Copilot calls list_students

- “Get details of E002.” → Github Copilot calls get_student_details with { id: "S002" }

- “Approve leave L1002 for E002.” → Github Copilot calls approve_leave with { studentId: "S002", leaveId: "L2002" }

## Model Context Protocol (MCP)

- It’s a new open standard by Anthropic that defines how AI models, tools, and apps can talk to each other.

- Think of it like a “plugin protocol” for AI assistants.

- MCP Server = Your code (like the student leave manager we built).

- MCP Client = Something that talks to the server (Github Copilot, Cline, Claude, or any AI agent).

- They communicate over:

  - stdio (local processes, great for Github Copilot in VS Code)
  - or HTTP/WebSocket (remote deployment, so web apps / React can call it).

- MCP turns your Node.js script into a “tool plugin” for AI assistants.

# Mock data

{
"students": [
{ "id": "S001", "name": "Rahul Sharma", "class": "10A", "leaveBalance": 12 },
{ "id": "S002", "name": "Priya Desai", "class": "9B", "leaveBalance": 15 },
{ "id": "S003", "name": "Ananya Gupta", "class": "11C", "leaveBalance": 10 }
],
"leaves": [
{ "id": "L2001", "studentId": "S001", "from": "2025-09-01", "to": "2025-09-02", "days": 2, "status": "pending" },
{ "id": "L2002", "studentId": "S002", "from": "2025-09-05", "to": "2025-09-07", "days": 3, "status": "pending" }
]
}

## Miscellaneous

> pwd

`/Users/abhijeetgiram/Workspace/Personal/mcp-student-leave-copilot-ab`
