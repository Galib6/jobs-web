import axios from "axios";

import { ICookiesResponse } from "@/api/cookies";
import { ILogoutResponse } from "@/api/logout";
import { ISessionResponse } from "@/api/session";
import { AxiosInstance } from "@/configs/axios/axios.instance";
import { IFlogin, ILoginResponse } from "./interfaces";
import { clearAuthSession } from "./utils";

const END_POINT = "/auth";

export const AuthService = {
  async login(payload: IFlogin): Promise<ILoginResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/login`, payload, {
        withCredentials: true,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },

  async getCookies(): Promise<ICookiesResponse> {
    const res = await axios.get(`/api/auth/cookies`);
    return res.data;
  },
  async getSession(): Promise<ISessionResponse> {
    const res = await axios.get(`/api/auth/session`);
    return res.data;
  },
  async logout(): Promise<ILogoutResponse> {
    const res = await axios.post(`/api/auth/logout`);

    if (typeof window !== "undefined") {
      clearAuthSession();
      window.location.reload();
    }
    return res.data;
  },
};
