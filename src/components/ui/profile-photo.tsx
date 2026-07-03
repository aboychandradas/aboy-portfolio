import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const PHOTO_FILE = "aboy-profile.jpg";

/**
 * Renders the real headshot from /public/aboy-profile.jpg when the file
 * exists, and a clean neutral avatar card until then. The check runs on the
 * server (at build time for static pages), so adding the photo just requires
 * dropping the file in /public and rebuilding — no code changes.
 */
export function ProfilePhoto({
  className,
  iconClassName = "h-10 w-10",
  sizes = "160px",
}: {
  className?: string;
  iconClassName?: string;
  sizes?: string;
}) {
  const hasPhoto = fs.existsSync(
    path.join(process.cwd(), "public", PHOTO_FILE)
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface",
        className
      )}
    >
      {hasPhoto ? (
        <Image
          src={`/${PHOTO_FILE}`}
          alt="Aboy Chandra Das"
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center bg-surface-raised/50"
        >
          <UserRound className={cn("text-faint", iconClassName)} />
        </div>
      )}
    </div>
  );
}
