import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { TokenService } from './service/token.service';
import { GithubStrategy } from './strategy/github.strategy';
import { OauthStrategyFactory } from './strategy/oauthStrategy.factory';

@Module({
  imports: [UserModule, JwtModule],
  providers: [
    AuthenticationService,
    TokenService,
    GithubStrategy,
    OauthStrategyFactory,
  ],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
