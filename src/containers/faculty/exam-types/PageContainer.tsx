"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import AddType from "./AddType";
import UpdateType from "./UpdateType";
import { DeleteType } from "./DeleteType";
import HeroStats from "./HeroStats";
import { useQuery } from "@tanstack/react-query";
import { get_exam_types } from "@/lib/server_api/faculty";
import Loading from "@/components/Loading";
import { ExamType } from "@/types/exam";
import { Faculty } from "@/types/users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/datatable/DataTable";

type ExamTypeResponse = ExamType & {
  faculty: Faculty;
};

function PageContainer() {
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});

  const types = useQuery<Record<string, ExamTypeResponse[]>>({
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

  if (types.isLoading) {
    return <Loading />;
  }

  if (types.isError) {
    return <p className="text-destructive">Error: {types.error?.message}</p>;
  }

  return (
    <div className="my-8 space-y-4">
      <section>{/* <HeroStats /> */}</section>
      <section>
        <div className="flex items-center justify-end mb-4">
          <AddType>
            <Button variant="default">
              <Plus /> Add Exam Type
            </Button>
          </AddType>
        </div>
        <DataTable
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={columns}
          data={Object.values(types.data!).flat()}
          filters={[
            { name: "Name", key: "name" },
            { name: "Description", key: "description" },
            { name: "Faculty", key: "faculty_name" },
            { name: "Visibility", key: "is_private" },
          ]}
        />
      </section>
    </div>
  );
}

export default PageContainer;
