import axios from "axios";

import { ICookiesResponse } from "@/api/cookies";

import { ISessionResponse } from "@/api/session";
import { AxiosInstance } from "@/configs/axios/axios.instance";
import { IFlogin, ILoginResponse } from "./interfaces";

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
};
