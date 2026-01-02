"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
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

type ExamTypeResponse = ExamType & {
  faculty: Faculty;
};

function PageContainer() {
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Manage Exam Types</h2>
          <AddType />
        </div>
        {types.data &&
          Object.values(types.data)
            .flat()
            .map((type: ExamTypeResponse, index: number) => (
              <Card key={index} className="mt-4">
                <CardHeader className="gap-6">
                  <CardTitle>
                    {type.name}
                    <Badge
                      className="ms-2"
                      variant={type.is_private ? "secondary" : "default"}
                    >
                      {type.is_private ? "Private" : "Public"}
                    </Badge>
                  </CardTitle>
                  {type.description && (
                    <CardDescription>{type.description}</CardDescription>
                  )}
                  <CardAction>
                    <div className="flex items-center gap-2">
                      <UpdateType defaultValues={type} />
                      <DeleteType exam_type_id={type.id} />
                    </div>
                  </CardAction>
                  <CardDescription>
                    <div className="flex gap-6 text-sm">
                      <div className="">
                        <p className="font-semibold">Created By</p>
                        <p>{type.faculty.name}</p>
                      </div>
                      <div className="">
                        <p className="font-semibold">Created At</p>
                        <p>{new Date(type.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Status</p>
                        <p>Active</p>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
      </section>
    </div>
  );
}

export default PageContainer;
