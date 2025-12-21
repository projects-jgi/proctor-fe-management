"use client";

import { DataTablePagination } from "@/components/datatable/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection: Record<string, boolean>;
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowSelection,
  setRowSelection,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  return (
    <Card>
      <CardContent>
        <div>
          <div className="flex items-center justify-end mb-4">
            <Input
              placeholder="Filter Questions..."
              value={
                (table
                  .getColumn("question_text")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("question_text")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="overflow-hidden rounded-md">
            <Table>
              <TableHeader className="bg-secondary">
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
                  <TableRow key={row.id} className="border-b border-secondary">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="max-w-[200px] whitespace-normal"
                      >
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
          <div className="p-2 border-t border-secondary">
            <DataTablePagination table={table} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
