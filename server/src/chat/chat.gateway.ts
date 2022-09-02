import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

interface EnterChatRoomProps {
  userId: number;
  chatRoomId: number;
}

interface SendChatProps {
  senderId: number;
  content: string;
}

@WebSocketGateway(8080, {
  namespace: 'goldMarket',
  cors: true,
})
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  chatRooms = {};

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`${client.id}연결됐어요!`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id}끊어졌어요!`);
    client.leave(client.data.chatRoomId);
  }

  @SubscribeMessage('enter')
  async enterRoom(client: Socket, { userId, chatRoomId }: EnterChatRoomProps) {
    try {
      const chatRoom = await this.chatService.getChatRoom(+chatRoomId);
      console.log(userId, chatRoomId);
      if (!chatRoom) throw Error('존재하지 않는 채팅방입니다.');
      if (chatRoom.buyer.id !== userId && chatRoom.seller.id !== userId) {
        throw Error('당신의 채팅방이 아닙니다.');
      }
      this.chatRooms[chatRoomId] = { userId, chatRoomId };
      client.data.userId = userId;
      client.data.chatRoomId = chatRoomId;
      client.join(String(chatRoomId));
      console.log(`${chatRoomId}에 ${userId}가 들어왔어요`);
    } catch (e) {
      console.log(e);
      throw new WsException(e.message || '서버에 문제가 있습니다.');
    }
  }

  @SubscribeMessage('send')
  async sendMessage(client: Socket, { content }: SendChatProps) {
    const { chatRoomId, userId } = client.data;
    const chatMessage = await this.chatService.createChatMessage({
      content,
      senderId: +userId,
      chatRoomId: +chatRoomId,
    });
    client.emit('receive', chatMessage);
    client.to(String(chatRoomId)).emit('receive', chatMessage);
  }
}
