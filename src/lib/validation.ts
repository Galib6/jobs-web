import { z } from "zod";
import { JobType, LocationType, locationTypes } from "./job-types";

export const createJobSchema = z.object({
  title: z.string().min(1),
  position: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  salary: z.coerce.number().min(0), // changed to number
  companyName: z.string().min(1),
  applicationDeadline: z.string().min(1),
  vacancies: z.coerce.number().min(0), // changed to number
  age: z.string().min(1), // changed to string
  experience: z.string().min(1),
  requirements: z.string().min(1),
  jobType: z.nativeEnum(JobType),
  locationType: z.nativeEnum(LocationType),
  companyLogo: z.any().optional(),
});

export type CreateJobValues = z.infer<typeof createJobSchema>;

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value as LocationType),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
