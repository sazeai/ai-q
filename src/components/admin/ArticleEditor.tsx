import { createSignal, createEffect, onMount, For, Show } from "solid-js"

interface SlashCommand {
  id: string
  label: string
  icon: string
  description: string
  template: string
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: "prompt-showcase",
    label: "Prompt Card (Showcase)",
    icon: "🎨",
    description: "Featured prompt with live image preview & copy button",
    template: `<PromptCard
  title="Showcase Prompt Title"
  model="Google Gemini"
  aspectRatio="1:1"
  tags={["Trending", "3D Avatar", "Custom Hoodie"]}
  prompt="Your detailed prompt description with style tokens and lighting directives..."
  negativePrompt="plastic skin, blurry, cartoon, extra limbs, bad quality"
  seed="482910"
  cfgScale="7.0"
  image="https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/sample.jpg"
  imageAlt="Prompt sample preview"
/>`,
  },
  {
    id: "prompt-compact",
    label: "Prompt Card (Compact)",
    icon: "⚡",
    description: "Typography-first compact prompt card (fast copy, no image)",
    template: `<PromptCard
  title="Prompt #2: Compact Style Name"
  model="Google Gemini"
  aspectRatio="4:5"
  tags={["Vintage", "Streetwear", "Minimalist"]}
  prompt="Detailed compact prompt text for rapid copy paste..."
  negativePrompt="deformed hands, flat lighting, low quality"
/>`,
  },
  {
    id: "category-nav",
    label: "Category Quick-Jump Bar",
    icon: "🧭",
    description: "Horizontal scrollable pill navigation for long guides",
    template: `<PromptCategoryNav
  title="Jump to Style Category"
  categories={[
    { title: "Category 1", id: "category-1", count: 5, icon: "🔥" },
    { title: "Category 2", id: "category-2", count: 5, icon: "✨" },
    { title: "Category 3", id: "category-3", count: 5, icon: "👑" },
  ]}
/>`,
  },
  {
    id: "callout",
    label: "Callout Box",
    icon: "💡",
    description: "Highlighted tip, warning, or info alert box",
    template: `<Callout type="tip">
  **Pro-Tip**: Use explicit focal lengths (85mm) and tactile textures to eliminate the artificial AI sheen.
</Callout>`,
  },
  {
    id: "specs",
    label: "Model Specifications",
    icon: "📊",
    description: "Hardware, architecture, pricing and API specs table",
    template: `<ModelSpecs
  title="Model Technical Specifications"
  subtitle="Verified specs, architecture, and developer API parameters"
  items={[
    { label: "Developer", value: "xAI / Google" },
    { label: "Architecture", value: "Autoregressive MoE Vision Transformer" },
    { label: "Max Resolution", value: "2048 x 2048" },
    { label: "API Pricing", value: "$0.02 - $0.04 per call" },
  ]}
/>`,
  },
  {
    id: "score",
    label: "Score Rating Card",
    icon: "📈",
    description: "10-segment benchmark scorecard with verdict badge",
    template: `<ScoreRating
  title="Benchmark Scorecard"
  overall="8.8"
  verdict="Editor's Choice • Best-in-Class Consistency"
  scores={[
    { label: "Photorealism & Texture", score: 8.5, maxScore: 10 },
    { label: "In-Image Typography", score: 9.0, maxScore: 10 },
    { label: "Prompt Adherence", score: 8.7, maxScore: 10 },
    { label: "Inference Speed", score: 9.2, maxScore: 10 },
  ]}
/>`,
  },
  {
    id: "faq",
    label: "FAQ Accordion",
    icon: "❓",
    description: "Collapsible FAQ accordion matching Schema JSON-LD",
    template: `<FAQAccordion
  title="Frequently Asked Questions (FAQ)"
  items={[
    {
      question: "How do I use these prompts?",
      answer: "Upload your reference photo in Gemini, copy the template, replace 'YOUR NAME', and click generate."
    },
    {
      question: "Are these prompts free to use?",
      answer: "Yes, 100% free for personal and commercial creative workflows."
    }
  ]}
/>`,
  },
  {
    id: "slider",
    label: "Comparison Slider",
    icon: "🔄",
    description: "Interactive before/after split slider for inpainting",
    template: `<ComparisonSlider
  before="https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/before.jpg"
  after="https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/after.jpg"
  beforeLabel="Original Photo"
  afterLabel="AI Inpainted"
  alt="Before and after inpainting demonstration"
/>`,
  },
  {
    id: "table",
    label: "Comparison Table",
    icon: "⚔️",
    description: "Head-to-head model comparison matrix",
    template: `<ModelComparisonTable
  rows={[
    {
      name: "Primary Model",
      highlight: true,
      developer: "Google",
      architecture: "Imagen 3",
      textScore: "9.0/10",
      pricing: "Free Tier",
    },
    {
      name: "Competitor",
      highlight: false,
      developer: "Midjourney",
      architecture: "Diffusion DiT",
      textScore: "8.5/10",
      pricing: "$10/mo",
    }
  ]}
/>`,
  },
  {
    id: "ad",
    label: "Ad Placement",
    icon: "📢",
    description: "Responsive Google AdSense unit (Auto-configured with default slot)",
    template: `<AdUnit />`,
  },
]

