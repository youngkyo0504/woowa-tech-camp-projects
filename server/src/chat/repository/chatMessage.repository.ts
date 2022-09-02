import { CreateChatMessageDto } from '../dto/CreateChatMessage.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChatMessage } from '../entities/chatMessage.entity';

@Injectable()
export class ChatMessageRepository {
  private repository: Repository<ChatMessage>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(ChatMessage);
  }

  public async create(createMessageDto: CreateChatMessageDto) {
    try {
      return this.repository.save(createMessageDto);
    } catch (error) {
      throw new HttpException(
        '채팅 메시지 생성에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
