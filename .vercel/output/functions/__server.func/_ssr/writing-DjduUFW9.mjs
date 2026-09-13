import { n as posts } from "./posts-CWDW3ZXq.mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/writing-DjduUFW9.js
var import_jsx_runtime = require_jsx_runtime();
function WritingIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tracking-[0.18em] uppercase text-muted",
				children: "Essays"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl sm:text-5xl",
				children: "Writing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-xl leading-7 text-ink-soft",
				children: "Long-form notes on ownership, The Graph, and showing up for the work. Dates are included only when the original pages recorded them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-12 divide-y divide-rule border-y border-rule",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/writing/$slug",
							params: { slug: post.slug },
							className: "no-underline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl leading-snug hover:underline",
								children: post.title
							})
						}),
						post.updatedDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"Edited",
								" ",
								(/* @__PURE__ */ new Date(post.updatedDate + "T00:00:00")).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-7 text-ink-soft",
							children: post.description
						})
					]
				}, post.slug))
			})
		]
	});
}
//#endregion
export { WritingIndex as component };
