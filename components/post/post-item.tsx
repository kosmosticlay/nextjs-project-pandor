import { formatToTimeAgo } from "@/lib/utils";

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
}

export default function PostItem({
  id,
  title,
  price,
  created_at,
  user,
  comments,
  likes,
}: PostItemProps) {
  const formattedDate = formatToTimeAgo(created_at.toString());
  console.log(created_at, user, comments, likes);

  return (
    <div className="flex h-[200px] p-2 bg-neutral-400">
      <div className="w-[200px] h-full mr-2 bg-black"></div>
      <div className="flex-1">
        <p>{title}</p>
        <p>{price}</p>
        <p>{formattedDate}</p>
        <p>{user.username}</p>
        <div className=" bg-slate-800 flex justify-end *:mx-1">
          <p>{comments} comments</p>
          <p>{likes} likes</p>
        </div>
      </div>
    </div>
  );
}
