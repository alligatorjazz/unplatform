import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import dayjs from "dayjs";
import { marked } from "marked";
import { site } from "../../astro.config.mjs";
import { toTitleCase } from "../lib/dom";

export async function GET() {
  // TODO: add library support
  const entries = [
    ...(await getCollection("posts")),
    ...(await getCollection("recommendations")),
  ].sort((a, b) => dayjs(b.data.dateAdded).diff(a.data.dateAdded));

  return rss({
    title: "Unplatform",
    description:
      "The definitive guide for escaping social media (and joining the indie web.)",
    site,
    trailingSlash: false,
    items: await Promise.all(
      entries.map(async (entry) => {
        if (entry.collection === "recommendations")
          return {
            title: entry.data.title,
            pubDate: dayjs(entry.data.dateAdded).subtract(1, "d").toDate(),
            description: entry.body,
            link: entry.data.url,
            categories: entry.data.category ?? [""],
            content:
              `<p>${Array.isArray(entry.data.city) ? entry.data.city.join(" + ") : entry.data.city} | ${entry.data.pricing.map((price) => toTitleCase(price)).join(" or ")} | ${entry.data.category.map((category) => toTitleCase(category)).join(", ")} | Supports: ${entry.data.os.map((os) => (os === "ios" ? "iOS" : toTitleCase(os))).join(", ")}</p>` +
              (await marked.parse(entry.body)),
            customData: `
					<markdown>${entry.body}</markdown>
				`,
          };
        if (entry.collection === "posts")
          return {
            title: entry.data.title,
            pubDate: dayjs(entry.data.dateAdded).subtract(1, "d").toDate(),
            description: entry.data.lede,
            link: site + "/post/" + entry.slug,
            categories: entry.data.tags ?? [""],
            content: await marked.parse(entry.body),
            customData: `<markdown>${entry.body}</markdown>`,
          };
        throw new Error("Could not generate RSS feed.");
      }),
    ),
  });
}

