const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  techStack: string[];
  tags: string[];
  liveLink?: string | null;
  githubRepository?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch projects");
      return [];
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching projects:", e);
    return [];
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/projects/${slug}`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch project by slug");
      return null;
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching project by slug:", e);
    return null;
  }
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryDays?: number | null;
  revisions?: number | null;
  features: string[];
  isFeatured: boolean;
  status: string;
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_URL}/services`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch services");
      return [];
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching services:", e);
    return [];
  }
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryDays?: number | null;
  revisions?: number | null;
  features: string[];
  status: string;
}

export async function fetchServicePackages(): Promise<ServicePackage[]> {
  try {
    const res = await fetch(`${API_URL}/service-packages`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch service packages");
      return [];
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching service packages:", e);
    return [];
  }
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch posts");
      return [];
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching posts:", e);
    return [];
  }
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description: string;
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_URL}/experiences`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch experiences");
      return [];
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching experiences:", e);
    return [];
  }
}
export interface ContactData {
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
}

export async function submitContact(data: ContactData) {
  const res = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit contact");
  }
  return res.json();
}
export interface ServiceRequestData {
  serviceId: string;
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
  additionalRequirements?: string[];
}

export async function submitServiceRequest(data: ServiceRequestData) {
  const res = await fetch(`${API_URL}/service-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit service request");
  }
  return res.json();
}

export interface ServicePackageRequestData {
  packageId: string;
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
  additionalRequirements?: string[];
}

export async function submitServicePackageRequest(data: ServicePackageRequestData) {
  const res = await fetch(`${API_URL}/service-package-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to submit service package request");
  }
  return res.json();
}

export interface RecordPageVisitData {
  route: string;
  pageUrl: string;
}

export async function recordPageVisit(data: RecordPageVisitData) {
  try {
    const res = await fetch(`${API_URL}/analytics/pages/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("Failed to record page visit");
    }
  } catch (e) {
    console.error("Error recording page visit:", e);
  }
}
