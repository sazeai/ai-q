# AI-Q Content & Experiment Authoring Guide

> **For AI Agents (Claude, GPT-4, Codex, Gemini, Antigravity) & Human Authors**  
> This guide is the single source of truth for creating high-ranking, UI-rich **Blog Posts** and **AI Model Experiments** in this repository without needing to read the entire codebase.

---

## 1. Quick Directory Reference

| Content Type | File Location | Image CDN Location (Cloudflare R2) |
| :--- | :--- | :--- |
| **Blog Posts (Prompts / Guides)** | `src/content/blog/<slug>/index.mdx` | `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/<image-name>.jpg` |
| **AI Model Experiments** | `src/content/ai-models/<slug>/index.mdx` | `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/models/<image-name>.jpg` |

> ⚠️ **Cloudflare R2 Image CDN Rule**: All images must be referenced from the Cloudflare R2 public CDN URL: `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/`. Do not store bulky images inside Git.

> ⚠️ **Zero-Import Rule**: All UI components listed below are **globally injected** into MDX via `src/layouts/ArticleBottomLayout.astro`. **DO NOT write `import ... from ...` inside `.mdx` files.** Simply use the tags directly.

> ⚠️ **Pure-Template Rule**: Components do NOT store hardcoded data. Pass all data (scores, tables, specs, pros/cons, prompts) directly via props in your `.mdx` file.

> ⚠️ **Anti-Duplication Rule**: NEVER repeat the same placeholder image across multiple cards or articles. If you don't have a unique, authentic image for a prompt, use the compact `<PromptCard />` without the `image` prop.

> 🛠️ **Interactive Editor**: You can also write, test, and upload images interactively at the `/admin` dashboard.

---

## 2. Frontmatter Schemas

### A. Blog Post Frontmatter (`src/content/blog/<slug>/index.mdx`)

```yaml
---
title: "Google Gemini 3D Boy & Girl AI Photo Editing Prompts: 30+ Trending 3D Avatars & Bike Prompts (2026)"
summary: "Discover 30+ viral Google Gemini 3D boy and girl AI photo editing prompts. Copy paste trending prompts for 3D Pixar characters on bikes, glowing neon wings on king chairs, and 3D social media avatars."
date: "Aug 26 2026"
updatedDate: "Aug 26 2026"
image: "https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/gemini-3d-boy-bike.jpg"
tags:
  - "Google Gemini"
  - "3D Boy Prompt"
  - "3D Girl Avatar"
  - "AI Photo Editing"
  - "Prompt Copy Paste"
  - "Trending Prompts"
author: "AI-Q Editorial Labs"
canonicalUrl: "https://ai-q.in/blog/google-gemini-3d-boy-girl-ai-photo-editing-prompts"
sources:
  - title: "Google DeepMind Imagen 3 Technical Paper"
    url: "https://deepmind.google/technologies/imagen-3/"
    type: "paper"
  - title: "Google Gemini Web App"
    url: "https://gemini.google.com"
    type: "source"
faq:
  - question: "How do I use Google Gemini for 3D photo editing?"
    answer: "Open Google Gemini, tap the '+' icon to upload your original reference selfie, and paste one of our structured 3D prompt templates."
  - question: "Are these Gemini 3D prompts free to copy and paste?"
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
image: "https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/models/grok-photorealism.jpg"
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

## 3. UI Component Catalog & Slash Commands (`/`)

### 1. `<PromptCategoryNav />` (Slash: `/category-nav` or `/nav`)
**Use for:** Top horizontal-scroll quick jump navigation pills on long prompt guides (especially for mobile users).

```jsx
<PromptCategoryNav
  title="Quick Jump to Category"
  categories={[
    { title: "3D Boys on Bikes", id: "category-1-3d-boys", count: 5, icon: "🏍️" },
    { title: "Cute 3D Girls & Pets", id: "category-2-3d-girls", count: 5, icon: "🐱" },
    { title: "3D Neon Wings & Thrones", id: "category-3-wings-throne", count: 5, icon: "🪽" },
    { title: "3D Social Media Avatars", id: "category-4-social-avatars", count: 5, icon: "📱" },
    { title: "3D Romantic Couples", id: "category-5-3d-couples", count: 5, icon: "💖" },
    { title: "3D Festive & Royal Indian", id: "category-6-3d-festive", count: 5, icon: "🪔" },
  ]}
