import type { APIRoute } from "astro"

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const { passcode } = data

    const serverPasscode =
      process.env.ADMIN_PASSCODE ||
      import.meta.env.ADMIN_PASSCODE ||
      "aiq-editor-2026"

    if (passcode && passcode === serverPasscode) {
      return new Response(
        JSON.stringify({ success: true, message: "Authenticated successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ error: "Invalid passcode. Access denied." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Authentication request failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
