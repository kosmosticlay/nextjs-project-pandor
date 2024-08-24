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
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    if (post) {
      return post;
    }
  }
}

export async function getComments(postId: number) {
  if (postId) {
    const comments = await db.comment.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
        content: true,
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (comments) {
      return comments;
    }
  }
}
