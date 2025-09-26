import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "FoundersWall",
  DESCRIPTION: "Product tests, AI experiments, and blunt reviews from a builder’s perspective.",
  AUTHOR: "Sixthsense",
}

// Work Page
export const WORK: Page = {
  TITLE: "Experiments",
  DESCRIPTION: "Hands-on tests, trials, and product breakdowns.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Reviews",
  DESCRIPTION: "Unfiltered takes on tools, AI models, and products.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Products and tools built by other indie builders.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Find product tests, reviews, and experiments.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Experiments", 
    HREF: "/work", 
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "warden@founderswall.com",
    HREF: "mailto:warden@founderswall.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "sixthsense",
    HREF: "https://github.com/sazeai/founderswall-blog"
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "AINotSoSmart",
    HREF: "https://x.com/AINotSoSmart",
  },
]
