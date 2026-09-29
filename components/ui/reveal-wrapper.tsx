"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function RevealWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1], // Custom Apple-like spring easing
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
