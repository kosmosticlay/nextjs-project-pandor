"use server";

import { getLoggedInUser } from "@/app/(auth)/action";
import db from "@/lib/db";
import { notFound } from "next/navigation";

export async function likeListPosts() {
  const user = await getLoggedInUser();

  if (!user) {
    notFound();
  }

  const data = await db.post.findMany({
    where: {
      likes: {
        some: {
          userId: user.id,
        },
      },
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
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (data.length === 0) {
    return [];
  }

  return data;
}
