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

### Cloudflare Pages — deploy access (scoped API token)

Deployment target is Cloudflare Pages; `dist/` is pure static and drops straight in.

The owner intends to provide a **scoped Cloudflare API token** for deployment
(owner action: GitHub/Cloudflare UI, not something an agent creates):

- **Scope:** Cloudflare Pages — Edit, restricted to the athsrueas Pages account/project(s)
- **Env var:** `CLOUDFLARE_API_TOKEN` (plus `CLOUDFLARE_ACCOUNT_ID` if required by the flow)
- Once the token is present in the environment, deploy with:
  ```
  npm run build
  npx wrangler pages deploy dist --project-name <pages-project>
  ```
- **Never commit, hardcode, or log the token.** It lives only in the environment /
  secrets, and `wrangler` pulls it from `CLOUDFLARE_API_TOKEN` automatically.
- If `CLOUDFLARE_API_TOKEN` is missing or expired, stop and ask the owner to
  create/replace it (Cloudflare → My Profile → API Tokens → Create Token →
  Cloudflare Pages, Edit) rather than guessing credentials.

## Secrets policy

- No `.env` files, keys, or tokens in the repo.
- Environment-provided secrets only; never write one into committed code or logs.