import { getLoggedInUser } from "@/app/(auth)/action";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function HeaderAvatar() {
  const user = await getLoggedInUser();
  if (!user) {
    notFound();
  }

  return (
    <div className="relative flex-center size-10 rounded-full mx-4 overflow-hidden">
      <Image
        src={user.avatar || "/default-avatar.png"}
        alt="avatar"
        fill
        sizes="40px"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
