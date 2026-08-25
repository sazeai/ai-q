import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") || "https://ai-q.in"

  // Fetch all content collections
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft)
  const models = (await getCollection("ai-models")).filter((model) => !model.data.draft)
  const legalDocs = await getCollection("legal")

  const staticPages = [
    { url: "", changefreq: "daily", priority: "1.0" },
    { url: "/blog", changefreq: "daily", priority: "0.9" },
    { url: "/ai-models", changefreq: "daily", priority: "0.9" },
    { url: "/search", changefreq: "weekly", priority: "0.5" },
  ]

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = []

  // Add Static Pages
  staticPages.forEach((p) => {
    urls.push({
      loc: `${siteUrl}${p.url}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: p.changefreq,
      priority: p.priority,
    })
  })

  // Add Blog Posts
  posts.forEach((post) => {
    const modDate = post.data.updatedDate || post.data.date
    urls.push({
      loc: `${siteUrl}/blog/${post.slug}`,
      lastmod: new Date(modDate).toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.8",
    })
  })

  // Add AI Models
  models.forEach((model) => {
    const modDate = model.data.updatedDate || model.data.date
    urls.push({
      loc: `${siteUrl}/ai-models/${model.slug}`,
      lastmod: new Date(modDate).toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.8",
    })
  })

  // Add Legal Docs
  legalDocs.forEach((doc) => {
    urls.push({
      loc: `${siteUrl}/legal/${doc.slug}`,
      lastmod: new Date(doc.data.date).toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.3",
    })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`.trim()

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
