import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper-raised focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div id="main" className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
