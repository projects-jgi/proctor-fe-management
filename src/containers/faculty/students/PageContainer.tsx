import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import UploadStudents from "./UploadStudents";
import { get_department_students } from "@/lib/server_api/faculty";

export default async function PageContainer() {
  const data = await get_department_students();

  return (
    <div className="my-8 space-y-4">
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Department Students</CardTitle>
            <CardAction>
              <UploadStudents />
            </CardAction>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data.data} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
