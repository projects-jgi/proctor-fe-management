import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/students/PageContainer";

export default function Page() {
  return (
    <>
      <HeroBanner
        title="Student Management"
        description="Manage students in your department"
      />
      <div className="container">
        <PageContainer />
      </div>
    </>
  );
}
