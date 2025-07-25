import { JobService } from "@/modules/jobs/services";
import Link from "next/link";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = 10;
  const jobs = await JobService.find({ page, limit });
  const total = jobs?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <section className="flex flex-col gap-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-center text-2xl font-bold">Job Lists</h1>
          <Link
            href="/admin/jobs/new"
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            + Add Job
          </Link>
        </div>
        <h2 className="text-lg font-bold">All Jobs</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                  Company
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                  Location
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {jobs?.data?.map((job: any) => (
                <tr key={job.id} className="transition hover:bg-gray-100">
                  <td className="px-4 py-2 font-semibold">
                    <Link href={`/admin/jobs/${job.slug}`}>{job.title}</Link>
                  </td>
                  <td className="px-4 py-2">{job.companyName}</td>
                  <td className="px-4 py-2">{job.location}</td>
                  <td className="px-4 py-2">
                    <span className="text-green-600">{job?.salary}</span>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {(!jobs?.data || jobs.data.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center text-muted-foreground"
                  >
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`?page=${i + 1}`}
                className={`rounded border px-3 py-1 ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
