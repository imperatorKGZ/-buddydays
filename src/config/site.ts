export const siteConfig = {
  name: "BuddyDays",
  tagline: "A happier everyday with pets",
  description: "BuddyDays shares thoughtful stories and practical guides for people who live with dogs and cats.",
  locale: "en_US",
  language: "en",
  market: "US",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
