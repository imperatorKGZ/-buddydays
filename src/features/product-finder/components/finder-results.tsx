import type { ProductMatch } from "../types";

export function FinderResults({ results }: { results: ProductMatch[] }) {
  if (!results.length)
    return (
      <p className="muted">
        No matching products are in the catalog yet. BuddyDays will list products only after their information has been
        checked.
      </p>
    );
  return (
    <div className="stack">
      {results.map(({ product, score, reasons, limitations }) => (
        <article className="surface" key={product.id}>
          <div className="row-between">
            <h3>{product.name}</h3>
            <span className="score">{score}% fit</span>
          </div>
          <p>{product.summary}</p>
          {reasons.length ? <p className="muted">{reasons.join(" ")}</p> : null}
          {limitations.length ? <p className="form-error">{limitations.join(" ")}</p> : null}
        </article>
      ))}
    </div>
  );
}
