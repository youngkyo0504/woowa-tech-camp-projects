import { OauthStrategyFactory } from './../strategy/oauthStrategy.factory';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

interface LoginWithOAuthProps {
  oAuthOrigin: string;
  code: string;
}

interface LoginWithOAuthReturn {
  isRegistered: boolean;
  oAuthInfo?: {
    oAuthOrigin: string;
    oAuthId: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly strategyFactory: OauthStrategyFactory,
  ) {}

  async loginWithOAuth({
    oAuthOrigin,
    code,
  }: LoginWithOAuthProps): Promise<LoginWithOAuthReturn> {
    const strategy = this.strategyFactory.build(oAuthOrigin);
    const { access_token: oAuthAccessToken } = await strategy.getToken(code);
    const { id: oAuthId } = await strategy.requestLogin(oAuthAccessToken);
    const oAuthInfo = { oAuthOrigin, oAuthId };

    const clientUser = await this.userService.getOneByOAuthId(oAuthId);

    if (!clientUser) {
      return {
        isRegistered: false,
        oAuthInfo,
      };
    }

    const { id: userId } = clientUser;
    const jwtTokenSet = this.tokenService.getTokenSet(userId);

    return {
      isRegistered: true,
      ...jwtTokenSet,
    };
  }

  async getAuthorizedUser(accessToken: string) {
    const userId = this.tokenService.verify(accessToken, 'access');
    const user = await this.userService.getOneByUserId(userId);
    return user;
  }

  resignAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        'refresh token이 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userId = this.tokenService.verify(refreshToken, 'refresh');
    const newAccessToken = this.tokenService.getToken(userId, 'access');
    return newAccessToken;
  }

  async testerLogin() {
    const testUser = await this.userService.getOneByOAuthId('0000');
    const { id: userId } = testUser;
    const jwtTokenSet = this.tokenService.getTokenSet(userId);

    return {
      isRegistered: true,
      ...jwtTokenSet,
    };
  }
}
