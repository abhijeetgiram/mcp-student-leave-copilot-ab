import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Import tools
import registerListStudents from "./tools/listStudents.js";
import registerGetStudentDetails from "./tools/getStudentDetails.js";
import registerApproveLeave from "./tools/approveLeave.js";

// --- MCP server setup ---
const server = new McpServer({
  name: "mcp-student-leave-copilot-ab",
  version: "1.0.0"
});

// Register tools
registerListStudents(server);
registerGetStudentDetails(server);
registerApproveLeave(server);

// --- Connect over stdio (for local clients like Copilot MCP) ---
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Student Leave MCP server (stdio) and Github Copilot agent ready!");
