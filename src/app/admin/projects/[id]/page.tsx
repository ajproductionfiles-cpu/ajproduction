import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProjectAction, updateProjectAction } from "@/app/admin/actions";
import { ProjectFormFields } from "@/components/admin/project-form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { getProjectById } from "@/lib/site/data";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
            Portfolio
          </p>
          <h1 className="mt-2 text-[34px] font-semibold text-white">{project.title}</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/projects" className="rounded-full border border-[#2c2c2e] px-4 py-2 text-[13px] font-semibold text-white transition hover:border-[#3c3c3e]">
            Back
          </Link>
          <form action={deleteProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <button type="submit" className="rounded-full border border-red-500/30 px-4 py-2 text-[13px] font-semibold text-red-300 transition hover:bg-red-500/10">
              Delete
            </button>
          </form>
        </div>
      </div>

      <form action={updateProjectAction} encType="multipart/form-data" className="space-y-6 rounded-[32px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
        <input type="hidden" name="id" value={project.id} />
        <ProjectFormFields project={project} />
        <SubmitButton label="Save Project" className="admin-button" />
      </form>
    </div>
  );
}
