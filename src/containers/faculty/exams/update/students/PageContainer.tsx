"use client";

import {
  get_department_students,
  map_students_to_exam,
} from "@/lib/server_api/faculty";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/Loading";

export default function PageContainer({ exam_id }: { exam_id: number }) {
  const data = useQuery({
    // queryKey: ["faculty", "exams", { exam_id }, "students"],
    queryKey: ["faculty", "students"],
    queryFn: async () => {
      const response = await get_department_students();
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch students");
      }
    },
  });

  return (
    <section>
      {data.isLoading ? (
        <Loading />
      ) : data.isError ? (
        "Error loading data"
      ) : (
        <DataTable columns={columns} data={data.data!} exam_id={exam_id} />
      )}
    </section>
  );
}
