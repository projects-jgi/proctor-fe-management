"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import UploadStudents from "./UploadStudents";
import { get_department_students } from "@/lib/server_api/faculty";
import { useQuery } from "@tanstack/react-query";

export default function PageContainer() {
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
        <Card>
          <CardHeader>
            <CardTitle>Department Students</CardTitle>
            <CardAction>
              <UploadStudents />
            </CardAction>
          </CardHeader>
          <CardContent>
            {data.isLoading ? (
              "Loading..."
            ) : data.isError ? (
              "Unable to load data"
            ) : (
              <DataTable columns={columns} data={data.data} />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
