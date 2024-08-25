"use client";

import FormButton from "@/components/form/button";
import PostInput from "@/components/form/post-input";
import PostTextarea from "@/components/form/post-textarea";
import { useFormState } from "react-dom";
import { createPost } from "./action";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function CreatePost() {
  const [preview, setPreview] = useState("");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    setPreview(url);
  };

  const [state, dispatch] = useFormState(createPost, null);

  return (
    <div className="wrapper">
      <h1 className="h1">새 글 작성하기</h1>
      <form action={dispatch} className="w-[500px] content-height mt-5">
        <div className="  bg-pink-950 flex justify-center">
          <div className="w-[300px] h-[300px] bg-black">
            <label
              htmlFor="photo"
              className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
              style={{
                backgroundImage: `url(${preview})`,
              }}
            >
              {preview === "" ? (
                <>
                  <PhotoIcon className="w-20" />
                  <div className="text-neutral-400 text-sm">
                    사진을 추가해주세요.
                    {state?.fieldErrors.photo}
                  </div>
                </>
              ) : null}
            </label>
            <input
              onChange={onImageChange}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        <div className=" flex flex-col mt-3 ">
          <ul>
            <li className="mb-3 text-lg">
              <label className="block font-semibold" htmlFor="title">
                제목
              </label>
              <PostInput
                name="title"
                type="text"
                placeholder="제목을 입력하세요."
                required
                errors={state?.fieldErrors.title}
              />
            </li>
            <li className="mb-3 text-lg">
              <label className="block font-semibold" htmlFor="price">
                가격
              </label>
              <PostInput
                name="price"
                type="number"
                placeholder="가격을 입력하세요."
                required
                errors={state?.fieldErrors.price}
              />
            </li>
            <li className="mb-3 text-lg">
              <label className="block font-semibold" htmlFor="description">
                내용
              </label>
              <PostTextarea
                name="description"
                errors={state?.fieldErrors.description}
                placeholder="내용은 10자 이상 입력해주세요."
              />
            </li>
          </ul>
          <FormButton> 업로드하기 </FormButton>
        </div>
      </form>
    </div>
  );
}
