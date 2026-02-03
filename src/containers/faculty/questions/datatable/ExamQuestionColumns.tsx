"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExamQuestion } from "@/types/exam";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

export const ExamQuestionColumns: ColumnDef<ExamQuestion>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "question_text",
    header: "Question Text",
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score" />
    ),
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => {
      return (
        <Button asChild variant={"ghost"} className="text-primary">
          <Link
            href={`/faculty/questions/${row.original.exam_type_id}/edit/${row.original.id}`}
          >
            <Edit />
          </Link>
        </Button>
      );
    },
  },
];
