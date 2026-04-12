"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Cohort } from "@/types/exam";
import { ColumnDef } from "@tanstack/react-table";
import DeleteModal from "./DeleteModal";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

export const Columns: ColumnDef<Cohort>[] = [
  {
    accessorKey: "cohort_name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Cohort Name" />;
    },
  },
  {
    accessorKey: "faculty.name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Created By Faculty" />
      );
    },
  },
  {
    accessorKey: "department.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Department" />;
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
          <Button variant="ghost" className="text-primary">
            <Link href={`/faculty/cohorts/${type.id}`}>
              <Edit />
            </Link>
          </Button>
          <DeleteModal variant="icon" cohort_id={type.id} />
        </div>
      );
    },
  },
];
