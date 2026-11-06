export interface CostInputs { initialCost: number; recurringCost: number; recurringIntervalDays: number; periodDays: number; }
export function calculateOwnershipCost(input: CostInputs): number {
  if (Object.values(input).some((value) => !Number.isFinite(value) || value < 0)) throw new Error("Inputs must be finite, non-negative numbers.");
  if (input.recurringIntervalDays <= 0) throw new Error("Recurring interval must be greater than zero.");
  return input.initialCost + Math.floor(input.periodDays / input.recurringIntervalDays) * input.recurringCost;
}
