import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Contact BuddyDays",
  "Contact BuddyDays with questions, corrections, and topic suggestions."
);

export default function ContactPage() {
  return (
    <main className="page-shell stack">
      <p className="eyebrow">Get in touch</p>
      <h1>Contact BuddyDays</h1>

      <p>
        Have a question, spotted something that needs correcting, or want to
        suggest a topic? Send us an email.
      </p>

      <p>
        <a
          className="text-link"
          href="mailto:imperatorkant@gmail.com"
        >
          imperatorkant@gmail.com
        </a>
      </p>

      <p>
        For corrections, include the article URL and the detail you think
        needs attention.
      </p>
    </main>
  );
}