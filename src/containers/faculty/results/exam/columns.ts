import { StudentExamResult } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StudentExamResult>[] = [
  {
    accessorKey: "student_user.id",
    header: "Student ID",
  },
  {
    accessorKey: "student_user.name",
    header: "Student Name",
  },
  {
    accessorKey: "exam.id",
    header: "Exam ID",
  },
  {
    accessorKey: "exam.name",
    header: "Exam Name",
  },
  {
    accessorKey: "obtained_score",
    header: "Obtained Score",
  },
  {
    accessorKey: "total_score",
    header: "Total Score",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ getValue }) => {
      const result = getValue<number>();
      return result === 1 ? "Pass" : "Fail";
    },
  },
  {
    accessorKey: "created_at",
    header: "Submitted At",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString();
    },
  },
];
