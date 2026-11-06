import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Contact BuddyDays", "Questions, corrections, and source updates are welcome.");

export default function Page() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays</p><h1>Contact BuddyDays</h1><p>Questions, corrections, and source updates are welcome.</p><div className="surface"><p>Contact details will be published after a monitored support channel is configured.</p></div></main>;
}
