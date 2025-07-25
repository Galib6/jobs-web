import { IBaseEntity, IBaseFilter, IBaseResponse } from "@/base/interfaces";

export interface IApplicationFilter extends IBaseFilter {
  location?: string;
  ApplicationType?: string | null;
  locationType?: string | null;
}

export interface IApplication extends IBaseEntity {
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
  ApplicationType: string;
  locationType: string;
}

export interface IApplicationCreate {
  job: number;
  applicantName: string;
  applicantEmail: string;
  cvUrl: string;
  notes?: string | undefined;
}

export interface IApplicationUpdate {
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

export interface IApplicationResponse extends IBaseResponse {
  data: IApplication;
}

export interface IApplicationsResponse extends IBaseResponse {
  data: IApplication[];
}

export interface IApplicationVisaMethod {
  visaMethod: string;
  total: string;
}

export interface ICountiesVisaMethodResponse extends IBaseResponse {
  data: IApplicationVisaMethod[];
}
