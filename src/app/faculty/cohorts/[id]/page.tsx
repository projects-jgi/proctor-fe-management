import HeroBanner from "@/components/HeroBanner";
import FormCard from "@/containers/faculty/cohorts/new/FormCard";
import PageContainer from "@/containers/faculty/cohorts/update/PageContainer";
import { get_cohort } from "@/lib/server_api/faculty";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const data = await get_cohort(parseInt(id));

  if (data.status == false) {
    return notFound();
  }

  return (
    <>
      <HeroBanner title="Update Cohort" description="" />
      <div className="container">
        <div className="my-8 space-y-4">
          <section>
            <FormCard defaultValues={data.data} cohort_id={parseInt(id)} />
          </section>
        </div>
      </div>
    </>
  );
}
