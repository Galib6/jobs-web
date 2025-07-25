import { AxiosInstance } from "@/configs/axios/axios.instance";
import { $$ } from "@/configs/functions";
import { ErrorHandler } from "@/lib/errorHandler";
import {
  IJobCreate,
  IJobFilter,
  IJobResponse,
  IJobsResponse,
  IJobUpdate,
} from "./interface";

const END_POINT: string = "/jobs";

export const JobService = {
  NAME: END_POINT,
  async create(payload: IJobCreate): Promise<IJobResponse> {
    try {
      const data = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async find(options: IJobFilter): Promise<IJobsResponse> {
    try {
      const data = await AxiosInstance.get(
        `${END_POINT}?${$$.queryNormalizer(options)}`,
      );
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async findById(id: string): Promise<IJobResponse> {
    try {
      const data = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },

  async update(payload: IJobUpdate): Promise<IJobResponse> {
    try {
      const data = await AxiosInstance.patch(
        `${END_POINT}/${payload.id}`,
        payload.data,
      );
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async delete(id: string): Promise<IJobResponse> {
    try {
      const data = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};
