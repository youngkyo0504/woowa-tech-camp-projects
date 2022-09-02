import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type JwtTokenType = 'access' | 'refresh';
@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private tokenSecretMap = {
    access: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    refresh: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  };

  private expirationTimeMap = {
    access: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    refresh: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
  };

  getToken(userId: number, tokenType: JwtTokenType) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.tokenSecretMap[tokenType],
      expiresIn: `${this.expirationTimeMap[tokenType]}s`,
    });

    return token;
  }

  getTokenSet(userId: number) {
    const accessToken = this.getToken(userId, 'access');
    const refreshToken = this.getToken(userId, 'refresh');
    return { accessToken, refreshToken };
  }

  verify(token: string, tokenType: JwtTokenType) {
    const tokenSecret = this.tokenSecretMap[tokenType];
    try {
      const { userId } = this.jwtService.verify<{ userId: number }>(token, {
        secret: tokenSecret,
      });
      return userId;
    } catch (e) {
      switch (e.name) {
        case 'JsonWebTokenError':
        case 'NotBeforeError':
          throw new HttpException(
            '유효하지 않은 토큰입니다.',
            HttpStatus.UNAUTHORIZED,
          );
        case 'TokenExpiredError':
          if (tokenType === 'access') {
            throw new HttpException(
              'Access 토큰이 만료되었습니다.',
              HttpStatus.UNAUTHORIZED,
            );
          } else {
            throw new HttpException(
              'Refresh 토큰이 만료되었습니다.',
              HttpStatus.GONE,
            );
          }
        default:
          throw new HttpException(
            '서버 오류입니다.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
