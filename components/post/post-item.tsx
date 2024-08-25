import { formatToTimeAgo, truncateString } from "@/lib/utils";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

interface PostItemProps {
  id: number;
  title: string;
  price: number;
  created_at: Date;
  user: {
    id: number;
    username: string;
  };
  comments: number;
  likes: number;
  photo: string | undefined;
}

export default function PostItem({
  id,
  title,
  price,
  created_at,
  user,
  comments,
  likes,
  photo,
}: PostItemProps) {
  const formattedDate = formatToTimeAgo(created_at.toString());
  const truncatedTitle = truncateString(title, 16);

  return (
    <div className="flex-shrink-0 active:button-animation p-1 bg-stone-800 rounded-md border-2 border-transparent hover:border-rose-400 box-border transition-all duration-100">
      <div className="rounded-md p-2  bg-rose-50 flex h-[180px]">
        <div className="w-[180px] h-full mr-2 bg-black rounded-md ">
          <img
            src={photo}
            alt={title}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="font-semibold text-lg">{truncatedTitle}</span>
            <div className="text-sm flex items-center">
              <span>@{user.username}</span>
              <span className=" text-stone-500 ml-2">{formattedDate}</span>
            </div>
            <p className="font-semibold mt-1 text-lg">
              {price.toLocaleString("ko-KR")}원
            </p>
          </div>
          <div className="flex justify-end *:mx-1">
            <div className="flex items-end">
              <span>{comments}</span>
              <ChatBubbleLeftRightIcon className="size-5 mx-1" />
            </div>
            <div className="flex items-end">
              <span>{likes}</span>
              <HeartIcon className="size-5 mx-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
