import { Button } from "@/components/ui/button";
import { fetchPosts, type Post } from "@/lib/api";
import { PostViewTracker, ShareButton } from "@/components/PostAnalyticsTrackers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <article className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
          &larr; Back to Blog
        </Button>
      </Link>

      <div className="mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between">
          {post.createdAt && (
            <p className="text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          )}
          <ShareButton postId={post.id} title={post.title} />
        </div>
      </div>

      {post.imageUrl && (
        <div className="w-full mb-12 rounded-xl overflow-hidden bg-muted relative min-h-75">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-a:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
      
      <PostViewTracker postId={post.id} />
    </article>
  );
}
