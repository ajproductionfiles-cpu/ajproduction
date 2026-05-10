import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { HomeServiceCard } from "@/lib/site/types";

export function Services({ cards }: { cards: HomeServiceCard[] }) {
  return (
    <section id="services" className="bg-[var(--surface-soft)] px-3 py-3 md:px-4">
      <div className="page-shell-wide section-stack">
        <div className="mb-8 max-w-[44rem]">
          <p className="eyebrow">Core Services</p>
          <h2 className="section-title mt-5">Designed for modern luxury brands that need clarity, craft, and conversion.</h2>
          <p className="body-large mt-5">
            Four tightly scoped offerings, each built to move from concept to launch without losing polish along the way.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {cards.map((card, index) => (
            <article
              key={card.title + index}
              className="surface-card-strong panel-hover fade-up-enter flex min-h-[39rem] flex-col overflow-hidden px-7 pt-9 text-left md:min-h-[42rem] md:px-10 md:pt-10"
            >
              <div className="max-w-[31rem]">
                <p className="eyebrow">{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
                <h3 className="card-title mt-5">
                  {card.title}
                </h3>
                <p className="body-large mt-4 max-w-[24rem]">
                  {card.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={card.primaryHref} className="studio-pill-primary">
                    {card.primaryLabel}
                  </Link>
                  <Link href={card.secondaryHref} className="studio-pill-secondary">
                    {card.secondaryLabel}
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-1 items-end">
                <div className="hero-frame relative aspect-[16/10] w-full bg-[var(--surface-soft)]">
                  <SmartImage
                    src={card.image}
                    alt={card.title}
                    fill
                    priority={false}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
