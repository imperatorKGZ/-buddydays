import "server-only";
import { getServerEnv } from "@/config/env";

const environment = getServerEnv();

export const siteConfig = {
  name: "BuddyDays",
  tagline: "Better days, together.",
  description: "Practical, thoughtful guides and everyday ideas for people who share their homes with dogs and cats.",
  locale: "en_US",
  language: "en",
  market: "US",
  url: environment.SITE_URL,
  deploymentEnv: environment.DEPLOYMENT_ENV,
} as const;
