"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScrollProvider({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  const [allowEnhancedScroll, setAllowEnhancedScroll] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    return enabled && !reduce && finePointer;
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    const sync = () => setAllowEnhancedScroll(enabled && !reduceMotion.matches && pointer.matches);

    sync();
    reduceMotion.addEventListener("change", sync);
    pointer.addEventListener("change", sync);

    return () => {
      reduceMotion.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, [enabled]);

  if (!allowEnhancedScroll) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
