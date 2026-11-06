import { siteConfig } from "@/config/site";
export function organizationSchema() {
  return { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };
}
