"use client";

import {
  get_cohort_students,
  get_department_students,
  get_mapped_students_for_exam,
  map_students_to_exam,
} from "@/lib/server_api/faculty";
import { DataTable } from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import UploadStudentsModal from "./UploadStudentsModal";

export default function PageContainer({ cohort_id }: { cohort_id: number }) {
  const data = useQuery({
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
    queryKey: ["faculty", "cohorts", cohort_id, "students"],
    queryFn: async () => {
      const response = await get_cohort_students({
        cohort_id,
      });
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch mapped students for exam");
      }
    },
  });

  return (
    <>
      <div className="flex justify-end gap-4 items-center">
        <UploadStudentsModal cohort_id={cohort_id} />
      </div>
      <section>
        {data.isLoading || mapped_student_exam_data.isLoading ? (
          <Loading />
        ) : data.isError || mapped_student_exam_data.isError ? (
          "Error loading data"
        ) : (
          <DataTable
            data={data.data!}
            mapped_student_exam_data={mapped_student_exam_data.data}
            cohort_id={cohort_id}
          />
        )}
      </section>
    </>
  );
}
