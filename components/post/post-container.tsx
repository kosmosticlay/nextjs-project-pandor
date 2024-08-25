"use client";

import { getAllPosts, getNextPosts } from "@/app/(nav)/(home)/action";
import { Prisma } from "@prisma/client";
import { useCallback, useState, useTransition } from "react";
import PostItem from "./post-item";
import Link from "next/link";
import Spinner from "../form/loader-spinner";

export type InitialPostsProps = Prisma.PromiseReturnType<typeof getAllPosts>;

export default function PostContainer({
  initialPosts,
}: {
  initialPosts: InitialPostsProps;
}) {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const [isPending, startTransition] = useTransition();

  const handleNextPosts = useCallback(() => {
    startTransition(async () => {
      try {
        const nextPosts = await getNextPosts(page);
        if (nextPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
          setPage((prev) => prev + 1);
        } else {
          setHasMorePosts(false);
        }
      } catch (error) {
        console.error("Error fetching next posts:", error);
        setHasMorePosts(false);
      }
    });
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col items-center text-black">
      <div className="w-[500px] lg:w-full mt-5 px-5 grid lg:grid-cols-2 gap-3 xl:grid-cols-3">
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
              photo={post.photo!}
            />
          </Link>
        ))}
      </div>
      {hasMorePosts ? (
        <button
          className="w-36 h-12 rounded-md bg-rose-400 mt-5 mb-28 font-bold flex-center button-animation"
          onClick={handleNextPosts}
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "더보기"}
        </button>
      ) : (
        <div className="mt-5 mb-28 text-lg font-bold text-rose-400">
          더 이상 글이 없습니다.
        </div>
      )}
    </div>
  );
}
