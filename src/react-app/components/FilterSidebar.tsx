import { X, RotateCcw } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Checkbox } from "@/react-app/components/ui/checkbox";
import { Slider } from "@/react-app/components/ui/slider";
import { Label } from "@/react-app/components/ui/label";
import type { JobFilters } from "@/shared/types";

interface FilterSidebarProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

const locationTypes = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

function formatSalary(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const handleExperienceChange = (value: string, checked: boolean) => {
    const current = filters.experienceLevel || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFiltersChange({ ...filters, experienceLevel: updated });
  };

  const handleLocationTypeChange = (value: string, checked: boolean) => {
    const current = filters.locationType || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFiltersChange({ ...filters, locationType: updated });
  };

  const handleSalaryChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      salaryMin: values[0],
      salaryMax: values[1],
    });
  };

  const handleReset = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    (filters.experienceLevel?.length || 0) > 0 ||
    (filters.locationType?.length || 0) > 0 ||
    filters.salaryMin ||
    filters.salaryMax;

  return (
    <aside
      className={`${
        isMobile
          ? "fixed inset-0 z-50 bg-background p-6"
          : "sticky top-24 w-64 shrink-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Experience Level
          </Label>
          <div className="space-y-2.5">
            {experienceLevels.map((level) => (
              <div key={level.value} className="flex items-center gap-2.5">
                <Checkbox
                  id={`exp-${level.value}`}
                  checked={filters.experienceLevel?.includes(level.value)}
                  onCheckedChange={(checked) =>
                    handleExperienceChange(level.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`exp-${level.value}`}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Work Type
          </Label>
          <div className="space-y-2.5">
            {locationTypes.map((type) => (
              <div key={type.value} className="flex items-center gap-2.5">
                <Checkbox
                  id={`loc-${type.value}`}
                  checked={filters.locationType?.includes(type.value)}
                  onCheckedChange={(checked) =>
                    handleLocationTypeChange(type.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`loc-${type.value}`}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">
            Salary Range
          </Label>
          <Slider
            min={0}
            max={350000}
            step={10000}
            value={[filters.salaryMin || 0, filters.salaryMax || 350000]}
            onValueChange={handleSalaryChange}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatSalary(filters.salaryMin || 0)}</span>
            <span>{formatSalary(filters.salaryMax || 350000)}</span>
          </div>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="mt-8">
          <Button className="w-full" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      )}
    </aside>
  );
}
