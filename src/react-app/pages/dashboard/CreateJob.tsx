import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";
import { Textarea } from "@/react-app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/react-app/components/ui/select";
import api, { isApiError } from "@/react-app/api/axios";
import { useAuth } from "@/react-app/context/AuthContext";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    experience_level: "mid" as "intern" | "junior" | "mid" | "senior" | "lead",
  });

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const salary = Number(formData.salary);

    if (Number.isNaN(salary)) {
      setError("Please enter a valid salary number.");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("jobs/create/", {
        title: formData.title,
        description: formData.description,
        salary: salary,
        location: formData.location,
        experience_level: formData.experience_level,
      });

      navigate("/dashboard/jobs");
    } catch (err: unknown) {
      if (isApiError(err) && err.response?.status === 401) {
        setError("You are not authorized. Please sign in again.");
        return;
      }

      if (isApiError(err) && err.response?.data) {
        const data = err.response.data as any;
        if (typeof data === "string") {
          setError(data);
        } else if (data && typeof data === "object") {
          const messages = Object.values(data)
            .flatMap((v) => (Array.isArray(v) ? v : [v]))
            .filter((v): v is string => typeof v === "string");

          setError(
            messages.join(" ") || "Failed to create job. Please check your inputs."
          );
        } else {
          setError("Failed to create job. Please check your inputs.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
            <p className="text-muted-foreground">
              Fill in the details to create your job listing
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Display */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-fade-in">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="glass rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-semibold border-b border-border pb-3">
              Job Information
            </h2>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Frontend Engineer"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary *</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="120000"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, salary: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Experience Level *</Label>
              <Select
                value={formData.experience_level}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({ ...prev, experience_level: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead / Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
                className="min-h-[200px]"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
