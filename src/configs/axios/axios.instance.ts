import { IBaseResponse } from "@/base/interfaces";
import { ENV } from "@/environments";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

export const AxiosInstance = axios.create({
  timeout: 15000,
});
AxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.baseURL = ENV.apiUrl;
    // config.headers["Authorization"] = `Bearer ${await authRefreshToken()}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
AxiosInstance.interceptors.response.use(
  (response: AxiosResponse<IBaseResponse>) => {
    return response;
  },
  async (error: AxiosError<IBaseResponse>) => {
    if (error?.response?.status === 401) {
      if (typeof window === "undefined") return error.response;
      return error.response;
    } else if (error.response?.data?.success === false) {
      console.log(
        "🚀😬 ~ error.response?.data?.success === false:",
        error.response?.data?.success === false,
      );
      error.response?.data?.errorMessages?.map((x: string) => {
        return toast.error(x);
      });
    }
    return error.response;
  },
);
