"use client";

import HeroBanner from "@/components/HeroBanner";
import CreateQuestionForm from "@/containers/faculty/questions/CreateQuestionForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const search_params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (search_params.has("type")) {
      const type_id = search_params.get("type");
      if (parseInt(type_id as string).toString() === "NaN") {
        router.push("/faculty/questions");
        return;
      }
    } else {
      router.push("/faculty/questions");
      return;
    }
  }, []);
  return (
    <>
      <HeroBanner
        title="Create New Question"
        description="Create a question for your exam type"
      />
      <div className="container my-8 space-y-4">
        <CreateQuestionForm
          exam_id={parseInt(search_params.get("type") as string)}
        />
      </div>
    </>
  );
}
