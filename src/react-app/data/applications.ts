import type { Application } from "@/shared/types";

export const mockApplications: Application[] = [
  {
    id: "app1",
    job: "1",
    applicant: "user1",
    status: "shortlisted",
    applied_at: "2024-01-16T10:00:00Z",
    resume: "https://example.com/resume1.pdf",
  },
  {
    id: "app2",
    job: "3",
    applicant: "user1",
    status: "applied",
    applied_at: "2024-01-15T09:00:00Z",
    resume: "https://example.com/resume2.pdf",
  },
  {
    id: "app3",
    job: "5",
    applicant: "user1",
    status: "rejected",
    applied_at: "2024-01-10T08:00:00Z",
    resume: "https://example.com/resume3.pdf",
  },
  {
    id: "app4",
    job: "2",
    applicant: "user1",
    status: "hired",
    applied_at: "2024-01-05T12:00:00Z",
    resume: "https://example.com/resume4.pdf",
  },
];

// Applicants for recruiter's jobs
export const mockApplicants: Application[] = [
  {
    id: "appR1",
    job: "1",
    applicant: "seeker1",
    status: "applied",
    applied_at: "2024-01-16T10:00:00Z",
    resume: "https://example.com/resume5.pdf",
  },
  {
    id: "appR2",
    job: "1",
    applicant: "seeker2",
    status: "shortlisted",
    applied_at: "2024-01-15T14:00:00Z",
    resume: "https://example.com/resume6.pdf",
  },
  {
    id: "appR3",
    job: "1",
    applicant: "seeker3",
    status: "applied",
    applied_at: "2024-01-17T08:00:00Z",
    resume: "https://example.com/resume7.pdf",
  },
  {
    id: "appR4",
    job: "3",
    applicant: "seeker1",
    status: "rejected",
    applied_at: "2024-01-14T11:00:00Z",
    resume: "https://example.com/resume8.pdf",
  },
  {
    id: "appR5",
    job: "3",
    applicant: "seeker4",
    status: "hired",
    applied_at: "2024-01-12T09:00:00Z",
    resume: "https://example.com/resume9.pdf",
  },
];

export const mockSeekers = [
  { id: "seeker1", name: "Alex Johnson", email: "alex@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop" },
  { id: "seeker2", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop" },
  { id: "seeker3", name: "Marcus Williams", email: "marcus@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop" },
  { id: "seeker4", name: "Emily Rodriguez", email: "emily@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop" },
];
