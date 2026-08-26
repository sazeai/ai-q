import type { APIRoute } from "astro"
import { uploadToR2 } from "@lib/r2"

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

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "prompts"

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided in form data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { key, url } = await uploadToR2({
      buffer,
      filename: file.name,
      contentType: file.type || "image/jpeg",
      folder,
    })

    return new Response(
      JSON.stringify({
        success: true,
        key,
        url,
        filename: file.name,
        size: file.size,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error: any) {
    console.error("R2 Upload Error:", error)
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to upload image to Cloudflare R2",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
