"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useState } from "react";
import { dislikePost, likePost } from "@/app/tweets/[id]/action";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
  tweetId,
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

  const onClick = async () => {
    const action = actualState.isLiked ? "dislike" : "like";
    updateOptimisticState(action);

    try {
      if (action === "dislike") {
        await dislikePost(tweetId);
      } else {
        await likePost(tweetId);
      }

      // 실제 상태 업데이트
      setActualState((prevState) => ({
        isLiked: !prevState.isLiked,
        likeCount:
          action === "like" ? prevState.likeCount + 1 : prevState.likeCount - 1,
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
      updateOptimisticState(actualState.isLiked ? "like" : "dislike");
    }
  };

  return (
    <button onClick={onClick} className="flex items-center p-2">
      {optimisticState.isLiked ? (
        <HeartIcon className="size-5 text-red-800" />
      ) : (
        <OutlineHeartIcon className="size-5 text-stone-500" />
      )}
    </button>
  );
}
