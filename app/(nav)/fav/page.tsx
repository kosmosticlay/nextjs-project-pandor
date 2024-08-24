import SearchedPostContainer from "@/components/post/searched-post-container";
import { likeListPosts } from "./action";

export default async function Fav() {
  const posts = await likeListPosts();

  return (
    <div className="wrapper bg-blue-900">
      <h1 className="h1">좋아요 목록</h1>
      <SearchedPostContainer posts={posts} loading={false} />
    </div>
  );
}
