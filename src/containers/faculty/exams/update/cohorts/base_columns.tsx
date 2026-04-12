"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentUser } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const base_columns: ColumnDef<StudentUser>[] = [
  {
    accessorKey: "cohort_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cohort Name" />
    ),
  },
  {
    accessorKey: "faculty.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By Faculty" />
    ),
  },
  {
    accessorKey: "department.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Department" />;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString();
    },
  },
];
