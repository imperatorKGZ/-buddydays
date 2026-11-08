import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata("Pet Tools", "Free practical tools for dog and cat owners.");
const tools = [
  {
    title: "Product Finder",
    href: "/tools/product-finder",
    description: "Match your needs to products in the BuddyDays catalog.",
  },
  {
    title: "Pet Cost Calculator",
    href: "/tools/pet-cost-calculator",
    description: "Estimate recurring and one-time ownership costs.",
  },
  {
    title: "Travel Checklist",
    href: "/tools/travel-checklist",
    description: "Create a practical packing checklist for a pet trip.",
  },
  {
    title: "Pet Size Calculator",
    href: "/tools/pet-size-calculator",
    description: "Record measurements before checking a manufacturer's size chart.",
  },
];
export default function ToolsPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">BuddyDays tools</p>
      <h1>Small tools for everyday pet decisions.</h1>
      <p>Interactive utilities that help owners plan, compare, and make more informed decisions.</p>
      <div className="product-grid">
        {tools.map((tool) => (
          <article className="surface" key={tool.href}>
            <h2>{tool.title}</h2>
            <p className="muted">{tool.description}</p>
            <Link className="text-link" href={tool.href}>
              Open tool →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
