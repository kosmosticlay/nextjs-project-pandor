import Link from "next/link";
import { notFound } from "next/navigation";
import { getComments, getLoggedInUser, getPost } from "@/app/(auth)/action";
import { formatToTimeAgo } from "@/lib/utils";
import { createComment } from "./action";
import FormInput from "@/components/form/input";
import FormButton from "@/components/form/button";
import CommentItem from "@/components/comment/comment-item";
import LikeButton from "@/components/post/like-button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return;
  }

  const post = await getPost(Number(id));
  if (!post) {
    return notFound();
  }

  const user = await getLoggedInUser();
  if (!user) {
    return notFound();
  }

  const prevComments = await getComments(Number(id));

  const isLiked = post.likes.some((like) => like.user.id === user.id);

  return (
    <div className="wrapper min-h-screen">
      <header className="w-full h-16 flex items-center">
        <Link
          className="flex items-center font-semibold  hover:text-rose-400"
          href="/"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          <span className="text-lg">Home</span>
        </Link>
      </header>
      <div className="w-full lg:flex justify-center mt-5">
        <div className="w-full lg:w-1/3 lg:mr-5 flex justify-center mb-5">
          <div className="min-w-[300px] h-content lg:w-1/2 relative aspect-square flex-center size-80">
            <Image
              className="object-cover"
              fill
              src={`${post.photo}`}
              alt={post.title}
            />
          </div>
        </div>
        <div className="min-w-[400px] lg:w-1/2 flex flex-col">
          <div className="flex justify-between items-end">
            <h1 className="h1 pr-5">{post.title}</h1>
            <div className="flex items-center flex-shrink-0 pb-4">
              <p>좋아요 {post.likes.length}개</p>
              <LikeButton
                isLiked={isLiked}
                postId={post.id}
                likeCount={post.likes.length}
              />
            </div>
          </div>
          <span className="font-semibold text-lg">
            {post.price.toLocaleString("KR")}원
          </span>
          <div className="my-3">
            <span>
              <Link
                className="font-bold hover:text-rose-400"
                href={`/users/${post.user.username}`}
              >
                @{post.user.username}
              </Link>
            </span>
            <span className="ml-2 text-sm text-stone-400">
              {formatToTimeAgo(post.created_at.toString())}
            </span>
          </div>
          <p className="mb-5">{post.description}</p>
          <p className="text-lg font-semibold pt-5 border-t-[1px] border-stone-400">
            댓글 {post.comments.length}개
          </p>
          <form action={createComment} className="mt-5 flex items-center gap-2">
            <div className="relative flex-center w-10 h-10 rounded-full bg-black flex-shrink-0 overflow-hidden">
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt="avatar"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <input type="hidden" name="postId" value={id} />
            <FormInput
              type="text"
              name="comment"
              placeholder="comment"
              required
            />
            <FormButton className="w-14 flex-shrink-0">입력</FormButton>
          </form>
          <div className="mt-5">
            {prevComments?.map((comment) => (
              <CommentItem
                key={comment.id}
                commentId={comment.id}
                userId={comment.user.id}
                commentOwnerId={comment.user.id}
                username={comment.user.username}
                content={comment.content}
                created_at={formatToTimeAgo(comment.created_at.toString())}
                avatar={comment.user.avatar!}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
