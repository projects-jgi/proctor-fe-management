"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { ExamType } from "@/types/exam";
import { ColumnDef } from "@tanstack/react-table";
import AddType from "./AddType";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteType } from "./DeleteType";

export const columns: ColumnDef<ExamType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
  },
  {
    accessorKey: "is_private",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Visibility" />;
    },
    cell: ({ getValue }) => {
      const isPrivate = getValue<boolean>();
      if (isPrivate) {
        return <Badge variant="secondary">Private</Badge>;
      }

      return <Badge variant="default">Public</Badge>;
    },
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue<boolean>(columnId);
      const search = String(filterValue).toLowerCase().trim();

      if (search === "") return true; // show all

      if (search.startsWith("pr")) return value == true;
      if (search.startsWith("pu")) return value == false;
      else return false;
    },
  },
  {
    accessorKey: "faculty.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Faculty" />;
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
          {/* <UpdateType defaultValues={type} /> */}
          <AddType defaultValues={type} update_id={type.id}>
            <Button variant="ghost" className="text-primary">
              <Edit />
            </Button>
          </AddType>
          <DeleteType exam_type_id={type.id} />
        </div>
      );
    },
  },
];
