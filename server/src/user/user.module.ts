import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RegionModule } from 'src/region/region.module';
import { UserRepository } from './repository/user.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [RegionModule, forwardRef(() => AuthenticationModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
