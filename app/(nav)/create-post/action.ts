"use server";

import { getLoggedInUser } from "@/app/(auth)/action";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";

/* 나중에 price: z.coerce.number()로 변경 */
const postSchema = z.object({
  title: z
    .string({
      required_error: "제목을 입력해주세요. (최대 40자)",
    })
    .max(40, "제목은 40자 이내로 입력해주세요."),
  price: z.number({
    required_error: "가격을 입력해주세요.",
  }),
  description: z
    .string({
      required_error: "내용을 입력해주세요.",
    })
    .min(10, "내용은 10자 이상 입력해주세요."),
  photo: z.string().optional(),
});

export async function createPost(_: any, formData: FormData) {
  const user = await getLoggedInUser();

  let photoPath = "/No-Image-Placeholder.png";
  const photoFile = formData.get("photo") as File | null;

  if (photoFile && photoFile.size > 0) {
    const photoData = await photoFile.arrayBuffer();
    const fileName = photoFile.name;
    await fs.writeFile(`./public/${fileName}`, Buffer.from(photoData));
    photoPath = `/${fileName}`;
  }

  const data = {
    title: formData.get("title"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
    photo: photoPath,
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
        photo: result.data.photo,
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
