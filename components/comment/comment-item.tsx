"use client";

import { deleteComment, editComment } from "@/app/posts/[id]/action";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CommentItemProps {
  userId: number;
  commentId: number;
  commentOwnerId: number;
  username: string;
  content: string;
  created_at: string;
  avatar: string;
}

export default function CommentItem({
  userId,
  commentId,
  commentOwnerId,
  username,
  content,
  created_at,
  avatar,
}: CommentItemProps) {
  const [isUser, setIsUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    if (userId === commentOwnerId) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userId, commentOwnerId]);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("commentId", commentId.toString());
    formData.append("comment", editedContent);

    await editComment(formData); // 서버로 수정 요청
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");

    if (isConfirmed) {
      const formData = new FormData();
      formData.append("commentId", commentId.toString());

      await deleteComment(formData); // 서버로 삭제 요청
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <div className="relative size-10 mt-1 flex-shrink-0 rounded-full overflow-hidden">
        <Image
          src={avatar || "/default-avatar.png"}
          alt="avatar"
          fill
          sizes="40px"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2">
          <span className="font-bold hover:text-rose-400">
            <Link href={`/users/${username}`}>@{username}</Link>
          </span>
          <span className="text-sm text-stone-400">{created_at}</span>
          {isUser ? (
            <>
              <button onClick={() => setIsEditing(!isEditing)}>
                <PencilIcon className="size-4 hover:text-rose-400 active:button-animation" />
              </button>
              <button onClick={handleDelete}>
                <TrashIcon className="size-4 hover:text-rose-400 active:button-animation" />
              </button>
            </>
          ) : null}
        </div>
        {isEditing ? (
          <div className="w-full">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full mt-1 p-2 text-black rounded-sm bg-rose-100 outline-rose-400 border-none"
            />
            <button
              className="mt-2 mr-2 p-1 text-sm font-semibold text-black bg-rose-400 rounded-md active:button-animation"
              onClick={handleEdit}
            >
              저장
            </button>
            <button
              className="mt-2 p-1 text-sm font-semibold text-black bg-rose-400 rounded-md active:button-animation"
              onClick={() => setIsEditing(!isEditing)}
            >
              취소
            </button>
          </div>
        ) : (
          <p className="break-words word-break break-all">{content}</p>
        )}
      </div>
    </div>
  );
}
