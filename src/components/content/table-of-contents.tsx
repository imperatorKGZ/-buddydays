export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  if (!items.length) return null;
  return (
    <nav className="toc" aria-label="Table of contents">
      <strong>On this page</strong>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
