export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchPosts, type Post } from "@/lib/api";
import { TrackedPostLink } from "@/components/TrackedPostLink";

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-lg">
          My thoughts on software engineering, design, and life.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post: Post) => (
            <TrackedPostLink key={post.id} postId={post.id} slug={post.slug}>
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  {post.createdAt && (
                    <CardDescription>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.content.replace(/<[^>]*>?/gm, "")}
                  </p>
                </CardContent>
              </Card>
            </TrackedPostLink>
          ))}
        </div>
      )}
    </div>
  );
}
