import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  PlusCircle,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/react-app/lib/utils";
import { useAuth } from "@/react-app/context/AuthContext";
import type { UserRole } from "@/shared/types";

interface SidebarProps {
  role: UserRole;
}

const seekerLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/applications", label: "My Applications", icon: FileText },
  { href: "/", label: "Browse Jobs", icon: Briefcase },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const recruiterLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/dashboard/create", label: "Post a Job", icon: PlusCircle },
  { href: "/dashboard/applicants", label: "Applicants", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const links = role === "job_seeker" ? seekerLinks : recruiterLinks;

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col justify-between p-4">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary glow-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
