"use client";

import FormInput from "@/components/form/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchPosts } from "./action";
import { useState } from "react";
import SearchedPostContainer, {
  Post,
} from "@/components/post/searched-post-container";

export default function Search() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const fetchedPosts = await searchPosts(formData);

    setPosts(fetchedPosts || []);
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <h1 className="h1">검색하기</h1>
      <form onSubmit={handleSearch} className="w-2/3 lg:w-1/3 flex gap-2">
        <select
          name="category"
          className="h-10 rounded-sm mr-1 border-2 border-rose-400 px-2 bg-rose-400 text-black"
        >
          <option value="0">전체 검색</option>
          <option value="1">작성자 검색</option>
          <option value="2">제목 검색</option>
          <option value="3">내용 검색</option>
        </select>
        <FormInput
          classname=""
          name="keyword"
          placeholder="검색어를 입력하세요."
          required
          type="text"
        />
        <button className="w-10 h-10 border-2 border-rose-400 flex-shrink-0 rounded-sm ml-1 text-rose-400 bg-black flex-center active:button-animation">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </form>
      <SearchedPostContainer posts={posts} loading={loading} />
    </div>
  );
}
