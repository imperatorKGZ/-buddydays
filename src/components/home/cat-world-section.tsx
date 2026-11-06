"use client";

import Link from "next/link";
import { CatMascot } from "@/components/mascots/cat-mascot";
import { useMascotGaze } from "@/components/mascots/hooks/use-mascot-gaze";

export function CatWorldSection() {
  const { gaze, onPointerMove, onPointerLeave } = useMascotGaze();

  return (
    <section
      className="world-section cat-world"
      aria-labelledby="cat-world-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="world-copy">
        <p className="eyebrow">For the cat people</p>
        <h2 id="cat-world-title">
          <span>A little more purr</span>
          <span>in every day.</span>
        </h2>
        <p>
          Discover smart home setups, honest product comparisons and ideas that
          make life better for you and your cat.
        </p>
        <div className="world-actions">
          <Link className="button button-dark" href="/cats">
            Explore Cat World <span aria-hidden="true">→</span>
          </Link>
          <span className="world-note">For curious cats and their humans.</span>
        </div>
      </div>

      <div className="world-art" aria-hidden="true">
        <CatMascot className="mascot-svg cat-svg" gaze={gaze} />
      </div>
    </section>
  );
}
