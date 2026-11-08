import { organizationSchema } from "./schema-org";
export function OrganizationJsonLd() {
  const jsonLd = organizationSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
