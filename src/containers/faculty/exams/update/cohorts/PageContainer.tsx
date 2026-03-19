"use client";

import {
  get_cohort_exam_mappings,
  get_cohorts,
  get_department_students,
  get_mapped_students_for_exam,
  map_students_to_exam,
} from "@/lib/server_api/faculty";
import { DataTable } from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";

export default function PageContainer({ exam_id }: { exam_id: number }) {
  const data = useQuery({
    queryKey: ["faculty", "cohorts"],
    queryFn: async () => {
      const response = await get_cohorts();
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch cohorts");
      }
    },
  });

  const mapped_cohort_exam_data = useQuery({
    queryKey: ["faculty", "exam", exam_id, "cohorts"],
    queryFn: async () => {
      const response = await get_cohort_exam_mappings({ exam_id });
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch mapped cohorts for exam");
      }
    },
  });

  return (
    <section>
      {data.isLoading || mapped_cohort_exam_data.isLoading ? (
        <Loading />
      ) : data.isError || mapped_cohort_exam_data.isError ? (
        "Error loading data"
      ) : (
        <DataTable
          data={data.data!}
          mapped_cohort_exam_data={mapped_cohort_exam_data.data}
          exam_id={exam_id}
        />
      )}
    </section>
  );
}
