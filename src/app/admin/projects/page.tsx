import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { SmartImage } from "@/components/ui/smart-image";
import { getAllProjects } from "@/lib/site/data";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
            Portfolio
          </p>
          <h1 className="mt-2 text-[34px] font-semibold text-white">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="inline-flex rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition hover:bg-[#f5f5f7]">
          New Project
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="overflow-hidden rounded-[28px] border border-[#2c2c2e] bg-[#1c1c1e]">
            <div className="relative aspect-[16/10] bg-[#151517]">
              {project.heroImage ? (
                <SmartImage
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-semibold text-white">{project.title}</h2>
                  <p className="mt-2 text-[14px] text-[#86868b]">
                    {project.category} · {project.client}
                  </p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-[#2c2c2e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#d2d2d7]">
                    {project.published ? "Live" : "Draft"}
                  </span>
                  <p className="mt-2 text-[12px] text-[#6e6e73]">Order {project.sortOrder}</p>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-[#a1a1a6]">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#2c2c2e] px-3 py-1 text-[12px] text-[#d2d2d7]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/admin/projects/${project.id}`} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black transition hover:bg-[#f5f5f7]">
                  Edit
                </Link>
                <Link href={`/work/${project.slug}`} className="rounded-full border border-[#2c2c2e] px-4 py-2 text-[13px] font-semibold text-white transition hover:border-[#3c3c3e]">
                  View Live
                </Link>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button type="submit" className="rounded-full border border-red-500/30 px-4 py-2 text-[13px] font-semibold text-red-300 transition hover:bg-red-500/10">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
