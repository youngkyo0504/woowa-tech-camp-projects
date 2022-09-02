import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  Patch,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { CreateUserRequestDto } from './dto/createUserRequset.dto';
import { UseAuthGuard } from 'src/authentication/decorators/use.auth.guard.decorator';
import { CreateUserRegionDto } from 'src/region/dto/createUserRegion.dto';
import { RegionService } from 'src/region/region.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRegionService: RegionService,
  ) {}

  @Post('sign-up')
  async create(
    @Res() res: Response,
    @Body() createUserDto: CreateUserRequestDto,
  ) {
    await this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json({ ok: true });
  }

  @Get()
  async searchByNickname(
    @Res() res: Response,
    @Query('nickname') nickname: string,
  ) {
    const data = await this.userService.checkDuplicatedUserByNickname(nickname);
    return res.status(HttpStatus.OK).json({ ok: true, data });
  }

  @Post('region')
  @UseAuthGuard()
  async createUserRegion(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createUserRegionDto: CreateUserRegionDto,
  ) {
    const { id: userId } = req['user'];
    const userRegion = await this.userRegionService.createUserRegion({
      ...createUserRegionDto,
      userId,
      isPrimary: false,
    });

    return res.status(HttpStatus.OK).json({ ok: true, userRegion });
  }

  @Patch('region/:regionId')
  @UseAuthGuard()
  async setUserRegionPrimary(
    @Res() res: Response,
    @Req() req: Request,
    @Param('regionId') regionId: number,
  ) {
    const { id: userId } = req['user'];
    const updateResult = await this.userRegionService.setUserRegionPrimary(
      userId,
      Number(regionId),
    );

    return res.status(HttpStatus.OK).json({ ok: true, updateResult });
  }

  @Delete('region/:regionId')
  @UseAuthGuard()
  async deleteUserRegion(
    @Res() res: Response,
    @Req() req: Request,
    @Param('regionId') regionId: number,
  ) {
    const { id: userId } = req['user'];
    const updateResult = await this.userRegionService.deleteUserRegion(
      userId,
      Number(regionId),
    );

    return res.status(HttpStatus.OK).json({ ok: true, updateResult });
  }
}
