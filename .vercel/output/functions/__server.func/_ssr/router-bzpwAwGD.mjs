import { i as __toESM } from "../_runtime.mjs";
import { n as posts, t as getPost } from "./posts-CWDW3ZXq.mjs";
import { B as notFound, I as redirect, V as require_react, _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-bzpwAwGD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Something went wrong"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm break-words text-muted",
			children: errorMessage(error)
		})]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var site = {
	name: "ATHSRUEAS",
	mark: "φ",
	person: "Thomas Freestone",
	ens: "athsrueas.eth",
	tagline: "Husband · Father · Teacher · Advocate · Community Builder",
	description: "Personal site of Thomas Freestone — husband, father, teacher, advocate, and community builder. Writing, CV, and work.",
	intro: "I am a Software (IT) Project Manager at Performance Services. We serve communities across the United States as a leader in Design Build Construction, working mostly with K-12 institutions and municipalities.",
	educationLine: "BS Applied Mathematics — Secondary Math",
	identityLine: "Thomas Freestone · BS Applied Math · Purdue at Indianapolis"
};
var nav = [
	{
		href: "/",
		label: "Home"
	},
	{
		href: "/writing",
		label: "Writing"
	},
	{
		href: "/cv",
		label: "CV"
	},
	{
		href: "/projects/dephi",
		label: "deφ"
	}
];
var links = {
	linkedin: "https://www.linkedin.com/in/thomasfreestone/",
	linkedinAlt: "https://www.linkedin.com/in/thomas-freestone-172392164/",
	x: "https://x.com/athsrueas",
	reddit: "https://www.reddit.com/user/athsrueas",
	discordPersonal: "https://discord.gg/j65hAyeR4r",
	discordGraph: "https://discord.gg/graphprotocol",
	telegram: "https://t.me/Athsrueas",
	storygraph: "https://app.thestorygraph.com/profile/athsrueas",
	tcgplayer: "https://shop.tcgplayer.com/sellerfeedback/bfa3ae81",
	ucn: "https://www.ucngaming.com/",
	ucnFacebook: "https://www.facebook.com/UCN.Gaming/",
	christelHouse: "https://www.chindy.org/",
	thirdPlaceWiki: "https://en.wikipedia.org/wiki/Third_place",
	thirdPlaceSite: "https://sites.google.com/view/third-place/third-place",
	theGraph: "https://thegraph.com/"
};
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-auto border-t border-rule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-sm tracking-[0.16em] text-ink",
				children: [
					site.mark,
					" ",
					site.name
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-sm text-sm text-muted",
				children: [
					site.person,
					" · ",
					site.ens
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: links.x,
						className: "hover:text-ink",
						children: "X"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: links.linkedin,
						className: "hover:text-ink",
						children: "LinkedIn"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: links.discordPersonal,
						className: "hover:text-ink",
						children: "Discord"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cv",
						className: "hover:text-ink no-underline",
						children: "CV"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/writing",
						className: "hover:text-ink no-underline",
						children: "Writing"
					}) })
				]
			})]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "border-b border-rule",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "group flex items-baseline gap-2 no-underline",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg leading-none text-ink-soft",
						"aria-hidden": "true",
						children: site.mark
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-medium tracking-[0.18em] text-ink",
						children: site.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 sm:flex",
					"aria-label": "Primary",
					children: nav.map((item) => {
						const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							className: cn("text-[0.8125rem] tracking-[0.14em] uppercase no-underline transition-colors duration-150", active ? "text-ink" : "text-muted hover:text-ink"),
							"aria-current": active ? "page" : void 0,
							children: item.label
						}, item.href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex h-11 w-11 items-center justify-center sm:hidden",
					"aria-expanded": open,
					"aria-controls": "mobile-nav",
					onClick: () => setOpen((v) => !v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: open ? "Close menu" : "Open menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col gap-1.5",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-px w-5 bg-ink transition-transform", open && "translate-y-[4px] rotate-45") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-px w-5 bg-ink transition-opacity", open && "opacity-0") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-px w-5 bg-ink transition-transform", open && "-translate-y-[8px] -rotate-45") })
						]
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			id: "mobile-nav",
			className: "border-t border-rule px-5 py-3 sm:hidden",
			"aria-label": "Primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.href,
					className: "flex min-h-11 items-center text-sm tracking-[0.12em] uppercase no-underline",
					onClick: () => setOpen(false),
					children: item.label
				}) }, item.href))
			})
		}) : null]
	});
}
function SiteFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper-raised focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var styles_default = "/assets/styles-CgEipe3n.css";
var APP_NAME = "ATHSRUEAS";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Personal site of Thomas Freestone — husband, father, teacher, advocate, and community builder."
			},
			{
				name: "theme-color",
				content: "#F4F1EA"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,480;9..144,560;9..144,640&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
			}
		]
	}),
	component: RootDocument,
	errorComponent: AppErrorComponent,
	notFoundComponent: NotFound
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-paper text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-24 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tracking-[0.16em] uppercase text-muted",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "That address is not part of this site. Try the home page, writing, or CV."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "underline",
					children: "Back to home"
				})
			})
		]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-C9AES1_Z.mjs");
