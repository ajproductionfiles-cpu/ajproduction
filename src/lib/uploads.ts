import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/svg+xml", "svg"],
  ["image/avif", "avif"],
]);

const VIDEO_EXTENSIONS = new Map([
  ["video/mp4", "mp4"],
  ["video/webm", "webm"],
  ["video/quicktime", "mov"],
  ["video/ogg", "ogv"],
]);

function sanitizeBasename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extensionFromFile(file: File) {
  const mimeExtension = IMAGE_EXTENSIONS.get(file.type) || VIDEO_EXTENSIONS.get(file.type);
  if (mimeExtension) {
    return mimeExtension;
  }

  const sourceExtension = file.name.split(".").pop()?.toLowerCase();
  return sourceExtension || "bin";
}

export async function saveUploadedFile(
  file: File,
  options: {
    folder: string;
    accept: "image" | "video" | "both";
  },
) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (
    (options.accept === "image" && !isImage) ||
    (options.accept === "video" && !isVideo) ||
    (options.accept === "both" && !isImage && !isVideo)
  ) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = extensionFromFile(file);
  const basename = sanitizeBasename(file.name.replace(/\.[^.]+$/, "")) || "upload";
  const filename = `${Date.now()}-${crypto.randomUUID()}-${basename}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads", options.folder);

  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), bytes);

  return `/uploads/${options.folder}/${filename}`;
}

export async function saveUploadedFiles(
  values: FormDataEntryValue[],
  options: {
    folder: string;
    accept: "image" | "video" | "both";
  },
) {
  const urls: string[] = [];

  for (const value of values) {
    if (!(value instanceof File) || value.size === 0) {
      continue;
    }

    const url = await saveUploadedFile(value, options);
    if (url) {
      urls.push(url);
    }
  }

  return urls;
}
