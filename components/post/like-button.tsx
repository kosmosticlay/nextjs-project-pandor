"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useState, useTransition } from "react";
import { dislikePost, likePost } from "@/app/posts/[id]/action";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
  postId,
}: LikeButtonProps) {
  const [actualState, setActualState] = useState({
    isLiked: initialIsLiked,
    likeCount: initialLikeCount,
  });

  const [optimisticState, updateOptimisticState] = useOptimistic(
    actualState,
    (state, action: "like" | "dislike") => ({
      isLiked: action === "like",
      likeCount: action === "like" ? state.likeCount + 1 : state.likeCount - 1,
    })
  );

  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const action = actualState.isLiked ? "dislike" : "like";
      updateOptimisticState(action);

      try {
        if (action === "dislike") {
          await dislikePost(postId);
        } else {
          await likePost(postId);
        }

        setActualState((prevState) => ({
          isLiked: !prevState.isLiked,
          likeCount:
            action === "like"
              ? prevState.likeCount + 1
              : prevState.likeCount - 1,
        }));
      } catch (error) {
        console.error("Error updating like status:", error);
        updateOptimisticState(actualState.isLiked ? "like" : "dislike");
      }
    });
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center p-2"
      disabled={isPending}
    >
      {optimisticState.isLiked ? (
        <HeartIcon className="size-5 text-red-800" />
      ) : (
        <OutlineHeartIcon className="size-5 text-stone-500" />
      )}
    </button>
  );
}
