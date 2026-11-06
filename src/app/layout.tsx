import type { Metadata, Viewport } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { OrganizationJsonLd } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { type: "website", siteName: siteConfig.name, title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description, locale: "en_US" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3ed",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <OrganizationJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
