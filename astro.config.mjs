import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

export const site = "https://unplatform.fromthesuperhighway.com";
export const siteEmail = "unplatform@fromthesuperhighway.com";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon(), react(), mdx()],
	site,
	output: "static",
	redirects: {
		"/not-found": "/404",
	},
	// vite: { ssr: { noExternal: false } },
	// adapter: cloudflare({ imageService: "cloudflare" }),
});
