"use server";

import { getLoggedInUser } from "@/app/(auth)/action";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { z } from "zod";

/* 댓글 생성 */
const commentSchema = z.object({
  postId: z.number(),
  comment: z.string(),
});

export async function createComment(formData: FormData) {
  const user = await getLoggedInUser();
  if (!user) {
    return notFound();
  }

  const data = {
    postId: Number(formData.get("postId")),
    comment: formData.get("comment"),
  };

  const result = await commentSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    return await db.comment.create({
      data: {
        content: result.data.comment,
        post: {
          connect: {
            id: result.data.postId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}

/* 댓글 수정 */

const editCommentSchema = z.object({
  commentId: z.number(),
  comment: z.string(),
});

export async function editComment(formData: FormData) {
  const user = await getLoggedInUser();
  if (!user) {
    return notFound();
  }

  const data = {
    commentId: Number(formData.get("commentId")),
    comment: formData.get("comment"),
  };

  const result = await editCommentSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const existingComment = await db.comment.findUnique({
      where: { id: result.data.commentId },
    });

    if (existingComment?.userId !== user.id) {
      return notFound();
    }

    return await db.comment.update({
      where: { id: result.data.commentId },
      data: {
        content: result.data.comment,
      },
    });
  }
}

/* 댓글 삭제 */

const deleteCommentSchema = z.object({
  commentId: z.number(),
});

export async function deleteComment(formData: FormData) {
  const user = await getLoggedInUser();
  if (!user) {
    return notFound();
  }

  const data = {
    commentId: Number(formData.get("commentId")),
  };

  const result = await deleteCommentSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const existingComment = await db.comment.findUnique({
      where: { id: result.data.commentId },
    });

    if (existingComment?.userId !== user.id) {
      return notFound();
    }

    return await db.comment.delete({
      where: { id: result.data.commentId },
    });
  }
}
