"use client";

import { DataTablePagination } from "@/components/datatable/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Mail } from "lucide-react";
import {
  get_mapped_students_for_exam,
  map_students_to_exam,
} from "@/lib/server_api/faculty";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  exam_id: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  exam_id,
}: DataTableProps<TData, TValue>) {
  const mapped_student_exam_data = useQuery({
    queryKey: ["faculty", "exams", { exam_id }, "students"],
    queryFn: async () => {
      const response = await get_mapped_students_for_exam({ exam_id });
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch mapped students for exam");
      }
    },
  });

  useEffect(() => {
    if (mapped_student_exam_data.data) {
      setRowSelection(
        Object.fromEntries(
          Object.keys(mapped_student_exam_data.data).map((key) => [key, true])
        )
      );
    }
  }, [mapped_student_exam_data.data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => (row as any).id,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  async function handleSave() {
    toast.promise(
      () => {
        return map_students_to_exam({
          exam_id,
          student_mappings: rowSelection,
        }).then((response) => {
          if (response.status) {
            return response.message;
          }

          return new Error(response.message);
        });
      },
      {
        loading: "Mapping Students to exam...",
        success: (res) => res,
        error: (err) => err.message,
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <CardAction className="flex items-center gap-4">
            {/* <Button variant="outline">
              <Mail />
              Send Invite
            </Button> */}
            {rowSelection && Object.keys(rowSelection).length > 0 && (
              <Button onClick={handleSave}>Map Students</Button>
            )}
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="overflow-hidden rounded-md">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <DataTablePagination table={table} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
