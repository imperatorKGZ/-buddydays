import "server-only";
import { getServerEnv } from "@/config/env";

const ASIN_PATTERN = /^[A-Z0-9]{10}$/;

export function buildAmazonAffiliateUrl(asin: string): string {
  if (!ASIN_PATTERN.test(asin)) throw new Error("Invalid Amazon ASIN.");
  const env = getServerEnv();
  if (env.AMAZON_ENABLED !== "true" || !env.AMAZON_ASSOCIATE_TAG) {
    throw new Error("Amazon Associates links are not enabled in this environment.");
  }
  const url = new URL(`/dp/${asin}`, "https://www.amazon.com");
  url.searchParams.set("tag", env.AMAZON_ASSOCIATE_TAG);
  return url.toString();
}
