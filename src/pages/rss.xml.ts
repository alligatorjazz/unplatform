import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from 'fts-types';
import dayjs from 'dayjs';

export async function GET(ctx: APIContext) {
	const issues = await getCollection('issues');
	return rss({
		title: "From The Superhighway",
		description: "A newsletter bringing you the best kept secrets of the indie web.",
		site,
		trailingSlash: false,
		items: issues.map((issue) => {
			// const bodySections = issue.body.split("---");
			// const preInterview = bodySections.slice(0, -1).join("## >:") + "\n Read the full interview on the site!";
			return {
				title: issue.data.title,
				pubDate: dayjs(issue.data.publishDate).toDate(),
				description: issue.data.description,
				link: `/issues/${issue.slug}`,
				categories: (issue.data.tags ?? [""]),
				customData: `
					<poster>${issue.data.poster}</poster>
					<markdown>${issue.body}</markdown>
				`
			}
		})
	});
}