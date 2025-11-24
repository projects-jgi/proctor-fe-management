"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { get_exam_type_questions } from "@/lib/server_api/faculty";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import BulkUpload from "./BulkUpload";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExamQuestion } from "@/types/exam";
import Link from "next/link";
import { DataTable } from "./datatable/Datatable";
import { ExamQuestionColumns } from "./datatable/ExamQuestionColumns";
import { useState } from "react";

export default function QuestionsList({
  exam_type_id,
}: {
  exam_type_id: number;
}) {
  const [rowSelection, setRowSelection] = useState({});

  const questions = useQuery({
    queryKey: ["faculty", "exam_types", exam_type_id, "questions"],
    queryFn: async () => {
      const response = await get_exam_type_questions({ exam_type_id });
      if (response.status) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (questions.isLoading) {
    return <Loading />;
  }

  if (questions.isError) {
    return <div>Error: {questions.error.message}</div>;
  }

  return (
    <TabsContent value={exam_type_id.toString()}>
      <div className="w-full">
        <div className="flex justify-end gap-2 mb-4">
          <BulkUpload exam_type_id={exam_type_id} />
          <Link href="/faculty/exam-types">
            <Button variant={"outline"}>
              <Plus />
              <span>Add Exam Type</span>
            </Button>
          </Link>
          {/* <Button>
            <Plus />
            <span>Create Question</span>
          </Button> */}
        </div>
        <Card>
          <CardContent>
            <DataTable
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              columns={ExamQuestionColumns}
              data={questions.data}
            />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
