import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import type { UserRole } from "@/shared/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar role={role} />
      <main className="pl-64 pt-16">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
