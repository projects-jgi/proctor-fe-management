"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import UploadStudents from "./UploadStudents";
import { get_department_students } from "@/lib/server_api/faculty";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { DataTable } from "@/components/datatable/DataTable";
import { useState } from "react";
import { DeleteStudentModal } from "./DeleteStudentModal";

export default function PageContainer() {
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});

  const data = useQuery({
    queryKey: ["faculty", "students"],
    queryFn: async () => {
      const response = await get_department_students();
      if (response.status) {
        return response.data;
      } else {
        return new Error(response.message);
      }
    },
  });

  return (
    <div className="my-8 space-y-4">
      <section>
        <div className="flex justify-end gap-2 mb-4">
          <UploadStudents />
          {Object.keys(rowSelection).length > 0 && (
            <DeleteStudentModal
              student_ids={Object.keys(rowSelection).map(Number)}
            />
          )}
        </div>
        {data.isLoading ? (
          <Loading />
        ) : data.isError ? (
          <div>Error loading data</div>
        ) : (
          <DataTable
            filters={[
              { name: "Name", key: "name" },
              { name: "Email", key: "email" },
            ]}
            columns={columns}
            data={data.data}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        )}
      </section>
    </div>
  );
}
