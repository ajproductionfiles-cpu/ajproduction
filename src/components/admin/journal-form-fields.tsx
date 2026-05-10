import { Field } from "@/components/admin/field";
import { SmartImage } from "@/components/ui/smart-image";
import type { PublicJournalPost } from "@/lib/site/types";

export function JournalFormFields({ post }: { post?: PublicJournalPost }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title"><input name="title" defaultValue={post?.title} className="admin-input" required /></Field>
        <Field label="Slug"><input name="slug" defaultValue={post?.slug} className="admin-input" placeholder="auto-generated-if-empty" /></Field>
        <Field label="Category"><input name="category" defaultValue={post?.category || "Insights"} className="admin-input" /></Field>
        <Field label="Author"><input name="authorName" defaultValue={post?.authorName || "Studio Editorial"} className="admin-input" /></Field>
        <Field label="Cover Image URL"><input name="coverImage" defaultValue={post?.coverImage} className="admin-input" /></Field>
      </div>

      <Field label="Cover Image Upload">
        <input
          name="coverUpload"
          type="file"
          accept="image/*"
          className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
        />
      </Field>

      {post?.coverImage ? (
        <div className="overflow-hidden rounded-[24px] border border-[#2c2c2e] bg-[#151517] p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">Current Cover</p>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-[#0f0f10]">
            <SmartImage src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      ) : null}

      <Field label="Excerpt"><textarea name="excerpt" defaultValue={post?.excerpt} rows={3} className="admin-input" /></Field>
      <Field label="Content"><textarea name="content" defaultValue={post?.content} rows={12} className="admin-input" /></Field>
      <Field label="Tags (one per line)"><textarea name="tags" defaultValue={post?.tags?.join("\n")} rows={4} className="admin-input" /></Field>

      <div className="rounded-[24px] border border-[#2c2c2e] bg-[#151517] p-4">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">SEO</p>
        <div className="space-y-4">
          <Field label="SEO Title"><input name="seoTitle" defaultValue={post?.seoTitle} className="admin-input" /></Field>
          <Field label="SEO Description"><textarea name="seoDescription" defaultValue={post?.seoDescription} rows={3} className="admin-input" /></Field>
          <Field label="SEO Keywords"><input name="seoKeywords" defaultValue={post?.seoKeywords} className="admin-input" placeholder="branding, studio, ai, web design" /></Field>
          <Field label="Canonical URL"><input name="canonicalUrl" defaultValue={post?.canonicalUrl} className="admin-input" placeholder="https://yourdomain.com/blog/slug" /></Field>
          <Field label="OG Image URL"><input name="ogImage" defaultValue={post?.ogImage || post?.coverImage} className="admin-input" /></Field>
          <Field label="OG Image Upload">
            <input
              name="ogImageUpload"
              type="file"
              accept="image/*"
              className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
            />
          </Field>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-[22px] border border-[#2c2c2e] bg-[#151517] px-4 py-4 text-[14px] font-medium text-white">
        <input name="published" type="checkbox" defaultChecked={post?.published} className="accent-[#0a84ff]" />
        Published
      </label>
    </>
  );
}
