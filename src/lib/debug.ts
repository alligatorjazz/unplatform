import type { BlogPost } from "../types";
import { faker } from "@faker-js/faker";

export function FakePost(): BlogPost {
	return {
		title: faker.lorem.sentence(9),
		author: "Damian Thomas",
		url: faker.internet.url(),
		publishDate: faker.date.past(),
		lede: faker.lorem.sentence(15)
	};
}