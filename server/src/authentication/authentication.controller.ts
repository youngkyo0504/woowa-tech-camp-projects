import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  Req,
  Get,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import extractRegionsFromUserRegions from 'src/util/parseUtil';
import { UseAuthGuard } from './decorators/use.auth.guard.decorator';
import { AuthenticationService } from './service/authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async oAuthLogin(
    @Res() res: Response,
    @Body() oauthDto: { oAuthOrigin: string; code: string },
  ) {
    const { isRegistered, refreshToken, ...loginResult } =
      await this.authenticationService.loginWithOAuth(oauthDto);
    if (isRegistered) {
      res.cookie('Refresh', refreshToken, {
        httpOnly: true,
        path: '/',
      });
    }

    return res.status(HttpStatus.OK).json({ isRegistered, ...loginResult });
  }

  @Post('login/tester')
  async testLogin(@Res() res: Response) {
    const { isRegistered, refreshToken, ...loginResult } =
      await this.authenticationService.testerLogin();
    if (isRegistered) {
      res.cookie('Refresh', refreshToken, {
        httpOnly: true,
        path: '/',
      });
    }

    return res.status(HttpStatus.OK).json({ isRegistered, ...loginResult });
  }

  @Post('logout')
  logOut(@Res() res: Response) {
    try {
      res.clearCookie('Refresh', {
        httpOnly: true,
        path: '/',
      });
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: '로그아웃 되었습니다.' });
    } catch (e) {
      throw new HttpException(
        '로그아웃이 정상처리 되지 않았습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('resign')
  relogin(@Res() res: Response, @Req() req: Request) {
    const refreshToken = req.cookies.Refresh;
    const newAccessToken =
      this.authenticationService.resignAccessToken(refreshToken);
    return res.status(HttpStatus.OK).json(newAccessToken);
  }

  @Get('user')
  @UseAuthGuard()
  async getAuthorizedUser(@Res() res: Response, @Req() req: Request) {
    const loginUser = req['user'];
    const userRegions = loginUser.regions;
    const regions = extractRegionsFromUserRegions(userRegions);
    return res.status(HttpStatus.OK).json({ ...loginUser, regions });
  }
}
