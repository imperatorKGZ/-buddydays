import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Terms of Use", "Terms for using BuddyDays tools and editorial content.");

export default function Page() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays</p><h1>Terms of Use</h1><p>Terms for using BuddyDays tools and editorial content.</p><div className="surface"><p>BuddyDays tools provide general informational estimates and are not veterinary, medical, legal, or professional advice. Replace this starter text with reviewed terms before public launch.</p></div></main>;
}
