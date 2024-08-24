import PostItem from "./post-item";

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
}: {
  posts: Post[];
  loading: boolean;
}) {
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full md:grid md:grid-cols-2 gap-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
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
            ))
          ) : (
            <div>No posts found.</div>
          )}
        </div>
      )}
    </>
  );
}
