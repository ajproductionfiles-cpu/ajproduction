"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { HomeFeaturedWallItem } from "@/lib/site/types";

type FeaturedWorkWallProps = {
  title: string;
  subtitle: string;
  items: HomeFeaturedWallItem[];
};

export function FeaturedWorkWall({ title, subtitle, items }: FeaturedWorkWallProps) {
  const filledItems = items.filter((item) => item.mediaUrl && item.title);

  if (filledItems.length === 0) {
    return null;
  }

  const primaryItems = filledItems.slice(0, Math.min(3, filledItems.length));
  const secondaryItems = filledItems.length > 3 ? filledItems.slice(3) : filledItems;

  return (
    <section className="showcase-wall overflow-hidden bg-[var(--surface-soft)] py-16 md:py-24">
      <div className="page-shell-cinematic">
        <div className="mx-auto mb-12 max-w-[56rem] text-center">
          <p className="eyebrow justify-center before:hidden">Featured Wall</p>
          <h2 className="section-title mt-5">{title}</h2>
          <p className="body-large mt-5">{subtitle}</p>
        </div>

        <MarqueeRow items={primaryItems} size="large" reverse={false} />
        <MarqueeRow items={secondaryItems} size="small" reverse />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  size,
  reverse,
}: {
  items: HomeFeaturedWallItem[];
  size: "large" | "small";
  reverse?: boolean;
}) {
  const loopItems = [...items, ...items];

  return (
    <div className={size === "small" ? "mt-4 md:mt-6" : ""}>
      <div className="overflow-hidden">
        <div className={`showcase-track ${reverse ? "showcase-track-reverse" : ""}`}>
          {loopItems.map((item, index) => (
            <InteractiveShowcaseCard key={`${item.title}-${index}-${size}`} item={item} size={size} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveShowcaseCard({
  item,
  size,
}: {
  item: HomeFeaturedWallItem;
  size: "large" | "small";
}) {
  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const px = (offsetX / bounds.width) * 100;
    const py = (offsetY / bounds.height) * 100;

    event.currentTarget.style.setProperty("--mx", `${px}%`);
    event.currentTarget.style.setProperty("--my", `${py}%`);
    event.currentTarget.style.setProperty("--ry", `${((px - 50) / 50) * 5}deg`);
    event.currentTarget.style.setProperty("--rx", `${-((py - 50) / 50) * 5}deg`);
  }

  function reset(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--mx", "50%");
    event.currentTarget.style.setProperty("--my", "50%");
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  const cardWidth =
    size === "large"
      ? "min-w-[82vw] md:min-w-[640px] xl:min-w-[760px]"
      : "min-w-[72vw] md:min-w-[340px] xl:min-w-[390px]";
  const cardHeight = size === "large" ? "aspect-[1.28/1]" : "aspect-[1.22/1]";
  const copyWidth = size === "large" ? "max-w-[420px]" : "max-w-[280px]";

  return (
    <div className={`mx-2 ${cardWidth} first:ml-0 last:mr-0 md:mx-3`}>
      <Link
        href={item.ctaHref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="showcase-card group relative block"
      >
        <div className={`relative ${cardHeight} overflow-hidden rounded-[20px] bg-[#0f1014] shadow-[0_35px_90px_-30px_rgba(0,0,0,0.42)] md:rounded-[28px]`}>
          <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">
            {item.mediaType === "video" ? (
              <video
                src={item.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <SmartImage
                src={item.mediaUrl}
                alt={item.title}
                fill
                sizes={size === "large" ? "(min-width: 1280px) 760px, 82vw" : "(min-width: 1280px) 390px, 72vw"}
                className="object-cover"
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/22 to-black/5" />

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div className={copyWidth}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">{item.badge}</p>
              <h3 className={`mt-3 font-semibold tracking-tight text-white ${size === "large" ? "text-[30px] md:text-[42px]" : "text-[22px] md:text-[28px]"}`}>
                {item.title}
              </h3>
              <p className={`mt-3 text-white/82 ${size === "large" ? "text-[15px] md:text-[18px]" : "text-[14px]"}`}>
                {item.subtitle}
              </p>
              <span className="mt-5 inline-flex rounded-full bg-white/92 px-5 py-2 text-[13px] font-semibold text-[#1d1d1f] transition group-hover:bg-white">
                {item.ctaLabel}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
