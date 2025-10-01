import { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { filterDatabaseEntries } from "../lib";
import { convertQueryToFilters } from "../lib/query";
import { Recommendation } from "../types";

export async function queryDatabase(
  querystring: string,
): Promise<Recommendation[]> {
  const filters = convertQueryToFilters(querystring.substring(1));
  console.log("remote filters: ", filters);
  const entries = filterDatabaseEntries(
    await getCollection("recommendations"),
    filters,
  );
  return entries.map(({ data }) => data);
}

export const GET: APIRoute = async ({ params }) => {
  return new Response(
    JSON.stringify(
      await queryDatabase(
        Object.entries(params)
          .map((k, v) => `${k}=${v}`)
          .join("&"),
      ),
      null,
      4,
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
