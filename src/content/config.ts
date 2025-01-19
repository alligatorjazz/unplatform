// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';
import { IssueSchema } from 'fts-types';

// 2. Define a `type` and `schema` for each collection
const issuesCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: IssueSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	'issues': issuesCollection,
};