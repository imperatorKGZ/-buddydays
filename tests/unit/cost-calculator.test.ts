import { describe, expect, it } from "vitest";
import { calculateOwnershipCost } from "@/features/cost-calculator/logic/calculate-cost";

describe("calculateOwnershipCost", () => {
  it("adds initial cost and recurring costs in the selected period", () => {
    expect(
      calculateOwnershipCost({ initialCost: 40, recurringCost: 8, recurringIntervalDays: 30, periodDays: 90 }),
    ).toBe(64);
  });
  it("rejects invalid recurrence intervals", () => {
    expect(() =>
      calculateOwnershipCost({ initialCost: 10, recurringCost: 3, recurringIntervalDays: 0, periodDays: 90 }),
    ).toThrow();
  });
});
