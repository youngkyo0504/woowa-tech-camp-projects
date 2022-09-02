import { UserRegion } from '../entities/userRegion.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserRegionDto extends PickType(UserRegion, [
  'userId',
  'regionId',
  'isPrimary',
]) {}
