import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/questions/PageContainer";
import React from "react";

function page() {
  return (
    <>
      <HeroBanner
        title="Question Bank"
        description="Create and manage questions for your exams"
      />
      <div className="container">
        <PageContainer />
      </div>
    </>
  );
}

export default page;
