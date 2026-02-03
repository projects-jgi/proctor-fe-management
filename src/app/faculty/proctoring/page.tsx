import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/proctoring/PageContainer";
import React from "react";

export const metadata = {
  title: "Proctoring Dashboard",
  description: "Advanced real-time exam monitoring and violation detection",
};

function page() {
  return (
    <>
      <HeroBanner
        title="Proctoring Dashboard"
        description="Advanced real-time exam monitoring and violation detection"
      />
      <div className="container">
        <PageContainer />
      </div>
    </>
  );
}

export default page;
