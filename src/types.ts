export type Page = {
  TITLE: string
  DESCRIPTION: string
}

export interface Site extends Page {
  AUTHOR: string
  LANGUAGE: string
  NUM_POSTS_ON_HOMEPAGE: number
  NUM_PROJECTS_ON_HOMEPAGE: number
}

export type Links = {
  TEXT: string
  HREF: string
}[]

export type Socials = {
  NAME: string
  ICON: string
  TEXT: string
  HREF: string
}[]

export type SEOConfig = {
  OG_IMAGE: string
  TWITTER_HANDLE: string
  LOCALE: string
  GOOGLE_SITE_VERIFICATION?: string
}

export type AdSenseConfig = {
  CLIENT_ID: string
  ENABLED: boolean
}

export type AnalyticsConfig = {
  GOOGLE_ANALYTICS_ID?: string
}