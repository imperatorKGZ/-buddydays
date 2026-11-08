import { SizeCalculatorForm } from "@/features/size-calculator/components/size-calculator-form";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata("Pet Size Calculator", "Record pet measurements before choosing equipment.");
export default function PetSizeCalculatorPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">BuddyDays tool</p>
      <h1>Record your pet&apos;s measurements.</h1>
      <p>Use a soft tape measure and compare the dimensions with the sizing chart for the exact product model.</p>
      <SizeCalculatorForm />
    </main>
  );
}
