import { createFileRoute, redirect } from "@tanstack/react-router";
import { posts } from "@/content/posts";

export const Route = createFileRoute("/hosted-blog-pages/$slug")({
  beforeLoad: ({ params }) => {
    const match = posts.find((post) => post.oldPath.endsWith(`/${params.slug}`));
    throw redirect({
      to: match ? "/writing/$slug" : "/writing",
      params: match ? { slug: match.slug } : undefined,
    });
  },
});
