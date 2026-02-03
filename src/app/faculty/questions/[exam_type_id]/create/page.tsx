import HeroBanner from "@/components/HeroBanner";
import CreateQuestionForm from "@/containers/faculty/questions/CreateQuestionForm";

export default async function page({
  params,
}: {
  params: { exam_type_id: number };
}) {
  const { exam_type_id } = await params;

  return (
    <>
      <HeroBanner
        title="Create New Question"
        description="Create a question for your exam type"
      />
      <div className="container my-8 space-y-4">
        <CreateQuestionForm exam_id={exam_type_id} />
      </div>
    </>
  );
}
