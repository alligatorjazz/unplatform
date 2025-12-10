// script for automatically compiling database additions
import { writeFileSync } from "fs";
import PromptSync from "prompt-sync";
import Parser from "rss-parser";
import slugify from "slugify";
import type { Recommendation } from "../src/types";

let parser = new Parser<
  { title: string; description: string; link: string },
  {}
>({
  defaultRSS: 2.0,
  customFields: {
    feed: ["title", "description", "link"],
  },
});

const prompt = PromptSync();
async function findFeed(url: string) {
  const response = await fetch(
    `https://feedsearch.dev/api/v1/search?url=${url}`,
  );
  if (response.status === 200) {
    const data = await response.json();
    if (Array.isArray(data))
      return (data as { url: string; title: string }[]).map(
        ({ url, title }) => ({
          url,
          title,
        }),
      );
    else {
      return null;
    }
  }

  console.error(response.status, response.statusText);
  return null;
}

async function main(url: string) {
  // parse html
  // check for feed`
  const feedList = await findFeed(url);
  if (!feedList) {
    console.log(`Could not find feed at URL ${url}.`);
    // main(prompt("Enter the URL of the site you're trying to add. > "));
  }
  const feed: { title: string; url: string; description: string };
  if (feedList?.length === 1) {
    feedUrl = feedList![0].url;
  } else if (feedList && feedList.length > 1) {
    console.log("Multiple feeds found. Select one from the list:");
    feedList?.map((url, index) => console.log(`Index ${index} - ${url}`));
    feedUrl = feedList![parseInt(prompt("Enter index > "))].url;
  }

  let feedMaintained = false;
  const title = null;
  const description = null;

  if (feedList && feedUrl) {
    const feedData = await (
      await fetch(feedUrl, { headers: { "Content-Type": "application/xml" } })
    ).text();
    const feed = await parser.parseString(feedData);
    console.log(feed);
    const feedInput = prompt("Feed is printed above. Is it maintained? (y/n)");
    feedMaintained = feedInput.toLowerCase() === "y";
    const { title, description } = feed;
    console.log(
      `Title: ${title ?? "(not found)"}\nDescription:${description ?? "(not found)"}`,
    );
  }

  // manual newsletter check
  const newsLetterInput = prompt("Does the site have a newsletter? (y/n) > ");
  const hasNewsletter = newsLetterInput.toLowerCase() === "y";
  console.log(
    `Proceeding assuming ${title ?? url} ${hasNewsletter ? "has" : "does not have"} a newsletter.`,
  );

  const feeds: ("RSS" | "Newsletter")[] = [];
  if (feedMaintained) {
    feeds.push("RSS");
  }
  if (hasNewsletter) {
    feeds.push("Newsletter");
  }

  const recBody = description ?? "";
  const recContent: Partial<Recommendation> = {
    url,
    title: title ?? "N/A",
    category: ["organization", "events"],
    os: ["web"],
    pricing: ["free"],
    literacyLevel: "0",
    dateAdded: new Date(),
    feeds,
  };

  const slug = slugify(title ?? "title here");
  writeFileSync(
    `./src/content/recommendations/${slug}.md`,
    `---\n${Object.entries(recContent)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join("\n")}\n---\n\n${recBody}`,
  );
  console.log(`Wrote ${slug}.md to database successfully.\n\n`);
  return main(prompt("Enter the URL of the site you're trying to add. > "));
}

const url = prompt("Enter the URL of the site you're trying to add. > ");
main(url)
  .then(() => console.log("finished"))
  .catch((err) => console.error(err));

