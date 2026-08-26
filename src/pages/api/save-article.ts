import type { APIRoute } from "astro"
import fs from "node:fs"
import path from "node:path"

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const serverPasscode =
      process.env.ADMIN_PASSCODE ||
      import.meta.env.ADMIN_PASSCODE ||
      "aiq-editor-2026"
    const clientPasscode = request.headers.get("x-admin-passcode")

    if (serverPasscode && clientPasscode !== serverPasscode) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid admin credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    const data = await request.json()
    const { collection = "blog", slug, content } = data

    if (!slug || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: slug or content" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-")
    const targetDir = path.resolve(process.cwd(), "src", "content", collection, cleanSlug)
    const targetFile = path.join(targetDir, "index.mdx")

    // Create directory if not exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    fs.writeFileSync(targetFile, content, "utf-8")

    return new Response(
      JSON.stringify({
        success: true,
        path: targetFile,
        url: `/${collection}/${cleanSlug}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error: any) {
    console.error("Save Article Error:", error)
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to save article",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
