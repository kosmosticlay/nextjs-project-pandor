"use client";

import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassCircleIcon as OutlineSearchIcon,
  PlusCircleIcon as OutlinePlusIcon,
  BookmarkIcon as OutlineBookmarkIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as SolidHomeIcon,
  MagnifyingGlassCircleIcon as SolidSearchIcon,
  PlusCircleIcon as SolidPlusIcon,
  BookmarkIcon as SolidBookmarkIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ username }: { username: string }) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full h-20 grid grid-cols-5 border-stone-600 border-t px-5 py-3 *:text-white bg-stone-800">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7 text-rose-400" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span
          className={`mt-1 ${
            pathname === "/" ? "text-rose-400" : "text-white"
          }`}
        >
          홈
        </span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? (
          <SolidSearchIcon className="w-7 h-7 text-rose-400" />
        ) : (
          <OutlineSearchIcon className="w-7 h-7" />
        )}
        <span
          className={`mt-1 ${
            pathname === "/search" ? "text-rose-400" : "text-white"
          }`}
        >
          검색
        </span>
      </Link>
      <Link href="/create-post" className="flex flex-col items-center gap-px">
        {pathname === "/create-post" ? (
          <SolidPlusIcon className="w-7 h-7 text-rose-400" />
        ) : (
          <OutlinePlusIcon className="w-7 h-7" />
        )}
        <span
          className={`mt-1 ${
            pathname === "/create-post" ? "text-rose-400" : "text-white"
          }`}
        >
          새 글
        </span>
      </Link>
      <Link href="/fav" className="flex flex-col items-center gap-px">
        {pathname === "/fav" ? (
          <SolidBookmarkIcon className="w-7 h-7 text-rose-400" />
        ) : (
          <OutlineBookmarkIcon className="w-7 h-7" />
        )}
        <span
          className={`mt-1 ${
            pathname === "/fav" ? "text-rose-400" : "text-white"
          }`}
        >
          즐겨찾기
        </span>
      </Link>
      <Link
        href={`/users/${username}`}
        className="flex flex-col items-center gap-px"
      >
        {pathname === `/users/${username}` ? (
          <SolidUserIcon className="w-7 h-7 text-rose-400" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span
          className={`mt-1 ${
            pathname === `/users/${username}` ? "text-rose-400" : "text-white"
          }`}
        >
          프로필
        </span>
      </Link>
    </div>
  );
}
