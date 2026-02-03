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
import { useEffect, useState } from "react";
import { Edit, Eye, Mail } from "lucide-react";
import { map_students_to_exam } from "@/lib/server_api/faculty";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base_columns } from "./base_columns";
import { Toggle } from "@/components/ui/toggle";
import { edit_columns } from "./edit_columns";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<TData, TValue> {
  data: TData[];
  mapped_student_exam_data: TData[];
  exam_id: number;
}

export function DataTable<TData, TValue>({
  data,
  mapped_student_exam_data,
  exam_id,
}: DataTableProps<TData, TValue>) {
  const queryClient = useQueryClient();
  const [currentColumns, setCurrentColumns] = useState<ColumnDef<TData, any>[]>(
    base_columns as ColumnDef<TData, any>[],
  );
  const [currentData, setCurrentData] = useState(data);
  const [tableType, setTableType] = useState<"view" | "edit">("view");

  useEffect(() => {
    if (tableType === "edit") {
      setCurrentColumns([...edit_columns, ...base_columns] as ColumnDef<
        TData,
        any
      >[]);
      setCurrentData(data);
    } else {
      setCurrentColumns(base_columns as ColumnDef<TData, any>[]);
      setCurrentData(
        Object.values(mapped_student_exam_data).map(
          (student: any) => student.student,
        ),
      );
      // setCurrentData(data);
    }
  }, [tableType]);

  useEffect(() => {
    if (mapped_student_exam_data) {
      setRowSelection(
        Object.fromEntries(
          Object.keys(mapped_student_exam_data).map((key) => [key, true]),
        ),
      );
    }
  }, [mapped_student_exam_data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data: currentData,
    columns: currentColumns,
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
            queryClient.invalidateQueries({
              queryKey: ["faculty", "exams", { exam_id }, "students"],
            });
            return response.message;
          }

          return new Error(response.message);
        });
      },
      {
        loading: "Mapping Students to exam...",
        success: (res) => res,
        error: (err) => err.message,
      },
    );
  }

  function toggleTableType() {
    setTableType(tableType === "view" ? "edit" : "view");
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Mapped Students
          <span className="ms-2">
            <Badge variant={tableType === "view" ? "secondary" : "destructive"}>
              {tableType === "view" ? "View" : "Editing"}
            </Badge>
          </span>
        </h2>
        <Toggle variant="default" className="ms-auto" onClick={toggleTableType}>
          <Edit /> Edit Mappings
        </Toggle>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Input
              placeholder="Filter emails..."
              value={
                (table.getColumn("email")?.getFilterValue() as string) ?? ""
              }
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
              {tableType == "edit" &&
                rowSelection &&
                Object.keys(rowSelection).length > 0 && (
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
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={currentColumns.length}
                        className="text-center h-12"
                      >
                        {tableType === "view"
                          ? "No students mapped to this exam."
                          : "No students found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <DataTablePagination table={table} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
