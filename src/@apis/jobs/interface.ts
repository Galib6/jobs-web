import { IBaseEntity, IBaseFilter, IBaseResponse } from "@/base/interfaces";

export interface IJobFilter extends IBaseFilter {
  location?: string;
  jobType?: string | null;
  locationType?: string | null;
}

export interface IJob extends IBaseEntity {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  companyName: string;
  position: string;
  applicationDeadline: string;
  vacancies: number;
  age: string;
  experience: string;
  requirements: any;
  createdById: number;
  updatedById?: any;
  jobType: string;
  locationType: string;
}

export interface IJobCreate {
  title: string;
  description: string;
  location: string;
  salary: string;
  companyName: string;
  position: string;
  applicationDeadline: string;
  vacancies: number;
  age: string;
  experience: string;
  requirements: any;
  createdBy: number;
  updatedBy?: any;
}

export interface IJobUpdate {
  id: number;
  data: {
    title: string;
    description: string;
    location: string;
    salary: string;
    companyName: string;
    position: string;
    applicationDeadline: string;
    vacancies: number;
    age: string;
    experience: string;
    updatedBy?: any;
  };
}

export interface IJobResponse extends IBaseResponse {
  data: IJob;
}

export interface IJobsResponse extends IBaseResponse {
  data: IJob[];
}

export interface IJobVisaMethod {
  visaMethod: string;
  total: string;
}

export interface ICountiesVisaMethodResponse extends IBaseResponse {
  data: IJobVisaMethod[];
}
