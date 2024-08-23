import { notFound } from "next/navigation";

export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return notFound();
  }

  return <h1>게시글 상세 페이지</h1>;
}
