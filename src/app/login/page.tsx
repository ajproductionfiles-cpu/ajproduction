import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getCurrentAdmin } from "@/lib/auth";

export default async function LoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect("/admin");
  }

  const showDevCredentials = process.env.NODE_ENV !== "production";

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b] shadow-sm">
            Admin Access
          </div>
          <div className="space-y-5">
            <h1 className="max-w-[12ch] text-[52px] font-semibold tracking-tighter text-[#1d1d1f] md:text-[88px]">
              Control Every Pixel.
            </h1>
            <p className="max-w-[620px] text-[20px] leading-relaxed text-[#6e6e73] md:text-[26px]">
              Projects, copy, navigation, footer, contact flows, journal, SEO messaging, and the overall site experience now live behind a proper admin login.
            </p>
          </div>
          {showDevCredentials ? (
            <div className="rounded-[32px] bg-white p-6 shadow-sm">
              <p className="text-[14px] text-[#86868b]">Development login seeded from `.env`:</p>
              <p className="mt-2 font-mono text-[14px] text-[#1d1d1f]">
                {process.env.ADMIN_EMAIL || "admin@studio.local"}
              </p>
              <p className="font-mono text-[14px] text-[#1d1d1f]">
                {process.env.ADMIN_PASSWORD || "ChangeMe123!"}
              </p>
            </div>
          ) : null}
        </section>

        <section className="rounded-[40px] bg-white p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] md:p-12">
          <div className="mb-8 space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
              Welcome back
            </p>
            <h2 className="text-[36px] font-semibold tracking-tight text-[#1d1d1f]">
              Sign in to Studio Admin
            </h2>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
