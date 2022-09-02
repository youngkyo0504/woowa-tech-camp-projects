import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/createRegion.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Res() res: Response, @Body() createRegionDto: CreateRegionDto) {
    const regionId = await this.regionService.create(createRegionDto);
    return res.status(HttpStatus.CREATED).json({ ok: true, regionId });
  }

  @Get('search')
  async searchByKeyword(
    @Res() res: Response,
    @Query('keyword') keyword: string,
  ) {
    const regions = await this.regionService.searchByKeyword(keyword);
    return res.status(HttpStatus.OK).json({ ok: true, regions });
  }
}
