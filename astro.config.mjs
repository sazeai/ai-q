import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  site: "https://ai-q.in",
  output: "hybrid",
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  integrations: [mdx(), solidJs(), tailwind({ applyBaseStyles: false })],
})
