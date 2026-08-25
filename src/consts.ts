import type { Site, Page, Links, Socials, SEOConfig, AdSenseConfig, AnalyticsConfig } from "@types"

// Global Site Information
export const SITE: Site = {
  TITLE: "AI-Q",
  DESCRIPTION: "Best AI image prompts, Gemini & Midjourney guides, and AI model breakdowns.",
  AUTHOR: "AI-Q Editorial Team",
  LANGUAGE: "en-IN",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
}

// Global SEO Configuration
export const SEO: SEOConfig = {
  OG_IMAGE: "/open-graph.jpg",
  TWITTER_HANDLE: "@9to5_Dad",
  LOCALE: "en_IN",
  GOOGLE_SITE_VERIFICATION: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
}

// Google AdSense Configuration
export const ADSENSE: AdSenseConfig = {
  CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX",
  ENABLED: true,
}

// Analytics Configuration
export const ANALYTICS: AnalyticsConfig = {
  GOOGLE_ANALYTICS_ID: "G-XXXXXXXXXX",
}

// Blog / Prompts Page
export const BLOG: Page = {
  TITLE: "Prompt Guides & Blogs",
  DESCRIPTION: "Trending AI image prompts, copy-paste prompts, and in-depth generation tutorials.",
}

// AI Models & Experiments Page
export const AI_MODELS: Page = {
  TITLE: "AI Models & Experiments",
  DESCRIPTION: "Benchmarks, image comparisons, and technical reviews of new AI image models.",
}

// Backward compatibility alias
export const PROJECTS = AI_MODELS

// Search Page
export const SEARCH: Page = {
  TITLE: "Search Prompts & Models",
  DESCRIPTION: "Search across hundreds of curated prompts, models, and AI guides.",
}

// Navigation Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "AI Models",
    HREF: "/ai-models",
  },
]

// Social Links
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "contact@ai-q.in",
    HREF: "mailto:contact@ai-q.in",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "ai-q",
    HREF: "https://github.com/sazeai/ai-q"
  },
  {
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "AINotSoSmart",
    HREF: "https://x.com/AINotSoSmart",
  },
]
