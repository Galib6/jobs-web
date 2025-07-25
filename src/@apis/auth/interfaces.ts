import { IBaseResponse, IdType } from "@/base/interfaces";

export interface IFlogin {
  email: string;
  password: string;
}

export interface IRegister {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  password: any;
  role: string;
}

export interface ICorporateRegister {
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  division: IdType;
  district: IdType;
  upazila: IdType;
  address: string;
  vtSubdomain: string;
  logo: string;
  primaryBrandColor: string;
  secondaryBrandColor: string;
  password: string;
}

export interface IB2bRegister {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  isB2CUser?: boolean;
}

export interface IResetPassReq {
  email: string;
}

export interface IResetPassVerify {
  email: string;
  hash: string;
  otp: number;
  newPassword: any;
}
export interface IChangePass {
  newPassword: string;
  oldPassword: string;
}

export interface IChangeGeneratedPass {
  email: string;
  newPassword: string;
  oldPassword: string;
}

export interface IResetPassReq {
  email: string;
}

export interface ISendOtp {
  email: string;
  verificationType: "SIGN_UP" | "RESET_PASSWORD";
}

export interface IVerifyOtp {
  email: string;
  hash: string;
  otp: number;
}

export interface IResetPassVerify {
  email: string;
  hash: string;
  otp: number;
  newPassword: any;
}

export interface ILoginSession {
  token: string;
  // refreshToken: string;
  permissionToken: string;
  user: {
    id: IdType;
  };
}

export interface ILoginResponse extends IBaseResponse {
  data: ILoginSession & {
    hash: string;
    email: string;
    isVerified: boolean;
    otp: number;
  } & {
    email: string;
    isPasswordSystemGenerated: boolean;
  } & {
    email: string;
    isTwoFactorEnabled: boolean;
  };
}

export interface IB2bRegisterResponse extends IBaseResponse {
  data: {
    email: string;
    otp: number;
    hash: string;
    isB2CUser: boolean;
    avatar: string;
  };
}

export interface ISignupResponse extends IBaseResponse {
  data: {
    email: string;
    otp: number;
    hash: string;
  };
}
export interface IVerifyOtpResponse extends IBaseResponse {
  data: ILoginSession;
}

export interface IAuthUser {
  id: IdType;
  email?: string;
  name?: string;
  phoneNumber?: string;
  roles?: string[];
}

export interface ITokenData {
  user: {
    id: number;
    email: string;
    roles: string[];
  };
  iat: number;
  exp: number;
}

export interface ISession {
  isLoading: boolean;
  isAuthenticate: boolean;
  user: {
    id: IdType;
    email: string;
    roles: string[];
    isB2bUser?: boolean;
    isCorporateUser?: boolean;
    name?: string;
    fullName?: string;
  };
  expires: Date;
  token: string;
}

export interface IForceAccess {
  userId: IdType;
}
