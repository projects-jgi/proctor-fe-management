"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exam } from "@/types/exam";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteExam } from "./DeleteExam";

export const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Exam Name" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      if (status) {
        return <Badge variant="default">Published</Badge>;
      }

      return <Badge variant="warning">Draft</Badge>;
    },
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue<boolean>(columnId);
      const search = String(filterValue).toLowerCase().trim();

      if (search === "") return true; // show all

      if (search.includes("pu")) return value == true;
      if (search.includes("dr")) return value == false;
      else return false;
    },
  },
  {
    accessorKey: "duration_in_minutes",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Duration (Minutes)" />
      );
    },
  },
  {
    accessorKey: "start_time",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Start Time" />;
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "end_time",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="End Time" />;
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => {
      const type = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/faculty/exams/${type.id}`}>
            <Button variant="outline">
              <Edit />
            </Button>
          </Link>
          <DeleteExam exam_id={type.id} />
        </div>
      );
    },
  },
];
