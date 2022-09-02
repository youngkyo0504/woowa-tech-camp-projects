import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateChatRoomDto } from '../dto/CreateChatRoom.dto';
import { ChatRoom } from '../entities/chatRoom.entity';

@Injectable()
export class ChatRoomRepository {
  private repository: Repository<ChatRoom>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(ChatRoom);
  }

  async create(createChatRoomDto: CreateChatRoomDto) {
    try {
      return await this.repository.save(createChatRoomDto);
    } catch (error) {
      throw new HttpException(
        '채팅방 생성에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserId(userId: number) {
    return await this.repository.find({
      where: [{ sellerId: userId }, { buyerId: userId }],
      relations: { messages: true },
      order: {
        messages: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async findByChatRoomId(chatRoomId: number) {
    return await this.repository.findOne({
      where: { id: chatRoomId },
      relations: { messages: true },
      order: {
        messages: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async findSellingProductChatRooms(sellerId: number, productId: number) {
    return await this.repository.find({
      where: { sellerId, productId },
      relations: { messages: true },
      order: {
        messages: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async getLeavedUserId(chatRoomId: number) {
    const chatRoom = await this.repository.findOne({
      where: { id: chatRoomId },
      select: { leavedUserId: true },
    });
    return chatRoom.leavedUserId;
  }

  async updateLeavedUserId(chatRoomId: number, leavingUserId: number) {
    return await this.repository.update(
      { id: chatRoomId },
      { leavedUserId: leavingUserId },
    );
  }

  async updateVisitTime(chatRoomId: number, isSeller: boolean) {
    return await this.repository.update(
      { id: chatRoomId },
      isSeller
        ? { sellerLastVisit: new Date() }
        : { buyerLastVisit: new Date() },
    );
  }

  async delete(chatRoomId: number) {
    return await this.repository.delete({ id: chatRoomId });
  }
}
