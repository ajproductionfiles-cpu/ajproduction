import Link from "next/link";
import { ArrowLeft, FileText, FolderKanban, LayoutDashboard, LogOut, MessageSquare, Sparkles } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={17} /> },
  { name: "Website", href: "/admin/settings", icon: <Sparkles size={17} /> },
  { name: "Projects", href: "/admin/projects", icon: <FolderKanban size={17} /> },
  { name: "Blog", href: "/admin/journal", icon: <FileText size={17} /> },
  { name: "Inquiries", href: "/admin/inquiries", icon: <MessageSquare size={17} /> },
];

function SidebarNav({ className }: { className?: string }) {
  return (
    <nav className={className}>
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-[#86868b] transition hover:bg-[#1c1c1e] hover:text-white md:justify-start"
        >
          {item.icon}
          <span className="hidden md:inline">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="shrink-0 space-y-2 border-t border-[#2c2c2e] pt-5">
      <Link
        href="/"
        className="flex items-center justify-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-[#86868b] transition hover:bg-[#1c1c1e] hover:text-white md:justify-start"
      >
        <ArrowLeft size={17} />
        <span className="hidden md:inline">View Site</span>
      </Link>
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-[#86868b] transition hover:bg-red-500/10 hover:text-red-300 md:justify-start"
        >
          <LogOut size={17} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </form>
    </div>
  );
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin = await requireAdmin();
  const initials = admin.name
    .split(" ")
    .map((chunk: any) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-dvh bg-[#111] text-white">
      <aside
        className="fixed left-0 top-0 z-30 flex h-dvh w-[88px] flex-col border-r border-[#2c2c2e] bg-[#111] p-3 md:w-[240px] md:p-5"
        aria-label="Admin navigation"
      >
        <div className="flex shrink-0 items-center gap-3 px-2 pt-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <Sparkles size={18} />
          </div>
          <div className="hidden md:block">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
              Studio
            </p>
            <p className="text-[14px] font-semibold text-white">Admin Console</p>
          </div>
        </div>

        <SidebarNav className="mt-8 min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain" />

        <SidebarFooter />
      </aside>

      <div className="ml-[88px] flex min-h-dvh min-w-0 flex-col md:ml-[240px]">
        <header className="sticky top-0 z-20 border-b border-[#2c2c2e] bg-[#111]/95 px-6 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                Authenticated
              </p>
              <h1 className="text-[18px] font-semibold text-white">Studio Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[13px] font-semibold text-white">{admin.name}</p>
                <p className="text-[11px] text-[#86868b]">{admin.email}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-[12px] font-bold text-white">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
