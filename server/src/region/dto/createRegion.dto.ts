import { Region } from '../entities/region.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateRegionDto extends PickType(Region, ['address']) {}
