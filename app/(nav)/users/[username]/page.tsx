import { getLoggedInUser, getUserByUsername } from "@/app/(auth)/action";
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

  return (
    <div>
      <h1>{user.username}의 프로필</h1>
      <p>{user.email}</p>
      {loggedInUser.id === user.id && (
        <Link href={`/users/${username}/edit`}>프로필 수정 버튼</Link>
      )}
    </div>
  );
}
