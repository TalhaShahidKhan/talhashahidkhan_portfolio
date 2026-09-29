export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest thoughts on software engineering, design, and life.",
};
import { TrackedPostLink } from "@/components/TrackedPostLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchPosts, type Post } from "@/lib/api";

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-primary/10 blur-[120px]  pointer-events-none -z-10" />

      <div className="flex flex-col gap-4 mb-16 items-center text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          My Blog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Thoughts, insights, and stories on software engineering, design, and
          life.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-card/30 border border-border/50 backdrop-blur-sm">
          <p className="text-muted-foreground text-lg">No posts found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post: Post) => (
            <TrackedPostLink
              key={post.id}
              postId={post.id}
              slug={post.slug}
              className="group outline-none"
            >
              <Card className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-500  hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden relative">
                <div className="flex-1 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                      {post.createdAt && (
                        <time className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 ">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" },
                          )}
                        </time>
                      )}
                    </div>

                    <CardTitle className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex flex-col flex-1">
                    <CardDescription className="text-base leading-relaxed line-clamp-3 mb-6">
                      {post.content.replace(/<[^>]*>?/gm, "")}
                    </CardDescription>

                    <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-auto">
                      Read Article
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TrackedPostLink>
          ))}
        </div>
      )}
    </div>
  );
}
