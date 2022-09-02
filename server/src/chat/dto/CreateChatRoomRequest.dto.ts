import { ChatRoom } from 'src/chat/entities/chatRoom.entity';

import { PickType } from '@nestjs/mapped-types';

export class CreatChatRoomRequestDto extends PickType(ChatRoom, [
  'productId',
]) {}
