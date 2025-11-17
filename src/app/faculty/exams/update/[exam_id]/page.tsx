import HeroBanner from "@/components/HeroBanner";
import FormCard from "@/containers/faculty/exams/new/FormCard";
import { get_exam_details } from "@/lib/server_api/faculty";

type Params = {
  exam_id: string;
};

export default async function Page({ params }: { params: Params }) {
  const { exam_id } = await params;

  const exam_details = await get_exam_details({ exam_id: parseInt(exam_id) });

  console.log(exam_details);

  return (
    <>
      <HeroBanner
        title="Update Exam"
        description="Update existing exam details and manage students"
      />
      <FormCard defaultValues={exam_details.data} />
    </>
  );
}
