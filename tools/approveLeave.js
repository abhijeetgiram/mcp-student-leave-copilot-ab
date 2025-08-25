import fs from "fs";
import { z } from "zod";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function registerApproveLeave(server) {
  server.registerTool(
    "approve_leave",
    {
      title: "Approve leave",
      description: "Approve a pending leave and update balance.",
      inputSchema: {
        studentId: z.string().min(1),
        leaveId: z.string().min(1)
      }
    },
    async ({ studentId, leaveId }) => {
      const file = path.join(__dirname, "../data/mock-data.json");
      const data = JSON.parse(fs.readFileSync(file, "utf-8"));

      const student = data.students.find((s) => s.id === studentId);
      if (!student) {
        return { content: [{ type: "text", text: `Student ${studentId} not found` }] };
      }

      const leave = data.leaves.find((l) => l.id === leaveId && l.studentId === studentId);
      if (!leave) {
        return { content: [{ type: "text", text: `Leave ${leaveId} for ${studentId} not found` }] };
      }

      if (leave.status === "approved") {
        return { content: [{ type: "text", text: `Leave ${leaveId} already approved` }] };
      }

      if (student.leaveBalance < leave.days) {
        return { content: [{ type: "text", text: `Insufficient leave balance` }] };
      }

      // Update data
      leave.status = "approved";
      student.leaveBalance -= leave.days;

      fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");

      return {
        content: [
          { type: "text", text: JSON.stringify({ message: "approved", leave, student }, null, 2) }
        ]
      };
    }
  );
}
