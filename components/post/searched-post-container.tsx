import PostItem from "./post-item";
import Link from "next/link";

export type Post = {
  id: number;
  title: string;
  price: number;
  description: string;
  created_at: Date;
  user: {
    id: number;
    username: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
};
export default function SearchedPostContainer({
  posts,
  loading,
  searched,
}: {
  posts: Post[];
  loading: boolean;
  searched: boolean;
}) {
  return (
    <>
      {loading ? (
        <div className="loading-text">로딩 중...</div>
      ) : (
        <div className="w-[500px] lg:w-full min-h-screen flex flex-col items-center text-black">
          {!searched ? (
            <div className="loading-text">검색어를 입력하세요.</div>
          ) : posts.length > 0 ? (
            <div className="w-full mt-5 px-5 grid lg:grid-cols-2 gap-3 xl:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <PostItem
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    price={post.price}
                    created_at={post.created_at}
                    user={post.user}
                    comments={post._count.comments}
                    likes={post._count.likes}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="loading-text">검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </>
  );
}
