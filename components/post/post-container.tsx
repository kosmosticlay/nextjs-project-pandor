"use client";

import { getAllPosts, getNextPosts } from "@/app/(nav)/(home)/action";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import PostItem from "./post-item";
import Link from "next/link";

export type InitialPostsProps = Prisma.PromiseReturnType<typeof getAllPosts>;

export default function PostContainer({
  initialPosts,
}: {
  initialPosts: InitialPostsProps;
}) {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(initialPosts);

  const handleNextPosts = async () => {
    const nextPosts = await getNextPosts(page + 1);
    if (nextPosts.length > 0) {
      setPosts(nextPosts);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-400">
      <div className="w-full md:grid md:grid-cols-2 gap-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              price={post.price}
              created_at={post.created_at}
              user={post.user}
              comments={post._count.comments}
              likes={post._count.likes}
            />
          </Link>
        ))}
      </div>
      <button
        className="w-36 h-12 rounded-md bg-red-200 mt-5 mb-28"
        onClick={handleNextPosts}
      >
        Next
      </button>
    </div>
  );
}
