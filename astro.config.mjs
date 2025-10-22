import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

export const site = "https://unplatform.fromthesuperhighway.com";
export const siteEmail = "unplatform@fromthesuperhighway.com";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react(), mdx()],
  site,
  output: "static",
  redirects: {
    "/not-found": "/404",
    "/posts": "/posts/1",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
