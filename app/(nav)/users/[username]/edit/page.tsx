import { getLoggedInUser, getUserByUsername } from "@/app/(auth)/action";
import { notFound, redirect } from "next/navigation";

export default async function EditProfile({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  if (!username) {
    return notFound();
  }

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) {
    redirect("/login");
  }

  const profileUser = await getUserByUsername(username);
  if (!profileUser) {
    return notFound();
  }

  // 로그인한 유저만 페이지 접근 가능
  if (loggedInUser.id !== profileUser.id) {
    return redirect(`/users/${username}`);
  }

  return <h1>{username}의 프로필 수정페이지</h1>;
}
