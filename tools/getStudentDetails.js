import fs from "fs";
import { z } from "zod";

export default function registerGetStudentDetails(server) {
  server.registerTool(
    "get_student_details",
    {
      title: "Get student details by ID",
      description: "Return one student and their leave requests.",
      inputSchema: { id: z.string().min(1).describe("Student ID, e.g. S001") },
    },
    async ({ id }) => {
      const data = JSON.parse(fs.readFileSync("./data/mock-data.json", "utf-8"));

      const student = data.students.find((s) => s.id === id);
      if (!student) {
        return { content: [{ type: "text", text: `Student ${id} not found` }] };
      }

      const studentLeaves = data.leaves.filter((l) => l.studentId === id);
      return {
        content: [
          { type: "text", text: JSON.stringify({ ...student, leaves: studentLeaves }, null, 2) }
        ]
      };
    }
  );
}
