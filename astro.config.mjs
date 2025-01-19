import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";

export const site = "https://fromthesuperhighway.com";
export const siteEmail = "newsletter@fromthesuperhighway.com";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon(), react()],
	site,
	output: "static",
	redirects: {
		"/not-found": "/404",
	},
	// vite: { ssr: { noExternal: false } },
	// adapter: cloudflare({ imageService: "cloudflare" }),
});
