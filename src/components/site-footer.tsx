import { Link } from "@tanstack/react-router";
import { links, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-sm tracking-[0.16em] text-ink">
            {site.mark} {site.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {site.person} · {site.ens}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <li>
            <a href={links.x} className="hover:text-ink">
              X
            </a>
          </li>
          <li>
            <a href={links.linkedin} className="hover:text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.discordPersonal} className="hover:text-ink">
              Discord
            </a>
          </li>
          <li>
            <Link to="/cv" className="hover:text-ink no-underline">
              CV
            </Link>
          </li>
          <li>
            <Link to="/writing" className="hover:text-ink no-underline">
              Writing
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
