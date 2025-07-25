import { cookies } from "@/lib/cookies";
import { storage } from "@/lib/storage";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { authTokenKey, permissionTokenKey, rolesKey } from "./constants";
import { ILoginSession, ISession, ITokenData } from "./interfaces";

const unAuthorizedSession: ISession = {
  isLoading: false,
  isAuthenticate: false,
  user: null as any,
  expires: null as any,
  token: null as any,
};

export function isJwtExpired(token: string): boolean {
  try {
    const tokenData: ITokenData = token ? jwtDecode(token) : null;
    if (!tokenData?.exp) return true;

    const expDate: Date = new Date(tokenData?.exp * 1000);
    if (expDate > new Date()) return false;

    return true;
  } catch (error) {
    console.error(error);
    return true;
  }
}

export const setAuthSession = (session: ILoginSession): ISession => {
  if (typeof window === "undefined") {
    return { ...unAuthorizedSession, isLoading: true };
  }
  try {
    if (!session.token) return unAuthorizedSession;
    const sessionData: ITokenData = jwtDecode(session.token);
    storage.setData(permissionTokenKey, session.permissionToken);
    storage.setData(rolesKey, sessionData?.user?.roles ?? []);
    cookies.setData(
      authTokenKey,
      session.token,
      new Date(sessionData.exp * 1000 - 10 * 1000),
    );

    return {
      isLoading: false,
      isAuthenticate: true,
      user: sessionData.user,
      expires: new Date(sessionData.exp * 1000),
      token: session.token,
    };
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};

export const clearAuthSession = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    cookies.removeData(authTokenKey);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAuthToken = (): string => {
  if (typeof window === "undefined") {
    return null as any;
  }
  try {
    const token = cookies.getData(authTokenKey);
    return token;
  } catch (error) {
    console.error(error);
    return null as any;
  }
};

let sessionCache: ISession = null;
export const getAuthSession = (): ISession => {
  const now = new Date();

  if (sessionCache && sessionCache.expires > now) {
    return sessionCache;
  }

  if (typeof window === "undefined") {
    return { ...unAuthorizedSession, isLoading: true };
  }

  try {
    const token = getAuthToken();
    if (!token) return unAuthorizedSession;
    const isExpired = isJwtExpired(token);
    if (isExpired) return unAuthorizedSession;

    const tokenData: ITokenData = jwtDecode(token);
    const session = {
      isLoading: false,
      isAuthenticate: true,
      user: tokenData.user,
      expires: new Date(tokenData.exp * 1000),
      token: token,
    };
    sessionCache = session;
    return session;
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};

export const getServerAuthSession = (req: {
  cookies: Record<string, any>;
}): ISession => {
  try {
    const token =
      req.cookies[authTokenKey] || req.cookies?.get(authTokenKey)?.value;
    if (!token) return unAuthorizedSession;
    const isExpired = isJwtExpired(token);
    if (isExpired) return unAuthorizedSession;

    const tokenData: ITokenData = jwtDecode(token);
    return {
      isLoading: false,
      isAuthenticate: true,
      user: tokenData.user,
      expires: new Date(tokenData.exp * 1000),
      token: token,
    };
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};

export const useAuthSession = (): ISession => {
  const [session, setSession] = useState<ISession>({
    ...unAuthorizedSession,
    isLoading: true,
  });

  useEffect(() => {
    console.log(getAuthSession());
    setSession(getAuthSession());
  }, []);

  return session;
};
