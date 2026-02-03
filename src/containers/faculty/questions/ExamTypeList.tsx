import { ExamType } from "@/types/exam";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Faculty } from "@/types/users";
import { ArrowRight } from "lucide-react";

type ExamTypeResponse = ExamType & {
  faculty: Faculty;
};

function ExamTypeList({ examTypes }: { examTypes: ExamTypeResponse[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {examTypes.map((examType: ExamTypeResponse, index: number) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Badge variant={examType.is_private ? "secondary" : "default"}>
                {examType.is_private ? "Private" : "Public"}
              </Badge>
            </CardTitle>
            <Button>
              <Link
                href={`/faculty/questions/${examType.id}`}
                className="inline-flex items-center gap-2"
              >
                View <ArrowRight />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examType.name}</div>
            <p className="text-xs text-muted-foreground">
              {examType.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ExamTypeList;
