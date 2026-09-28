"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPageVisit } from "@/lib/api";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track page visits in production
    if (process.env.NODE_ENV !== "production") return;

    if (pathname) {
      recordPageVisit({
        route: pathname,
        pageUrl: window.location.href,
      });
    }
  }, [pathname]);

  return null;
}
