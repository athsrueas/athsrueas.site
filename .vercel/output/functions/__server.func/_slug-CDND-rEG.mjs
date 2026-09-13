import { b as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-bzpwAwGD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CDND-rEG.js
var import_jsx_runtime = require_jsx_runtime();
function inline(text) {
	const nodes = [];
	const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
	let last = 0;
	let match;
	let key = 0;
	while (match = pattern.exec(text)) {
		if (match.index > last) nodes.push(text.slice(last, match.index));
		if (match[1] && match[2]) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: match[2],
			className: "underline decoration-rule",
			children: match[1]
		}, key++));
		else if (match[3]) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: match[3] }, key++));
		else if (match[4]) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: match[4] }, key++));
		last = match.index + match[0].length;
	}
	if (last < text.length) nodes.push(text.slice(last));
	return nodes;
}
function parse(markdown) {
	const lines = markdown.replace(/\r\n/g, "\n").split("\n");
	const blocks = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i] ?? "";
		if (!line.trim()) {
			i += 1;
			continue;
		}
		if (line.startsWith("## ")) {
			blocks.push({
				type: "h2",
				text: line.slice(3).trim()
			});
			i += 1;
			continue;
		}
		if (line.startsWith("### ")) {
			blocks.push({
				type: "h3",
				text: line.slice(4).trim()
			});
			i += 1;
			continue;
		}
		if (line.startsWith("> ")) {
			const parts = [];
			while (i < lines.length && (lines[i] ?? "").startsWith("> ")) {
				parts.push((lines[i] ?? "").slice(2));
				i += 1;
			}
			blocks.push({
				type: "quote",
				text: parts.join(" ")
			});
			continue;
		}
		if (line.startsWith("- ")) {
			const items = [];
			while (i < lines.length && (lines[i] ?? "").startsWith("- ")) {
				items.push((lines[i] ?? "").slice(2));
				i += 1;
			}
			blocks.push({
				type: "ul",
				items
			});
			continue;
		}
		const parts = [line];
		i += 1;
		while (i < lines.length && (lines[i] ?? "").trim() && !(lines[i] ?? "").startsWith("## ") && !(lines[i] ?? "").startsWith("### ") && !(lines[i] ?? "").startsWith("> ") && !(lines[i] ?? "").startsWith("- ")) {
			parts.push(lines[i] ?? "");
			i += 1;
		}
		blocks.push({
			type: "p",
			text: parts.join(" ")
		});
	}
	return blocks;
}
function Markdown({ source }) {
	const blocks = parse(source);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: blocks.map((block, i) => {
			if (block.type === "h2") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "pt-4 font-display text-2xl",
				children: inline(block.text)
			}, i);
			if (block.type === "h3") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "pt-2 font-display text-xl",
				children: inline(block.text)
			}, i);
			if (block.type === "quote") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "border-l-[3px] border-ink pl-5 text-[1.05rem] leading-8 text-ink-soft",
				children: inline(block.text)
			}, i);
			if (block.type === "ul") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "list-disc space-y-2 pl-5 leading-7",
				children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(item) }, item))
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[1.0625rem] leading-8",
				children: inline(block.text)
			}, i);
		})
	});
}
function WritingPost() {
	const { post, body } = Route.useLoaderData();
	const edited = post.updatedDate ? (/* @__PURE__ */ new Date(post.updatedDate + "T00:00:00")).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-[42rem] px-5 py-14 sm:px-8 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tracking-[0.16em] uppercase text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/writing",
					className: "no-underline hover:underline",
					children: "Writing"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1]",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-sm text-muted",
				children: ["Athsrueas.eth · Thomas Freestone", edited ? ` · Edited ${edited}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: body })
			})
		]
	});
}
//#endregion
export { WritingPost as component };