/>
```

### 2. `<PromptCard />` (Slash: `/prompt`)
**Use for:** Prompts with 1-click clipboard copy, model badge, parameters drawer, aspect ratio pill, and optional preview image.

**Showcase Mode (with authentic R2 CDN output image):**
```jsx
<PromptCard
  title="3D Pixar Boy on Black Sports Motorcycle with 'KING' Hoodie"
  model="Google Gemini / Imagen 3"
  aspectRatio="1:1"
  tags={["3D Pixar", "3D Bike", "Custom Hoodie", "Boys 3D DP"]}
  prompt="A cute 3D stylized character of a cool teenage boy wearing a black oversized hoodie with bold white text 'KING' printed on the chest, ripped light-blue denim jeans, and stylish orange sneakers. He is sitting casually with one leg over a matte-black 3D stylized sports motorcycle on a clean city street. Cute Pixar 3D animated movie character design, smooth vinyl and clay material textures, volumetric studio gradient lighting, 8k digital 3D render."
  negativePrompt="photorealistic, 2d cartoon, ugly face, distorted fingers, low poly"
  seed="948201"
  cfgScale="7.0"
  image="https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/gemini-3d-boy-bike.jpg"
  imageAlt="Cute 3D Pixar boy in black KING hoodie sitting on sports motorcycle"
/>
```

**Compact Mode (clean, typography-first, fast copy for secondary prompts):**
```jsx
<PromptCard
  title="Prompt #2: 3D Cyberpunk Boy on Glowing Neon Superbike"
  model="Google Gemini / Flux.1"
  aspectRatio="1:1"
  tags={["3D Cyberpunk", "Neon Bike", "Glowing Wheels"]}
  prompt="A 1:1 stylized 3D digital illustration of a cool boy character with spiky hair, wearing a sleek black technical jacket with glowing cyan neon trims and custom name tag 'ALEX'. He is sitting on a futuristic 3D cyberpunk superbike with glowing neon blue wheels. Smooth 3D render, Pixar Disney character design, Unreal Engine 5 stylized lighting."
  negativePrompt="deformed bike, plastic skin, cartoon, blurry, low resolution"
/>
```

### 3. `<Callout />` (Slash: `/callout`)
**Use for:** Highlighted callout boxes (`info`, `tip`, `warning`, `danger`).

```jsx
<Callout type="tip">
  **Pro-Tip**: When generating 3D Pixar avatars, use smooth clay shaders and volumetric gradient rim lighting rather than realistic camera parameters.
</Callout>
```

### 4. `<ModelSpecs />` (Slash: `/specs`)
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
    { label: "Pricing / Cost", value: "$0.02 - $0.04 per generation" },
  ]}
/>
```

### 5. `<ScoreRating />` (Slash: `/score`)
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

### 6. `<ProsCons />` (Slash: `/proscons`)
**Use for:** 2-column comparative analysis of model strengths and limitations.

```jsx
<ProsCons
  prosTitle="What Grok Imagine 2.0 Nails (Strengths)"
  consTitle="Where Grok Imagine 2.0 Falls Short (Limitations)"
  pros={[
    "Industry-best multi-reference consistency (up to 5 image inputs)",
    "Sublime photorealism with authentic skin pores and natural teeth",
    "Flawless in-image typography and complex layout generation",
  ]}
  cons={[
    "Closed-source proprietary model weights (cannot be locally hosted)",
    "Requires paid API credits or active X Premium subscription",
  ]}
/>
```

### 7. `<ComparisonSlider />` (Slash: `/slider`)
**Use for:** Interactive before/after split slider (use ONLY when you have authentic before/after image pairs).

```jsx
<ComparisonSlider
  before="https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/gemini-slider-before.jpg"
  after="https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/gemini-slider-after.jpg"
  beforeLabel="Original Photo"
  afterLabel="AI Inpainted & Enhanced"
  alt="AI Inpainting and Background Replacement Demonstration"
/>
```

### 8. `<FAQAccordion />` (Slash: `/faq`)
**Use for:** Interactive expandable FAQ items matching frontmatter `faq` schema.

```jsx
<FAQAccordion
  title="Frequently Asked Questions (FAQ)"
  items={[
    {
      question: "How do I use Google Gemini for 3D photo editing?",
      answer: "Open Google Gemini, tap the '+' icon to upload your selfie, and paste one of our structured 3D prompt templates."
    }
  ]}
/>
```

### 9. `<AdUnit />` (Slash: `/ad`)
**Use for:** CLS-safe Google AdSense placeholders between major sections.

```jsx
<AdUnit format="auto" slot="7483920194" label="Sponsored Guide Partner" />
```

---

## 4. SEO & Editorial Rules for AI Agents

1. **R2 Image Hosting**: Always use `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/` for image URLs.
2. **Search-Intent Matching**:
   - For **3D / Avatar** topics: Always write 3D digital art, Pixar/Disney character models, and 3D glowing elements (no DSLR camera lenses).
   - For **Photorealistic** topics: Specify physical optics (85mm f/1.4, film stock, authentic skin pores).
3. **Two-Tier Cards**: Use images only for the 3–5 featured showcase prompts; use sleek compact cards for the rest.
4. **Code Validation**: Always run `npx astro check` before concluding.
