import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { RegionRepository } from './repository/region.repository';
import { UserRegionRepository } from './repository/userRegion.repository';

@Module({
  controllers: [RegionController],
  providers: [RegionService, RegionRepository, UserRegionRepository],
  exports: [RegionService, UserRegionRepository],
})
export class RegionModule {}
