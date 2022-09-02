import { User } from '../entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserRequestDto extends PickType(User, [
  'name',
  'oAuthOrigin',
  'oAuthId',
]) {
  regionId: number;
}
