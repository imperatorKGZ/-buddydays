import { notFound } from "next/navigation";
import { productRepository } from "@/server/repositories/product.repository";
import { offerRepository } from "@/server/repositories/offer.repository";
import { sourceRepository } from "@/server/repositories/source.repository";
import { AffiliateDisclosure } from "@/components/affiliate/affiliate-disclosure";
import { AffiliateLink } from "@/components/affiliate/affiliate-link";
import { buildAmazonAffiliateUrl } from "@/server/integrations/merchants/amazon/links";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productRepository.findBySlug(slug);
  if (!product) notFound();
  const [offers, sources] = await Promise.all([
    offerRepository.findByProductId(product.id),
    sourceRepository.findManyByIds(product.sourceIds),
  ]);
  const offerLinks = offers.flatMap((offer) => {
    if (offer.merchant === "amazon" && offer.externalProductId) {
      return [{ offer, href: buildAmazonAffiliateUrl(offer.externalProductId) }];
    }
    return offer.destinationUrl ? [{ offer, href: offer.destinationUrl }] : [];
  });

  return (
    <main className="page-shell">
      <p className="eyebrow">BuddyDays product research</p>
      <h1>{product.name}</h1>
      <p>{product.summary}</p>
      <h2>Specifications</h2>
      <dl className="surface">
        {Object.entries(product.specifications).map(([key, value]) => (
          <div className="row-between" key={key}>
            <dt>{key}</dt>
            <dd>{String(value)}</dd>
          </div>
        ))}
      </dl>
      <h2>Potential advantages</h2>
      <ul>
        {product.pros.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Limitations</h2>
      <ul>
        {product.cons.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Sources</h2>
      {sources.length ? (
        <ul>
          {sources.map((source) => (
            <li key={source.id}>
              {source.title} — checked {source.checkedAt}
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Source records have not been added yet.</p>
      )}
      {offerLinks.length ? (
        <section>
          <h2>Where to buy</h2>
          <AffiliateDisclosure />
          {offerLinks.map(({ offer, href }) => (
            <p key={offer.id}>
              <AffiliateLink href={href} merchant={offer.merchant}>{`Check at ${offer.merchant}`}</AffiliateLink>
            </p>
          ))}
        </section>
      ) : null}
    </main>
  );
}
