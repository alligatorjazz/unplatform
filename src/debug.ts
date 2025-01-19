import { faker } from "@faker-js/faker";
import type { Issue } from "fts-types";
import { send } from "node:process";

export const fakeIssues: Issue[] = new Array(30).fill(null).map(() => ({
  title: faker.lorem.sentence(6).toLowerCase(),
  slug: faker.lorem.sentence(6).toLowerCase().split(" ").join("-").replace(/[^0-9a-z\-]/gi, ''),
  publishDate: faker.date.past().toDateString(),
  description: faker.lorem.sentence(),
  tags: faker.lorem.sentence(5).split(".")[0].split(" ").map((word) => word.toLowerCase())
}));

