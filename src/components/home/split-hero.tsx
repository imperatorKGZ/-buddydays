import { DogWorldSection } from "./dog-world-section";
import { CatWorldSection } from "./cat-world-section";

export function SplitHero() {
  return (
    <main className="split-hero">
      <DogWorldSection />
      <div className="world-divider" aria-label="Two worlds, one happy home">
        <span>Two worlds. One happy home.</span>
      </div>
      <CatWorldSection />
    </main>
  );
}
