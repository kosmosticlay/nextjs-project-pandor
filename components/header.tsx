import { logOut } from "@/app/(auth)/action";
import { HeaderAvatar } from "./header-avatar";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default async function Header() {
  return (
    <div className="w-full h-16 bg-stone-800 flex justify-between">
      <h1 className="sr-only">Pandor</h1>
      <div className="w-40 bg-slate-100"></div>
      <div className="flex items-center">
        <form action={logOut}>
          <button className="flex items-center hover:text-rose-400">
            <span>로그아웃</span>
            <ArrowLeftStartOnRectangleIcon className="size-7 ml-1" />
          </button>
        </form>
        <HeaderAvatar />
      </div>
    </div>
  );
}
