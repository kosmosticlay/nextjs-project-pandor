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
    if (user) {
      return user;
    }
  }
}

export async function getUserById(id: number) {
  if (id) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
  }
}

export async function getPost(id: number) {
  if (id) {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        price: true,
        description: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    if (post) {
      return post;
    }
  }
}
