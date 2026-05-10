import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";
import type { PublicProject } from "@/lib/site/types";

type WorkProps = {
  projects: PublicProject[];
  introText: string;
  ctaLabel: string;
  ctaHref: string;
};

export function Work({ projects, introText, ctaLabel, ctaHref }: WorkProps) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="bg-white">
      <div className="page-shell section-stack-tight">
        <div className="max-w-[46rem]">
          <p className="eyebrow">Selected Work</p>
          <h2 className="section-title mt-5">Stories built to feel precise, cinematic, and commercially sharp.</h2>
        </div>
      </div>

      {projects.map((project, index) => (
        <ProjectPromo key={project.id} project={project} index={index} />
      ))}

      <div className="border-t border-[var(--line-soft)] bg-white">
        <div className="page-shell section-stack-tight flex flex-col items-center gap-4 text-center">
          <p className="body-copy">{introText}</p>
          <Link href={ctaHref} className="studio-pill-ghost">
            {ctaLabel} ›
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectPromo({ project, index }: { project: PublicProject; index: number }) {
  const isDark = index % 2 !== 0;

  return (
    <Link href={`/work/${project.slug}`} className="block">
      <section
        className={cn(
          "relative overflow-hidden border-t border-white/70 px-4 py-4 md:px-6",
          isDark ? "bg-black text-white" : "bg-[var(--surface-soft)] text-[var(--text-primary)]",
        )}
      >
        <div
          className={cn(
            "page-shell-wide overflow-hidden rounded-[2.2rem] px-6 py-10 md:px-10 md:py-12",
            isDark
              ? "bg-[radial-gradient(circle_at_top_right,_rgba(77,112,255,0.24),_transparent_24%),linear-gradient(180deg,#050608,#10141d)]"
              : "bg-white",
          )}
        >
          <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <div className="max-w-[24rem]">
              <p
                className={cn(
                  "text-[12px] font-semibold uppercase tracking-[0.2em]",
                  isDark ? "text-white/55" : "text-[var(--text-muted)]",
                )}
              >
                {project.category}
              </p>
              <h3 className="mt-4 font-display text-[2.6rem] font-semibold leading-none tracking-[-0.05em] md:text-[4.7rem]">
                {project.title}
              </h3>
              <p className={cn("mt-5 text-[1rem] leading-relaxed md:text-[1.12rem]", isDark ? "text-white/72" : "text-[var(--text-secondary)]")}>
                {project.description}
              </p>
              <div className="mt-7">
                <span className={cn("inline-flex rounded-full px-4 py-2 text-[13px] font-semibold", isDark ? "bg-white text-black" : "border border-[var(--brand-blue)]/18 bg-white text-[var(--brand-blue-strong)]")}>
                  View Project ›
                </span>
              </div>
            </div>

            <div className="hero-frame relative aspect-[16/10] bg-[#e8e8ed]">
              <SmartImage
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(min-width: 1280px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
