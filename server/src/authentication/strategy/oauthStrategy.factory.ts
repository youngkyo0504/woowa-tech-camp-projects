import { Injectable } from '@nestjs/common';
import { GithubStrategy } from './github.strategy';
import { BaseOAuthStrategy } from './baseOauth.strategy';

@Injectable()
export class OauthStrategyFactory {
  constructor(private githubStrategy: GithubStrategy) {}

  public build(origin: string): BaseOAuthStrategy {
    const oAuthMap = {
      GITHUB: this.githubStrategy,
    };

    return oAuthMap[origin];
  }
}
