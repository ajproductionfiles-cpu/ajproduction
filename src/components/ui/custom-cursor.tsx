"use client";

import { useEffect, useRef } from "react";

export function CustomCursor({ enabled }: { enabled: boolean }) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !cursorRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !finePointer) {
      return;
    }

    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      frame = window.requestAnimationFrame(render);
    };

    const moveCursor = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    frame = window.requestAnimationFrame(render);
    window.addEventListener("mousemove", moveCursor, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-5 w-5 items-center justify-center rounded-full border border-[var(--brand-blue)]/45 mix-blend-difference lg:flex"
    >
      <div className="h-1 w-1 rounded-full bg-[var(--brand-blue)]" />
    </div>
  );
}
