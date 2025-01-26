import { z } from "astro/zod";
export const LiteracyLevelSchema = z.enum(["0", "1", "2", "3", "4"]);
export type LiteracyLevel = z.infer<typeof LiteracyLevelSchema>;

export const RecommendationCategories = [
	"news",
	"magazine",
	"blog",
	"events",
	"software",
	"reader",
	"social network",
	"site builder",
	"forum",
	"organization",
	"other",
	"all"
] as const;

export const RecommendationCategorySchema = z.enum(RecommendationCategories);

export type RecommendationCategory = z.infer<typeof RecommendationCategorySchema>;
export const OperatingSystems = ["ios", "android", "windows", "mac", "linux", "web", "all"] as const;
export const OperatingSystemSchema = z.enum(OperatingSystems);
export type OperatingSystem = z.infer<typeof OperatingSystemSchema>;

export const PricingSchema = z.enum(["free", "paid"]);
export const MembershipSchema = z.enum(["open", "application", "queue"])
export const Cities = [
	"All",
	"Digital First",
	"New York, NY, USA",
	"Chicago, IL, USA",
	"Worcester, MA, USA",
	"Brisbane, QLD, AU",
	"Denver, CO, USA",
	"Omaha, NE, USA",
	"Orlando, FL, USA"
] as const;

export const CitySchema = z.enum(Cities)
export type City = z.infer<typeof CitySchema>;

export const SubscriptionFeedSchema = z.enum(["RSS", "Newsletter"])

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
	lastUpdated: z.date().default(new Date()),
	city: CitySchema.default("Digital First"),
	feeds: SubscriptionFeedSchema.array().optional()
});

export type Recommendation = z.infer<typeof RecommendationSchema>;

export const LibraryItemSchema = z.object({
	url: z.string(),
	title: z.string(),
	author: z.string(),
	headline: z.string(),
	datePublished: z.date(),
	priority: z.number().optional()
})

export type LibraryItem = z.infer<typeof LibraryItemSchema>;