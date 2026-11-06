import "server-only";

export function assertCreatorsApiConfigured(): never {
  throw new Error("Amazon Creators API is not configured. BuddyDays must work without this integration.");
}
