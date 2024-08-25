"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import { redirect } from "next/navigation";
import fs from "fs/promises";

const editAccountSchema = z
  .object({
    username: z
      .string()
      .min(3, "아이디는 최소 3자 이상 입력하세요.")
      .max(15, "아이디의 최대 길이는 15자입니다."),
    email: z.string().email(),
    bio: z.string().optional(),
    password: z
      .string()
      .min(10, "비밀번호는 최소 10자 이상 입력하세요.")
      .optional(),
    confirm_password: z
      .string()
      .min(10, "비밀번호는 최소 10자 이상 입력하세요.")
      .optional(),
    avatar: z.any().optional(),
  })
  .superRefine(async ({ username, email }, ctx) => {
    const session = await getSession();
    const user = await db.user.findUnique({
      where: {
        username,
        email,
      },
      select: {
        id: true,
      },
    });
    if (user && user.id !== session.id) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 아이디 또는 이메일입니다.",
        path: ["username", "email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export async function editProfile(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session || !session.id) {
    throw new Error("세션이 존재하지 않습니다. 로그인을 다시 해주세요.");
  }

  const avatarFile = formData.get("avatar") as File;
  let avatarPath = "";

  if (avatarFile && avatarFile.size > 0) {
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const filename = avatarFile.name;
    await fs.writeFile(`./public/${filename}`, buffer);
    avatarPath = `/${filename}`;
  }

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    password: formData.get("password") as string | undefined,
    confirm_password: formData.get("confirm_password") as string | undefined,
    avatar: avatarPath || undefined,
  };

  if (!data.password) {
    delete data.password;
    delete data.confirm_password;
  }

  const result = await editAccountSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const updatedData: {
      username: string;
      email: string;
      bio?: string | null;
      password?: string;
      avatar?: string;
    } = {
      username: result.data.username,
      email: result.data.email,
      bio: result.data.bio,
    };

    if (result.data.password) {
      const hashedPassword = await bcrypt.hash(result.data.password, 12);
      updatedData.password = hashedPassword;
    }

    if (avatarPath) {
      updatedData.avatar = avatarPath;
    }

    const updatedUser = await db.user.update({
      where: { id: session.id },
      data: updatedData,
    });

    session.username = updatedUser.username;
    await session.save();

    redirect(`/users/${updatedUser.username}`);
  }
}
