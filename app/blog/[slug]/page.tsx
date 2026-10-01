import {
  PostViewTracker,
  ShareButton,
} from "@/components/PostAnalyticsTrackers";
import { Button } from "@/components/ui/button";
import { fetchPosts, type Post } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const posts = await fetchPosts();
  const post = posts.find((p: Post) => p.slug === resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    // Extract a brief description from the markdown content (first 150 chars)
    description: post.content.replace(/[#*`_\[\]]/g, '').slice(0, 150).trim() + "...",
    openGraph: {
      title: post.title,
      description: post.content.replace(/[#*`_\[\]]/g, '').slice(0, 150).trim() + "...",
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const posts = await fetchPosts();
  const post = posts.find((p: Post) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl mx-auto px-4 py-12 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-64 bg-primary/10 blur-[120px]  pointer-events-none -z-10" />

      <Link href="/blog">
        <Button
          variant="ghost"
          className="mb-8 -ml-4 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>{" "}
          Back to Blog
        </Button>
      </Link>

      <RevealWrapper>
        <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 mb-6">
            {post.createdAt && (
              <time className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 ">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
            <ShareButton postId={post.id} title={post.title} />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            {post.title}
          </h1>
        </div>

        {post.imageUrl && (
          <div className="w-full mb-16  overflow-hidden bg-muted relative min-h-75 md:min-h-112.5 shadow-2xl shadow-primary/5">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="prose prose-invert prose-base sm:prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80 ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <PostViewTracker postId={post.id} />
      </RevealWrapper>
    </article>
  );
}
