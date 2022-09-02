import { ChatGateWay } from './chat.gateway';
import { ProductRepository } from './../product/repository/product.repository';
import { UserRepository } from './../user/repository/user.repository';
import { ChatMessageRepository } from './repository/chatMessage.repository';
import { ChatRoomRepository } from './repository/chatRoom.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [ChatController],
  providers: [
    ChatGateWay,
    ChatService,
    ChatRoomRepository,
    ChatMessageRepository,
    UserRepository,
    ProductRepository,
  ],
})
export class ChatModule {}
