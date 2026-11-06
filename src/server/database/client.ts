/** No database is configured yet. Do not import from application routes. */
export function getDatabaseClient(): never {
  throw new Error("Database is not configured; repositories currently use local typed data.");
}
