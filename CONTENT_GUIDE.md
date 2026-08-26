# AI-Q Content & Experiment Authoring Guide

> **For AI Agents (Claude, GPT-4, Codex, Gemini, Antigravity) & Human Authors**  
> This guide is the single source of truth for creating high-ranking, UI-rich **Blog Posts** and **AI Model Experiments** in this repository without needing to read the entire codebase.

---

## 1. Quick Directory Reference

| Content Type | File Location | Image Assets Location |
| :--- | :--- | :--- |
| **Blog Posts (Prompts / Guides)** | `src/content/blog/<slug>/index.mdx` | `public/images/prompts/<image-name>.jpg` |
| **AI Model Experiments** | `src/content/ai-models/<slug>/index.mdx` | `public/images/models/<image-name>.jpg` |

> ⚠️ **Zero-Import Rule**: All UI components listed below are **globally injected** into MDX via `src/layouts/ArticleBottomLayout.astro`. **DO NOT write `import ... from ...` inside `.mdx` files.** Simply use the tags directly.

> ⚠️ **Pure-Template Rule**: Components do NOT store hardcoded data. Pass all data (scores, tables, specs, pros/cons, prompts) directly via props in your `.mdx` file.

> ⚠️ **Anti-Duplication Rule**: NEVER repeat the same placeholder image across multiple cards or articles. If you don't have a unique, authentic image for a prompt, use the compact `<PromptCard />` without the `image` prop.

---

## 2. Frontmatter Schemas

### A. Blog Post Frontmatter (`src/content/blog/<slug>/index.mdx`)

```yaml
---
title: "Google Gemini AI Photo Editing Prompts Copy Paste: 30+ Trending 3D & Couple Prompts (2026)"
summary: "Discover 30+ trending Google Gemini AI photo editing prompts. Copy and paste viral prompts for aesthetic couple photos, 3D avatars, cyberpunk portraits, and cinematic lighting."
date: "Aug 25 2026"
updatedDate: "Aug 26 2026"
image: "/images/prompts/gemini-couple-photo.jpg"
tags:
  - "Google Gemini"
  - "AI Photo Editing"
  - "Prompt Copy Paste"
  - "Couple Photo Prompts"
  - "Trending Prompts"
author: "AI-Q Team"
canonicalUrl: "https://ai-q.in/blog/google-gemini-ai-photo-editing-prompts-guide"
sources:
  - title: "Google DeepMind Imagen 3 Technical Paper"
    url: "https://deepmind.google/technologies/imagen-3/"
    type: "paper"
  - title: "Google Gemini Web App"
    url: "https://gemini.google.com"
    type: "source"
faq:
  - question: "How do I use Google Gemini for photo editing?"
    answer: "Open Google Gemini, click the image upload icon (+), attach your original photo, and paste one of our structured editing prompts describing the exact lighting, background, or outfit changes you desire."
  - question: "Are these Gemini AI prompts free to copy and paste?"
    answer: "Yes, all prompt templates on AI-Q are 100% free for personal and commercial creative workflows."
draft: false
---
```

### B. AI Model Experiment Frontmatter (`src/content/ai-models/<slug>/index.mdx`)

```yaml
---
title: "xAI Grok Imagine Image 2.0 (Aurora Engine) Review: Architecture, Benchmarks, API & Inpainting"
summary: "An exhaustive technical benchmark of xAI Grok Imagine Image 2.0. We test the new Autoregressive MoE Aurora architecture, photorealism, typography, multi-reference consistency, and API pricing."
date: "Aug 25 2026"
updatedDate: "Aug 26 2026"
image: "/images/models/grok-photorealism.jpg"
tags:
  - "xAI Grok"
  - "Grok Imagine"
  - "Model Benchmark"
  - "AI Image Generator"
  - "Inpainting"
  - "API Review"
author: "AI-Q Research Labs"
sources:
  - title: "xAI Aurora Engine & Image API Official Documentation"
    url: "https://docs.x.ai"
    type: "docs"
  - title: "Elon Musk Release Announcement on X"
    url: "https://x.com/elonmusk"
    type: "source"
faq:
  - question: "What architecture powers xAI Grok Imagine Image 2.0?"
    answer: "Grok Imagine 2.0 is powered by xAI's proprietary Aurora engine, an autoregressive Mixture-of-Experts (MoE) vision transformer."
  - question: "How much does the Grok Imagine 2.0 API cost?"
    answer: "Via the xAI developer API (model slug: grok-imagine-image-2.0), generations cost approximately $0.02 to $0.04 per image."
draft: false
---
```

---

## 3. UI Component Catalog & Exact Usage

### 1. `<PromptCategoryNav />`
**Use for:** Top horizontal-scroll quick jump navigation pills on long prompt guides (especially for mobile users).

