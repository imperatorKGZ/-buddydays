import type { Product } from "@/types/product";

export function ComparisonTable({ products }: { products: Product[] }) {
  if (!products.length) return <p className="muted">No verified products are available to compare yet.</p>;
  const keys = [...new Set(products.flatMap((product) => Object.keys(product.specifications)))];
  return <div className="table-scroll"><table><thead><tr><th>Specification</th>{products.map((product) => <th key={product.id}>{product.name}</th>)}</tr></thead><tbody>{keys.map((key) => <tr key={key}><th>{key}</th>{products.map((product) => <td key={product.id}>{String(product.specifications[key] ?? "Not verified")}</td>)}</tr>)}</tbody></table></div>;
}
