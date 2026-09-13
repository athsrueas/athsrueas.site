import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Markdown } from "@/components/markdown";
import { getPost } from "@/content/posts";
import { bodies } from "@/content/writing/bodies";

export const Route = createFileRoute("/writing/$slug")({
  component: WritingPost,
  loader: ({ params }) => {
    const post = getPost(params.slug);
    const body = bodies[params.slug];
    if (!post || !body) throw notFound();
    return { post, body };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? "Writing"} · ATHSRUEAS` },
      { name: "description", content: loaderData?.post.description ?? "" },
    ],
  }),
});

function WritingPost() {
  const { post, body } = Route.useLoaderData();
  const edited = post.updatedDate
    ? new Date(post.updatedDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="mx-auto max-w-[42rem] px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm tracking-[0.16em] uppercase text-muted">
        <Link to="/writing" className="no-underline hover:underline">
          Writing
        </Link>
      </p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1]">
        {post.title}
      </h1>
      <p className="mt-5 text-sm text-muted">
        Athsrueas.eth · Thomas Freestone
        {edited ? ` · Edited ${edited}` : ""}
      </p>
      <div className="mt-10">
        <Markdown source={body} />
      </div>
    </article>
  );
}
