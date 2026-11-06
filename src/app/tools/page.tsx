import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata("Pet Tools", "A small collection of practical tools for dog and cat owners."),
  robots: { index: false, follow: false },
};

const tools = [
  { title: "Pet Cost Calculator", href: "/tools/pet-cost-calculator", description: "Estimate recurring and one-time pet ownership costs using your own figures." },
  { title: "Travel Checklist", href: "/tools/travel-checklist", description: "Build a practical packing checklist for a trip with your pet." },
  { title: "Pet Size Calculator", href: "/tools/pet-size-calculator", description: "Record your pet's measurements before checking a product's size chart." },
];

export default function ToolsPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">BuddyDays tools</p>
      <h1>Simple tools for everyday planning.</h1>
      <p>
        These utilities are available while BuddyDays focuses its public launch
        on editorial content. They provide general planning help, not
        veterinary or professional advice.
      </p>
      <div className="product-grid">
        {tools.map((tool) => (
          <article className="surface" key={tool.href}>
            <h2>{tool.title}</h2>
            <p className="muted">{tool.description}</p>
            <Link className="text-link" href={tool.href}>Open tool →</Link>
          </article>
        ))}
      </div>
    </main>
  );
}