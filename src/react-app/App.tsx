import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import HomePage from "@/react-app/pages/Home";
import JobsPage from "@/react-app/pages/Jobs";
import JobDetailsPage from "@/react-app/pages/JobDetails";
import ApplyJobPage from "@/react-app/pages/ApplyJob";
import LoginPage from "@/react-app/pages/Login";
import RegisterPage from "@/react-app/pages/Register";
import {
  DashboardPage,
  ApplicationsPage,
  RecruiterJobsPage,
  ApplicantsPage,
  CreateJobPage,
} from "@/react-app/pages/dashboard";
import { AuthProvider, useAuth } from "@/react-app/context/AuthContext";
import type { UserRole } from "@/shared/types";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireRole({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRole[];
  children: React.ReactElement;
}) {
  const { user, role } = useAuth();
  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/jobs"
            element={
              <RequireAuth>
                <JobsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <RequireAuth>
                <JobDetailsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/jobs/:id/apply"
            element={
              <RequireAuth>
                <RequireRole allowedRoles={["job_seeker"]}>
                  <ApplyJobPage />
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <RequireAuth>
                <RequireRole allowedRoles={["job_seeker"]}>
                  <ApplicationsPage />
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/jobs"
            element={
              <RequireAuth>
                <RequireRole allowedRoles={["recruiter"]}>
                  <RecruiterJobsPage />
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/applicants"
            element={
              <RequireAuth>
                <RequireRole allowedRoles={["recruiter"]}>
                  <ApplicantsPage />
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/create"
            element={
              <RequireAuth>
                <RequireRole allowedRoles={["recruiter"]}>
                  <CreateJobPage />
                </RequireRole>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
