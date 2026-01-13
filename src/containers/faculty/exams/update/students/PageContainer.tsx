"use client";

import {
  get_department_students,
  get_mapped_students_for_exam,
  map_students_to_exam,
} from "@/lib/server_api/faculty";
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

  return (
    <section>
      {data.isLoading || mapped_student_exam_data.isLoading ? (
        <Loading />
      ) : data.isError || mapped_student_exam_data.isError ? (
        "Error loading data"
      ) : (
        <DataTable
          data={data.data!}
          mapped_student_exam_data={mapped_student_exam_data.data}
          exam_id={exam_id}
        />
      )}
    </section>
  );
}
