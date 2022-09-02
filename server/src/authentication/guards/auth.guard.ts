import { Request } from 'express';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthenticationService)
    private readonly authService: AuthenticationService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationToken = request.headers.authorization;
    if (!authorizationToken) {
      throw new HttpException(
        'access token이 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = request.headers.authorization
      .split('Bearer ')
      .join('')
      .trim();

    const user = await this.authService.getAuthorizedUser(accessToken);
    request['user'] = user;
    return true;
  }
}
