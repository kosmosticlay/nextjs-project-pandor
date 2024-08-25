"use client";

import { getUserByUsername } from "@/app/(auth)/action";
import FormButton from "@/components/form/button";
import FormInput from "@/components/form/input";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { useFormState } from "react-dom";
import { editProfile } from "./action";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type ProfileUserProps = Prisma.PromiseReturnType<typeof getUserByUsername>;

export default function EditProfileForm({
  profileUser,
}: {
  profileUser: ProfileUserProps;
}) {
  // React Hooks를 조건문 밖으로 이동시킴
  const [state, dispatch] = useFormState(editProfile, null);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [preview, setPreview] = useState(profileUser?.avatar || "");

  if (!profileUser) {
    return notFound();
  }

  const togglePasswordFields = () => {
    setIsPasswordEnabled(!isPasswordEnabled);
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <form action={dispatch} className="w-[300px] flex flex-col items-center">
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-5">
        <Image
          src={preview}
          alt="Avatar preview"
          fill
          sizes="150px"
          style={{ objectFit: "cover" }}
        />
        <label
          htmlFor="avatar"
          className="absolute inset-0 flex items-center justify-center flex-col text-neutral-300 cursor-pointer bg-black opacity-0 hover:opacity-80 transition-opacity"
        >
          <PhotoIcon className="w-10 h-10" />
          <span className="text-sm mt-2 font-semibold">
            프로필 사진 변경하기
          </span>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          className="hidden"
        />
      </div>
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
      <div className="w-[320px] mb-2 py-2 px-[10px] rounded-lg border border-1 border-rose-400">
        <p className="mb-2">
          비밀번호를 변경하려면 아래의 비밀번호 필드를 클릭하세요.
        </p>
        <div className="relative mb-2">
          <FormInput
            name="password"
            type="password"
            placeholder="password"
            required={false}
            errors={state?.fieldErrors.password}
            isDisabled={!isPasswordEnabled}
            classname="w-[300px]"
          />
          {!isPasswordEnabled && (
            <button
              type="button"
              onClick={togglePasswordFields}
              className="absolute inset-0 w-full h-full bg-transparent"
            />
          )}
        </div>
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="confirm_password"
          required={false}
          errors={state?.fieldErrors.confirm_password}
          classname="mb-2"
          isDisabled={!isPasswordEnabled}
        />
        {isPasswordEnabled && (
          <span
            onClick={togglePasswordFields}
            className="block w-full text-center underline underline-offset-4 hover:text-rose-100 cursor-pointer"
          >
            비밀번호 변경 취소하기
          </span>
        )}
      </div>
      <FormButton>프로필 수정하기</FormButton>
    </form>
  );
}
