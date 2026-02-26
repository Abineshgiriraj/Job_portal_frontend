import type { Job } from "@/shared/types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    companyLogo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop",
    location: "San Francisco, CA",
    locationType: "hybrid",
    salaryMin: 180000,
    salaryMax: 250000,
    salaryCurrency: "USD",
    experienceLevel: "senior",
    description: "We're looking for a Senior Frontend Engineer to help build the future of web development. You'll work on Next.js, Turbopack, and our deployment platform.",
    requirements: ["5+ years React experience", "TypeScript expertise", "Performance optimization"],
    benefits: ["Unlimited PTO", "Remote-first", "Equity package"],
    postedAt: "2024-01-15T10:00:00Z",
    recruiterId: "rec1",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Linear",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=64&h=64&fit=crop",
    location: "Remote",
    locationType: "remote",
    salaryMin: 140000,
    salaryMax: 200000,
    salaryCurrency: "USD",
    experienceLevel: "mid",
    description: "Join our design team to craft beautiful, intuitive interfaces for the world's best issue tracker. You'll shape how teams collaborate and ship software.",
    requirements: ["3+ years product design", "Figma proficiency", "Design systems experience"],
    benefits: ["Health insurance", "Equipment budget", "Team offsites"],
    postedAt: "2024-01-14T09:00:00Z",
    recruiterId: "rec2",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=64&h=64&fit=crop",
    location: "New York, NY",
    locationType: "hybrid",
    salaryMin: 160000,
    salaryMax: 220000,
    salaryCurrency: "USD",
    experienceLevel: "mid",
    description: "Build payment infrastructure that powers millions of businesses. Work across the stack from React to Ruby to build features used by developers worldwide.",
    requirements: ["4+ years full stack", "API design", "Database optimization"],
    benefits: ["Parental leave", "Learning stipend", "Wellness benefits"],
    postedAt: "2024-01-13T14:00:00Z",
    recruiterId: "rec3",
  },
  {
    id: "4",
    title: "Junior Software Engineer",
    company: "Notion",
    companyLogo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=64&h=64&fit=crop",
    location: "San Francisco, CA",
    locationType: "onsite",
    salaryMin: 100000,
    salaryMax: 140000,
    salaryCurrency: "USD",
    experienceLevel: "entry",
    description: "Start your career at Notion and help build the all-in-one workspace. Great opportunity to learn from experienced engineers and grow rapidly.",
    requirements: ["CS degree or equivalent", "JavaScript/TypeScript", "Eagerness to learn"],
    benefits: ["Mentorship program", "Free lunch", "Transit benefits"],
    postedAt: "2024-01-12T11:00:00Z",
    recruiterId: "rec4",
  },
  {
    id: "5",
    title: "Engineering Manager",
    company: "Figma",
    companyLogo: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=64&h=64&fit=crop",
    location: "Remote",
    locationType: "remote",
    salaryMin: 220000,
    salaryMax: 300000,
    salaryCurrency: "USD",
    experienceLevel: "lead",
    description: "Lead a team of talented engineers building collaborative design tools. You'll set technical direction and grow the next generation of engineering talent.",
    requirements: ["7+ years engineering", "3+ years management", "Distributed systems"],
    benefits: ["Competitive equity", "Sabbatical program", "Annual bonus"],
    postedAt: "2024-01-11T08:00:00Z",
    recruiterId: "rec5",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "GitHub",
    companyLogo: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=64&h=64&fit=crop",
    location: "Seattle, WA",
    locationType: "hybrid",
    salaryMin: 150000,
    salaryMax: 200000,
    salaryCurrency: "USD",
    experienceLevel: "senior",
    description: "Help scale GitHub's infrastructure to serve millions of developers. Work with Kubernetes, Terraform, and cutting-edge CI/CD systems.",
    requirements: ["Kubernetes expertise", "Infrastructure as code", "Cloud platforms"],
    benefits: ["Remote flexibility", "Home office budget", "Stock options"],
    postedAt: "2024-01-10T15:00:00Z",
    recruiterId: "rec6",
  },
  {
    id: "7",
    title: "Backend Engineer",
    company: "Datadog",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop",
    location: "Boston, MA",
    locationType: "hybrid",
    salaryMin: 140000,
    salaryMax: 190000,
    salaryCurrency: "USD",
    experienceLevel: "mid",
    description: "Build high-performance backend services that process billions of data points daily. Work with Go, Kafka, and distributed databases.",
    requirements: ["Go or Python", "Distributed systems", "Data pipelines"],
    benefits: ["401k matching", "Gym membership", "Conference budget"],
    postedAt: "2024-01-09T12:00:00Z",
    recruiterId: "rec7",
  },
  {
    id: "8",
    title: "Mobile Developer",
    company: "Discord",
    companyLogo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=64&h=64&fit=crop",
    location: "Remote",
    locationType: "remote",
    salaryMin: 130000,
    salaryMax: 180000,
    salaryCurrency: "USD",
    experienceLevel: "mid",
    description: "Create seamless mobile experiences for millions of users. Work on React Native apps that bring communities together.",
    requirements: ["React Native", "iOS or Android native", "Real-time systems"],
    benefits: ["Unlimited game budget", "Flexible hours", "Dog-friendly"],
    postedAt: "2024-01-08T10:00:00Z",
    recruiterId: "rec8",
  },
];

export function filterJobs(
  jobs: Job[],
  filters: {
    search?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    experienceLevel?: string[];
    locationType?: string[];
  }
): Job[] {
  return jobs.filter((job) => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(location)) return false;
    }

    if (filters.salaryMin && job.salaryMax < filters.salaryMin) return false;
    if (filters.salaryMax && job.salaryMin > filters.salaryMax) return false;

    if (filters.experienceLevel?.length) {
      if (!filters.experienceLevel.includes(job.experienceLevel)) return false;
    }

    if (filters.locationType?.length) {
      if (!filters.locationType.includes(job.locationType)) return false;
    }

    return true;
  });
}
