import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createPageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: { title, description, siteName: siteConfig.name, locale: siteConfig.locale, type: "website" },
  };
}
