export type OAuthOriginType = 'GITHUB';

export enum OAuthBaseUrlEnum {
  GITHUB = 'https://github.com/login/oauth/authorize',
}

export interface IOAuthUserInfo {
  oAuthOrigin: OAuthOriginType;
  oAuthId: string;
}
