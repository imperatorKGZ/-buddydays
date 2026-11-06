import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("About BuddyDays", "BuddyDays is being built to help dog and cat owners make more informed everyday decisions through practical tools, traceable product information, and clear guides.");

export default function Page() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays</p><h1>About BuddyDays</h1><p>BuddyDays is being built to help dog and cat owners make more informed everyday decisions through practical tools, traceable product information, and clear guides.</p><div className="surface"><p>Our purpose is to make product research easier to understand. We separate sourced product facts from editorial assessments and merchant offers.</p></div></main>;
}
