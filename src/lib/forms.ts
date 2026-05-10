export function linesToList(value: FormDataEntryValue | null) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function inferMediaType(url: string) {
  return /\.(mp4|webm|mov|ogv|ogg|m4v)(\?.*)?$/i.test(url) ? "video" : "image";
}

export function linesToLinks(value: FormDataEntryValue | null) {
  return linesToList(value).map((line) => {
    const [label, href = "#"] = line.split("|").map((part) => part.trim());
    return {
      label: label || "Untitled",
      href: href || "#",
    };
  });
}

export function listToMultiline(items: string[]) {
  return items.join("\n");
}

export function linksToMultiline(items: { label: string; href: string }[]) {
  return items.map((item) => `${item.label}|${item.href}`).join("\n");
}

export function linesToProjectMedia(value: FormDataEntryValue | null) {
  return linesToList(value).map((line) => {
    const [maybeType, ...rest] = line.split("|").map((part) => part.trim());
    if ((maybeType === "image" || maybeType === "video") && rest.length > 0) {
      return {
        type: maybeType,
        url: rest.join("|").trim(),
      } as const;
    }

    return {
      type: inferMediaType(line),
      url: line,
    } as const;
  });
}

export function mediaToMultiline(items: { type: "image" | "video"; url: string }[]) {
  return items.map((item) => `${item.type}|${item.url}`).join("\n");
}

export function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}
