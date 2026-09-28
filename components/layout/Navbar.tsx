import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold hidden sm:inline-block">
              Talha Shahid Khan
            </span>
            <span className="font-bold sm:hidden">
              TSK
            </span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">Projects</Link>
            <Link href="/experience" className="transition-colors hover:text-foreground/80 text-foreground/60">Experience</Link>
            <Link href="/services" className="transition-colors hover:text-foreground/80 text-foreground/60">Services</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">Blog</Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/contact">
              <Button size="sm" variant="outline">
                Contact Me
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
