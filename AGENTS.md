# ATHSRUEAS — personal site (Astro · static)

Static personal site of Thomas Freestone. Built with **Astro 7 + Tailwind 4**.
The build emits pure static HTML/CSS — no framework JS in the output.
Essays live as Markdown entries in a content collection.

## Commands (Node 22+)

- `npm install` — install dependencies
- `npm run dev` — dev server on port 8080
- `npm run build` — static build to `dist/` (pure HTML + one CSS file)
- `npm run check` — Astro type-check (run before finishing work)
- `npm run preview` — serve the built `dist/` locally

## Project layout

- `src/pages/` — Astro routes (home, writing index + posts, CV, deφ, 404)
- `src/content/writing/*.md` — essays. Add a post = add a `.md` here with
  frontmatter: `title`, `description`, `oldPath`, `order`, optional `updatedDate`.
  Keep `order` contiguous; the UI sorts by it.
- `src/content/site.ts` — site metadata, nav, social links
- `src/content.config.ts` — content-collection schema
- `src/styles/global.css` — Tailwind v4 theme tokens + article typography
- `src/layouts/BaseLayout.astro` — document shell (meta, og, fonts, header/footer)
- `astro.config.mjs` — site URL, static output, legacy-URL redirects, sitemap

## Access

This section records standing authorizations so future agents can act without
re-asking the owner.

### Git — push is automatic

- Remote: `git@github.com:athsrueas/athsrueas.site.git` (SSH, branch `main`)
- Auth: SSH key `~/.ssh/id_ed25519` is registered on the `athsrueas` GitHub account.
  Pushes are automatic — no prompts, no token entry.
- Identity: `user.name=athsrueas`, `user.email=thomasfreestone@gmail.com`
- Flow:
  ```
  git status
  git add -A
  git commit -m "short summary"
  git push
  ```
- If a push ever fails with auth errors: verify the key with `ssh -T git@github.com`,
  then ensure the remote is `git remote set-url origin git@github.com:athsrueas/athsrueas.site.git`.

### Cloudflare Pages — live and deployable

The site is **live** at `https://athsrueas.site` (and `https://www.athsrueas.site`),
served from Cloudflare Pages project **`athsrueas-site`** (`dist/` is pure static).
Projects and infra:

- Account: `52ff65073a2fd35a3a45147e7fdf67e3`
  (`Thomasfreestone@gmail.com's Account`)
- Zone: `athsrueas.site` (`282f91a8fe5855be1fde251cc164a119`, active, Cloudflare DNS)
- Pages project: `athsrueas-site` (classic Pages, NOT the Workers/delegated variant)
- Custom domains attached to the project: `athsrueas.site` (apex) + `www.athsrueas.site`;
  DNS is two proxied CNAMEs → `athsrueas-site.pages.dev`. Mail records (MX/SPF
  Mailgun, Brevo code, DKIM, DMARC) must be left untouched.

Deploy command (also `npm run deploy`):

```
npm run build && wrangler pages deploy dist --project-name athsrueas-site --branch main
```

- Token: `CLOUDFLARE_API_TOKEN` lives in the repo-local `.env` (gitignored). Wrangler
  loads `.env` automatically; sanity-check with `wrangler whoami`.
- **Never commit, hardcode, or log the token.** Verify with
  `git check-ignore -v .env` after any `.gitignore` edit.
- If `CLOUDFLARE_API_TOKEN` is missing or expired, stop and ask the owner to
  create/replace it (Cloudflare → My Profile → API Tokens → Create Token →
  Cloudflare Pages, Edit) rather than guessing credentials.

Gotchas learned the hard way:

- Never re-run `wrangler pages project create` for this project. Wrangler's new
  "Pages → Workers" delegation flow auto-installs the `@astrojs/cloudflare` SSR
  adapter into the repo (modifying `astro.config.mjs`, `package.json`,
  `tsconfig.json`, adding a `wrangler.jsonc`), breaking the lightweight static
  build (`dist` splits into `client` + `server`). If that ever happens, revert
  those files and `npm uninstall @astrojs/cloudflare`.
- If a stale `.wrangler/deploy/config.json` blocks `pages deploy`, `rm -rf .wrangler`
  first.

## Secrets policy

- No `.env` files, keys, or tokens in the repo.
- Environment-provided secrets only; never write one into committed code or logs.