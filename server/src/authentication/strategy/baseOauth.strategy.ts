import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { IAccessTokenInfo } from '../types';

export abstract class BaseOAuthStrategy {
  protected url: string;
  public async requestLogin(accessToken: string) {
    try {
      const response = await axios.get(this.url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = response.data;
      return user;
    } catch (error) {
      throw new HttpException(
        'not found user in resource server',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public abstract getToken(code: string): Promise<IAccessTokenInfo>;
}
