import type { Application } from "@/shared/types";

// ── Shared stub objects so mock data matches the Application type ──────────────
const stubJob1 = {
  id: "1",
  title: "Frontend Engineer",
  description: "Build beautiful UIs.",
  salary: 60000,
  location: "Remote",
  experience_level: "junior" as const,
  postedAt: "2024-01-01T00:00:00Z",
};

const stubJob3 = {
  id: "3",
  title: "Full-Stack Developer",
  description: "Work across the stack.",
  salary: 80000,
  location: "Hybrid",
  experience_level: "mid" as const,
  postedAt: "2024-01-02T00:00:00Z",
};

const stubJob5 = {
  id: "5",
  title: "Backend Engineer",
  description: "APIs and infrastructure.",
  salary: 90000,
  location: "On-site",
  experience_level: "senior" as const,
  postedAt: "2024-01-03T00:00:00Z",
};

const stubJob2 = {
  id: "2",
  title: "UX Designer",
  description: "Design user experiences.",
  salary: 70000,
  location: "Remote",
  experience_level: "mid" as const,
  postedAt: "2024-01-04T00:00:00Z",
};

const stubUser1 = {
  id: "user1",
  email: "user1@example.com",
  name: "Demo User",
  role: "job_seeker" as const,
  createdAt: "2024-01-01T00:00:00Z",
};

const stubSeeker1 = {
  id: "seeker1",
  email: "alex@example.com",
  name: "Alex Johnson",
  role: "job_seeker" as const,
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop",
  createdAt: "2024-01-01T00:00:00Z",
};

const stubSeeker2 = {
  id: "seeker2",
  email: "sarah@example.com",
  name: "Sarah Chen",
  role: "job_seeker" as const,
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
  createdAt: "2024-01-01T00:00:00Z",
};

const stubSeeker3 = {
  id: "seeker3",
  email: "marcus@example.com",
  name: "Marcus Williams",
  role: "job_seeker" as const,
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
  createdAt: "2024-01-01T00:00:00Z",
};

const stubSeeker4 = {
  id: "seeker4",
  email: "emily@example.com",
  name: "Emily Rodriguez",
  role: "job_seeker" as const,
  avatar:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
  createdAt: "2024-01-01T00:00:00Z",
};

// ── Mock data for job seeker (my applications) ────────────────────────────────
export const mockApplications: Application[] = [
  {
    id: "app1",
    job: stubJob1,
    applicant: stubUser1,
    status: "shortlisted",
    applied_at: "2024-01-16T10:00:00Z",
    resume: "https://example.com/resume1.pdf",
    phone: "",
    experience_years: 2,
  },
  {
    id: "app2",
    job: stubJob3,
    applicant: stubUser1,
    status: "applied",
    applied_at: "2024-01-15T09:00:00Z",
    resume: "https://example.com/resume2.pdf",
    phone: "",
    experience_years: 2,
  },
  {
    id: "app3",
    job: stubJob5,
    applicant: stubUser1,
    status: "rejected",
    applied_at: "2024-01-10T08:00:00Z",
    resume: "https://example.com/resume3.pdf",
    phone: "",
    experience_years: 2,
  },
  {
    id: "app4",
    job: stubJob2,
    applicant: stubUser1,
    status: "hired",
    applied_at: "2024-01-05T12:00:00Z",
    resume: "https://example.com/resume4.pdf",
    phone: "",
    experience_years: 2,
  },
];

// ── Mock data for recruiter (applicants to their jobs) ────────────────────────
export const mockApplicants: Application[] = [
  {
    id: "appR1",
    job: stubJob1,
    applicant: stubSeeker1,
    status: "applied",
    applied_at: "2024-01-16T10:00:00Z",
    resume: "https://example.com/resume5.pdf",
    phone: "",
    experience_years: 1,
  },
  {
    id: "appR2",
    job: stubJob1,
    applicant: stubSeeker2,
    status: "shortlisted",
    applied_at: "2024-01-15T14:00:00Z",
    resume: "https://example.com/resume6.pdf",
    phone: "",
    experience_years: 3,
  },
  {
    id: "appR3",
    job: stubJob1,
    applicant: stubSeeker3,
    status: "applied",
    applied_at: "2024-01-17T08:00:00Z",
    resume: "https://example.com/resume7.pdf",
    phone: "",
    experience_years: 2,
  },
  {
    id: "appR4",
    job: stubJob3,
    applicant: stubSeeker1,
    status: "rejected",
    applied_at: "2024-01-14T11:00:00Z",
    resume: "https://example.com/resume8.pdf",
    phone: "",
    experience_years: 1,
  },
  {
    id: "appR5",
    job: stubJob3,
    applicant: stubSeeker4,
    status: "hired",
    applied_at: "2024-01-12T09:00:00Z",
    resume: "https://example.com/resume9.pdf",
    phone: "",
    experience_years: 4,
  },
];

// Kept for any component that may reference seekers separately
export const mockSeekers = [
  stubSeeker1,
  stubSeeker2,
  stubSeeker3,
  stubSeeker4,
];
