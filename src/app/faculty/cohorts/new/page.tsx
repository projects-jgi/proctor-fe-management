import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/cohorts/new/PageContainer";

export default function Page() {
  return (
    <>
      <HeroBanner title="Create new Cohort" description="" />
      <div className="container">
        <PageContainer />
      </div>
    </>
  );
}