```jsx
<PromptCategoryNav
  title="Quick Jump to Category"
  categories={[
    { title: "Couples & Romance", id: "category-1-couples", count: 6, icon: "💑" },
    { title: "Men's DP & Streetwear", id: "category-2-men", count: 6, icon: "🔥" },
    { title: "Women's & Festive Saree", id: "category-3-women", count: 6, icon: "✨" },
    { title: "3D Avatars & LinkedIn", id: "category-4-avatars", count: 5, icon: "💼" },
    { title: "Travel Transformations", id: "category-5-travel", count: 5, icon: "✈️" },
    { title: "90s Vintage Film", id: "category-6-film", count: 5, icon: "📸" },
  ]}
/>
```

### 2. `<PromptCard />`
**Use for:** Prompts with 1-click clipboard copy, model badge, parameters drawer, aspect ratio pill, and optional preview image.

**Showcase Mode (with authentic output image):**
```jsx
<PromptCard
  title="Cinematic Golden Hour Couple Portrait"
  model="Google Gemini"
  aspectRatio="16:9"
  tags={["Couple", "Mumbai", "Golden Hour", "Canon 85mm"]}
  prompt="Ultra-realistic 8k photo of a stylish young Indian couple walking along Marine Drive Mumbai during golden hour, cinematic warm sunlight, natural smiles, contemporary street fashion, Canon EOS R5 85mm f/1.4 lens, authentic skin texture, soft bokeh background"
  negativePrompt="oversaturated, plastic skin, cartoon, anime, extra limbs, blurry face, distorted hands"
  seed="482910"
  cfgScale="7.0"
  image="/images/prompts/gemini-couple-photo.jpg"
  imageAlt="Cinematic couple photo generated by Google Gemini"
/>
```

**Compact Mode (clean, typography-first, fast copy for secondary prompts):**
```jsx
<PromptCard
  title="Prompt #2: Jaipur Amber Fort Heritage Sandstone Jharokha"
  model="Google Gemini"
  aspectRatio="3:4"
  tags={["Royal Heritage", "Jaipur", "Velvet Bandhgala"]}
  prompt="A 3:4 vertical editorial portrait framed at eye level of a couple on an ornate sandstone royal palace balcony at Amber Fort Jaipur during twilight. He wears a tailored royal navy velvet bandhgala; she wears a blush pink Banarasi silk lehenga with intricate zardozi embroidery. Hasselblad 80mm optical lens, authentic fabric drape, 8k photography."
  negativePrompt="deformed hands, plastic skin, cartoon face, flat lighting"
/>
```

### 3. `<ModelSpecs />`
**Use for:** Hardware, architecture, context window, resolution, pricing, and API specs table.

```jsx
<ModelSpecs
  title="Grok Imagine Image 2.0 Technical Specifications"
  subtitle="Verified specs, architecture, and developer API parameters"
  items={[
    { label: "Developer", value: "xAI (Elon Musk)" },
    { label: "Architecture", value: "Autoregressive MoE Vision Transformer (Aurora)" },
    { label: "Release Version", value: "v2.0 (August 2026)" },
    { label: "Max Resolution", value: "2048 x 2048 (Custom Aspect Ratios)" },
    { label: "Multi-Image Reference", value: "Supported (Up to 5 Reference Images)" },
    { label: "Inpainting & Editing", value: "Region-Level Native Editing & Object Swap" },
    { label: "API Availability", value: "OpenAI SDK Compatible REST API (api.x.ai/v1)" },
    { label: "Pricing / Cost", value: "$0.02 - $0.04 per generation" },
  ]}
/>
```

### 4. `<ScoreRating />`
**Use for:** 10-segment precision telemetry benchmark scorecards with overall rating badge.

```jsx
<ScoreRating
  title="Grok Imagine 2.0 Benchmark Scorecard"
  overall="8.7"
  verdict="Editor's Choice • Best-in-Class Multi-Reference & Inpainting"
  scores={[
    { label: "Photorealism & Skin Texture", score: 8.3, maxScore: 10 },
    { label: "In-Image Typography & Text", score: 8.7, maxScore: 10 },
    { label: "Spatial Prompt Adherence", score: 8.5, maxScore: 10 },
    { label: "Region-Level Inpainting", score: 9.1, maxScore: 10 },
    { label: "Generation Speed & Throughput", score: 9.0, maxScore: 10 },
  ]}
/>
```

### 5. `<ProsCons />`
**Use for:** 2-column comparative analysis of model strengths and limitations.

```jsx
<ProsCons
  prosTitle="What Grok Imagine 2.0 Nails (Strengths)"
  consTitle="Where Grok Imagine 2.0 Falls Short (Limitations)"
  pros={[
    "Industry-best multi-reference consistency (up to 5 image inputs)",
    "Sublime photorealism with authentic skin pores and natural teeth",
    "Flawless in-image typography and complex layout generation",
    "Standard OpenAI SDK compatible developer REST API",
  ]}
  cons={[
    "Closed-source proprietary model weights (cannot be locally hosted)",
    "Requires paid API credits or active X Premium subscription",
    "Higher latency on 2048x2048 high-resolution batch generations",
  ]}
/>
```

