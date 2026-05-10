import { updateInquiryStatusAction } from "@/app/admin/actions";
import { getAllInquiries } from "@/lib/site/data";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
          Client Pipeline
        </p>
        <h1 className="mt-2 text-[34px] font-semibold text-white">Inquiries</h1>
      </div>

      <div className="space-y-5">
        {inquiries.map((inquiry) => (
          <section key={inquiry.id} className="rounded-[28px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div>
                  <h2 className="text-[22px] font-semibold text-white">{inquiry.name}</h2>
                  <p className="text-[14px] text-[#86868b]">
                    {inquiry.service} · {inquiry.budget || "Budget not provided"}
                  </p>
                </div>
                <div className="grid gap-2 text-[14px] text-[#d2d2d7]">
                  <p>Email: <a href={`mailto:${inquiry.email}`} className="text-[#0a84ff] hover:underline">{inquiry.email}</a></p>
                  {inquiry.phone ? <p>Phone: {inquiry.phone}</p> : null}
                  <p>Status: <span className="capitalize">{inquiry.status}</span></p>
                  <p>Received: {new Date(inquiry.createdAt).toLocaleString("en-IN")}</p>
                </div>
                <p className="max-w-3xl text-[15px] leading-relaxed text-[#a1a1a6]">{inquiry.message}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {(["new", "read", "replied"] as const).map((status) => (
                  <form key={status} action={updateInquiryStatusAction}>
                    <input type="hidden" name="id" value={inquiry.id} />
                    <input type="hidden" name="status" value={status} />
                    <button
                      type="submit"
                      className="rounded-full border border-[#2c2c2e] px-4 py-2 text-[13px] font-semibold capitalize text-white transition hover:border-[#3c3c3e]"
                    >
                      Mark {status}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
