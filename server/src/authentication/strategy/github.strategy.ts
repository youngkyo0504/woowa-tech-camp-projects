import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { IAccessTokenInfo } from '../types';
import { BaseOAuthStrategy } from './baseOauth.strategy';

@Injectable()
export class GithubStrategy extends BaseOAuthStrategy {
  constructor() {
    super();
    this.url = 'https://api.github.com/user';
  }
  public async getToken(code: string) {
    const githubUrl = 'https://github.com/login/oauth/access_token';
    const queryConfig = {
      client_id: process.env['GITHUB_CLIENT_ID'],
      client_secret: process.env['GITHUB_CLIENT_SECRET'],
      code,
    };
    try {
      const token = await axios.post<IAccessTokenInfo>(githubUrl, queryConfig, {
        headers: {
          Accept: 'application/json',
        },
      });
      return token.data;
    } catch (error) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
