import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://athsrueas.site",
  output: "static",
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  integrations: [sitemap()],
  redirects: {
    "/athsrueas-eth": "/",
    "/web3/dephi": "/projects/dephi/",
    "/hosted-blog-pages/[slug]": "/writing/[slug]",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});