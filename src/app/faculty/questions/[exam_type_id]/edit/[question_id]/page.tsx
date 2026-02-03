import HeroBanner from "@/components/HeroBanner";
import CreateQuestionForm from "@/containers/faculty/questions/CreateQuestionForm";
import { get_question } from "@/lib/server_api/faculty";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { question_id: number; exam_type_id: number };
}) {
  const { question_id, exam_type_id } = await params;
  const question = await get_question(question_id);

  console.log(question);

  if (!question.status) {
    return notFound();
  }

  return (
    <>
      <HeroBanner
        title="Update Question"
        description="Update question details"
      />
      <div className="container my-8 space-y-4">
        <CreateQuestionForm
          defaultValues={question.data}
          exam_id={exam_type_id}
          question_id={question_id}
        />
      </div>
    </>
  );
}
