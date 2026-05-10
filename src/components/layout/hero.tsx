import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
};

export function Hero({
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-[112px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(11,110,230,0.10),_transparent_46%),radial-gradient(circle_at_top_right,_rgba(155,122,54,0.08),_transparent_30%)]" />
      <div className="page-shell section-stack flex flex-col items-center text-center">
        <p className="eyebrow fade-up-enter">Luxury Digital Studio</p>
        <h1 className="display-hero fade-up-enter delay-1 mt-5 max-w-[11ch]">
          {title}
        </h1>
        <p className="body-large fade-up-enter delay-2 mt-5 max-w-[48rem]">
          {subtitle}
        </p>
        <div className="fade-up-enter delay-3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href={primaryCtaHref} className="studio-pill-primary">
            {primaryCtaLabel} ›
          </Link>
          <Link href={secondaryCtaHref} className="studio-pill-secondary">
            {secondaryCtaLabel} ›
          </Link>
        </div>
      </div>

      <div className="page-shell-cinematic fade-up-enter delay-4 pb-2">
        <div className="hero-frame relative aspect-[16/10] md:aspect-[16/8.3]">
          <SmartImage
            src={image}
            alt={title}
            fill
            priority
            sizes="(min-width: 1480px) 1480px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_22%,rgba(0,0,0,0.10)_100%)]" />
        </div>
      </div>
    </section>
  );
}
