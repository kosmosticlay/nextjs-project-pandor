"use client";

import FormButton from "@/components/form/button";
import PostInput from "@/components/form/post-input";
import PostTextarea from "@/components/form/post-textarea";
import { useFormState } from "react-dom";
import { createPost } from "./action";

export default function CreatePost() {
  const [state, dispatch] = useFormState(createPost, null);

  return (
    <div className="wrapper bg-blue-900">
      <h1 className="h1">새 글 작성하기</h1>
      <form action={dispatch} className="w-[500px] content-height ">
        <div className="  bg-pink-950 flex justify-center">
          <div className="w-[300px] h-[300px] bg-black">등록 공간</div>
        </div>
        <div className=" flex flex-col mt-3 ">
          <ul>
            <li className="mb-2">
              <label className="block  bg-black" htmlFor="title">
                제목
              </label>
              <PostInput
                name="title"
                type="text"
                placeholder="제목을 입력하세요"
                required
                errors={state?.fieldErrors.title}
              />
            </li>
            <li className="mb-2">
              <label className="block  bg-black" htmlFor="price">
                가격
              </label>
              <PostInput
                name="price"
                type="number"
                placeholder="가격을 입력하세요"
                required
                errors={state?.fieldErrors.price}
              />
            </li>
            <li className="mb-2">
              <label className="block  bg-black" htmlFor="description">
                내용
              </label>
              <PostTextarea
                name="description"
                errors={state?.fieldErrors.description}
              />
            </li>
          </ul>
          <FormButton> 업로드하기 </FormButton>
        </div>
      </form>
    </div>
  );
}
