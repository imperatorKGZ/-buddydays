export const siteConfig = {
  name: "BuddyDays",
  tagline: "Better days, together.",
  description: "Practical, thoughtful guides and everyday ideas for people who share their homes with dogs and cats.",
  locale: "en_US",
  language: "en",
  market: "US",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
