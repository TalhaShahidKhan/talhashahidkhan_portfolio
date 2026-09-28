import { fetchPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await fetchPosts();
  const post = posts.find((p: any) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-screen-md mx-auto px-4 py-12 md:py-20">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
          &larr; Back to Blog
        </Button>
      </Link>
      
      <div className="mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        {post.createdAt && (
          <p className="text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {post.imageUrl && (
        <div className="w-full mb-12 rounded-xl overflow-hidden bg-muted">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div 
        className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
