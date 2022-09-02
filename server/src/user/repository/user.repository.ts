import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserResponseDto } from '../dto/userResponse.dto';

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  public async create(input: CreateUserDto): Promise<User> {
    return this.repository.save({ ...input });
  }

  public async findOneByOAuthId(id: string): Promise<UserResponseDto> {
    return this.repository.findOne({
      where: { oAuthId: id },
      select: ['id', 'name', 'regions'],
    });
  }

  public async findOneByName(name: string): Promise<UserResponseDto> {
    return this.repository.findOne({
      where: { name },
      select: ['id', 'name', 'regions'],
    });
  }

  public async findOneByUserId(id: number): Promise<UserResponseDto> {
    return this.repository.findOne({
      where: { id },
      relations: {
        regions: {
          region: true,
        },
      },
      select: ['id', 'name', 'regions'],
      order: {
        regions: {
          createdAt: 'ASC',
        },
      },
    });
  }

  public async findAllChatRoomByUserId(userId: number) {
    return this.repository.find({
      where: { id: userId },
      relations: {
        chatRoomAsSeller: true,
        chatRoomAsBuyer: true,
      },
      select: {
        chatRoomAsSeller: true,
        chatRoomAsBuyer: true,
      },
    });
  }
}
