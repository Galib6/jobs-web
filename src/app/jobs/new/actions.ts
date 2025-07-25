"use server";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
  // await prisma.job.create({
  //   data: {
  //     slug,
  //     title: title.trim(),
  //     type,
  //     companyName: companyName.trim(),
  //     companyLogoUrl,
  //     locationType,
  //     location,
  //     applicationEmail: applicationEmail?.trim(),
  //     applicationUrl: applicationUrl?.trim(),
  //     description: description?.trim(),
  //     salary: parseInt(salary),
  //   },
  // });

  redirect("/job-submitted");
}
