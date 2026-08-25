# AI Agent Operating Instructions (AI-Q)

When generating new blog posts (`src/content/blog/`) or AI model experiments (`src/content/ai-models/`):

1. **Read [CONTENT_GUIDE.md](file:///e:/tutorial/ai-q/CONTENT_GUIDE.md)** for the full UI component catalog, props, and schemas.
2. **Zero-Import Rule**: Never import UI components inside `.mdx` files; all components (`PromptCard`, `ModelSpecs`, `ScoreRating`, `ProsCons`, `ModelComparisonTable`, `ComparisonSlider`, `ImageGrid`, `FAQAccordion`, `Callout`, `AdUnit`, `ArticleSources`) are automatically provided.
3. **Pure-Template Rule**: Pass all data dynamically through props in the `.mdx` file.
4. **Validation**: Run `npx astro check` to verify 0 errors before concluding any task.
