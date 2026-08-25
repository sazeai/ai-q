import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  site: "https://ai-q.in",
  integrations: [mdx(), solidJs(), tailwind({ applyBaseStyles: false })],
})
