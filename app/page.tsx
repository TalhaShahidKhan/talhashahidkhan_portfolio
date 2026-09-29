"use client";

import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (!containerRef.current) return;
 const ctx = gsap.context(() => {
 // Hero Animations
 const tl = gsap.timeline();

 tl.from(".hero-text-line", {
 y: 50,
 opacity: 0,
 duration: 0.8,
 stagger: 0.2,
 ease: "power3.out",
 delay: 0.2,
 })
 .from(
 ".hero-image",
 {
 scale: 0.9,
 opacity: 0,
 duration: 1,
 ease: "power2.out",
 },
 "-=0.6",
 )
 .from(
 ".hero-buttons",
 {
 y: 20,
 opacity: 0,
 duration: 0.6,
 ease: "power2.out",
 },
 "-=0.4",
 );

 // Section Animations
 const sections = gsap.utils.toArray<HTMLElement>(".animated-section");
 sections.forEach((section) => {
 gsap.from(section, {
 y: 50,
 opacity: 0,
 duration: 0.8,
 ease: "power3.out",
 scrollTrigger: {
 trigger: section,
 start: "top 80%",
 toggleActions: "play none none reverse",
 },
 });
 });
 }, containerRef);

 return () => ctx.revert();
 }, []);

 return (
 <div
 ref={containerRef}
 className="flex flex-col items-center w-full overflow-hidden"
 >
 {/* Hero Section */}
 <section className="container mx-auto relative w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-8 gap-12">
 <div className="flex-1 relative flex justify-center items-center w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto order-2 md:order-1">
 {/* Subtle background glow */}
 <div className="absolute inset-0 bg-primary/10 blur-3xl "/>
 <div className="hero-image relative z-10 w-full aspect-4/5 mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]">
 <Image
 src="/heroImage.png"
 alt="Talha Shahid Khan"
 priority
 className="object-contain object-bottom"
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 />
 </div>
 </div>
 <div className="flex-1 flex flex-col items-start text-left z-10 order-1 md:order-2">
 <h1 className="hero-text-line scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-4">
 Hi, I&apos;m <br />
 <span className="text-primary">MD. Talha Shahid Khan</span>
 </h1>
 <p className="hero-text-line max-w-xl text-lg text-muted-foreground sm:text-xl mb-8">
 Full Stack Web Developer learning AI engineering to level up |
 Expert at Python, JavaScript and C/C++
 </p>
 <div className="hero-buttons flex flex-wrap gap-4">
 <Link href="/contact">
 <Button size="lg"className="h-12 px-8 text-base">
 Let&apos;s Talk <ArrowRight className="ml-2 w-4 h-4"/>
 </Button>
 </Link>
 <Link href="/projects">
 <Button
 size="lg"
 variant="outline"
 className="h-12 px-8 text-base"
 >
 View My Work
 </Button>
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}
