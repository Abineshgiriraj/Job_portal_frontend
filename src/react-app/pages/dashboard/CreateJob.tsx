import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
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

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    locationType: "remote",
    salaryMin: "",
    salaryMax: "",
    experienceLevel: "mid",
    description: "",
    requirements: [""],
    benefits: [""],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: POST to backend jobs API when endpoint shape is known

    setIsLoading(false);
    navigate("/dashboard/jobs");
  };

  const addItem = (field: "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeItem = (field: "requirements" | "benefits", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateItem = (
    field: "requirements" | "benefits",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
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
          {/* Basic Info */}
          <div className="glass rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-semibold border-b border-border pb-3">
              Basic Information
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
                <Label>Work Type *</Label>
                <Select
                  value={formData.locationType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, locationType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Salary Min ($) *</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="100000"
                  value={formData.salaryMin}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, salaryMin: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Salary Max ($) *</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="150000"
                  value={formData.salaryMax}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, salaryMax: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Experience Level *</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, experienceLevel: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead / Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
                className="min-h-[150px]"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-border pb-3">
              Requirements
            </h2>

            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. 5+ years of React experience"
                  value={req}
                  onChange={(e) =>
                    updateItem("requirements", index, e.target.value)
                  }
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem("requirements", index)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addItem("requirements")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>

          {/* Benefits */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold border-b border-border pb-3">
              Benefits
            </h2>

            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. Unlimited PTO"
                  value={benefit}
                  onChange={(e) =>
                    updateItem("benefits", index, e.target.value)
                  }
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem("benefits", index)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addItem("benefits")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit
            </Button>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" className="glow-primary" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {isLoading ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
