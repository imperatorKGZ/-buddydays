import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Privacy Policy", "Information about how BuddyDays handles data.");

export default function Page() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays</p><h1>Privacy Policy</h1><p>Information about how BuddyDays handles data.</p><div className="surface"><p>This starter does not configure analytics, accounts, or tracking cookies. Replace this draft with a reviewed policy that accurately describes deployed services, data flows, retention periods, and applicable legal requirements before launch.</p></div></main>;
}
