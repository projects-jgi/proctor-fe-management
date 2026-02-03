"use client";

import { useQuery } from "@tanstack/react-query";
import { get_exam_types } from "@/lib/server_api/faculty";
import { ExamType } from "@/types/exam";
import ExamTypeList from "./ExamTypeList";
import { Faculty } from "@/types/users";

function QuestionsSection() {
  const exam_types = useQuery<
    Record<string, (ExamType & { faculty: Faculty })[]>
  >({
    queryKey: ["faculty", "exam-types"],
    queryFn: async () => {
      const response = await get_exam_types();
      if (response.status) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
  });
  return (
    <ExamTypeList examTypes={Object.values(exam_types.data ?? []).flat()} />
  );
}

export default QuestionsSection;
