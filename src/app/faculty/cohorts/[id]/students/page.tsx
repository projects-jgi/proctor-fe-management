import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/cohorts/update/students/PageContainer";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <>
      <HeroBanner
        title="Student Exam Mapping"
        description="Manage students for cohort"
      />
      <div className="container my-8 space-y-6">
        <PageContainer cohort_id={parseInt(id)} />
      </div>
    </>
  );
}
