import useCurrentUser from "@/hooks/useCurrentUser";
import { withAuth } from "@/utils/withAuth";

export default function Home() {
  const { data: UserData } = useCurrentUser();
  console.log("UserData", UserData);
  return (
  <div className="bg-red-900">
    netflix 
  </div>
  );
}

// ✅ Protected Page Using withAuth
export const getServerSideProps = withAuth(async () => {
  return { props: {} };
});
