import type { APIRoute } from "astro"

const siteUrl = import.meta.env.SITE || "https://ai-q.in"

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}
Sitemap: ${new URL("sitemap.xml", siteUrl).href}
`.trim()

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
