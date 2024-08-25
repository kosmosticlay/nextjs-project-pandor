import {
  getLoggedInUser,
  getPostsByUser,
  getUserByUsername,
} from "@/app/(auth)/action";
import PostItem from "@/components/post/post-item";
import { PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  if (!username) {
    return notFound();
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return notFound();
  }

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) {
    return notFound();
  }

  const posts = await getPostsByUser(user.id);
  if (!posts) {
    return notFound();
  }

  return (
    <div className="wrapper">
      <div className="flex items-center">
        <h1 className="h1">{user.username}님의 프로필</h1>
        {loggedInUser.id === user.id && (
          <Link href={`/users/${username}/edit`}>
            <PencilIcon
              title="프로필 수정 버튼"
              className="border rounded-full p-1 size-8 ml-3 mt-1 hover:border-rose-400 hover:text-rose-400 active:button-animation cursor-pointer"
            />
          </Link>
        )}
      </div>
      <div className="relative w-[150px] h-[150px] bg-rose-100 rounded-full flex-center overflow-hidden">
        <Image
          className=""
          src={user.avatar!}
          alt="유저 아바타"
          fill
          sizes="150px"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="w-[500px] mt-5 p-3 flex flex-col items-center border border-rose-100 border-1 rounded-lg ">
        <span className="font-semibold text-lg">이메일</span>
        <p className="mb-5">{user.email}</p>
        <span className="font-semibold text-lg">소개글</span>
        <p className="">{user.bio ? `${user.bio}` : "소개글을 작성해주세요"}</p>
      </div>
      <div className="w-full pb-28 flex flex-col items-center px-5 mt-10">
        <h1 className="h1">내가 작성한 글 목록</h1>
        <div className="text-black w-[500px] lg:w-full mt-5 px-5 grid lg:grid-cols-2 gap-3 xl:grid-cols-3">
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
      </div>
    </div>
  );
}
