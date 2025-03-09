import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { withAuth } from "@/utils/withAuth";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

interface UserCardProps {
  name: string;
}
// ✅ Protected Page Using withAuth
// Next.js mein agar tum chahte ho ki koi page server-side pe data fetch kare ya koi logic chalaye pehle, toh tumhe getServerSideProps function define karna padta hai.
// Lekin sirf define karna kaafi nahi, isko export karna padta hai taaki Next.js isko recognize kare aur page load hone se pehle chalaye.
export const getServerSideProps = withAuth(async () => {
  return { props: {} };
});

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const [imgSrc, setImgSrc] = useState("/images/default-placeholder.png");

  useEffect(() => {
    // Randomize the image source on the client side after the component mounts
    setImgSrc(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return (
    <div className="group flex-row w-44 mx-auto">
      {/* todo : use of group class & differnce between group and pear */}
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <Image
          src={imgSrc}
          alt="Profile"
          width={176}
          height={176}
          className="object-contain"
          draggable={false}
          priority
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [userClicked, setUserClicked] = useState(false);

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userClicked) {
        router.push("/");
      }
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [router, userClicked]);
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              selectProfile();
              setUserClicked(true);
            }}
          >
            <UserCard name={currentUser?.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
