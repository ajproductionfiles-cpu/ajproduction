import Link from "next/link";
import { ArrowUpRight, FileText, FolderKanban, MessageSquare, Sparkles } from "lucide-react";
import { getAllInquiries, getAllJournalPosts, getAllProjects } from "@/lib/site/data";

export default async function AdminDashboard() {
  const [projects, posts, inquiries] = await Promise.all([
    getAllProjects(),
    getAllJournalPosts(),
    getAllInquiries(),
  ]);

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      sub: `${projects.filter((project) => project.published).length} published`,
      href: "/admin/projects",
      icon: <FolderKanban size={18} />,
    },
    {
      label: "Journal",
      value: posts.length,
      sub: `${posts.filter((post) => post.published).length} live posts`,
      href: "/admin/journal",
      icon: <FileText size={18} />,
    },
    {
      label: "Inquiries",
      value: inquiries.length,
      sub: `${inquiries.filter((item) => item.status === "new").length} new`,
      href: "/admin/inquiries",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border border-[#2c2c2e] bg-[radial-gradient(circle_at_top_left,_rgba(0,102,204,0.24),_transparent_36%),linear-gradient(180deg,_#1c1c1e_0%,_#121214_100%)] p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
            Command Center
          </p>
          <h2 className="text-[34px] font-semibold tracking-tight text-white md:text-[52px]">
            Every headline, section, project, and inquiry is now managed from one place.
          </h2>
          <p className="max-w-2xl text-[16px] leading-relaxed text-[#a1a1a6] md:text-[18px]">
            Use the website studio to edit page copy, navigation, footer links, home modules, studio narrative, contact flow, and the public portfolio without touching code.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-[28px] border border-[#2c2c2e] bg-[#1c1c1e] p-6 transition hover:border-[#3c3c3e]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2c2c2e] text-white">
                {item.icon}
              </div>
              <ArrowUpRight size={16} className="text-[#6e6e73] transition group-hover:text-white" />
            </div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
              {item.label}
            </p>
            <p className="mt-2 text-[42px] font-semibold leading-none text-white">{item.value}</p>
            <p className="mt-2 text-[13px] text-[#6e6e73]">{item.sub}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                Recently Updated Projects
              </p>
              <h3 className="mt-2 text-[22px] font-semibold text-white">Portfolio Overview</h3>
            </div>
            <Link href="/admin/projects" className="text-[14px] text-[#0a84ff] hover:underline">
              Manage all
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-2xl border border-[#2c2c2e] bg-[#151517] px-4 py-4"
              >
                <div>
                  <p className="text-[15px] font-semibold text-white">{project.title}</p>
                  <p className="text-[13px] text-[#86868b]">
                    {project.category} · {project.year}
                  </p>
                </div>
                <span className="rounded-full bg-[#2c2c2e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d2d2d7]">
                  {project.published ? "Live" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
              Quick Actions
            </p>
            <div className="mt-5 space-y-3">
              {[
                { label: "Open Website Studio", href: "/admin/settings" },
                { label: "Create New Project", href: "/admin/projects/new" },
                { label: "Create Journal Post", href: "/admin/journal/new" },
                { label: "Review Inquiries", href: "/admin/inquiries" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-[#2c2c2e] bg-[#151517] px-4 py-4 text-[14px] font-medium text-white transition hover:border-[#3c3c3e]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} className="text-[#6e6e73]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-[#0a84ff]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                Audit Snapshot
              </p>
            </div>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#d2d2d7]">
              <li>LocalStorage-based demo CMS replaced with a real Prisma-backed content layer.</li>
              <li>Admin routes are now protected behind a session-based login flow.</li>
              <li>Public content can be edited from the admin without changing source files.</li>
              <li>Layout overflow and rigid section-height issues have been reduced in key homepage modules.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
