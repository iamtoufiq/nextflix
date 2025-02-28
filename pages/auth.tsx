import Image from "next/image";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import { varients } from "../constant/auth";
// import axios from "axios";
// import toast from "react-hot-toast";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [varient, setVarient] = useState<string>(varients.login);

  // const register = useCallback(async () => {
  //   try {
  //     await axios.post(`/api/register`, {
  //       email,
  //       name,
  //       password,
  //     });
  //     toast.success("Account created successfully!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [email, name, password]);

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === varients.login ? varients.register : varients.login
    );
  }, []);
  return (
    <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-cover'>
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5 ">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="h-8 lg:h-12 w-auto"
            priority
          />
        </nav>
        <div className="flex justify-center ">
          <div className="bg-black bg-opacity-70 px-5 md:px-16 self-center py-5 lg:py-8 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-3xl lg:text-4xl mb-8 font-semibold capitalize">
              {varient === varients.login ? varients.signIn : varients.register}
            </h2>
            <div className="flex flex-col gap-4">
              {varient === varients.register && (
                <Input
                  label="Username"
                  id="name"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <Input
                label="Email"
                id="email"
                type="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-red-600 py-3 rounded-md w-full mt-8 lg:mt-10 hover:bg-red-700 transition"
              onClick={varient === varients.login ? () => {
                console.log("registeraa")
              } : () => console.log("logsadfaf")}
            >
              {varient === varients.login ? varients.login : varients.signup}
            </button>
            <p className="text-neutral-500 text-center mt-12">
              {varients.login === varient
                ? varients.firstTimeUsingNetflix
                : varients.alreadyHaveAccount}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVarient}
              >
                {varients.login === varient
                  ? varients.createAccount
                  : varients.login}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
