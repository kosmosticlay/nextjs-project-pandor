"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./action";
import FormInput from "@/components/form/input";
import FormButton from "@/components/form/button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  console.log(state);
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-semibold mb-5">회원가입</h1>
      <form action={dispatch} className="w-[300px]">
        <FormInput
          name="username"
          type="text"
          placeholder="username"
          required
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          required
          errors={state?.fieldErrors.password}
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="confirm_password"
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <FormButton className="mt-5">계정 생성하기</FormButton>
      </form>
    </div>
  );
}
