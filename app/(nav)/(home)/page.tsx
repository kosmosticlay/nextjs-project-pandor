import PostContainer from "@/components/post/post-container";
import { Suspense } from "react";
import { getAllPosts } from "./action";

export default async function Home() {
  const initialPosts = await getAllPosts();
  //console.log(initialPosts);
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <PostContainer initialPosts={initialPosts} />
      </Suspense>
    </div>
  );
}
