import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import BulkUpload from "./BulkUpload";
import { useQuery } from "@tanstack/react-query";
import { get_exam_types } from "@/lib/server_api/faculty";
import { ExamType } from "@/types/exam";
import QuestionsList from "./QuestionsList";

function QuestionsSection() {
  const [currentTab, setCurrentTab] = useState<number | null>(null);

  const exam_types = useQuery({
    queryKey: ["faculty", "exam_types"],
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
    if (exam_types.data && exam_types.data.length > 0) {
      setCurrentTab(exam_types.data[0].id);
      console.log(exam_types.data[0].id);
    }
  }, [exam_types.data]);
  return (
    <Tabs defaultValue="all" value={currentTab?.toString() || "all"}>
      <TabsList>
        {exam_types.data?.map((type: ExamType) => (
          <TabsTrigger
            onClick={() => setCurrentTab(type.id)}
            value={type.id.toString()}
            key={type.id}
          >
            {type.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {currentTab && <QuestionsList exam_type_id={currentTab} />}
    </Tabs>
  );
}

export default QuestionsSection;
