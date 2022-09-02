import { CreateUserRegionDto } from './dto/createUserRegion.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/createRegion.dto';
import { RegionRepository } from './repository/region.repository';
import { UserRegionRepository } from './repository/userRegion.repository';

@Injectable()
export class RegionService {
  constructor(
    private readonly userRegionRepository: UserRegionRepository,
    private readonly regionRepository: RegionRepository, // private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionRepository.create(createRegionDto);
    return newRegion.id;
  }

  async createUserRegion(createUserRegionDto: CreateUserRegionDto) {
    const userRegions = await this.userRegionRepository.findByUserId(
      createUserRegionDto.userId,
    );
    if (
      userRegions.find(
        (userRegion) => userRegion.regionId === createUserRegionDto.regionId,
      )
    ) {
      throw new HttpException('이미 선택한 지역입니다', HttpStatus.BAD_REQUEST);
    }
    return await this.userRegionRepository.create(createUserRegionDto);
  }

  async setUserRegionPrimary(userId: number, regionId: number) {
    const userRegions = await this.userRegionRepository.findByUserId(userId);
    const targetUserRegion = userRegions.find(
      (userRegion) => userRegion.regionId === regionId,
    );

    if (!targetUserRegion) {
      throw new HttpException('지역이 올바르지 않습니다', HttpStatus.NOT_FOUND);
    }

    const { regionId: previousPrimaryRegionId } = userRegions.find(
      (userRegion) => userRegion.regionId !== regionId,
    );

    if (previousPrimaryRegionId) {
      this.userRegionRepository.updateIsPrimary(
        userId,
        previousPrimaryRegionId,
        false,
      );
    }

    return await this.userRegionRepository.updateIsPrimary(
      userId,
      regionId,
      true,
    );
  }

  async searchByKeyword(keyword: string) {
    return this.regionRepository.findByKeyword(keyword);
  }

  async deleteUserRegion(userId: number, regionId: number) {
    const userRegions = await this.userRegionRepository.findByUserId(userId);

    if (userRegions.length < 2) {
      throw new HttpException(
        '지역은 하나 이상 선택해야합니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    const targetUserRegion = userRegions.find(
      (userRegion) => userRegion.regionId === regionId,
    );

    if (!targetUserRegion) {
      throw new HttpException('지역이 올바르지 않습니다', HttpStatus.NOT_FOUND);
    }

    if (targetUserRegion.isPrimary) {
      const { regionId: newPrimaryRegionId } = userRegions.find(
        (userRegion) => userRegion.regionId !== regionId,
      );
      this.userRegionRepository.updateIsPrimary(
        userId,
        newPrimaryRegionId,
        true,
      );
    }

    return this.userRegionRepository.deleteByRegionId(regionId, userId);
  }
}
