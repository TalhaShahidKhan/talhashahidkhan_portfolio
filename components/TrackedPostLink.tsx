"use client";

import Link from "next/link";
import { recordPostEvent } from "@/lib/api";
import { ReactNode } from "react";

interface TrackedPostLinkProps {
  postId: string;
  slug: string;
  children: ReactNode;
  className?: string;
}

export function TrackedPostLink({ postId, slug, children, className }: TrackedPostLinkProps) {
  const handleClick = () => {
    if (process.env.NODE_ENV === "production") {
      // Fire and forget
      recordPostEvent(postId, "CLICK");
    }
  };

  return (
    <Link href={`/blog/${slug}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
