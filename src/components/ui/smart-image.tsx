import Image from "next/image";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  width?: number;
  height?: number;
};

const OPTIMIZED_HOSTS = new Set(["images.unsplash.com"]);

function canOptimize(src: string) {
  if (src.startsWith("/")) {
    return true;
  }

  try {
    const url = new URL(src);
    return OPTIMIZED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function SmartImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  quality = 68,
  fill = false,
  width = 1600,
  height = 900,
}: SmartImageProps) {
  if (canOptimize(src)) {
    if (fill) {
      return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={quality} className={className} />;
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={className}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading={priority ? "eager" : "lazy"} decoding="async" />;
}
