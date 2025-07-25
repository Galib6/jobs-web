import { IJob } from "@/@apis/jobs/interface";
import { formatMoney } from "@/lib/utils";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Markdown from "./Markdown";

interface JobPageProps {
  job: IJob;
}

export default function JobPage({ job }: JobPageProps) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {/* {job?.companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )} */}
        <div>
          <div>
            <h1 className="text-xl font-bold">{job?.title}</h1>
            <p className="font-semibold">
              {/* {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )} */}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {job?.jobType}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {job?.locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {job?.location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(job?.salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{job?.requirements && <Markdown>{job?.requirements}</Markdown>}</div>
    </section>
  );
}
