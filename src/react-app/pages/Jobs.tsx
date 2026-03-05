import { useState, useEffect } from "react";
import { Search, MapPin, SlidersHorizontal, Briefcase } from "lucide-react";
import { PageLayout } from "@/react-app/components/layout";
import { JobCard } from "@/react-app/components/JobCard";
import { FilterSidebar } from "@/react-app/components/FilterSidebar";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import api from "@/react-app/api/axios";
import type { JobFilters } from "@/shared/types";

const JOBS_PER_PAGE = 6;

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchInput,
      location: locationInput,
    }));
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const params: any = {};
  
    if (filters.search) params.search = filters.search;
    if (filters.location) params.location = filters.location;
    if (filters.salaryMin) params.min_salary = filters.salaryMin;
    if (filters.salaryMax) params.max_salary = filters.salaryMax;
    if (filters.experience_level?.length) {
      params.experience_level = filters.experience_level.join(",");
    }
  
    api.get("jobs/", { params })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setJobs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [filters]);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const activeFilterCount =
    (filters.experience_level?.length || 0) +
    (filters.salaryMin || filters.salaryMax ? 1 : 0);

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Find your next role
        </h1>
        <p className="text-muted-foreground">
          {jobs.length} jobs available
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Job title or keyword"
            className="pl-10 h-11 bg-card"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="relative flex-1 sm:max-w-[200px]">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Location"
            className="pl-10 h-11 bg-card"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button onClick={handleSearch} className="h-11 px-6">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button
          variant="outline"
          className="h-11 lg:hidden"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Mobile Sidebar */}
        {showMobileFilters && (
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowMobileFilters(false)}
            isMobile
          />
        )}

        {/* Job Listings */}
        <div className="flex-1 min-w-0">
          {paginatedJobs.length > 0 ? (
            <>
              <div className="grid gap-4">
                {paginatedJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          className="w-9"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Try adjusting your filters or search terms to find more
                opportunities.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFilters({});
                  setSearchInput("");
                  setLocationInput("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
