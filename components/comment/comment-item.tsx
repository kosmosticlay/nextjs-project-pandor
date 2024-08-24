"use client";

import { deleteComment, editComment } from "@/app/posts/[id]/action";
import { useEffect, useState } from "react";

interface CommentItemProps {
  userId: number;
  commentId: number;
  commentOwnerId: number;
  username: string;
  content: string;
  created_at: string;
}

export default function CommentItem({
  userId,
  commentId,
  commentOwnerId,
  username,
  content,
  created_at,
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
    const formData = new FormData();
    formData.append("commentId", commentId.toString());

    await deleteComment(formData); // 서버로 삭제 요청
  };
  return (
    <div className="flex gap-2 mb-2">
      <div className="size-10 mt-1 flex-shrink-0 bg-white rounded-full"></div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-bold">{username}</span>
          <span className="text-sm">{created_at}</span>
          {isUser ? (
            <>
              <button onClick={() => setIsEditing(!isEditing)}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </>
          ) : null}
        </div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="text-black"
            />
            <button onClick={handleEdit}>저장</button>
          </>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
}