export default function ArticleEditor() {
  // Security Authentication Gate
  const MASTER_PASSCODE =
    import.meta.env.PUBLIC_ADMIN_PASSCODE || "aiq-editor-2026"

  const [isAuthenticated, setIsAuthenticated] = createSignal(false)
  const [passcodeInput, setPasscodeInput] = createSignal("")
  const [authError, setAuthError] = createSignal(false)

  onMount(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("aiq_admin_session")
      if (saved === "authenticated") {
        setIsAuthenticated(true)
      }
    }
  })

  const handleLogin = (e: Event) => {
    e.preventDefault()
    if (passcodeInput() === MASTER_PASSCODE) {
      setIsAuthenticated(true)
      setAuthError(false)
      sessionStorage.setItem("aiq_admin_session", "authenticated")
    } else {
      setAuthError(true)
    }
  }

  // Article Form State
  const [collection, setCollection] = createSignal<"blog" | "ai-models">("blog")
  const [title, setTitle] = createSignal("")
  const [slug, setSlug] = createSignal("")
  const [summary, setSummary] = createSignal("")
  const [tags, setTags] = createSignal("")
  const [featuredImage, setFeaturedImage] = createSignal("")
  const [content, setContent] = createSignal("")

  // UI States
  const [showMeta, setShowMeta] = createSignal(false)
  const [showUploader, setShowUploader] = createSignal(false)
  const [showSlashMenu, setShowSlashMenu] = createSignal(false)
  const [slashQuery, setSlashQuery] = createSignal("")
  const [cursorPos, setCursorPos] = createSignal(0)
  const [uploading, setUploading] = createSignal(false)
  const [uploadedUrl, setUploadedUrl] = createSignal("")
  const [statusMsg, setStatusMsg] = createSignal("")

  let textareaRef: HTMLTextAreaElement | undefined

  // Auto-generate slug from title
  createEffect(() => {
    if (title() && !slug()) {
      setSlug(
        title()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      )
    }
  })

  // Filter slash commands
  const filteredCommands = () => {
    const q = slashQuery().toLowerCase()
    if (!q) return SLASH_COMMANDS
    return SLASH_COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
  }

  // Handle slash command insertion
  const insertTemplate = (template: string) => {
    if (!textareaRef) return
    const text = content()
    const pos = cursorPos()

    // Find the slash before cursor to replace it
    const lastSlash = text.lastIndexOf("/", pos)
    const before =
      lastSlash !== -1 ? text.substring(0, lastSlash) : text.substring(0, pos)
    const after = text.substring(pos)

    const newText = `${before}\n${template}\n\n${after}`
    setContent(newText)
    setShowSlashMenu(false)
    setSlashQuery("")

    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus()
        const newPos = before.length + template.length + 2
        textareaRef.setSelectionRange(newPos, newPos)
      }
    }, 50)
  }

  // Textarea input watcher for slash trigger
  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    const val = target.value
    setContent(val)
    const pos = target.selectionStart
    setCursorPos(pos)

    // Check if the current line starts with / or has /
    const lineStart = val.lastIndexOf("\n", pos - 1) + 1
    const currentLine = val.substring(lineStart, pos)

    if (currentLine.startsWith("/")) {
      setShowSlashMenu(true)
      setSlashQuery(currentLine.substring(1))
    } else {
      setShowSlashMenu(false)
    }
  }

  // Direct image upload to R2
  const handleImageUpload = async (e: Event) => {
    const input = e.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return

    const file = input.files[0]
    setUploading(true)
    setStatusMsg("Uploading to Cloudflare R2...")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", collection() === "blog" ? "prompts" : "models")

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const text = await res.text()
      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(
          `Server returned non-JSON response (${res.status}): ${text.substring(0, 80)}...`
        )
      }

      if (data.success && data.url) {
        setUploadedUrl(data.url)
        setStatusMsg("Upload successful!")
        if (!featuredImage()) {
          setFeaturedImage(data.url)
        }
      } else {
        setStatusMsg(`Error: ${data.error || "Upload failed"}`)
      }
    } catch (err: any) {
      setStatusMsg(`Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  // Insert uploaded image into editor
  const insertUploadedImage = () => {
    if (!uploadedUrl()) return
    const md = `![Image preview](${uploadedUrl()})`
    insertTemplate(md)
    setShowUploader(false)
    setUploadedUrl("")
  }

  // Compile full MDX with Frontmatter
  const buildFullMdx = () => {
    const tagList = tags()
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const tagYaml =
      tagList.length > 0
        ? tagList.map((t) => `  - "${t}"`).join("\n")
        : `  - "Google Gemini"\n  - "Prompt Engineering"`

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    return `---
title: "${title() || "Untitled AI-Q Article"}"
summary: "${summary() || "Comprehensive AI guide and prompts directory."}"
date: "${today}"
updatedDate: "${today}"
image: "${featuredImage() || "https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/gemini-3d-boy-bike.jpg"}"
tags:
${tagYaml}
author: "AI-Q Editorial Labs"
canonicalUrl: "https://ai-q.in/${collection()}/${slug()}"
draft: false
---

${content()}
`
  }

  // Save / Publish Article to Disk
  const saveArticle = async () => {
    if (!slug()) {
      alert("Please enter a slug for this article.")
      return
    }
    setStatusMsg("Saving article to disk...")

    try {
      const fullMdx = buildFullMdx()
      const res = await fetch("/api/save-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: collection(),
          slug: slug(),
          content: fullMdx,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStatusMsg(`Saved successfully to ${data.path}!`)
        setTimeout(() => setStatusMsg(""), 4000)
      } else {
        setStatusMsg(`Save error: ${data.error}`)
      }
    } catch (err: any) {
      setStatusMsg(`Failed to save: ${err.message}`)
    }
  }

  return (
    <div>
      {/* 1. Unauthorized Security Gate */}
      <Show when={!isAuthenticated()}>
        <div class="flex flex-col items-center justify-center min-h-[480px] p-6 border rounded-2xl border-black/15 dark:border-white/20 bg-white dark:bg-black shadow-xl">
          <div class="w-full max-w-sm text-center">
            <div class="inline-flex size-14 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 text-2xl mb-4">
              🔒
            </div>
            <h2 class="text-xl font-bold text-black dark:text-white mb-1">
              AI-Q Admin Suite
            </h2>
            <p class="text-xs text-black/60 dark:text-white/60 mb-6">
              Private editorial interface. Enter your master admin passcode to unlock.
            </p>

            <form onSubmit={handleLogin} class="space-y-3">
              <input
                type="password"
                placeholder="Enter Passcode..."
                value={passcodeInput()}
                onInput={(e) => {
                  setPasscodeInput(e.currentTarget.value)
                  setAuthError(false)
                }}
                class="w-full rounded-xl border border-black/15 dark:border-white/20 bg-black/[0.02] dark:bg-neutral-900 px-4 py-2.5 text-center text-sm font-mono text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />

              <Show when={authError()}>
                <div class="text-xs font-semibold text-rose-500">
                  Invalid passcode. Access denied.
                </div>
              </Show>

              <button
                type="submit"
                class="w-full py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-85 shadow-md transition-all cursor-pointer"
              >
                Unlock Editor →
              </button>
            </form>
          </div>
        </div>
      </Show>

      {/* 2. Authenticated Editor Workspace */}
      <Show when={isAuthenticated()}>
        <div class="flex flex-col h-[calc(100vh-100px)] border rounded-2xl border-black/15 dark:border-white/20 bg-white dark:bg-black overflow-hidden shadow-xl">
          {/* Top Header Bar */}
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-4 py-3">
            <div class="flex items-center gap-3 flex-1 min-w-[280px]">
              {/* Collection Selector */}
              <select
                value={collection()}
                onChange={(e) =>
                  setCollection(e.currentTarget.value as "blog" | "ai-models")
                }
                class="rounded-lg border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-black dark:text-white"
              >
                <option value="blog">Blog (Prompts)</option>
                <option value="ai-models">AI Models (Benchmarks)</option>
              </select>

              {/* Title Input */}
              <input
                type="text"
                placeholder="Article Title..."
                value={title()}
                onInput={(e) => setTitle(e.currentTarget.value)}
                class="flex-1 rounded-lg border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>

            {/* Action Buttons */}
            <div class="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowUploader(true)}
                class="inline-flex items-center gap-1.5 rounded-lg border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 shadow-xs transition-all cursor-pointer"
              >
                <span>☁️ Upload R2 Image</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMeta(!showMeta())}
                class="inline-flex items-center gap-1.5 rounded-lg border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 shadow-xs transition-all cursor-pointer"
              >
                <span>⚙️ Metadata</span>
              </button>

              <button
                type="button"
                onClick={saveArticle}
                class="inline-flex items-center gap-1.5 rounded-lg bg-black dark:bg-white px-4 py-1.5 text-xs font-semibold text-white dark:text-black hover:opacity-85 shadow-md transition-all cursor-pointer"
              >
                <span>💾 Save & Publish</span>
              </button>
            </div>
          </div>

          {/* Status Bar (if any) */}
          <Show when={statusMsg()}>
            <div class="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <span>{statusMsg()}</span>
              <button
                onClick={() => setStatusMsg("")}
                class="text-xs opacity-75 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </Show>

          {/* Metadata Drawer */}
          <Show when={showMeta()}>
            <div class="border-b border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label class="block font-semibold mb-1 text-black dark:text-white">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug()}
                  onInput={(e) => setSlug(e.currentTarget.value)}
                  placeholder="e.g. google-gemini-3d-prompts"
                  class="w-full rounded-md border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-black dark:text-white font-mono"
                />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-black dark:text-white">
                  Featured Image URL (R2 CDN)
                </label>
                <input
                  type="text"
                  value={featuredImage()}
                  onInput={(e) => setFeaturedImage(e.currentTarget.value)}
                  placeholder="https://pub-...r2.dev/prompts/cover.jpg"
                  class="w-full rounded-md border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-black dark:text-white font-mono"
                />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-black dark:text-white">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={tags()}
                  onInput={(e) => setTags(e.currentTarget.value)}
                  placeholder="Google Gemini, 3D Boy, AI Photo Editing"
                  class="w-full rounded-md border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-black dark:text-white"
                />
              </div>
              <div class="md:col-span-3">
                <label class="block font-semibold mb-1 text-black dark:text-white">
                  SEO Meta Summary
                </label>
                <textarea
                  value={summary()}
                  onInput={(e) => setSummary(e.currentTarget.value)}
                  rows="2"
                  placeholder="Brief summary for Google search snippets..."
                  class="w-full rounded-md border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-black dark:text-white"
                />
              </div>
            </div>
          </Show>

          {/* Main Split-Pane Workspace */}
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10 overflow-hidden relative">
            {/* Left: Editor Pane */}
            <div class="flex flex-col h-full overflow-hidden relative">
              <div class="bg-black/5 dark:bg-white/5 px-3 py-1.5 text-[11px] font-mono font-medium text-black/60 dark:text-white/60 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <span>
                  MDX Editor (Type{" "}
                  <strong class="text-black dark:text-white">/</strong> for
                  Components)
                </span>
                <span>
                  {content().length} chars •{" "}
                  {content().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              <div class="relative flex-1 p-3 overflow-auto">
                <textarea
                  ref={textareaRef}
                  value={content()}
                  onInput={handleInput}
                  placeholder="Write your article in Markdown/MDX...&#10;&#10;💡 Quick Tip: Type '/' anywhere on a new line to insert PromptCards, Callouts, ScoreCards, FAQs, or Sliders!"
                  class="w-full h-full resize-none font-mono text-xs md:text-sm leading-relaxed text-black dark:text-white bg-transparent border-none outline-none focus:ring-0 placeholder:text-black/30 dark:placeholder:text-white/30"
                  spellcheck={false}
                />

                {/* Floating Slash Command Menu */}
                <Show when={showSlashMenu()}>
                  <div class="absolute left-6 top-16 z-50 w-80 max-h-96 overflow-y-auto rounded-xl border border-black/15 dark:border-white/20 bg-white/95 dark:bg-neutral-900/95 shadow-2xl backdrop-blur-md p-2">
                    <div class="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-black/50 dark:text-white/50 border-b border-black/10 dark:border-white/10 mb-1">
                      Insert Component
                    </div>
                    <div class="space-y-1">
                      <For each={filteredCommands()}>
                        {(cmd) => (
                          <button
                            type="button"
                            onClick={() => insertTemplate(cmd.template)}
                            class="w-full text-left px-2.5 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 flex items-start gap-2.5 transition-colors cursor-pointer group"
                          >
                            <span class="text-base">{cmd.icon}</span>
                            <div>
                              <div class="text-xs font-semibold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                {cmd.label}
                              </div>
                              <div class="text-[11px] text-black/60 dark:text-white/60 leading-tight">
                                {cmd.description}
                              </div>
                            </div>
                          </button>
                        )}
                      </For>
                    </div>
                  </div>
                </Show>
              </div>
            </div>

            {/* Right: Quick Palette & Live Output Helper */}
            <div class="flex flex-col h-full overflow-hidden bg-black/[0.01] dark:bg-white/[0.01]">
              <div class="bg-black/5 dark:bg-white/5 px-3 py-1.5 text-[11px] font-mono font-medium text-black/60 dark:text-white/60 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <span>Component Palette & Insert Helper</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(buildFullMdx())
                    setStatusMsg("Copied full MDX with frontmatter to clipboard!")
                    setTimeout(() => setStatusMsg(""), 3000)
                  }}
                  class="hover:text-black dark:hover:text-white underline cursor-pointer"
                >
                  Copy Full MDX
                </button>
              </div>

              <div class="p-4 overflow-y-auto space-y-4">
                {/* Quick 1-Click Insert Cards */}
                <div class="grid grid-cols-2 gap-2">
                  <For each={SLASH_COMMANDS}>
                    {(cmd) => (
                      <button
                        type="button"
                        onClick={() => insertTemplate(cmd.template)}
                        class="p-2.5 text-left rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900/60 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer shadow-2xs"
                      >
                        <div class="flex items-center gap-1.5 font-semibold text-xs text-black dark:text-white">
                          <span>{cmd.icon}</span>
                          <span>{cmd.label}</span>
                        </div>
                        <p class="text-[10px] text-black/60 dark:text-white/60 mt-1 line-clamp-1">
                          {cmd.description}
                        </p>
                      </button>
                    )}
                  </For>
                </div>

                {/* Live Frontmatter Preview */}
                <div class="mt-6 rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] p-3">
                  <span class="text-[11px] font-semibold text-black/70 dark:text-white/70 block mb-2">
                    Live Frontmatter Generated
                  </span>
                  <pre class="text-[11px] font-mono text-black/80 dark:text-white/80 overflow-x-auto p-2 rounded bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/15">
{`title: "${title() || "Your Title"}"
summary: "${summary() || "Your Summary"}"
collection: "${collection()}"
image: "${featuredImage() || "https://pub-...r2.dev/..."}"
tags: [${tags() || "Google Gemini"}]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Cloudflare R2 Upload Modal */}
          <Show when={showUploader()}>
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
              <div class="w-full max-w-md rounded-2xl border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-900 p-6 shadow-2xl">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-base font-bold text-black dark:text-white flex items-center gap-2">
                    <span>☁️ Upload to Cloudflare R2</span>
                  </h3>
                  <button
                    onClick={() => {
                      setShowUploader(false)
                      setUploadedUrl("")
                    }}
                    class="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div class="border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl p-6 text-center hover:border-black/40 dark:hover:border-white/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    class="hidden"
                    id="r2-file-input"
                  />
                  <label
                    for="r2-file-input"
                    class="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <span class="text-3xl">🖼️</span>
                    <span class="text-xs font-semibold text-black dark:text-white">
                      Click to choose an image or drag & drop
                    </span>
                    <span class="text-[11px] text-black/60 dark:text-white/60">
                      Uploads directly to pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev
                    </span>
                  </label>
                </div>

                <Show when={uploading()}>
                  <div class="mt-4 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
                    Uploading to R2 storage...
                  </div>
                </Show>

                <Show when={uploadedUrl()}>
                  <div class="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                      ✓ Upload Complete!
                    </span>
                    <div class="font-mono text-[11px] text-black/80 dark:text-white/80 truncate mb-3">
                      {uploadedUrl()}
                    </div>
                    <div class="flex gap-2">
                      <button
                        type="button"
                        onClick={insertUploadedImage}
                        class="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors cursor-pointer"
                      >
                        Insert Image Markdown
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedImage(uploadedUrl())
                          setShowUploader(false)
                        }}
                        class="py-1.5 px-3 rounded-lg border border-black/15 dark:border-white/20 text-black dark:text-white font-medium text-xs hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Set as Cover
                      </button>
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  )
}
