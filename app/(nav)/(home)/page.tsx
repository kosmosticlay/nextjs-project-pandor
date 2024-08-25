import PostContainer from "@/components/post/post-container";
import { Suspense } from "react";
import { getAllPosts } from "./action";

export default async function Home() {
  const initialPosts = await getAllPosts();

  return (
    <div className="">
      <Suspense fallback={<div className="loading-text">로딩 중...</div>}>
        <PostContainer initialPosts={initialPosts} />
      </Suspense>
    </div>
  );
}
