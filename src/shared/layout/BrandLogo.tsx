import { useState } from "react";
import { profile } from "@/data/profile";

function publicSrc(path: string | undefined): string | undefined {
  if (!path) return undefined;
  return path.startsWith("./") ? path.slice(1) : path;
}

export function BrandLogo({
  className = "h-8 w-8",
}: {
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = publicSrc(profile.logo);
  const initials = profile.hero.initials || profile.name.slice(0, 2).toUpperCase();

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      aria-hidden={!src || failed}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={`${profile.name} logo`}
          className="h-full w-full object-contain"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-[11px] font-black tracking-tight text-primary">{initials}</span>
      )}
    </div>
  );
}
