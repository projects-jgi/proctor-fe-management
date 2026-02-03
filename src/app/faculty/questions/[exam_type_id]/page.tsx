import HeroBanner from "@/components/HeroBanner";
import AddQuestionContainer from "@/containers/faculty/questions/AddQuestionContainer";
import QuestionsList from "@/containers/faculty/questions/QuestionsList";
import React from "react";

async function page({ params }: { params: { exam_type_id: string } }) {
  const { exam_type_id } = await params;

  return (
    <>
      <HeroBanner
        title="Question Bank"
        description="Create and manage questions for your exams"
      />
      <div className="container my-8">
        <QuestionsList exam_type_id={parseInt(exam_type_id)} />
      </div>
    </>
  );
}

export default page;
