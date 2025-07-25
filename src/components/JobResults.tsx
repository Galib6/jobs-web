import { IJob } from "@/@apis/jobs/interface";
import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  jobs: IJob[];
  page?: number;
  limit?: number;
  total?: number;
  filterValues: JobFilterValues;
}

export default function JobResults({
  jobs,
  total,
  page = 1,
  limit = 10,
  filterValues,
}: JobResultsProps) {
  const jobList = Array.isArray(jobs) ? jobs : [];
  // console.log("🚀😬 ~ JobResults ~ jobList:", jobList);
  const totalPages = total ? Math.ceil(total / limit) : 1;

  return (
    <div className="grow space-y-4">
      {jobList.map((job) => (
        <Link key={job.id} href={`/jobs/${job.id}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobList.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobList.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
  limit = 10,
}: PaginationProps & { limit?: number }) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "Remote" }),
      page: page.toString(),
      limit: limit.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
