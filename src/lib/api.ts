import { getCollection } from "astro:content";
import { filterDatabaseEntries } from ".";
import { convertQueryToFilters } from "./query";
import type { Recommendation } from "../types";

export async function queryDatabase(
  querystring: string,
): Promise<Recommendation[]> {
  const filters = convertQueryToFilters(querystring);
  const entries = filterDatabaseEntries(
    await getCollection("recommendations"),
    filters,
  );
  return entries.map(({ data }) => data);
}
