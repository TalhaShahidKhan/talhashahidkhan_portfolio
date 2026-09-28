import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center pt-20">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Crafting Digital <br className="hidden sm:block" />
            <span className="text-primary drop-shadow-sm">Experiences</span>
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8 drop-shadow-md">
            I&apos;m Talha Shahid Khan, a developer focused on building
            beautiful, robust, and highly functional web applications.
          </p>
          <div className="flex gap-4">
            <Link href="/projects">
              <Button
                size="lg"
                className="h-12 px-8 shadow-lg shadow-primary/20"
              >
                View Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 backdrop-blur-sm bg-background/30"
              >
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Short abstract/divider */}
      <div className="w-full max-w-4xl border-t border-border/40 my-16 relative z-20" />
    </div>
  );
}
