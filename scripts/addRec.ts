// script for automatically compiling database additions
import { writeFileSync } from "fs";
import { parse } from "node-html-parser";
import ogs from 'open-graph-scraper';
import { join } from "path";
import PromptSync from "prompt-sync";
import Parser from "rss-parser";
import slugify from "slugify";
import type { Recommendation } from "../src/types";

let parser = new Parser<{ "title": string, "description": string, "link": string }, {}>({
	defaultRSS: 2.0,
	customFields: {
		feed: ["title", "description", "link"]
	}
});

const prompt = PromptSync();
async function findFeed(url: string) {
	const feedLocations = [
		"rss",
		"rss.xml",
		"feed",
		"feed.xml",
		"?format=rss"
	];

	for (const location of feedLocations) {
		let targetUrl: string;
		if (location.startsWith("?")) {
			targetUrl = url + location;
		}
		else {
			targetUrl = join(url, location);
		}

		try {
			const feedData = await (await fetch(targetUrl, { headers: { "Content-Type": "application/xml" } })).text();
			return await parser.parseString(feedData);
		} catch (err) {
			console.error(err);
			console.warn(`Could not find feed at ${targetUrl}, continuing...`);
		}
	}

	return null;
}
async function main(url: string) {
	const response = await fetch(url);
	if (!response.headers.get("content-type")?.startsWith("text/html")) {
		throw new Error("URL did not return an HTML response.");
	}
	// parse html
	const document = parse(await response.text());
	// check for feed
	let feed = await findFeed(url);
	const { result: openGraph } = await ogs({ url });
	const metaDescription = (document.querySelector(`meta[name="description"]`) as HTMLMetaElement | null)?.content;
	const feedDescription = feed?.description;
	const ogDescription = openGraph.ogDescription;

	let description = ogDescription ?? metaDescription ?? feedDescription ?? prompt("Description not found. Enter manually: ");

	if (!description) {
		console.warn(`Description not found for ${JSON.stringify({ meta: metaDescription, feed: feedDescription, og: ogDescription }, null, 4)}.`);
	}

	const ogTitle = openGraph.ogTitle
	const feedTitle = feed?.title;
	const htmlTitle = (document.querySelector("title") as HTMLMetaElement | null)?.textContent

	const title = feedTitle ?? ogTitle ?? htmlTitle ?? prompt("Title not found. Enter manually: ");

	console.log(feed);
	const feedInput = prompt("Feed is printed above. Is it maintained? (y/n)");
	const feedMaintained = feedInput.toLowerCase() === "y";

	console.log(`Title: ${title ?? "(not found)"}\nDescription:${description ?? "(not found)"}`);

	// manual newsletter check
	const newsLetterInput = prompt("Opening page in browser. Does it have a newsletter? (y/n) > ")
	const hasNewsletter = newsLetterInput.toLowerCase() === "y";
	console.log(`Proceeding assuming ${title ?? url} ${hasNewsletter ? "has" : "does not have"} a newsletter.`);

	const feeds: ("RSS" | "Newsletter")[] = [];
	if (feedMaintained) { feeds.push("RSS") }
	if (hasNewsletter) { feeds.push("Newsletter") }

	const recBody = description ?? ""
	const recContent: Partial<Recommendation> = {
		url,
		title: title ?? "N/A",
		category: ["organization", "events"],
		os: ["web"],
		pricing: ["free"],
		literacyLevel: "0",
		dateAdded: new Date(),
		feeds
	}

	const slug = (slugify(title ?? url.replace("/", ".").split(".")[-2]).toLowerCase());
	writeFileSync(
		`./src/content/recommendations/${slug}.md`,
		`---\n${Object.entries(recContent).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n")}\n---\n\n${recBody}`
	);
	console.log(`Wrote ${slug}.md to database successfully.\n\n`);
	main(prompt("Enter the URL of the site you're trying to add. > "));
}

const url = prompt("Enter the URL of the site you're trying to add. > ");
main(url)
	.then(() => console.log("finished"))
	.catch(err => console.error(err));