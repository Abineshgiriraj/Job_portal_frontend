import type { Application } from "@/shared/types";

export const mockApplications: Application[] = [
  {
    id: "app1",
    jobId: "1",
    userId: "user1",
    status: "shortlisted",
    appliedAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-17T14:00:00Z",
    coverLetter: "I'm excited about this opportunity...",
  },
  {
    id: "app2",
    jobId: "3",
    userId: "user1",
    status: "applied",
    appliedAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "app3",
    jobId: "5",
    userId: "user1",
    status: "rejected",
    appliedAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-14T11:00:00Z",
  },
  {
    id: "app4",
    jobId: "2",
    userId: "user1",
    status: "hired",
    appliedAt: "2024-01-05T12:00:00Z",
    updatedAt: "2024-01-18T16:00:00Z",
  },
];

// Applicants for recruiter's jobs
export const mockApplicants: Application[] = [
  {
    id: "appR1",
    jobId: "1",
    userId: "seeker1",
    status: "applied",
    appliedAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "appR2",
    jobId: "1",
    userId: "seeker2",
    status: "shortlisted",
    appliedAt: "2024-01-15T14:00:00Z",
    updatedAt: "2024-01-17T09:00:00Z",
  },
  {
    id: "appR3",
    jobId: "1",
    userId: "seeker3",
    status: "applied",
    appliedAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-17T08:00:00Z",
  },
  {
    id: "appR4",
    jobId: "3",
    userId: "seeker1",
    status: "rejected",
    appliedAt: "2024-01-14T11:00:00Z",
    updatedAt: "2024-01-16T15:00:00Z",
  },
  {
    id: "appR5",
    jobId: "3",
    userId: "seeker4",
    status: "hired",
    appliedAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
];

export const mockSeekers = [
  { id: "seeker1", name: "Alex Johnson", email: "alex@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop" },
  { id: "seeker2", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop" },
  { id: "seeker3", name: "Marcus Williams", email: "marcus@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop" },
  { id: "seeker4", name: "Emily Rodriguez", email: "emily@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop" },
];
