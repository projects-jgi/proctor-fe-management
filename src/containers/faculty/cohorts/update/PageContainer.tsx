import { useQuery } from "@tanstack/react-query";
import FormCard from "../new/FormCard";
import { get_cohort } from "@/lib/server_api/faculty";
import { number } from "zod";

export default async function PageContainer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const data = await get_cohort(parseInt(id));

  console.log(data);

  return (
    <div className="my-8 space-y-4">
      <section>
        <FormCard />
      </section>
    </div>
  );
}
