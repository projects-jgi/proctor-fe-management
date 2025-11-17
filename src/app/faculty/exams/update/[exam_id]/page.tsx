import HeroBanner from "@/components/HeroBanner";
import FormCard from "@/containers/faculty/exams/new/FormCard";
import PublishDialog from "@/containers/faculty/exams/new/PublishDialog";
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
      <div className="container my-8 space-y-6">
        <div className="flex justify-end">
          {exam_details.data.status == 0 && (
            <PublishDialog exam_id={parseInt(exam_id)} />
          )}
        </div>
        <FormCard defaultValues={exam_details.data} />
      </div>
    </>
  );
}
