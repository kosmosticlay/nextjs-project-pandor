"use client";

import FormButton from "@/components/form/button";
import FormInput from "@/components/form/input";
import SocialLoginButton from "@/components/form/social-login-button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "./action";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="min-w-[400px] w-full min-h-screen flex-center flex-col gap-5 md:gap-0 md:flex-row">
      <div className="w-full h-[150px] bg-slate-400 flex-center md:w-1/2 md:h-screen">
        <div className="w-[300px] h-[150px] bg-slate-200 flex-center text-black">
          Painter Next Door Logo
        </div>
      </div>
      <div className="w-full bg-gray-600 flex-center flex-col md:w-1/2 md:h-screen">
        <div className="w-[300px] xl:w-[400px]">
          <h1 className="sr-only">로그인</h1>
          <form action={dispatch} className="flex-center flex-col gap-1 mt-3">
            <FormInput
              name="username"
              type="text"
              placeholder="Username"
              required
              errors={state?.fieldErrors.username}
              classname="mb-2"
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              required
              errors={state?.fieldErrors.password}
              classname="mb-2"
            />
            <FormButton className="mt-2">로그인</FormButton>
          </form>
          <div className="h-px my-5 md:my-7 bg-white" />
          <div className="flex-center gap-2">
            <SocialLoginButton
              buttonName="SMS Login"
              imageSrc="/image/icon-chat.svg"
            ></SocialLoginButton>
            <SocialLoginButton
              buttonName="Google Login"
              imageSrc="/image/logo-google.svg"
            ></SocialLoginButton>
            <SocialLoginButton
              buttonName="Github Login"
              imageSrc="/image/logo-github.svg"
            ></SocialLoginButton>
          </div>
          <Link
            className="block mt-7 text-center primary-btn"
            href="/create-account"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
