export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional work experience and career history.",
};

import {
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
} from "@/components/ui/timeline";
import { fetchExperiences, type Experience } from "@/lib/api";
import { Briefcase } from "lucide-react";

export default async function ExperiencePage() {
  const experiences = await fetchExperiences();

  // Sort experiences by startDate descending
  const sortedExperiences = experiences.sort((a: Experience, b: Experience) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Experience
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A timeline of my professional experience and career journey.
        </p>
      </div>

      {sortedExperiences.length === 0 ? (
        <p className="text-muted-foreground">No experience records found.</p>
      ) : (
        <Timeline>
          {sortedExperiences.map((exp: Experience, index: number) => {
            const startDateStr = new Date(exp.startDate).toLocaleDateString(
              undefined,
              { month: "short", year: "numeric" },
            );
            const endDateStr = exp.endDate
              ? new Date(exp.endDate).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })
              : "Present";

            return (
              <TimelineItem key={exp.id}>
                <TimelineIcon
                  className={
                    index % 2 === 0
                      ? "bg-primary"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </TimelineIcon>
                <TimelineContent>
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-sm font-semibold text-primary">
                      {startDateStr} - {endDateStr}
                    </span>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="text-base font-medium text-foreground">
                      {exp.company}
                    </span>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line text-sm">
                    {exp.description}
                  </p>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      )}
    </div>
  );
}
