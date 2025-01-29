import type { CollectionEntry } from "astro:content";
import fm from "front-matter";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const collectionPath = "./src/content/recommendations";
const collectionEntries = readdirSync(collectionPath).map(filename => join(collectionPath, filename));

collectionEntries.map(entryPath => {
	const content = readFileSync(entryPath).toString();
	const data = fm<CollectionEntry<"recommendations">["data"]>(content);

	const newBody = data.attributes.headline;
	const newFm: Partial<CollectionEntry<"recommendations">["data"]> = data.attributes
	delete newFm?.headline;

	const newFileContent = "---\n" + Object.entries(newFm).map(([key, value]) => (
		`${String(key)}: ${Array.isArray(value) ? `["${value.join('", "')}"]` : '"' + String(value) + '"'}`
	)).join("\n") + "\n---\n\n" + newBody

	writeFileSync(entryPath, newFileContent)
});