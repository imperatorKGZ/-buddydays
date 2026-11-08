import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BuddyDays",
    short_name: "BuddyDays",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ed",
    theme_color: "#f7f3ed",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
