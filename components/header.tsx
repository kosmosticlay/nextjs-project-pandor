import { logOut } from "@/app/(auth)/action";
import Image from "next/image";

export default async function Header({ username }: { username: string }) {
  return (
    <div className="w-full h-16 bg-stone-800 flex justify-between">
      <h1 className="sr-only">Pandor</h1>
      <div className="w-40 bg-slate-100">
        {/* <Image src="" alt="Pandor" width={40} height={40} /> */}
      </div>
      <div className="flex items-center">
        {/* 
       <form action={logOut}>
          <button className="hover:bg-orange-500">로그아웃 버튼(예정)</button>
        </form> */}
        <div className="size-10 rounded-full bg-white mx-4">
          {/* <Image src="" alt="avatar" width={24} height={24} /> */}
        </div>
      </div>
    </div>
  );
}
