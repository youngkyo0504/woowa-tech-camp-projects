import { ChatMessage } from '../entities/chatMessage.entity';

import { PickType } from '@nestjs/mapped-types';

export class CreateChatMessageDto extends PickType(ChatMessage, [
  'senderId',
  'content',
  'chatRoomId',
]) {}
