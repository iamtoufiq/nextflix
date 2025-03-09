import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export function withAuth(gssp: GetServerSideProps) {
  //GSSP ka full form hai GetServerSideProps.
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context); //context has browser cookies ,getSession this function is use to check the cookies.

    if (!session) {
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    }

    return gssp ? await gssp(context) : { props: {} }; //Agar session hai (user valid hai), toh yeh original gssp function chalata hai jo page ka data fetch karta hai.
  };
}
