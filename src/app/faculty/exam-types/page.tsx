import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/exam-types/PageContainer";
import { title } from "process";
import React from "react";

export const metadata = {
  title: "Exam Types",
  description: "Manage exam types",
};

function page() {
  return (
    <>
      <HeroBanner title="Exam Types" description="View all exam types" />
      <div className="container">
        <PageContainer />
      </div>
    </>
  );
}

export default page;
