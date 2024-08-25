"use server";

import db from "@/lib/db";

export async function searchPosts(formData: FormData) {
  const data = {
    category: formData.get("category") as string,
    keyword: formData.get("keyword") as string,
  };

  if (!data.keyword) {
    return [];
  }

  switch (data.category) {
    case "0":
      return await db.post.findMany({
        where: {
          OR: [
            {
              user: {
                username: {
                  contains: data.keyword,
                },
              },
            },
            {
              title: {
                contains: data.keyword,
              },
            },
            {
              description: {
                contains: data.keyword,
              },
            },
          ],
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
        take: 6,
        orderBy: {
          created_at: "desc",
        },
      });
    case "1":
      return await db.post.findMany({
        where: {
          user: {
            username: {
              contains: data.keyword,
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
        take: 6,
        orderBy: {
          created_at: "desc",
        },
      });
    case "2":
      return await db.post.findMany({
        where: {
          title: {
            contains: data.keyword,
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
        take: 6,
        orderBy: {
          created_at: "desc",
        },
      });
    case "3":
      return await db.post.findMany({
        where: {
          description: {
            contains: data.keyword,
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
        take: 6,
        orderBy: {
          created_at: "desc",
        },
      });
  }
}
