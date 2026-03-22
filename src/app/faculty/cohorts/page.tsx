import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/cohorts/PageContainer";

export default function Page() {
  return (
    <>
      <HeroBanner title="Cohorts" description="Manage Cohorts" />
      <div className="container">
        <PageContainer />
      </div>
    </>
  );
}
