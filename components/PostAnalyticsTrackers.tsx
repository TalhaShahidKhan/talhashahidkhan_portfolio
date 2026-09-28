"use client";

import { useEffect, useRef, useState } from "react";
import { recordPostEvent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function PostViewTracker({ postId }: { postId: string }) {
  const trackerRef = useRef<HTMLDivElement>(null);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    // Only track page visits in production
    if (process.env.NODE_ENV !== "production") return;
    if (hasViewed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          recordPostEvent(postId, "VIEW");
          setHasViewed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (trackerRef.current) {
      observer.observe(trackerRef.current);
    }

    return () => observer.disconnect();
  }, [postId, hasViewed]);

  return <div ref={trackerRef} className="h-px w-full" aria-hidden="true" />;
}

export function ShareButton({ postId, title }: { postId: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = window.location.href;
      
      // Attempt native share API
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
        if (process.env.NODE_ENV === "production") {
          recordPostEvent(postId, "SHARE");
        }
        return;
      }

      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (process.env.NODE_ENV === "production") {
        recordPostEvent(postId, "SHARE");
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error sharing post:", err);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
      <Share2 className="w-4 h-4" />
      {copied ? "Copied Link!" : "Share Post"}
    </Button>
  );
}
