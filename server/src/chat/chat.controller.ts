import { ChatService } from './chat.service';
import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UseAuthGuard } from 'src/authentication/decorators/use.auth.guard.decorator';
import { CreatChatRoomRequestDto } from './dto/CreateChatRoomRequest.dto';

@Controller('chatRooms')
@UseAuthGuard()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getMyAllChatRoom(@Res() res: Response, @Req() req: Request) {
    const { id: userId } = req['user'];
    const rooms = await this.chatService.getAllChatRoom(userId);
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Get('product/:productId')
  async getMyProductChatRoom(
    @Res() res: Response,
    @Req() req: Request,
    @Param('productId') productId: number,
  ) {
    const { id: userId } = req['user'];
    const rooms = await this.chatService.getAllSellingProductChatRoom(
      userId,
      productId,
    );
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Get(':chatRoomId')
  async getChatRoom(
    @Res() res: Response,
    @Param('chatRoomId') chatRoomId: number,
  ) {
    const room = await this.chatService.getChatRoom(chatRoomId);
    return res.status(HttpStatus.OK).json(room);
  }

  @Post()
  async createChatRoom(
    @Req() req: Request,
    @Res() res: Response,
    @Body() { productId }: CreatChatRoomRequestDto,
  ) {
    const { id: buyerId } = req['user'];
    const newChatRoom = await this.chatService.createChatRoom(
      productId,
      buyerId,
    );
    return res.status(HttpStatus.CREATED).json({ chatRoomId: newChatRoom.id });
  }

  @Patch(':chatRoomId')
  async leaveChatRoom(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatRoomId') chatRoomId: number,
  ) {
    const { id: userId } = req['user'];
    await this.chatService.leaveChatRoom(userId, chatRoomId);
    return res
      .status(HttpStatus.OK)
      .json({ message: '채팅방 나가기가 정상 처리되었습니다.' });
  }
}
