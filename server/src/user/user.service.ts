import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRegionRepository } from 'src/region/repository/userRegion.repository';
import { CreateUserRequestDto } from './dto/createUserRequset.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private regionRepository: UserRegionRepository,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    const { name, oAuthOrigin, oAuthId, regionId } = createUserDto;
    try {
      const newUser = await this.userRepository.create({
        name,
        oAuthOrigin,
        oAuthId,
      });
      await this.regionRepository.create({
        userId: newUser.id,
        regionId,
        isPrimary: true,
      });
    } catch (error) {
      switch (error.errno) {
        case 1062:
          throw new HttpException(
            '중복된 유저 이름입니다.',
            HttpStatus.CONFLICT,
          );
        case 1452:
          throw new HttpException(
            '존재하지 않는 동네입니다.',
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            '회원가입에 실패했습니다.',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  async getOneByOAuthId(oAuthId: string) {
    try {
      return await this.userRepository.findOneByOAuthId(oAuthId);
    } catch (e) {
      throw new HttpException(
        '존재하지 않는 유저입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getOneByUserId(userId: number) {
    const user = await this.userRepository.findOneByUserId(userId);
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async checkDuplicatedUserByNickname(name: string) {
    const user = await this.userRepository.findOneByName(name);

    if (!user) {
      return { isDuplicated: false };
    }
    return { isDuplicated: true };
  }
}
