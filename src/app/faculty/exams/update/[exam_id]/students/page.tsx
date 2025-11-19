import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/exams/update/students/PageContainer";

type Params = {
  exam_id: string;
};

export default async function Page({ params }: { params: Params }) {
  const { exam_id } = await params;

  return (
    <>
      <HeroBanner
        title="Student Exam Mapping"
        description="Manage students for your exam"
      />
      <div className="container my-8 space-y-6">
        <PageContainer exam_id={parseInt(exam_id)} />
      </div>
    </>
  );
}
