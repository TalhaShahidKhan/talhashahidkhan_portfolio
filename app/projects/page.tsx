export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchProjects, type Project } from "@/lib/api";

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of my recent work, showcasing web development and design.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <Link href={`/projects/${project.slug}`} key={project.id}>
              <Card
                className="overflow-hidden flex flex-col hover:border-primary/50 transition-colors h-full"
              >
                {project.images && project.images.length > 0 && (
                  <div className="w-full h-48 bg-muted overflow-hidden relative">
                    <Image
                      src={project.images[0]}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform hover:scale-105"
                    />
                </div>
              )}
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
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
