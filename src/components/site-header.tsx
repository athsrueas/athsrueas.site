import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="group flex items-baseline gap-2 no-underline"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg leading-none text-ink-soft" aria-hidden="true">
            {site.mark}
          </span>
          <span className="font-display text-sm font-medium tracking-[0.18em] text-ink">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 sm:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-[0.8125rem] tracking-[0.14em] uppercase no-underline transition-colors duration-150",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className={cn("block h-px w-5 bg-ink transition-transform", open && "translate-y-[4px] rotate-45")} />
            <span className={cn("block h-px w-5 bg-ink transition-opacity", open && "opacity-0")} />
            <span className={cn("block h-px w-5 bg-ink transition-transform", open && "-translate-y-[8px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-rule px-5 py-3 sm:hidden"
          aria-label="Primary"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="flex min-h-11 items-center text-sm tracking-[0.12em] uppercase no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
