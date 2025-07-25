export enum JobType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Contract = "Contract",
  Temporary = "Temporary",
  Internship = "Internship",
  Volunteer = "Volunteer",
}

export enum LocationType {
  Remote = "Remote",
  OnSite = "On-site",
  Hybrid = "Hybrid",
}

export const jobTypes = Object.values(JobType);
export const locationTypes = Object.values(LocationType);