### 6. `<ModelComparisonTable />`
**Use for:** Responsive head-to-head comparison matrices with highlighted primary row.

```jsx
<ModelComparisonTable
  rows={[
    {
      name: "xAI Grok Imagine 2.0",
      highlight: true,
      developer: "xAI",
      architecture: "Autoregressive MoE",
      textScore: "8.7/10 (High)",
      consistency: "5 Image References",
      inpainting: "Region-level Native",
      pricing: "$0.02 - $0.04",
      api: "OpenAI Compatible",
    },
    {
      name: "Midjourney v6.1",
      highlight: false,
      developer: "Midjourney Inc",
      architecture: "Diffusion-Transformer",
      textScore: "8.5/10 (Good)",
      consistency: "Vary Region / --cref",
      inpainting: "Discord Inpaint Tool",
      pricing: "$10-$120/mo",
      api: "No Official Public API",
    }
  ]}
/>
```

### 7. `<ComparisonSlider />`
**Use for:** Interactive before/after split slider (use ONLY when you have authentic before/after image pairs).

```jsx
<ComparisonSlider
  before="/images/prompts/gemini-slider-before.jpg"
  after="/images/prompts/gemini-slider-after.jpg"
  beforeLabel="Original Photo"
  afterLabel="AI Inpainted & Enhanced"
  alt="AI Inpainting and Background Replacement Demonstration"
/>
```

### 8. `<ImageGrid />`
**Use for:** Responsive 2, 3, or 4-column side-by-side gallery.

```jsx
<ImageGrid columns={2}>
  <div class="rounded-xl border border-black/15 dark:border-white/20 overflow-hidden bg-black/5 dark:bg-white/5">
    <img src="/images/models/grok-consistency-1.jpg" alt="Scene 1: Tokyo Winter" class="aspect-square object-cover w-full" />
    <div class="p-3">
      <span class="text-xs font-semibold text-black dark:text-white block">Scene 1: Tokyo Street</span>
      <span class="text-[11px] text-black/60 dark:text-white/60">Green coat, snowy daylight</span>
    </div>
  </div>
  <div class="rounded-xl border border-black/15 dark:border-white/20 overflow-hidden bg-black/5 dark:bg-white/5">
    <img src="/images/models/grok-consistency-2.jpg" alt="Scene 2: Santorini" class="aspect-square object-cover w-full" />
    <div class="p-3">
      <span class="text-xs font-semibold text-black dark:text-white block">Scene 2: Santorini Terrace</span>
      <span class="text-[11px] text-black/60 dark:text-white/60">Cream dress, Mediterranean sun</span>
    </div>
  </div>
</ImageGrid>
```

### 9. `<Callout />`
**Use for:** Highlighted callout boxes (`info`, `tip`, `warning`, `danger`).

```jsx
<Callout type="tip">
  **Pro-Tip**: When generating Indian couple portraits, specifying 85mm optical focal length and authentic skin undertones avoids the oversaturated artificial sheen.
</Callout>
```

### 10. `<FAQAccordion />`
**Use for:** Interactive expandable FAQ items (ensure items match your frontmatter `faq` schema for rich Google snippets).

```jsx
<FAQAccordion
  title="Frequently Asked Questions (FAQ)"
  items={[
    {
      question: "How do I get an API key for Grok Imagine 2.0?",
      answer: "Create an account on the xAI Developer Console (https://console.x.ai), add billing credits, and generate an API key from the API Keys tab."
    }
  ]}
/>
```

### 11. `<AdUnit />`
**Use for:** CLS-safe Google AdSense placeholders between major sections.

```jsx
<AdUnit format="auto" slot="7483920194" label="Sponsored Partner" />
```

### 12. `<ArticleSources />`
**Use for:** Journalistic Sources & Via citation block at the end of the post.

---

## 4. SEO & Editorial Rules

1. **Length**: Aim for **1,500 - 3,000+ words** for pillar guides and model benchmarks.
2. **Authority Citations (E-E-A-T)**:
   - Always populate the `sources` frontmatter array with official documentation, developer consoles, papers, or discovery sources.
   - Types allowed: `source` (primary news), `via` (reporting outlet), `docs` (technical docs), `paper` (whitepapers), `reference` (tools/platforms).
3. **No Fake / Duplicated Assets**:
   - Every image referenced must genuinely belong to the subject being reviewed.
   - Do NOT reuse the same slider or sample output across different AI models.
4. **Code Validation**:
   - Always run `npx astro check` and `npm run build` after authoring to guarantee 0 errors.
