"use client";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import BulkUpload from "./BulkUpload";
import { useQuery } from "@tanstack/react-query";
import { get_exam_types } from "@/lib/server_api/faculty";
import { ExamType } from "@/types/exam";
import QuestionsList from "./QuestionsList";
import { useSearchParams } from "next/navigation";
import ExamTypeList from "./ExamTypeList";
import { Faculty } from "@/types/users";

function QuestionsSection() {
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const search = useSearchParams();

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

  useEffect(() => {
    if (exam_types.data && Object.keys(exam_types.data).length > 0) {
      const firstGroup = Object.values(exam_types.data).flat();
      setCurrentTab(firstGroup[0].id);
    }
  }, [exam_types.data]);

  if (search.has("type")) {
    const exam_type_id = parseInt(search.get("type") as string);

    return <QuestionsList exam_type_id={exam_type_id} />;
  } else {
    return (
      <ExamTypeList examTypes={Object.values(exam_types.data ?? []).flat()} />
    );
  }
}

export default QuestionsSection;
