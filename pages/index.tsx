import Billboard from "@/components/Billboard";
import Navbar from "@/components/Navbar";
import { withAuth } from "@/utils/withAuth";

export default function Home() {
  return (
    <>
      <Navbar />
    <Billboard/>
    </>
  );
}

// ✅ Protected Page Using withAuth
export const getServerSideProps = withAuth(async () => {
  return { props: {} };
});
