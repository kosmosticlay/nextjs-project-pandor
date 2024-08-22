"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";

const checkUserExists = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  username: z
    .string()
    .min(3, "아이디는 3자 이상 입력하세요.")
    .refine(checkUserExists, "존재하지 않는 사용자입니다."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "something"
    );

    if (ok) {
      const session = await getSession();
      session.id = user!.id;

      await session.save();
      // redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 일치하지 않습니다."],
          username: [],
        },
      };
    }
  }
}
