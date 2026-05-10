import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteJournalPostAction, updateJournalPostAction } from "@/app/admin/actions";
import { JournalFormFields } from "@/components/admin/journal-form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { getJournalPostById } from "@/lib/site/data";

export default async function EditJournalPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getJournalPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
            Blog
          </p>
          <h1 className="mt-2 text-[34px] font-semibold text-white">{post.title}</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/journal" className="rounded-full border border-[#2c2c2e] px-4 py-2 text-[13px] font-semibold text-white transition hover:border-[#3c3c3e]">
            Back
          </Link>
          <form action={deleteJournalPostAction}>
            <input type="hidden" name="id" value={post.id} />
            <button type="submit" className="rounded-full border border-red-500/30 px-4 py-2 text-[13px] font-semibold text-red-300 transition hover:bg-red-500/10">
              Delete
            </button>
          </form>
        </div>
      </div>

      <form action={updateJournalPostAction} encType="multipart/form-data" className="space-y-6 rounded-[32px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="createdAt" value={post.createdAt} />
        <JournalFormFields post={post} />
        <SubmitButton label="Save Blog Post" className="admin-button" />
      </form>
    </div>
  );
}
