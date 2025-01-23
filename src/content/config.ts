// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

const RecommendationTypeSchema = z.enum([
	"newspaper",
	"magazine",
	"blog",
	"software",
	"platform",
	"organization",
	"other"
]);

const OperatingSystemSchema = z.enum(["ios", "android", "windows", "mac", "linux", "web"]);
const PricingSchema = z.enum(["free", "freemium", "paid"]);

// 2. Define a `type` and `schema` for each collection
const RecommendationSchema = z.object({
	url: z.string(),
	title: z.string(),
	type: RecommendationTypeSchema,
	os: OperatingSystemSchema.array(),
	pricing: PricingSchema,
	dateAdded: z.date(),
	lastUpdated: z.date()
});

const recommendationCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: RecommendationSchema,
});

const LibraryItemSchema = z.object({
	url: z.string(),
	title: z.string(),
	author: z.string(),
	tags: z.string().array()
})

const libraryCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: LibraryItemSchema,
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	'recommendationy': recommendationCollection,
	'library': libraryCollection
};