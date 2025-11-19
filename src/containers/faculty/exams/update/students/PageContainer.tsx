"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  get_department_students,
  map_students_to_exam,
} from "@/lib/server_api/faculty";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function PageContainer({ exam_id }: { exam_id: number }) {
  const data = useQuery({
    queryKey: ["faculty", "exams", { exam_id }, "students"],
    queryFn: async () => {
      const response = await get_department_students();
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch students");
      }
    },
  });
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    console.log("Selected Rows: ", rowSelection);
  }, [rowSelection]);

  async function handleSave() {
    const response = await map_students_to_exam({
      exam_id,
      student_mappings: rowSelection,
    });
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardAction className="flex items-center gap-4">
            <Button variant="outline">
              <Mail />
              Send Invite
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {data.isLoading || data.isError ? (
            <div className="text-center">
              {data.isLoading ? "Loading..." : "Failed to load students"}
            </div>
          ) : (
            <DataTable
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              columns={columns}
              data={data.data}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
