"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { PublicProject } from "@/lib/site/types";

export function WorkGallery({ projects }: { projects: PublicProject[] }) {
  const filters = useMemo(() => {
    const categories = Array.from(new Set(projects.map((project) => project.category).filter(Boolean)));
    return ["All", ...categories];
  }, [projects]);

  const [activeFilter, setActiveFilter] = useState("All");
  const deferredFilter = useDeferredValue(activeFilter);

  const filtered = useMemo(
    () =>
      deferredFilter === "All"
        ? projects
        : projects.filter(
            (project) =>
              project.category === deferredFilter ||
              project.tags.some((tag) => tag.toLowerCase().includes(deferredFilter.toLowerCase())),
          ),
    [deferredFilter, projects],
  );

  return (
    <>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Project categories">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold ${
              activeFilter === filter
                ? "bg-[var(--text-primary)] text-white"
                : "bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:bg-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filtered.map((project, index) => (
          <Link key={project.id} href={`/work/${project.slug}`} className="group block">
            <article className="surface-card panel-hover overflow-hidden p-4 md:p-5">
              <div className="hero-frame relative aspect-[16/10] bg-[var(--surface-soft)]">
                <SmartImage
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={index === 0}
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[26px] font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--brand-blue)]">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-[15px] text-[var(--text-tertiary)]">{project.category}</p>
                </div>
                <span className="text-[13px] text-[var(--text-muted)]">{project.year}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
