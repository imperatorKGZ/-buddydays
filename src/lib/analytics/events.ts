export interface OutboundClickEvent {
  productId: string;
  merchant: string;
  placement: string;
  occurredAt: string;
}
/** No-op until a consent-aware analytics provider and retention policy are configured. */
export function trackOutboundClick(event: OutboundClickEvent): void {
  void event; /* provider not configured */
}
