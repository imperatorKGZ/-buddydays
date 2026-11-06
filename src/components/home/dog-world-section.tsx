"use client";

import Link from "next/link";
import { DogMascot } from "@/components/mascots/dog-mascot";
import { useMascotGaze } from "@/components/mascots/hooks/use-mascot-gaze";

export function DogWorldSection() {
  const { gaze, onPointerMove, onPointerLeave } = useMascotGaze();

  return (
    <section
      className="world-section dog-world"
      aria-labelledby="dog-world-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="world-art" aria-hidden="true">
        <DogMascot className="mascot-svg dog-svg" gaze={gaze} />
      </div>

      <div className="world-copy">
        <p className="eyebrow">For the dog people</p>
        <h1 id="dog-world-title">
          <span>More good days</span>
          <span>with your dog.</span>
        </h1>
        <p>
          Thoughtful gear, practical guides and clever little tools for walks,
          trips and everything in between.
        </p>
        <div className="world-actions">
          <Link className="button button-dark" href="/dogs">
            Explore Dog World <span aria-hidden="true">→</span>
          </Link>
          <span className="world-note">Made for every kind of good dog.</span>
        </div>
      </div>
    </section>
  );
}
