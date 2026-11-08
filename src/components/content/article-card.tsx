import Link from "next/link";
export function ArticleCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="surface">
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      <Link className="text-link" href={href}>
        Read guide →
      </Link>
    </article>
  );
}
