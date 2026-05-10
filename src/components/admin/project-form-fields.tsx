import { Field } from "@/components/admin/field";
import { SmartImage } from "@/components/ui/smart-image";
import { listToMultiline, mediaToMultiline } from "@/lib/forms";
import type { PublicProject } from "@/lib/site/types";

export function ProjectFormFields({ project }: { project?: PublicProject }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title"><input name="title" defaultValue={project?.title} className="admin-input" required /></Field>
        <Field label="Slug"><input name="slug" defaultValue={project?.slug} placeholder="auto-generated-if-empty" className="admin-input" /></Field>
        <Field label="Category"><input name="category" defaultValue={project?.category} className="admin-input" /></Field>
        <Field label="Client"><input name="client" defaultValue={project?.client} className="admin-input" /></Field>
        <Field label="Year"><input name="year" defaultValue={project?.year || new Date().getFullYear()} className="admin-input" /></Field>
        <Field label="Sort Order"><input name="sortOrder" type="number" defaultValue={project?.sortOrder || 0} className="admin-input" /></Field>
      </div>

      <Field label="Short Description"><textarea name="description" defaultValue={project?.description} rows={3} className="admin-input" /></Field>
      <Field label="Full Description"><textarea name="fullDescription" defaultValue={project?.fullDescription} rows={6} className="admin-input" /></Field>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Hero Image URL"><input name="heroImage" defaultValue={project?.heroImage} className="admin-input" /></Field>
        <Field label="Hero Image Upload">
          <input
            name="heroUpload"
            type="file"
            accept="image/*"
            className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
          />
        </Field>
      </div>

      {project?.heroImage ? (
        <div className="overflow-hidden rounded-[24px] border border-[#2c2c2e] bg-[#151517] p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">Current Hero</p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#0f0f10]">
            <SmartImage src={project.heroImage} alt={project.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      ) : null}

      <Field label="Services (one per line)"><textarea name="services" defaultValue={listToMultiline(project?.services || [])} rows={5} className="admin-input" /></Field>
      <Field label="Tags (one per line)"><textarea name="tags" defaultValue={listToMultiline(project?.tags || [])} rows={4} className="admin-input" /></Field>

      <Field label="Gallery Media (`image|url` or `video|url`, one per line)">
        <textarea name="gallery" defaultValue={mediaToMultiline(project?.gallery || [])} rows={7} className="admin-input" />
      </Field>
      <Field label="Upload Gallery Media (images and videos)">
        <input
          name="galleryUploads"
          type="file"
          accept="image/*,video/*"
          multiple
          className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
        />
      </Field>

      {project?.gallery?.length ? (
        <div className="space-y-4 rounded-[24px] border border-[#2c2c2e] bg-[#151517] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">Current Gallery</p>
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((item, index) => (
              <div key={`${item.url}-${index}`} className="overflow-hidden rounded-[20px] border border-[#2c2c2e] bg-[#0f0f10]">
                <div className="relative aspect-[16/10]">
                  {item.type === "video" ? (
                    <video src={item.url} controls className="h-full w-full object-cover" />
                  ) : (
                    <SmartImage src={item.url} alt={`${project.title} media ${index + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  )}
                </div>
                <div className="flex items-center justify-between px-4 py-3 text-[12px] text-[#a1a1a6]">
                  <span className="uppercase tracking-[0.15em]">{item.type}</span>
                  <span className="truncate pl-3">{item.url}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-[22px] border border-[#2c2c2e] bg-[#151517] px-4 py-4 text-[14px] font-medium text-white">
          <input name="featured" type="checkbox" defaultChecked={project?.featured} className="accent-[#0a84ff]" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-3 rounded-[22px] border border-[#2c2c2e] bg-[#151517] px-4 py-4 text-[14px] font-medium text-white">
          <input name="published" type="checkbox" defaultChecked={project?.published} className="accent-[#0a84ff]" />
          Published
        </label>
      </div>
    </>
  );
}
