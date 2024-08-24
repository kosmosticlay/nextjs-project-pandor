"use client";

import { getUserByUsername } from "@/app/(auth)/action";
import FormButton from "@/components/form/button";
import FormInput from "@/components/form/input";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { useFormState } from "react-dom";
import { editProfile } from "./action";

type ProfileUserProps = Prisma.PromiseReturnType<typeof getUserByUsername>;

export default function EditProfileForm({
  profileUser,
}: {
  profileUser: ProfileUserProps;
}) {
  if (!profileUser) {
    return notFound();
  }

  const [state, dispatch] = useFormState(editProfile, null);

  return (
    <form action={dispatch} className="w-[300px]">
      <div className=""></div>
      <FormInput
        name="username"
        type="text"
        placeholder="username"
        required
        defaultValue={profileUser.username}
        errors={state?.fieldErrors.username}
        classname="mb-2"
      />
      <FormInput
        name="email"
        type="email"
        placeholder="email"
        required
        defaultValue={profileUser.email || ""}
        errors={state?.fieldErrors.email}
        classname="mb-2"
      />
      <FormInput
        name="bio"
        type="text"
        placeholder="bio"
        required
        defaultValue={profileUser.bio || ""}
        errors={state?.fieldErrors.bio}
        classname="mb-2"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="password"
        required={false}
        errors={state?.fieldErrors.password}
        classname="mb-2"
      />
      <FormInput
        name="confirm_password"
        type="password"
        placeholder="confirm_password"
        required={false}
        errors={state?.fieldErrors.confirm_password}
        classname="mb-2"
      />
      <FormButton>프로필 수정하기</FormButton>
    </form>
  );
}
