import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchExperiences, type Experience } from "@/lib/api";

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
        <div className="flex flex-col gap-6">
          {sortedExperiences.map((exp: Experience) => {
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
              <Card
                key={exp.id}
                className="overflow-hidden flex flex-col border border-border/50 bg-card hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground mt-1">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="w-fit text-sm">
                      {startDateStr} - {endDateStr}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
