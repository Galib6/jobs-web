import { AxiosInstance } from "@/configs/axios/axios.instance";
import { $$ } from "@/configs/functions";
import { ErrorHandler } from "@/lib/errorHandler";
import {
  IApplicationCreate,
  IApplicationFilter,
  IApplicationResponse,
  IApplicationsResponse,
  IApplicationUpdate,
} from "./interface";

const END_POINT: string = "/applications";

export const ApplicationService = {
  NAME: END_POINT,
  async create(payload: IApplicationCreate): Promise<IApplicationResponse> {
    try {
      const data = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async find(options: IApplicationFilter): Promise<IApplicationsResponse> {
    try {
      const data = await AxiosInstance.get(
        `${END_POINT}?${$$.queryNormalizer(options)}`,
      );
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async findById(id: string): Promise<IApplicationResponse> {
    try {
      const data = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },

  async update(payload: IApplicationUpdate): Promise<IApplicationResponse> {
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
  async delete(id: string): Promise<IApplicationResponse> {
    try {
      const data = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(data?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};
