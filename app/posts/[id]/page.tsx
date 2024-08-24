import Link from "next/link";
import { notFound } from "next/navigation";
import { getComments, getLoggedInUser, getPost } from "@/app/(auth)/action";
import { formatToTimeAgo } from "@/lib/utils";
import { createComment } from "./action";
import FormInput from "@/components/form/input";
import FormButton from "@/components/form/button";
import CommentItem from "@/components/comment/comment-item";

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
  console.log(prevComments);

  return (
    <div className="wrapper min-h-screen bg-orange-950">
      <header className="w-full h-16">
        <Link href="/"> ← Home</Link>
      </header>
      <div className="w-full lg:flex bg-slate-600">
        <div className="w-full h-[400px] lg:w-1/2 h-content bg-black">
          그림 이미지 들어갈 곳
        </div>
        <div className="min-w-[400px] lg:w-1/2 flex flex-col">
          <h1 className="h1">{post.title}</h1>
          <span>
            <Link href={`/users/${post.user.username}`}>
              {post.user.username}
            </Link>
          </span>
          <span>{formatToTimeAgo(post.created_at.toString())}</span>
          <span>{post.price}</span>
          <p>{post.description}</p>
          <p>{post.likes.length}likes</p>
          <p>{post.comments.length}comments</p>
          <form action={createComment} className="mt-5 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-black flex-shrink-0"></div>
            <input type="hidden" name="postId" value={id} />
            <FormInput
              type="text"
              name="comment"
              placeholder="comment"
              required
            />
            <FormButton className="w-14 flex-shrink-0">입력</FormButton>
          </form>
          <div className="w-full bg-green-800 mt-5">
            {prevComments?.map((comment) => (
              <CommentItem
                key={comment.id}
                commentId={comment.id}
                userId={comment.user.id}
                commentOwnerId={comment.user.id}
                username={comment.user.username}
                content={comment.content}
                created_at={formatToTimeAgo(comment.created_at.toString())}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
