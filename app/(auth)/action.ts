import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function logOut() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}

export async function getLoggedInUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
}

export async function getUserByUsername(username: string) {
  if (username) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });
    console.log("here", user);
    if (user) {
      return user;
    }
  }
}
