//#region node_modules/.nitro/vite/services/ssr/assets/posts-CWDW3ZXq.js
var posts = [
	{
		slug: "ownership",
		title: "Ownership: The Importance of Stake",
		description: "An essay on ownership, stake, and aligned incentives in The Graph — from a 2020 bull-market wake-up call to taking the work of the protocol seriously.",
		updatedDate: "2024-04-01",
		oldPath: "/hosted-blog-pages/ownership"
	},
	{
		slug: "the-world-of-data-services",
		title: "The World of Data Services",
		description: "A concise review of data platforms, and why a competitive decentralized network like The Graph matters for analysts and builders.",
		oldPath: "/hosted-blog-pages/the-world-of-data-services"
	},
	{
		slug: "adding-sql-to-the-graph",
		title: "Adding SQL to The Graph",
		description: "Notes from Core Dev Call 26: SQL is coming to The Graph via StreamingFast, DBT, ClickHouse, and deployable units.",
		oldPath: "/hosted-blog-pages/adding-sql-to-the-graph"
	},
	{
		slug: "streamingfast-and-substreams",
		title: "StreamingFast and Substreams",
		description: "An introduction to Substreams and Firehose — how StreamingFast sped up indexing on The Graph without giving up verifiability.",
		oldPath: "/hosted-blog-pages/streamingfast-and-substreams"
	},
	{
		slug: "curating-on-the-graph",
		title: "Curating on The Graph",
		description: "Why you should consider being a Curator on The Graph, told through teaching, delegation, and a first curation journey.",
		oldPath: "/hosted-blog-pages/curating-on-the-graph"
	},
	{
		slug: "web3-is-what-you-do",
		title: "Web3 is what you do",
		description: "A call to action: web3 is defined by work, not argument. How to get involved even if you cannot code.",
		oldPath: "/hosted-blog-pages/web3-is-what-you-do"
	},
	{
		slug: "the-graph-is-a-work-token",
		title: "The Graph is a Work Token",
		description: "A short summary of work tokens in crypto, with The Graph as the example, following Jose Maria Macedo.",
		oldPath: "/hosted-blog-pages/the-graph-is-a-work-token"
	}
];
function getPost(slug) {
	return posts.find((post) => post.slug === slug);
}
//#endregion
export { posts as n, getPost as t };
