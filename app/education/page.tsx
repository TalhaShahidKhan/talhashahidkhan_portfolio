import {
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
} from "@/components/ui/timeline";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    id: 1,
    school: "BRAC University",
    degree: "Bachelor of Science, Computer Science and Engineering",
    period: "Jun 2026 – Jun 2030",
  },
  {
    id: 2,
    school: "Birshreshtha Munshi Abdur Rouf Public College",
    degree: "HSC, Science",
    period: "2023 – 2025",
  },
];

export default function EducationPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Education
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          My academic background and educational journey.
        </p>
      </div>

      <Timeline>
        {educationData.map((edu, index) => (
          <TimelineItem key={edu.id}>
            <TimelineIcon
              className={
                index % 2 === 0
                  ? "bg-primary"
                  : "bg-muted text-muted-foreground"
              }
            >
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </TimelineIcon>
            <TimelineContent>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-sm font-semibold text-primary">
                  {edu.period}
                </span>
                <h3 className="text-xl font-bold">{edu.school}</h3>
              </div>
              <p className="text-muted-foreground text-base">{edu.degree}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
