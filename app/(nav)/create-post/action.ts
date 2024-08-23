"use server";

import { getLoggedInUser } from "@/app/(auth)/action";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const postSchema = z.object({
  title: z.string({
    required_error: "제목을 입력해주세요.",
  }),
  price: z.number({
    required_error: "가격을 입력해주세요.",
  }),
  description: z
    .string({
      required_error: "내용을 입력해주세요.",
    })
    .min(10, "내용은 10자 이상 입력해주세요."),
});

export async function createPost(_: any, formData: FormData) {
  const user = await getLoggedInUser();
  const data = {
    title: formData.get("title"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
  };

  const result = await postSchema.safeParseAsync(data);

  if (!user) {
    return notFound();
  }

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    await db.post.create({
      data: {
        title: result.data.title,
        price: result.data.price,
        description: result.data.description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    redirect(`/`);
  }
}
