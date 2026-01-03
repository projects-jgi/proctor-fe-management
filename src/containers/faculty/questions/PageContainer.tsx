import React from "react";
import HeroStats from "./HeroStats";
import QuestionsSection from "./QuestionsSection";
import { connection } from "next/server";

async function PageContainer() {
  await connection();

  return (
    <div className="my-8 space-y-4">
      {/* <HeroStats /> */}
      <QuestionsSection />
    </div>
  );
}

export default PageContainer;
