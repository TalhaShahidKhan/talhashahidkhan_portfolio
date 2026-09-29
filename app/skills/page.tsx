import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "An overview of my technical skills and tools categorized by domain.",
};

import Image from "next/image";
import { categorizedSkills } from "@/components/SkillsSection";
import {
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
} from "@/components/ui/timeline";
import { Code } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Skills
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          An overview of my technical skills and tools categorized by domain.
        </p>
      </div>

      <Timeline>
        {Object.entries(categorizedSkills).map(([category, skills], index) => (
          <TimelineItem key={category}>
            <TimelineIcon
              className={
                index % 2 === 0
                  ? "bg-primary"
                  : "bg-muted text-muted-foreground"
              }
            >
              <Code className="w-4 h-4 text-primary-foreground" />
            </TimelineIcon>
            <TimelineContent className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
              <h3 className="text-xl font-bold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-muted/50 border border-border/50 px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {skill.icon ? (
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                      />
                    ) : null}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
