"use client";

import dynamic from "next/dynamic";

const SmoothScrollProvider = dynamic(
  () => import("@/components/providers/smooth-scroll-provider").then((mod) => mod.SmoothScrollProvider),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((mod) => mod.CustomCursor),
  { ssr: false },
);

export function SiteEnhancements({
  children,
  enableSmoothScroll,
  showCustomCursor,
}: {
  children: React.ReactNode;
  enableSmoothScroll: boolean;
  showCustomCursor: boolean;
}) {
  return (
    <>
      <CustomCursor enabled={showCustomCursor} />
      <SmoothScrollProvider enabled={enableSmoothScroll}>
        {children}
      </SmoothScrollProvider>
    </>
  );
}
