import { Link, createFileRoute } from "@tanstack/react-router";
import { posts } from "@/content/posts";

export const Route = createFileRoute("/writing/")({
  component: WritingIndex,
  head: () => ({
    meta: [
      { title: "Writing · ATHSRUEAS" },
      {
        name: "description",
        content: "Essays and notes by Thomas Freestone on The Graph, web3, ownership, and data.",
      },
    ],
  }),
});

function WritingIndex() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm tracking-[0.18em] uppercase text-muted">Essays</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Writing</h1>
      <p className="mt-5 max-w-xl leading-7 text-ink-soft">
        Long-form notes on ownership, The Graph, and showing up for the work. Dates are included
        only when the original pages recorded them.
      </p>
      <ul className="mt-12 divide-y divide-rule border-y border-rule">
        {posts.map((post) => (
          <li key={post.slug} className="py-8">
            <Link
              to="/writing/$slug"
              params={{ slug: post.slug }}
              className="no-underline"
            >
              <h2 className="font-display text-2xl leading-snug hover:underline">{post.title}</h2>
            </Link>
            {post.updatedDate ? (
              <p className="mt-2 text-sm text-muted">
                Edited{" "}
                {new Date(post.updatedDate + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            ) : null}
            <p className="mt-3 leading-7 text-ink-soft">{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
