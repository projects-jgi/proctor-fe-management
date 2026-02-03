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
import { ExamQuestionColumns } from "./datatable/ExamQuestionColumns";
import { useState } from "react";
import CreateQuestionModal from "./CreateQuestionModal";
import { DataTable } from "@/components/datatable/DataTable";

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

  const filters = [{ name: "Question Text", key: "question_text" }];

  if (questions.isLoading) {
    return <Loading />;
  }

  if (questions.isError) {
    return <div>Error: {questions.error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-end gap-2 mb-4">
        <BulkUpload exam_type_id={exam_type_id} />
        <Link href="/faculty/exam-types">
          <Button variant={"outline"}>
            <Plus />
            <span>Add Exam Type</span>
          </Button>
        </Link>
        <Button asChild>
          <Link href={`/faculty/questions/create?type=${exam_type_id}`}>
            <Plus />
            <span>Create Question</span>
          </Link>
        </Button>
      </div>
      <DataTable
        filters={filters}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        columns={ExamQuestionColumns}
        data={questions.data}
      />
    </div>
  );
}
