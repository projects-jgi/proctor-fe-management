import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/dashboard/PageContainer";
import React from "react";

function page() {
  return (
    <>
      <HeroBanner
        showBackButton={false}
        title="Faculty Dashboard"
        description="Welcome back! Manage your teaching activities"
      />
      <PageContainer />
    </>
  );
}

export default page;
