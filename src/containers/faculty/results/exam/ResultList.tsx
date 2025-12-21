"use client";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get_exam_results } from "@/lib/server_api/faculty";
import { Exam } from "@/types/exam";
import { StudentExamResult, StudentUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

type StudentExamResultResponse = StudentExamResult & {
  student_user: StudentUser;
  exam: Exam;
};

function ResultList({ exam_id }: { exam_id: number }) {
  const results = useQuery({
    queryKey: ["faculty", "exams", exam_id, "results"],
    queryFn: async () => {
      const res = await get_exam_results({ exam_id });
      if (res.status) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    },
  });

  if (results.isLoading) {
    return <div>Loading results...</div>;
  }

  if (results.isError) {
    return <div>Error loading results: {results.error?.message}</div>;
  }

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Student Results</CardTitle>
    //     <CardDescription>
    //       View and analyze student performance across your exams
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    <DataTable columns={columns} data={results.data} />
    //   </CardContent>
    // </Card>
  );
}

export default ResultList;
