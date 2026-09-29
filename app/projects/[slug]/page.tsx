import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { fetchProjectBySlug } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-64 bg-primary/10 blur-[120px]  pointer-events-none -z-10" />

      <RevealWrapper>
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {project.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-background/50 backdrop-blur-sm border-border/50 text-sm py-1 px-3"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            {project.liveLink && (
              <a
                href={`https://${project.liveLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform",
                })}
              >
                Live Demo
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {project.githubRepository && (
              <a
                href={`https://${project.githubRepository}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "hover:-translate-y-0.5 transition-transform bg-background/50 backdrop-blur-sm",
                })}
              >
                GitHub Repo
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {project.images && project.images.length > 0 && (
          <div className="w-full mb-16  overflow-hidden  bg-card/30 backdrop-blur-sm border border-border/50 p-2 md:p-4">
            <Carousel className="w-full group  overflow-hidden">
              <CarouselContent>
                {project.images.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div className="w-full aspect-video md:h-150 bg-muted relative  overflow-hidden">
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
                  <CarouselPrevious className="left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 hover:bg-background backdrop-blur-sm border-0 shadow-xl scale-150" />
                  <CarouselNext className="right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 hover:bg-background backdrop-blur-sm border-0 shadow-xl scale-150" />
                </>
              )}
            </Carousel>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold font-heading">
              About the Project
            </h2>
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-lg">
              {project.description}
            </div>
          </div>

          <div className="space-y-8 p-8 bg-card/40 backdrop-blur-md border border-border/50 h-fit">
            <h3 className="text-2xl font-bold font-heading">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-background/80 px-3 py-1.5 text-sm font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </RevealWrapper>
    </div>
  );
}