var Route$7 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "ATHSRUEAS · Thomas Freestone" }, {
		name: "description",
		content: site.description
	}] })
});
var Route$6 = createFileRoute("/athsrueas-eth")({ beforeLoad: () => {
	throw redirect({ to: "/" });
} });
var $$splitComponentImporter$3 = () => import("./cv-ClKLiAmb.mjs");
var Route$5 = createFileRoute("/cv")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "CV · Thomas C Freestone" }, {
		name: "description",
		content: "CV of Thomas C Freestone: IT project manager, mathematics teacher, Graph Advocate."
	}] })
});
var Route$4 = createFileRoute("/hosted-blog-pages/$slug")({ beforeLoad: ({ params }) => {
	const match = posts.find((post) => post.oldPath.endsWith(`/${params.slug}`));
	throw redirect({
		to: match ? "/writing/$slug" : "/writing",
		params: match ? { slug: match.slug } : void 0
	});
} });
var $$splitComponentImporter$2 = () => import("./dephi-C48xpIGb.mjs");
var Route$3 = createFileRoute("/projects/dephi")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "deφ · ATHSRUEAS" }, {
		name: "description",
		content: "deφ (Dephi) is a decentralized application for transparency and accountability in the nonprofit sector."
	}] })
});
var Route$2 = createFileRoute("/web3/dephi")({ beforeLoad: () => {
	throw redirect({ to: "/projects/dephi" });
} });
var $$splitComponentImporter$1 = () => import("./writing-DjduUFW9.mjs");
var Route$1 = createFileRoute("/writing/")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Writing · ATHSRUEAS" }, {
		name: "description",
		content: "Essays and notes by Thomas Freestone on The Graph, web3, ownership, and data."
	}] })
});
var bodies = {
	ownership: `It was 2020 and the bitcoin bull market was in full swing. All of my telegram groups were going wild — "WAGMI LFG to the moon!" — and a token I just recently learned about on Coinbase Learn and Earn climbed from 25c to 50c overnight. I was beyond thrilled and locked in what I thought were unbelievable profits. No more than a week later I was shocked to see the price continue to spike upwards. In the coming year GRT would continue to climb to an ATH of over $2.88. I rode the emotional highs and lows until I came to the realization that I really had no idea what was going on. Why were any of these tokens rising and falling? I had won and lost large amounts of money without really knowing anything about what I was participating in.

The details about a decentralized web in the videos I had watched on Coinbase that had originally interested me had become irrelevant in the face of all the rockets and the chance at ballooning my money. I had been very lucky and sold all of my crypto in the middle of what I thought was a correction that turned out to be a constant downturn, the beginning of a bear market, not because I was smart but because I needed the money for a down payment on my first house. I realized that I had almost lost a significant amount of my life savings on a bet placed on a token I knew far too little about. Not only that but I was hitching my wagon to a train without doing anything to ensure it was going to continue moving. I hadn't coded any subgraphs, nor was I really using any of the products that use The Graph. This was perhaps the best sort of wake-up call, one that I felt strongly but did not leave me with any bitterness about the project from great loss.

I'm not going to speak on The Graph as an investment in a financial sense. To quote graphy, the delightful bot from The Graph's telegram:

> The Graph Foundation would like to remind you to only purchase the amount of GRT you intend to use in the network. GRT is a work utility token designed to be used by Consumers, Delegators, Curators and Indexers. Thank you for helping build this important piece of Web3 infrastructure.

It's a matter of emphasis. What we encourage will grow, and what we discourage will be minimized. By putting the participants first The Graph community is supporting sustainable growth and benefits for the whole community.

I decided that I wanted to take ownership of The Graph seriously after meeting other members of the community. I credit the leadership of the graphtronauts community for welcoming me in and showing me that there was more to the protocol and the community than just an opportunity to make money (though of course, that is present).

From John Locke's *Two Treatises of Government*, Section 27:

> Though the earth, and all inferior creatures, be common to all men, yet every man has a property in his own person: this no body has any right to but himself. The labour of his body, and the work of his hands, we may say, are properly his.

From Brandon Ramirez's [AMA on Reddit](https://www.reddit.com/r/thegraph/comments/tra1ms/hi_im_brandon_ramirez_cofounder_of_the_graph_and/):

> My vision for The Graph is that it empowers creators to solve humanity's most pressing problems. Many problems today are not fundamentally technological in nature, but boil down to poorly designed incentives.

The creation of The Graph is rooted in these and related ideas. The very nature of GRT as a work token speaks to the vision and incentive structure put in place to drive ownership of The Graph into the hands of people who are builders. It is the network, the community, the work that is done in our cities to bring people together and coordinate our thoughts that should be invested in. I know of no other crypto project that is so aligned in this vision of what this new sort of organization should be. I define ownership this way:

> Being present in your work and taking responsibility for your decisions such that the resulting product has characteristics intentionally placed there.

When the founders created The Graph particular attention was given to the incentive structure. Everything from the messaging from the early team, the protocol code itself, and using a crypto token over a traditional company with stock leads to the encouragement of stake in the ideas of The Graph. To use the protocol you need to have GRT. This is by design and despite several suggestions or calls to allow for alternatives in the billing system the requirement to spend GRT remains. Customers of The Graph have stake in the protocol in the form of a billing account. Stake is probably most obvious to the other participants. Not only do indexers hold a stake in the traditional sense, they also participate in the protocol in such a way that their GRT is at stake. With the next version of The Graph this security system of staking is to be expanded to more participants including delegators.

Stake is the fundamental feature of the protocol that provides security in the form of an economic disincentive to provide false data. In the future, all data services built on The Graph will utilize this stake system, likely on an individual query or service basis. There is a plan for each piece of information retrieved on The Graph to have a stake associated with it to contribute to the verification of the authenticity of the information. With all of these together every participant in the network has a vested interest in the improvement, longevity, accessibility, and overall value of the network because all rewards and query fees are paid in GRT. The same can be said for GRT grants given out by the protocol. Again having GRT naturally incentivizes the holder to contribute to the protocol. When one takes full responsibility for one's work, when that work is aligned to a purpose, and when the rewards of the work are tied to the outcomes of the work the trend is towards sustained and concerted progress towards the aim. Even features that at the outset seem like downsides, such as the inflation of the token through rewards, have a plethora of benefits outside of the stated purpose of supporting indexers. Not least that as the token is inflated wallets that simply hold the token and do not participate or meaningfully contribute in order to earn more GRT will see diminishing returns while wallets that continuously receive GRT due to contributions to the network and community enjoy magnified returns. This directly incentivizes participation beyond even the natural incentive.

Aligned incentives change the game from swimming upstream to working with the current.

In the current climate of disinterested workers who see little connection between their effort and the rewards of their effort a community like The Graph is even more powerful. Most jobs don't offer stock options or any other form of incentive that is tied to the success of the business. These jobs exist, of course, but for the average person ([whose median income](https://worldpopulationreview.com/country-rankings/median-income-by-country) tops out at $30,000 annually and drops off significantly from there outside of the United States) the idea that your work might meaningfully contribute to the success of an endeavor and that you will share in the rewards is essentially unheard of. Protocols like The Graph don't even need to be altruistic to offer a significant paradigm shift and opportunity for the entire world.

It is impossible to predict outcomes, but that doesn't remove the importance of trying to understand how behaviors and decisions made now could impact outcomes in the future. My initial experience with The Graph exemplifies the dangers of a short-term mentality. Caught up in the "get rich quick" frenzy, I prioritized immediate profits over understanding the project's true value. This lack of long-term vision led me to make decisions based on emotions rather than informed analysis. The larger problem was that many people had fallen into the same trap as me, collectively driving the price of the token far above what was reasonable. This unsustainable price interfered with the utility of the token; more broadly the frenzy of activity that occurs during any price run clogs up the public blockchain and is frustrating for those who are wanting to use the network for more practical purposes.

The Graph's value increases as more users and developers participate. By taking a long view, stakeholders are more likely to contribute to the network's growth through building applications, indexing data, and curating high-quality information. The network effect further multiplies all of this, ultimately benefiting everyone with stake. The developers who use The Graph such as GraphOps are participants with stake themselves who are motivated by profit, despite that GraphOps provides essential support to budding indexers because they are invested in the success of the network as a whole. In the Graphtronauts we like a saying: "we rise by lifting others" and this mentality is common in The Graph community. The Graph is offering real benefits to everyone in the form of a more efficient and verifiable backend for all sorts of applications. Reportedly Livepeer is providing a better service at less cost than many cloud services can provide. Amazon is propping Twitch up simply to have skin in the game. The decentralized web has many advantages over the centralized one at least in theory now. There are many user experience features that are lacking and truly full stack decentralized solutions do not exist for many of the products modern users of the internet enjoy. Despite these challenges The Graph and Ethereum stand firm in driving towards the vision of a better way and everyone will benefit. I'm excited to be participating.

The Graph presents a compelling alternative to the current landscape of online interaction. By prioritizing long-term incentives and fostering a community built on ownership, The Graph lays the groundwork for a more collaborative and sustainable digital future. As users become stakeholders, a virtuous cycle is created. Contributors are incentivized to build valuable applications and curate high-quality data, ultimately benefiting everyone invested in the network. I am looking toward a future when we make the token invisible and get to a place where the incentive to build and work collaboratively to solve our problems is obvious.

By taking up the philosophy of ownership over convenience create such abundance of benefit that you can be generous without restraint.`,
	"the-graph-is-a-work-token": `A quick summary explaining what work tokens are in crypto, referencing The Graph as an example.

I wanted to summarize the content found in an article by [Jose Maria Macedo](https://jose.macedo.xyz/). In this article Mr. Macedo notes the important difference between the traditional financial system using instruments like stocks to raise capital for running a business, and the idea of a community driven work token. The founders of The Graph have often spoken about the importance of aligning incentives and this is one of the main benefits of a work token.

## What is a work token?

In the context of cryptonetworks, a work token is a token that pays out rewards to network participants who fulfill two conditions: (a) hold or stake the native token and (b) through holding/staking the native token, are entitled to provide/receive one or more types of potentially valuable work/utility (non-capital resource) to/from the network. The reward pool is financed through a fiscal policy that can change over time, such as inflation, transaction fees, percentage of block reward, or other methods.

The specific type of work that particular work tokens enable their holders to provide comprises the resource provisioned by the cryptonetwork. This resource can be extremely diverse and is limited only by the creativity of the cryptoeconomic designer and the ability for that resource to be provided digitally and trustlessly.

Examples of work tokens include DASH, STEEM, Synthetix, Kleros, and FOAM. DASH allows its holders to provide work, in the form of transaction processing and governance, to the network. STEEM allows its holders to provide work, in the form of accurate content creation and curation services, to the network. Synthetix allows holders to emit a debt to the network, providing collateral and liquidity for synthetic assets created on the network. Kleros allows holders to provide judgment on disputes, and FOAM allows holders to serve as "location anchors" and register points of interest on a map.

Work tokens align incentives between stakeholders by encouraging investors to become workers, bootstrapping the resource provided by the network. Passive tokenholders who are not providing work to the network feel the full dilutive effect of inflation on their reduced relative token holdings compared to tokenholders who also provide work. Overall, work tokens enable companies to simultaneously raise funds, build out their supply and demand sides, and align incentives between all stakeholders, accelerating the speed at which these networks propagate and grow.

From the article:

> Crucially, the type of "work" these tokens enable their holders to provide corresponds to the resource or utility provisioned by the broader cryptonetwork in question. Effectively, work tokens incentivize the creation of digital, decentralized "co-operatives" with aligned incentives in the sense of networks that are entirely owned and financed by their "worker capitalist" owners.

This is an incredibly powerful concept and one with profound economic implications.`,
	"web3-is-what-you-do": `## A call to action

Actions speak louder than words is a very common phrase, but in online communities words are so much easier to see and share than actions are. As a counter example the open source community broadly speaking has long taken action by valuing the contributions of members with resources like GitHub allowing for credit to be given where it is due. In many crypto and web3 spaces this ethos has continued with developers knowing well who is contributing to projects in a meaningful way and valuing the relationships they have with those that are contributing to projects they care about. As web3 opens up to non-developer participants I want to encourage myself and others to take this to heart and consider the value of our actions vs our words. Web3 is open to everyone, so looking at your skills and talents and finding a way to get involved is the best way to see the web3 you want come to existence.

## A possible problem

We all have our pet peeves. I want to acknowledge that I may be seeing a problem where there is none. Regardless I believe that encouraging my peers to build more is worth doing, even if there isn't a problematic alternative going on. In my view it is tempting to be a keyboard warrior and to spend a lot of time talking about things rather than to contribute meaningful work. That is not to say that there is never a time to express a thought or an idea. Much meaningful work begins with collaborative discussion, goal setting, and alignment of ideas. This way the work can progress smoothly with all participants in concert rather than working against or parallel to each other. I want to speak out against those who enter a space and seek to impose their ideals, biases, traditions, or whims without due consideration to what has been built already and what the rest of the community wants to build. Rather than bringing work and creating the things they want to see many wish to just argue and push their ideas on others.

## The web3 debate

We are still in the early days of web3. One of the most common questions I hear asked in any place where this topic is discussed is the simple and straightforward "what is web3" but as many of us know there is not a simple and straightforward answer. When defining a new term many ideas rise up from the masses who are engaging in the discussion. A myriad of backgrounds make up the body of people interested in crypto, blockchain, the internet, the connectedness of people, and the political and social issues that surround all of these things. These different perspectives can come together to create rich collaboration, but very often they also lead to clashes and debate.

I asked Google "what is web3":

> Put very simply, Web3 is an extension of cryptocurrency, using blockchain in new ways to new ends. — Harvard Business Review

> Web3 is an idea for a new iteration of the World Wide Web which incorporates concepts such as decentralization, blockchain technologies, and token-based economics. — Wikipedia

> Web3 can be understood as the "read/write/own" phase of the Internet. — CoinDesk

> Web 3.0 is a paradigm shift for the internet that is defined by a collection of decentralized protocols and networks run by network participants worldwide. — Cointelegraph

## Different perspective, different emphasis

I highlighted the top 4 results of the Google search "What is web3" and here I want to pull out some of the key emphases that I see in each one.

- It's about cryptocurrency and blockchain, an opportunity to make or use money in new ways
- It's the web, but decentralized, and the economics is tokenized
- Progression from read only → read/write → read/write/own
- The decentralized protocols and network participants define the new paradigm

I think many people who are active in exploring, using, and building web3 would agree with most or all of these ideas but I want to point out the different emphasis. For each participant the part of web3 that is the most important is different. Some people do not see decentralization as a key or critical component of web3 whereas for others it is so critical that anything without it is not really web3.

On platforms like reddit.com/r/CryptoCurrency you will regularly find people debating or arguing about what is important. This can be fine but in many cases these communities become isolated echo chambers where all of the active members must adhere to certain dogmas about web3 or crypto else they should retreat to a different community that better aligns to their ideas. Rather than having productive discussions where people are learning and exploring ideas I too often see popular talking points being stated as fact with no real engagement or concession from any party. This is especially true online where there is little accountability for how we treat and talk to one another.

## Communities make a difference

There are a large number of diverse communities on a variety of platforms when it comes to crypto and web3. Two particularly popular platforms for protocol specific communities are Discord and Telegram. These communities have a variety of moderation styles, cultures, and community members. In my experience it is very apparent early on what kind of discussion you can expect to have in one of these groups. It could be endless memes or charts with wild price speculation and talk of striking it rich, in which case web3 is only interesting as a function of more hype or more adoption which hopefully translates to more profit for anyone invested early in a project. In a group like this any attempt to have a philosophical discussion about the value of decentralization will not get very far because it is not exciting or directly contradicts a mentality of accumulating wealth. In another group such price talk or moon speak will not be welcome and instead only details about project news or fundamentals is welcome. In a group like this talk of decentralization or trustless and permissionless systems is more welcome. I don't bring up this dichotomy of groups to claim that one is good and one is bad, instead I want to make the argument that the space has enough room for both and that rather than worrying about winning over the members of a group we should instead maximize the time we spend engaging with the members we enjoy and collaborating to create content and build things together.

## So how do I get involved, especially if I can't code?

I am someone who has tried to get myself to learn to code dozens of times. Each time I try I get pulled away by something I'm more interested in. I didn't want that to prevent me from contributing to web3 so I am incredibly grateful that [The Graph Advocates](https://thegraph.com/) actively encouraged people from every background to apply to their program. The Graph is a decentralized protocol that currently provides an indexing and querying service to dapps for blockchain data. The current network and the roadmap gives a clear picture of their dedication to decentralization and utilizing cryptographic proofs to build a trust minimized and permissionless system. The advocates program enables participants in the graph ecosystem to better collaborate with other contributors and be recognized for their contributions not only to the graph but web3 as a whole. There are a variety of ways to participate from generating blog posts, YouTube videos, memes etc to organizing in person events or simply hanging out in chat rooms and assisting with answering questions or pointing people to answers. It is amazing what the community members have already accomplished and built together.

As a recently onboarded advocate I have limited contributions under my belt, but I feel so much more a part of web3 and I believe in it now more than I ever did. I am living the reality that web3 is open to anyone even someone who can't program in solidity. I hope that we can break down the barriers even further and truly open up web3 to the whole world, because it will open the flood gates to ideas and creations that will transform the world.`,
	"adding-sql-to-the-graph": `Anyone who has been developing on The Graph knows that we use GraphQL for queries. The Guild maintains an excellent GraphQL library and there are many benefits. During Core Dev Call 26 StreamingFast announced that SQL is coming to The Graph via an upgrade to their data processing suite that already includes superstars like the Firehose and Substreams. During the call they gave a demo of what it would look like to run these new features on your own setup which is exciting as it continues our work towards a truly decentralized future. StreamingFast encouraged devs to contact them on their Discord to get help setting up the beta and also to share any specific needs so that they can add features that the community needs.

The call covered other topics as well but in this post I want to focus on SQL. StreamingFast separated their presentation into three parts:

- 11:30 — Bringing SQL Queries to The Graph | Semiotic Labs
- 22:20 — How DBT (Data Build Tool) Takes SQL to the Next Level
- 30:30 — The Backend: Infrastructure for SQL and DBT Integration | feat. StreamingFast

StreamingFast and others would like to expand the capability of The Graph to cover not only the needs of developers making dapps but also the data science community. GraphQL is great for dapp developers because they don't need to maintain an API backend and because dapps often use fixed queries which can be well defined in advance. SQL offers speed and flexibility as well as brand new applications for the decentralized data marketplace we are building.

[Data Build Tool (DBT)](https://www.getdbt.com/) has emerged as a popular solution to fill a tooling gap for SQL. The team has chosen ClickHouse as a choice of SQL integration for their products but know that it is possible and desirable to include other tools in the future.

## Timeline

- Define the SQL API (Prototype Done)
- Integrate DBTs into Substreams (Work In Progress)
- Test Deployment with Pinax and StreamingFast (Q4 2023)
- Integrate with Gateway & Billing (Q1 2024)

The proposed solution is something they are calling "deployable units": Firehose and Substreams perform the data extraction and initial processing, then SQL sync is used to transfer data into databases like Postgres or ClickHouse. DBT is involved in data transformation as an alternative to Substreams for data manipulation. This setup allows direct querying of the data via GraphQL, REST API, or direct SQL access.

StreamingFast gave a live demo. Key features include database output designed to feed into an SQL database, and the ability to package and share the entire schema as an .spkg file. One example used Postgres to process Bored Ape data while the other used ClickHouse to show CryptoPunks.

Ping me on Twitter or Discord if you have any feedback: @athsrueas`,
	"streamingfast-and-substreams": `Web3 is an exciting and rapidly-evolving space, and one of the most important pieces of the puzzle is The Graph. This platform allows developers to efficiently access and query data from decentralized applications across various blockchains. One of the latest developments within The Graph ecosystem is Substreams.

## StreamingFast

Indexing tasks could take weeks to sync but now with Substreams from StreamingFast, a powerful parallelizable engine to process blockchain data, these same tasks can be completed in a matter of hours. StreamingFast, formerly dfuse, joined The Graph as a core developer in June 2021. Their first major contribution was the Firehose which greatly improved the extraction component of The Graph indexing engine. Substreams speed up indexing by improving the Transform layer.

## Extract, Transform, Load, Query

This is The Graph's model. With Firehose and Substreams the Extract and Transform layers respectively have been massively improved.

If you want data from an Ethereum network you need to index. Want security and verifiability? Read block by block linearly using API calls on Ethereum nodes. StreamingFast solved these problems with Firehose-powered Substreams. Using a streaming-first approach and the flat files structure from Firehose we have rich protobuf models, stream cursors, and the ability to use parallelization without sacrificing verifiability. You could rebuild the entire node from the flat files. Everything is cacheable and hashable. Instead of using the traditional handlers in AssemblyScript, developers can use Rust to write Substreams modules. These can run in parallel boosting performance.

## How do they work?

Substreams take the data provided and a query and break it down into small parallelizable chunks.

Get up to 100x speed improvements with Firehose and Substreams on Ethereum clients. On March 16 StreamingFast announced that Substreams reached general availability. On April 27 at Core Dev Call 20 they showed off the new UI tool.`,
	"curating-on-the-graph": `The role of Curator on The Graph serves a vital function in vetting the quality and supporting the success of a subgraph.

A wide variety of skills are helpful, but none are necessary. You can signal on a subgraph with as little as 100 GRT — even less if you're not first to curate on that subgraph — and the GUI designed by the team is intuitive. In this article, I will talk a little about my own experience becoming a Curator. I hope to encourage you to reflect on your own life experience and interests and see where you might have something to offer the network yourself.

## Where I come from

As a teacher of math to 7th and 8th graders, I often find myself having conversations with students about current events and the internet. Many of my students don't think twice about their digital lives and the information and content they are consuming and creating on a daily basis. Yet all of my students dream of their TikToks going viral and getting a slice of the ad revenue they imagine makes it all worth it.

## Intro to crypto

In my own education at university, I was exposed to crypto during the 2017 bull run. I had a Coinbase account, but I struggled to get verified. I ended up not purchasing any coins or tokens and then forgot all about it as the prices tanked. During the rest of my time at university I developed an interest in programming, web development, investing, and all kinds of other things that I would use when I encountered The Graph. My exposure to high-level mathematics at university has been incredibly valuable as I try to understand and navigate the different economics involved with The Graph.

## Meeting The Graph

In December 2020, I had a renewed interest in crypto and investing. I purchased a cold wallet and bought some GRT to use on The Graph Network on Coinbase after receiving a few tokens through their earn program. I knew about delegating, indexing, and curation, but I was intimidated by the incredibly large fees to transact on the blockchain. As someone who had never even used a web3 compatible wallet, there was a lot I wanted to understand before I made a leap to participating. The Discord channel in particular was a great help. Eventually I would become a member of the Graphtronauts Telegram group — they were and still are one of the best resources available to all network participants.

## Delegation experience

Finally, in December 2021 I made my first two delegations. I had done a lot of research and even tried to have conversations with different Indexers. The vetting that a Delegator does for Indexers is not so different from the vetting that a Curator does for subgraphs. I learned that a high yield is often unsustainable and at the very least you must investigate the source of the high yield. Even if your goal is maximum profits, there is good reason to go with dedicated and fair community members over those who might offer a great deal or promotional rate. I am still an active Delegator. I think that even if you are more interested in curation, delegating is a good idea because it will incentivize you to get to know the Indexers. This is relevant because attracting Indexers to the subgraph is the main purpose of curation.

## My curation journey

I minted my first curation shares in October 2022. My strategy is young and will definitely change and evolve over time, but I know that I plan to take a long-term view rather than a short-term view. Bots will always be better than a human at being the first to signal on a subgraph. The types of projects that are attractive to me as a Curator are projects that I have heard of or use myself. In addition, I look for projects that have a decent amount of traffic already and have growth possibilities. On The Graph the main incentive is to curate to subgraphs which will generate fees, not necessarily the project that will "win." Projects which show an interest in decentralization are preferable to projects that just have a lot of users. One of the best ways to know if a project's subgraph is going to be worth curating on is to directly ask the team how often they intend to query the subgraph themselves.

The role of Curator has significantly more risk involved than delegating, and this creates an interesting test of the quality of the incentive structure. This is a role that really demands an active mindset. While the value of your shares is unpredictable, the value generated by the subgraph and associated projects is something that can be researched and understood from fundamentals. Everyone belongs to a unique circle of people and has a different background. Consider what skills and connections you have. Being someone who is willing to go after the information, connect people, and make decisions is much rarer and more valuable than many realize.

The promise of web3 is to enable all of us to capture the value of our contributions, rather than losing much of it to a central entity. There are real risks but the rewards, both financial and otherwise, have been well worth it in my experience.`,
	"the-world-of-data-services": `This concise review aims to showcase the value that The Graph offers as a data service platform. I'll explore leading SaaS platforms, established statistics tools, Microsoft options, and R/Python solutions, focusing on their suitability for data analysts or anyone interested in data driven decision making. I hope that many of these services will receive comparable competitors on The Graph protocol.

Whether you're comfortable with code or prefer user-friendly interfaces, this review covers services that fit both niches.

## Database platforms

Managing and operating a database on premises is always an option but involves many technical skills that might be worth delegating to another team. There are many DBaaS platforms that are very popular for this purpose. There are also lots of potential downsides including obfuscated price structures and general pricing issues due to lack of competition. I am convinced that for many applications a competitive decentralized network will be able to offer more competitive pricing than a traditional DBaaS.

## SaaS platforms

User-friendly platforms like Looker and Sisense and tools like Power BI from Microsoft are ideal for quick data exploration and visualization. Big names like Amazon, Microsoft, and Google offer cloud based SaaS platforms. The biggest downside here is that you have little guarantee of security and privacy. Contrast that with a network like The Graph that is utilizing zero knowledge proofs and other cryptographic features to enable private data to be processed by outside machines without compromising confidentiality.

## Statistics powerhouses

For heavy-duty analysis, many delve into SAS and IBM SPSS. Also don't overlook the power of an Excel workbook.

## Open-source options

R and Python offer flexibility and cost-effectiveness, but come with a steeper learning curve. As with databases many choose to use a hosted platform like Google Colab or Jupyter. There are also open source options for databases like ClickHouse. Many of these can and will be used in tandem with the services offered on The Graph.

## The Graph: open source and decentralized

The core dev teams like StreamingFast are hard at work developing tools for piping in and out data that will work with many of the tools people are already using like ClickHouse. Unlike traditional cloud services The Graph has many Indexer operators who run independent of each other. This means that there is no one entity, such as Google, that can decide that you cannot use a particular service.

The Graph has also attracted lots of interest from developers on the bleeding edge of cryptography and data services, with long-term grants being extended to teams like Semiotic Labs and StreamingFast who have developed technology like Odos and Substreams.

I am really excited about some of the products that the core devs have teased such as the LLM companion [agentc.xyz](https://agentc.xyz) by Semiotic Labs during Core Dev Call 26. Agentc aims to be a general purpose database search with LLM support.

If you want to learn more, try [The Graph](https://thegraph.com/) yourself and see the difference that it can make.`
};
var $$splitComponentImporter = () => import("../_slug-CDND-rEG.mjs");
var Route = createFileRoute("/writing/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: ({ params }) => {
		const post = getPost(params.slug);
		const body = bodies[params.slug];
		if (!post || !body) throw notFound();
		return {
			post,
			body
		};
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.post.title ?? "Writing"} · ATHSRUEAS` }, {
		name: "description",
		content: loaderData?.post.description ?? ""
	}] })
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AthsrueasEthRoute = Route$6.update({
	id: "/athsrueas-eth",
	path: "/athsrueas-eth",
	getParentRoute: () => Route$8
});
var CvRoute = Route$5.update({
	id: "/cv",
	path: "/cv",
	getParentRoute: () => Route$8
});
var HostedBlogPagesSlugRoute = Route$4.update({
	id: "/hosted-blog-pages/$slug",
	path: "/hosted-blog-pages/$slug",
	getParentRoute: () => Route$8
});
var ProjectsDephiRoute = Route$3.update({
	id: "/projects/dephi",
	path: "/projects/dephi",
	getParentRoute: () => Route$8
});
var Web3DephiRoute = Route$2.update({
	id: "/web3/dephi",
	path: "/web3/dephi",
	getParentRoute: () => Route$8
});
var WritingIndexRoute = Route$1.update({
	id: "/writing/",
	path: "/writing/",
	getParentRoute: () => Route$8
});
var rootRouteChildren = {
	IndexRoute,
	AthsrueasEthRoute,
	CvRoute,
	HostedBlogPagesSlugRoute,
	ProjectsDephiRoute,
	Web3DephiRoute,
	WritingSlugRoute: Route.update({
		id: "/writing/$slug",
		path: "/writing/$slug",
		getParentRoute: () => Route$8
	}),
	WritingIndexRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { site as i, Route as n, links as r, router_exports as t };
