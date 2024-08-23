import db from "@/lib/db";

export async function getAllPosts() {
  const posts = await db.post.findMany({
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
    take: 6,
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}

export async function getNextPosts(page: number) {
  const posts = await db.post.findMany({
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
    take: 6,
    skip: page * 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}
