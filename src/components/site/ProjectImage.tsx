import { useState } from "react";

/** Image with a branded fallback — never shows a broken image icon. */
export function ProjectImage({
  src,
  alt,
  label,
  className = "",
  eager = false,
}: {
  src?: string | undefined;
  alt: string;
  label: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div className={`placeholder-grain absolute inset-0 flex flex-col justify-between p-5 ${className}`} role="img" aria-label={alt}>
        <span className="text-label text-muted-foreground">Image pending</span>
        <span className="text-title text-foreground/80">{label}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
