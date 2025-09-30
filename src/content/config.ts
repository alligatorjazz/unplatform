// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import {
  BlogPostSchema,
  LibraryItemSchema,
  RecommendationSchema,
} from "../types";

const recommendationCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: RecommendationSchema,
});

const libraryCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: LibraryItemSchema,
});

const postsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: BlogPostSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  recommendations: recommendationCollection,
  library: libraryCollection,
  posts: postsCollection,
};
