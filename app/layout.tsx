import { FloatingNav } from "@/components/layout/FloatingNav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Talha Shahid Khan | Full Stack Developer & AI Engineer",
    template: "%s | Talha Shahid Khan",
  },
  description: "Portfolio of Talha Shahid Khan, a Full Stack Developer and AI Engineer specializing in Python, JavaScript, Next.js, and modern web applications.",
  keywords: [
    "Talha Shahid Khan",
    "Talha",
    "Shahid Khan",
    "Talha Khan",
    "Web developer",
    "Full Stack Developer",
    "AI Engineer",
    "Javascript expert",
    "Python expert",
    "Next.js Developer",
    "React Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Talha Shahid Khan" }],
  creator: "Talha Shahid Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://talhashahidkhan.com",
    title: "Talha Shahid Khan | Full Stack Developer & AI Engineer",
    description: "Portfolio of Talha Shahid Khan, a Full Stack Developer and AI Engineer specializing in Python, JavaScript, Next.js, and modern web applications.",
    siteName: "Talha Shahid Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Shahid Khan | Full Stack Developer & AI Engineer",
    description: "Portfolio of Talha Shahid Khan, a Full Stack Developer and AI Engineer specializing in Python, JavaScript, Next.js, and modern web applications.",
  },
};

import { PageTracker } from "@/components/PageTracker";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "dark font-mono",
        geistMono.variable,
        jetbrainsMonoHeading.variable,
      )}
    >
      <body className="min-h-screen bg-background font-mono antialiased flex flex-col">
        <main className="flex-1">{children}</main>
        <FloatingNav />
        <Toaster />
        <PageTracker />
      </body>
    </html>
  );
}
