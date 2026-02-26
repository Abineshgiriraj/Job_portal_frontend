export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  experienceLevel: "entry" | "mid" | "senior" | "lead";
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  recruiterId: string;
}

export type UserRole = "job_seeker" | "recruiter";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  title?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "applied" | "shortlisted" | "rejected" | "hired";
  appliedAt: string;
  updatedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface JobFilters {
  search?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string[];
  locationType?: string[];
}
