"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent",
      className,
    )}
    {...props}
  />
));
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
        className,
      )}
      {...props}
    />
  ),
);
TimelineItem.displayName = "TimelineItem";

const TimelineIcon = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
      className={cn(
        "flex items-center justify-center w-10 h-10 border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
        className,
      )}
      {...props}
    />
  ),
);
TimelineIcon.displayName = "TimelineIcon";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{
      opacity: 0,
      x:
        typeof className === "string" && className.includes("md:odd")
          ? 30
          : -30,
    }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
    className={cn(
      "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 border border-border/50 shadow-sm transition-transform hover:-translate-y-1",
      className,
    )}
    {...props}
  />
));
TimelineContent.displayName = "TimelineContent";

export { Timeline, TimelineContent, TimelineIcon, TimelineItem };
