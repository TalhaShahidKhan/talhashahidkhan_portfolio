const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchProjects() {
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

export async function fetchServices() {
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
  packageId?: string;
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
