import { Link, createFileRoute } from "@tanstack/react-router";
import { links, site } from "@/content/site";
import { posts } from "@/content/posts";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ATHSRUEAS · Thomas Freestone" },
      {
        name: "description",
        content: site.description,
      },
    ],
  }),
});

function Home() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <p className="font-display text-sm tracking-[0.22em] text-ink-soft">{site.mark} ATHSRUEAS</p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,7vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.04em] text-ink">
          Thomas Freestone
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft sm:text-xl">{site.tagline}</p>
        <p className="mt-8 max-w-2xl text-base leading-7 text-ink sm:text-[1.125rem] sm:leading-8">
          {site.intro}
        </p>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm tracking-[0.12em] uppercase">
          <Link to="/cv" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
            CV
          </Link>
          <Link
            to="/writing"
            className="underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            Writing
          </Link>
          <a
            href={links.linkedin}
            className="underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            LinkedIn
          </a>
          <a href={links.x} className="underline decoration-rule underline-offset-4 hover:decoration-ink">
            X
          </a>
        </div>
      </section>

      <section className="border-y border-rule">
        <div className="mx-auto grid max-w-5xl gap-0 sm:grid-cols-2">
          <figure className="border-b border-rule sm:border-b-0 sm:border-r">
            <img
              src="/images/portrait-family.jpg"
              alt="Thomas Freestone holding a young child"
              className="aspect-[4/5] w-full object-cover object-[50%_18%] sm:aspect-[4/5]"
              width={800}
              height={1000}
            />
          </figure>
          <figure>
            <img
              src="/images/teaching.jpg"
              alt="Thomas Freestone writing on a classroom whiteboard"
              className="aspect-[4/5] w-full object-cover object-center"
              width={800}
              height={1000}
            />
          </figure>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:grid-cols-2 sm:gap-16 sm:px-8 sm:py-24">
        <div>
          <h2 className="font-display text-sm tracking-[0.18em] uppercase text-muted">About</h2>
          <p className="mt-4 text-[1.0625rem] leading-7">{site.identityLine}</p>
          <p className="mt-4 text-[1.0625rem] leading-7 text-ink-soft">
            {site.educationLine}. Licensed teacher in Indiana. Graph Advocate. Currently leading IT
            projects at Performance Services.
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.18em] uppercase text-muted">Work</h2>
          <p className="mt-4 text-[1.0625rem] leading-7">
            Software (IT) Project Manager at Performance Services, serving K-12 schools and
            municipalities across the United States.
          </p>
          <p className="mt-4 text-[1.0625rem] leading-7 text-ink-soft">
            Previously mathematics teacher at Christel House Indy, 2018–2024, and an independent
            Graph Advocate from 2022–2024.
          </p>
          <p className="mt-5">
            <Link to="/cv" className="text-sm tracking-[0.12em] uppercase underline decoration-rule">
              Full CV
            </Link>
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.18em] uppercase text-muted">Background</h2>
          <p className="mt-4 text-[1.0625rem] leading-7">
            Applied mathematics, secondary math, and a long stretch of classroom work in
            Indianapolis — community, content, teacher.
          </p>
          <p className="mt-4 text-[1.0625rem] leading-7 text-ink-soft">
            Weaving new threads, stronger than the fray.
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.18em] uppercase text-muted">Community</h2>
          <p className="mt-4 text-[1.0625rem] leading-7">
            Graph Advocate. Third Place —{" "}
            <a href={links.thirdPlaceWiki} className="underline decoration-rule">
              a place to gather
            </a>
            . Discord Athsrueas · Telegram @Athsrueas
          </p>
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            <li>
              <a href={links.discordPersonal} className="underline decoration-rule">
                Discord
              </a>
            </li>
            <li>
              <a href={links.storygraph} className="underline decoration-rule">
                Currently reading
              </a>
            </li>
            <li>
              <a href={links.tcgplayer} className="underline decoration-rule">
                Magic shop
              </a>
            </li>
            <li>
              <Link to="/projects/dephi" className="underline decoration-rule">
                deφ
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl sm:text-4xl">Writing</h2>
            <Link
              to="/writing"
              className="text-sm tracking-[0.12em] uppercase underline decoration-rule"
            >
              All essays
            </Link>
          </div>
          <ul className="mt-10 divide-y divide-rule border-y border-rule">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to="/writing/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col gap-2 py-6 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <span className="font-display text-xl leading-snug group-hover:underline sm:text-2xl">
                    {post.title}
                  </span>
                  <span className="max-w-md shrink-0 text-sm text-muted sm:text-right">
                    {post.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
