# AI Agent Operating Instructions (AI-Q)

When generating new blog posts (`src/content/blog/`) or AI model experiments (`src/content/ai-models/`):

1. **Read [CONTENT_GUIDE.md](file:///e:/tutorial/ai-q/CONTENT_GUIDE.md)** for the complete UI component catalog, props, and schemas.
2. **Image Hosting & Cloudflare R2 CDN Rule**:
   - All images must be hosted on Cloudflare R2 using the public CDN base URL: `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/`
   - Store blog prompt images under `/prompts/<name>.jpg` (e.g. `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/prompts/gemini-3d-boy-bike.jpg`).
   - Store model benchmark images under `/models/<name>.jpg` (e.g. `https://pub-554b6178bcfb4c0b8facf2f1ae88f4c8.r2.dev/models/grok-photorealism.jpg`).
   - NEVER commit bloated image binaries to Git when creating new posts.
3. **Strict Search-Intent & Aesthetic Alignment Rule**:
   - When authoring **3D / Avatar / Pixar / Cartoon** prompt articles: Every prompt and image MUST be 100% 3D digital art, Pixar/Disney character designs, 3D clay/vinyl shaders, and glowing 3D elements. Never insert DSLR camera lenses (Canon/Hasselblad) into 3D prompts.
   - When authoring **Photorealistic / Editorial** guides: Use physical optical conditioning (85mm f/1.4, film stock, authentic skin pores, no artificial AI sheen).
4. **Clean Prompt Card Rule**:
   - Keep `<PromptCard />` ultra-clean: Pass `model`, `aspectRatio`, `prompt`, `negativePrompt`, and optional `image` (for top showcase prompts).
   - Do NOT pass redundant `title` or `tags` into PromptCards.
5. **Google AdSense Policy & Anti-Spam Placement Rule**:
   - Write `<AdUnit />` directly with zero boilerplate (it automatically uses the configured live slot ID).
   - **Max Density**: Place at most **2 to 3 `<AdUnit />` units per long article (1,500+ words)**.
   - **Placement Separation**: Never place ads above the fold (directly under H1), never place consecutive ads, and always separate ad units by at least 3-4 content sections (500+ words).
6. **Zero-Import Rule**: Never import UI components inside `.mdx` files; all components (`PromptCard`, `ModelSpecs`, `ScoreRating`, `ProsCons`, `ModelComparisonTable`, `ComparisonSlider`, `ImageGrid`, `FAQAccordion`, `Callout`, `AdUnit`, `ArticleSources`, `Link`) are globally provided.
7. **Pure-Template Rule**: Pass all data dynamically through props in the `.mdx` file.
8. **Validation**: Run `npx astro check` to verify 0 errors before concluding any task.
