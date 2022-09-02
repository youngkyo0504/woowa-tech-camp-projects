import { User } from '../entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class UserResponseDto extends PickType(User, [
  'name',
  'id',
  'regions',
]) {}
