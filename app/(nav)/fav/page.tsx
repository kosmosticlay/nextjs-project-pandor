import FavPostContainer from "@/components/post/fav-post-container";
import { likeListPosts } from "./action";

export default async function Fav() {
  const posts = await likeListPosts();

  return (
    <div className="wrapper">
      <h1 className="h1">좋아요 목록</h1>
      <FavPostContainer posts={posts} loading={false} />
    </div>
  );
}
