/** Add only a policy-aware cache after reviewing the current Amazon license. */
export function assertAmazonContentCachingNotConfigured(): never {
  throw new Error("Amazon Product Advertising Content caching is not configured.");
}
