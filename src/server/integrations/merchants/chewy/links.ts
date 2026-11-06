/** Implement only after an approved Chewy affiliate program/network is selected. */
export function assertChewyIntegrationConfigured(): never {
  throw new Error("Chewy affiliate integration is not configured.");
}
