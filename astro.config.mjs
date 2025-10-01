import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import builtinModules from "builtin-modules";
import tailwindcss from "@tailwindcss/vite";

export const site = "https://unplatform.fromthesuperhighway.com";
export const siteEmail = "unplatform@fromthesuperhighway.com";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react(), mdx()],
  site,
  output: "static",
  // vite: { ssr: { noExternal: false } },
  // adapter: cloudflare({ imageService: "cloudflare" }),
  redirects: {
    "/not-found": "/404",
    "/posts": "/posts/1",
  },
  vite: {
    ssr: {
      external: [...builtinModules],
    },

    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
