"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfilePhotoProps = {
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProfilePhoto({
  className,
  imageClassName,
  sizes = "(max-width: 640px) 160px, 224px",
  priority = false,
}: ProfilePhotoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <figure
      className={cn(
        "relative aspect-[4/5] w-full max-w-56 overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_18px_54px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      {imageFailed ? (
        <div
          role="img"
          aria-label="Profile photo unavailable for Aboy Chandra Das"
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-raised/60 px-4 text-center"
        >
          <UserRound aria-hidden className="h-10 w-10 text-faint" />
          <span className="text-xs font-medium text-muted">
            Aboy Chandra Das
          </span>
        </div>
      ) : (
        <Image
          src="/aboy-profile.jpg"
          alt="Portrait of Aboy Chandra Das"
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          onError={() => setImageFailed(true)}
        />
      )}
    </figure>
  );
}
