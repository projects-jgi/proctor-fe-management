import HeroBanner from "@/components/HeroBanner";
import React from "react";

function page() {
  return (
    <>
      <HeroBanner
        showBackButton={false}
        title="Faculty Dashboard"
        description="Welcome back! Manage your teaching activities"
      />
    </>
  );
}

export default page;
