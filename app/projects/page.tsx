export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchProjects, type Project } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[120px] pointer-events-none -z-10" />

      <div className="flex flex-col gap-4 mb-16 items-center text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          My Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of my recent work, showcasing web development, design,
          and complex problem-solving.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-card/30  border border-border/50 backdrop-blur-sm">
          <p className="text-muted-foreground text-lg">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className="group"
            >
              <Card className="overflow-hidden flex flex-col h-full bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-500  hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                {project.images && project.images.length > 0 ? (
                  <div className="w-full h-56 bg-muted overflow-hidden relative">
                    <Image
                      src={project.images[0]}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-muted flex items-center justify-center relative">
                    <span className="text-muted-foreground font-medium">
                      No Image
                    </span>
                  </div>
                )}

                <CardHeader className="p-6 md:p-8 pb-0">
                  <CardTitle className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-base line-clamp-2 mb-6">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 px-6 md:px-8 pb-6 md:pb-8">
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.techStack?.slice(0, 4).map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-background/80 hover:bg-background/80 font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.techStack && project.techStack.length > 4 && (
                      <Badge
                        variant="secondary"
                        className="bg-background/80 hover:bg-background/80 font-medium"
                      >
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
