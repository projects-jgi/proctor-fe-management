import HeroBanner from "@/components/HeroBanner";
import PageContainer from "@/containers/faculty/profile/PageContainer";

export default function ProfilePage() {
  return (
    <>
      <HeroBanner
        title="Profile"
        description="Manage your account information and preferences"
      />
      <section className="container">
        <PageContainer />
      </section>
    </>
  );
}
