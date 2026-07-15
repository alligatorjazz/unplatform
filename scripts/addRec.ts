// add-rec: adds a new recommendation to the Unplatform database
import { checkbox, confirm, input, select } from "@inquirer/prompts";
import { attempt } from "attempt";
import { parse } from "node-html-parser";
import type { Rss, Atom, DeepPartial } from "feedsmith/types";
import { parseFeed } from "feedsmith";
import {
  OperatingSystemSchema,
  RecommendationCategorySchema,
  PricingSchema,
  RecommendationSchema,
} from "../src/types";
import { Cities } from "../src/cities";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stringifyYaml(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return "\n" + value.map((item) => `  - ${item}`).join("\n");
  }
  if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;
  return String(value);
}
async function fetchRec() {
  // get recommendation siteUrl
  let siteUrl: string = await input({
    message: `Enter the URL of the site you'd like to add to the database. (Type "exit" to exit)`,
    required: true,
  });

  if (siteUrl === "exit") {
    console.log("Exiting script...", "\n");
    process.exit(0);
  }

  const { result: response, error } = await attempt(fetch(siteUrl));

  if (error) {
    console.error(
      "Error: Could not fetch the recommendation. Check that the URL is valid and that you're connected to the internet.",
      "\n",
    );
    return fetchRec();
  }

  const contentType = response.headers.get("Content-Type");
  let feed: DeepPartial<Rss.Feed<string> | Atom.Feed<string>> | null = null;

  if (contentType?.includes("text/html")) {
    const vdom = parse(await response.text());
    const feedLocation =
      (vdom.querySelector(
        "link[type=application/rss+xml]",
      ) as unknown as HTMLLinkElement) ??
      (vdom.querySelector(
        "link[type=application/atom+xml]",
      ) as unknown as HTMLLinkElement);

    if (feedLocation) {
      const feedLink = feedLocation.href;
      const { result: feedResponse, error } = await attempt(fetch(feedLink));
      if (
        feedResponse?.headers.get("Content-Type")?.includes("application/xml")
      ) {
        const feedData = parseFeed(await feedResponse.text());
        if (feedData.format === "rss" || feedData.format === "atom") {
          console.log(`Found RSS / Atom feed at URL ${feedLink}.`);
          feed = feedData.feed;
        }
      } else if (feedResponse === undefined) {
        // TODO: implement static url checks (/feed, /rss, /rss.xml, /atom, /atom.xml), then use feedfiner checks
        console.warn("RSS feed not found in page header.");
      } else {
        console.warn(
          `Got a non-XML response when trying to fetch an RSS / Atom feed at URL ${feedLink} -- not using response for processing.`,
        );
      }
    }

    let defaultDescription: string =
      (
        vdom.querySelector(
          "meta[name=description]",
        ) as unknown as HTMLMetaElement | null
      )?.content ??
      (
        vdom.querySelector(
          "meta[property=og:description]",
        ) as unknown as HTMLMetaElement | null
      )?.content ??
      "";
    const recommendation = RecommendationSchema.safeParse({
      url: siteUrl,
      title: await input({
        message: "Enter the site's title: ",
        required: true,
      }),
      category: await checkbox({
        message: "Select the site's categori(es): ",
        choices: RecommendationCategorySchema.options.map((option) => ({
          name: option,
          value: option,
        })),
        required: true,
      }),

      os: await checkbox({
        message: "Select the site's compatible OSes: ",
        choices: OperatingSystemSchema.options.map((option) => ({
          name: option,
          value: option,
        })),
        required: true,
      }),
      pricing: await checkbox({
        message:
          "Mark if the site's primary content is free or paywalled (or both): ",
        choices: PricingSchema.options.map((option) => ({
          name: option,
          value: option,
        })),
        required: true,
      }),
      literacyLevel: await select({
        message: "Mark the tech literacy level required to use the site: ",
        choices: [0, 1, 2, 3, 4],
      }),
      dateAdded: new Date(),
      lastUpdated: new Date(),
      city: await select({
        message:
          "Mark if this site is specific to one city, and if so, which one: ",
        choices: Cities,
      }),
      feeds: [
        ...(feed ? ["RSS"] : []),
        ...((await confirm({ message: "Does this site have a newsletter? " }))
          ? ["Newsletter"]
          : []),
      ],
    });

    // convert recommendation data to a markdown file with frontmatter, write to ./src/content/recommendations
    if (!recommendation.success) {
      console.error(
        "Validation failed:",
        recommendation.error.flatten().fieldErrors,
      );
      return fetchRec();
    }

    const data = recommendation.data;
    const filename = `${slugify(data.title)}.md`;
    const filepath = join(
      process.cwd(),
      "src",
      "content",
      "recommendations",
      filename,
    );

    const frontmatter = [
      "---",
      `url: ${stringifyYaml(data.url)}`,
      `title: ${stringifyYaml(data.title)}`,
      `category:${stringifyYaml(data.category)}`,
      `os:${stringifyYaml(data.os)}`,
      `pricing:${stringifyYaml(data.pricing)}`,
      `literacyLevel: ${stringifyYaml(data.literacyLevel)}`,
      ...(data.city ? [`city: ${stringifyYaml(data.city)}`] : []),
      ...((data.feeds?.length ?? 0 > 0)
        ? [`feeds:${stringifyYaml(data.feeds)}`]
        : []),
      "---",
    ].join("\n");
    const description = await input({
      message: "Enter the site's description: ",
      default: defaultDescription,
      required: true,
    });

    const markdown = `${frontmatter}\n\n${description}\n`;

    await writeFile(filepath, markdown, "utf-8");
    console.log(`Added recommendation to ${filepath}`);
  } else {
    console.error(
      "URL did not return an HTML response. If you're trying to add a site with an RSS feed, add the homepage itself -- *not* the link to the feed.\nIt could also be possible that the site does not properly link to its RSS feed with a <link> tag. Contact the webmaster to fix this if this is the case.",
    );
  }
}

const { error } = await attempt(fetchRec());

// handles SIGINT gracefully
if (error && error.name !== "ExitPromptError") {
  throw error;
}
