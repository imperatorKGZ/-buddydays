"use client";

import { useCallback, useState, type PointerEvent } from "react";

export interface MascotGaze {
  x: number;
  y: number;
}

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/**
 * Tracks the pointer relative to the entire animal section, not just the SVG.
 * This lets the mascot look at the cursor while it is over the copy or CTA.
 */
export function useMascotGaze() {
  const [gaze, setGaze] = useState<MascotGaze>({ x: 0, y: 0 });

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    setGaze({
      x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2),
      y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2),
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    setGaze({ x: 0, y: 0 });
  }, []);

  return { gaze, onPointerMove, onPointerLeave };
}
