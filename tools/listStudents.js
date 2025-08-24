import fs from "fs";

export default function registerListStudents(server) {
  server.registerTool(
    "list_students",
    {
      title: "Get student list",
      description: "Return all students with remaining leave balance.",
      inputSchema: {}, // no inputs
    },
    async () => {
      const data = JSON.parse(fs.readFileSync("./data/mock-data.json", "utf-8"));
      return {
        content: [{ type: "text", text: JSON.stringify(data.students, null, 2) }],
      };
    }
  );
}
