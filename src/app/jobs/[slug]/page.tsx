import { IJob } from "@/@apis/jobs/interface";
import { JobService } from "@/@apis/jobs/services";
import JobPage from "@/components/JobPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (id: string) => {
  const job = await JobService.findById(id);
  if (!job) notFound();
  return job?.data;
});

export async function generateStaticParams() {
  const jobs = await JobService.find({
    page: 1,
    limit: 5000,
  });

  return jobs?.data.map((job: IJob) => job.id);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job?.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        {/* <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button> */}
      </aside>
    </main>
  );
}
