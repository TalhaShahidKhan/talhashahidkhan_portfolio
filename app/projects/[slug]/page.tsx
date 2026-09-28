import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProjectBySlug } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.name} | Projects` };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {project.name}
        </h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveLink && (
            <a
              href={`https://${project.liveLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Live Demo
            </a>
          )}
          {project.githubRepository && (
            <a
              href={`https://${project.githubRepository}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub Repo
            </a>
          )}
        </div>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="w-full mb-12">
          <Carousel className="w-full group">
            <CarouselContent>
              {project.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="w-full h-100 md:h-150 bg-muted overflow-hidden relative rounded-xl">
                    <Image
                      src={img}
                      alt={`${project.name} image ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {project.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-black/50 border-0" />
                <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-black/50 border-0" />
              </>
            )}
          </Carousel>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">About the Project</h2>
          <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {project.description}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
