import { PickType } from '@nestjs/mapped-types';
import { Like } from '../entities/like.entity';

export class LikeDto extends PickType(Like, ['productId', 'userId']) {}
