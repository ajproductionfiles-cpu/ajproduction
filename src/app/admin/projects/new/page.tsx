import Link from "next/link";
import { createProjectAction } from "@/app/admin/actions";
import { ProjectFormFields } from "@/components/admin/project-form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
            Portfolio
          </p>
          <h1 className="mt-2 text-[34px] font-semibold text-white">Create Project</h1>
        </div>
        <Link href="/admin/projects" className="rounded-full border border-[#2c2c2e] px-4 py-2 text-[13px] font-semibold text-white transition hover:border-[#3c3c3e]">
          Back
        </Link>
      </div>

      <form action={createProjectAction} encType="multipart/form-data" className="space-y-6 rounded-[32px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
        <ProjectFormFields />
        <SubmitButton label="Create Project" className="admin-button" />
      </form>
    </div>
  );
}
