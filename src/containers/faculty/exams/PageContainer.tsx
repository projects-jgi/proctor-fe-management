"use client";

import React from "react";
import HeroStats from "./HeroStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Eye, EyeOff, Globe, Plus } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteExam } from "./DeleteExam";
import { useQuery } from "@tanstack/react-query";
import { get_all_exams } from "@/lib/server_api/faculty";
import { Exam } from "@/types/exam";
import { cn } from "@/lib/utils";

function PageContainer() {
  const exams = useQuery({
    queryKey: ["faculty", "exams"],
    queryFn: async () => {
      const response = await get_all_exams();
      if (response.status) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
  });
  return (
    <div className="my-8 space-y-4">
      {/* <HeroStats /> */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Exams</h2>
          <Button>
            <Link
              href={"/faculty/exams/new"}
              className="inline-flex gap-2 items-center"
            >
              <Plus />
              <span>Create Exam</span>
            </Link>
          </Button>
        </div>
        {exams.data?.map((exam: Exam, index: number) => (
          <Card className="mt-4" key={index}>
            <CardHeader>
              <div className="flex gap-2 items-center">
                <div
                  className={cn(
                    "p-2 rounded",
                    exam.status
                      ? "bg-success text-success-foreground"
                      : "bg-warning text-warning-foreground"
                  )}
                >
                  {exam.status ? <Eye size={15} /> : <EyeOff size={15} />}
                </div>
                <div>
                  <CardTitle className="mb-2">{exam.name}</CardTitle>
                  <CardDescription>
                    <Badge>{exam.status ? "Published" : "Draft"}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-8 items-start text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Duration</p>
                  <p>{exam.duration_in_minutes} Min</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Total Students</p>
                  <p>0</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    Start Date & time
                  </p>
                  <p>{new Date(exam.start_time).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">End Date & time</p>
                  <p>{new Date(exam.end_time).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6 text-sm">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">
                    Created At: {new Date(exam.created_at).toLocaleString()}
                  </p>
                  <div className="flex gap-2 items-center">
                    {exam.status == 0 && (
                      <Link href={`/faculty/exams/update/${exam.id}`}>
                        <Button variant="outline">
                          <Edit />
                        </Button>
                      </Link>
                    )}
                    <DeleteExam />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default PageContainer;
