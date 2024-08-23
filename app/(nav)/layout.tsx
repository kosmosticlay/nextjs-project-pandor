import Nav from "@/components/nav";
import { getLoggedInUser } from "../(auth)/action";
import { notFound } from "next/navigation";
import Header from "@/components/header";

export default async function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  if (!user) {
    return notFound();
  }

  return (
    <div className="min-w-[600px]">
      <Header username={user.username} />
      {children}
      <Nav username={user.username} />
    </div>
  );
}
