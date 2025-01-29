import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import dayjs from 'dayjs';
import { marked } from "marked";
import { site } from '../../astro.config.mjs';
import { toTitleCase } from '../lib/dom';

export async function GET(ctx: APIContext) {
	// TODO: add library support
	const entries = await getCollection("recommendations");
	return rss({
		title: "Unplatform",
		description: "The definitive guide for escaping social media (and joining the indie web.)",
		site,
		trailingSlash: false,
		items: await Promise.all(entries.map(async (entry) => {
			return {
				title: entry.data.title,
				pubDate: dayjs(entry.data.dateAdded).toDate(),
				description: entry.body,
				link: entry.data.url,
				categories: (entry.data.category ?? [""]),
				content: `<p>${Array.isArray(entry.data.city) ? entry.data.city.join(" + ") : entry.data.city} | ${entry.data.pricing.map(price => toTitleCase(price)).join(" or ")} | ${entry.data.category.map(category => toTitleCase(category)).join(", ")} | Supports: ${entry.data.os.map(os => os === "ios" ? "iOS" : toTitleCase(os)).join(", ")}</p>`
					+ await marked.parse(entry.body),
				customData: `
					<markdown>${entry.body}</markdown>
				`
			}
		}))
	});
}