import { CostCalculatorForm } from "@/features/cost-calculator/components/cost-calculator-form";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata(
  "Pet Cost Calculator",
  "Estimate one-time and recurring pet ownership costs.",
);
export default function PetCostCalculatorPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">BuddyDays calculator</p>
      <h1>Estimate the cost of ownership.</h1>
      <p>
        Enter your own figures to estimate a recurring-cost scenario. The result is not a store quote or veterinary
        estimate.
      </p>
      <CostCalculatorForm />
    </main>
  );
}
