"use client";

import { DataTable } from "@/components/datatable/DataTable";
import Loading from "@/components/Loading";
import { get_cohorts } from "@/lib/server_api/faculty";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Columns } from "./Columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function PageContainer() {
  const [rowSelection, setRowSelection] = useState([]);

  const data = useQuery({
    queryKey: ["faculty", "cohorts"],
    queryFn: async () => {
      const response = await get_cohorts();
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch cohorts");
      }
    },
  });

  if (data.isLoading) {
    return <Loading />;
  }

  if (data.isError) {
    return <p className="text-destructive">Error: {data.error?.message}</p>;
  }

  return (
    <div className="my-8 space-y-4">
      {data.isLoading}
      <section>
        <div className="flex items-center justify-end mb-4">
          <Button>
            <Link
              href={"/faculty/cohorts/new"}
              className="inline-flex gap-2 items-center"
            >
              <Plus />
              <span>Create Cohort</span>
            </Link>
          </Button>
        </div>
        <DataTable
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          columns={Columns}
          data={data.data}
          filters={[
            {
              name: "Cohort Name",
              key: "cohort_name",
            },
          ]}
        />
      </section>
    </div>
  );
}
