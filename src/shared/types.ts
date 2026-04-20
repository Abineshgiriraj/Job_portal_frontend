export interface Job {
  id: string;
  title: string;
  description: string;
  salary: number;
  location: string;
  experience_level: "intern" | "junior" | "mid" | "senior" | "lead";
  postedAt: string;
  applicant_count?: number;
}

export type UserRole = "job_seeker" | "recruiter";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  job: Job; // Nested Job object
  applicant: User; // Nested User object
  resume: string; // File URL
  phone: string;
  experience_years: number;
  linkedin?: string;
  portfolio?: string;
  cover_letter?: string;
  expected_salary?: number;
  status: "applied" | "shortlisted" | "rejected" | "hired";
  applied_at: string;
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
  experience_level?: string[];
}
