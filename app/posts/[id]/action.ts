"use server";

import { getLoggedInUser } from "@/app/(auth)/action";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
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
    await db.comment.create({
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

    // 댓글이 속한 게시물의 경로를 재유효화합니다.
    revalidatePath(`/post/${data.postId}`);
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

    // 댓글 업데이트
    await db.comment.update({
      where: { id: result.data.commentId },
      data: {
        content: result.data.comment,
      },
    });

    const postId = existingComment.postId;
    revalidatePath(`/post/${postId}`);
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

    await db.comment.delete({
      where: { id: result.data.commentId },
    });

    const postId = existingComment.postId;
    revalidatePath(`/post/${postId}`);
  }
}

/* 게시물 좋아요 */
export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

/* 게시물 좋아요 취소 */
export async function dislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        userId_postId: {
          userId: session.id!,
          postId: postId,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}
