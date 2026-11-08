import type { AnchorHTMLAttributes } from "react";

interface AffiliateLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  merchant: string;
}

export function AffiliateLink({ href, merchant, children, ...props }: AffiliateLinkProps) {
  const url = new URL(href);
  if (url.protocol !== "https:") throw new Error("Affiliate destination must use HTTPS.");
  return (
    <a href={url.toString()} target="_blank" rel="sponsored nofollow noopener" {...props}>
      {children ?? `Check on ${merchant}`}
    </a>
  );
}
