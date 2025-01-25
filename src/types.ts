import { z } from "astro/zod";
export const LiteracyLevelSchema = z.enum(["0", "1", "2", "3", "4"]);
export type LiteracyLevel = z.infer<typeof LiteracyLevelSchema>;

export const RecommendationCategories = [
	"newspaper",
	"magazine",
	"blog",
	"software",
	"social network",
	"site builder",
	"forum",
	"organization",
	"other",
	"all"
] as const;

export const RecommendationCategorySchema = z.enum(RecommendationCategories);

export type RecommendationCategory = z.infer<typeof RecommendationCategorySchema>;
export const OperatingSystemSchema = z.enum(["ios", "android", "windows", "mac", "linux", "web"]);
export const PricingSchema = z.enum(["free", "paid"]);
export const MembershipSchema = z.enum(["open", "application", "queue"])

// 2. Define a `type` and `schema` for each collection
export const RecommendationSchema = z.object({
	url: z.string(),
	title: z.string(),
	headline: z.string(),
	category: RecommendationCategorySchema.array(),
	os: OperatingSystemSchema.array(),
	pricing: PricingSchema.array(),
	membership: MembershipSchema.optional(),
	literacyLevel: LiteracyLevelSchema,
	dateAdded: z.date(),
	lastUpdated: z.date().default(new Date())
});

export type Recommendation = z.infer<typeof RecommendationSchema>;

export const LibraryItemSchema = z.object({
	url: z.string(),
	title: z.string(),
	author: z.string(),
	tags: z.string().array()
})

export type LibraryItem = z.infer<typeof LibraryItemSchema>;