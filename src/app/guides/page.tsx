import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata("Pet Guides", "Practical, source-aware guides for dog and cat owners.");
export default function GuidesPage() { return <main className="page-shell"><p className="eyebrow">BuddyDays guides</p><h1>Clear answers for everyday pet decisions.</h1><p>Editorial guides will be published here after source review. BuddyDays does not fabricate testing or personal experience.</p><div className="empty-state"><h2>Guides are being prepared</h2><p>Reviewed MDX articles will appear here.</p></div></main>; }
