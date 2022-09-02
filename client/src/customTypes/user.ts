import { IOAuthUserInfo } from './auth';
import { IRegion } from './region';

export interface IUser {
  id: number;
  name: string;
  regions: IRegion[];
}

export interface LoginResponseDto {
  isRegistered: boolean;
  oAuthInfo?: IOAuthUserInfo;
  accessToken?: string;
}

export interface CheckDuplicatedResponseDto {
  data: { isDuplicated: false };
}
