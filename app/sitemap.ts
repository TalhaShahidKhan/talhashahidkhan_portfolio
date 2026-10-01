import { MetadataRoute } from 'next';
import { fetchPosts, fetchProjects } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://talhashahidkhan.com'; // Replace with your actual domain

  // Static routes
  const routes = ['', '/projects', '/experience', '/education', '/services', '/blog', '/contact', '/skills'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // Dynamic project routes
    const projects = await fetchProjects();
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic blog routes
    const posts = await fetchPosts();
    const blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, ...projectRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating sitemap", error);
    return routes;
  }
}
