import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Affiliate Disclosure", "BuddyDays may participate in affiliate programs.");

export default function Page() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays</p><h1>Affiliate Disclosure</h1><p>BuddyDays may participate in affiliate programs.</p><div className="surface"><p>Some links may be affiliate links. BuddyDays may earn a commission from qualifying purchases at no additional cost to you. As an Amazon Associate I earn from qualifying purchases. Publish this statement only while it accurately reflects actual participation in the Amazon Associates Program.</p></div></main>;
}
