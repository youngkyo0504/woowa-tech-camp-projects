import { ChatRoom } from 'src/chat/entities/chatRoom.entity';

import { PickType } from '@nestjs/mapped-types';

export class CreateChatRoomDto extends PickType(ChatRoom, [
  'buyerId',
  'sellerId',
  'productId',
]) {}
