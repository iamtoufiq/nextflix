// import NextAuth, { AuthOptions } from "next-auth"; //NextAuth ko import kiya gaya hai jo authentication system ko manage karega.
// //AuthOptions ek type hai jo batata hai ki hum authentication options ka use kar rahe hain.
// import Credentials from "next-auth/providers/credentials"; //Credentials provider ko import kiya, jo email-password based authentication ke liye hota hai.
// import { compare } from "bcrypt";
// //TODO : check this file in details

// export const authOptions: AuthOptions = {
//   //first
//   providers: [
//     //Providers wo hote hain jo authentication ka method specify karte hain.
//     //     Credentials ka matlab hai ki hum email-password authentication ka use kar rahe hain.
//     // id: "credentials" → is provider ka ek unique naam diya gaya.
//     // name: "Credentials" → Yeh user ko dikhne wala naam hai.
//     Credentials({
//       id: "credentials",
//       name: "Credentials",
//       //now we are defining we Credentials do we need
//       credentials: {
//         // credentials object → User ke input fields define karta hai (email, password).
//         //         Yeh define kar raha hai ki login form me kaunse input fields honge.
//         // label define karta hai ki UI pe kya dikhna chahiye.
//         // type define karta hai ki yeh text input hoga ya password input.
//         email: {
//           label: "Email",
//           type: "text",
//         },
//         password: {
//           label: "Password",
//           type: "password ",
//         },
//       },

//       //now this is the function
//       async authorize(credentials) {
//         // Jab user login karega, toh yeh function check karega ki email aur password diya hai ya nahi.
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password required");
//         }

//         const user = await prismadb.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user.hashedPassword) {
//           throw new Error("Email does not exist");
//         }

//         const isCorrectPassword = await compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error("Incorrect password");
//         }

//         return user;
//       },
//     }), // // Manual email-password login
//   ],
//   pages: {
//     //Agar user login karna chahta hai, toh usko "/auth" page pe bheja jayega.
//     signIn: "/auth",
//   },
//   debug: process.env.NODE_ENV === "development",
//   session: { strategy: "jwt" }, //Iska matlab hai ki login hone ke baad user ka session token (JWT) ke through maintain hoga.
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET, //JWT tokens generate hone ke liye ek secret key chahiye hoti hai.
//   },
//   secret: process.env.NEXTAUTH_SECRET, //NextAuth ke liye ek secret key set ki gayi hai.
// };

// export default NextAuth(authOptions);

import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "passord",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);