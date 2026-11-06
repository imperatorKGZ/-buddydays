import type { DimensionInput } from "../types";
export function validateDimensions(input: DimensionInput): boolean {
  const values = [input.lengthInches, input.widthInches, input.heightInches];
  if (input.weightPounds !== undefined) values.push(input.weightPounds);
  return values.every((value) => Number.isFinite(value) && value > 0);
}
