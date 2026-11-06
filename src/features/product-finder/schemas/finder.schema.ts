import { z } from "zod";

export const finderCriteriaSchema = z.object({
  species: z.enum(["dog", "cat"]),
  category: z.string().trim().min(1).max(80),
  petSize: z.string().trim().max(40).optional(),
  petAge: z.string().trim().max(40).optional(),
  useCases: z.array(z.string().trim().min(1).max(60)).max(20).optional(),
  preferredAttributes: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});
export type FinderCriteriaInput = z.infer<typeof finderCriteriaSchema>;
