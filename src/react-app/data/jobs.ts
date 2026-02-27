import type { Job } from "@/shared/types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    location: "San Francisco, CA",
    salary: 200000,
    experience_level: "senior",
    description: "We're looking for a Senior Frontend Engineer to help build the future of web development. You'll work on Next.js, Turbopack, and our deployment platform.",
    postedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Linear",
    location: "Remote",
    salary: 160000,
    experience_level: "mid",
    description: "Join our design team to craft beautiful, intuitive interfaces for the world's best issue tracker. You'll shape how teams collaborate and ship software.",
    postedAt: "2024-01-14T09:00:00Z",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Stripe",
    location: "New York, NY",
    salary: 180000,
    experience_level: "mid",
    description: "Build payment infrastructure that powers millions of businesses. Work across the stack from React to Ruby to build features used by developers worldwide.",
    postedAt: "2024-01-13T14:00:00Z",
  },
  {
    id: "4",
    title: "Junior Software Engineer",
    company: "Notion",
    location: "San Francisco, CA",
    salary: 110000,
    experience_level: "junior",
    description: "Start your career at Notion and help build the all-in-one workspace. Great opportunity to learn from experienced engineers and grow rapidly.",
    postedAt: "2024-01-12T11:00:00Z",
  },
  {
    id: "5",
    title: "Engineering Manager",
    company: "Figma",
    location: "Remote",
    salary: 250000,
    experience_level: "lead",
    description: "Lead a team of talented engineers building collaborative design tools. You'll set technical direction and grow the next generation of engineering talent.",
    postedAt: "2024-01-11T08:00:00Z",
  },
];

export function filterJobs(
  jobs: Job[],
  filters: {
    search?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    experience_level?: string[];
  }
): Job[] {
  return jobs.filter((job) => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        (job.company && job.company.toLowerCase().includes(search)) ||
        job.description.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(location)) return false;
    }

    if (filters.salaryMin && job.salary < filters.salaryMin) return false;
    if (filters.salaryMax && job.salary > filters.salaryMax) return false;

    if (filters.experience_level?.length) {
      if (!filters.experience_level.includes(job.experience_level)) return false;
    }

    return true;
  });
}
