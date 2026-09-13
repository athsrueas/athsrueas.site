import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFrame } from "@/components/site-frame";
import { AppErrorComponent } from "@/lib/error-component";
import appCss from "../styles.css?url";

const APP_NAME = "ATHSRUEAS";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Personal site of Thomas Freestone — husband, father, teacher, advocate, and community builder.",
      },
      { name: "theme-color", content: "#F4F1EA" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,480;9..144,560;9..144,640&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap",
      },
    ],
  }),
  component: RootDocument,
  errorComponent: AppErrorComponent,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteFrame>
            <Outlet />
          </SiteFrame>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 sm:px-8">
      <p className="text-sm tracking-[0.16em] uppercase text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-muted">
        That address is not part of this site. Try the home page, writing, or CV.
      </p>
      <p className="mt-8">
        <a href="/" className="underline">
          Back to home
        </a>
      </p>
    </main>
  );
}
