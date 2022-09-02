import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { randomUUID } from 'crypto';
import * as mime from 'mime-types';
import { S3MulterFile } from './types/S3Multer';

@Controller('upload-image')
export class UploadImageController {
  @Post('product')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'goldmarket-store',
        key: (req, file, cb) =>
          cb(null, `${randomUUID()}.${mime.extension(file.mimetype)}`),
      }),
      fileFilter: (req, file, cb) => {
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              '잘못된 파일 형태입니다.',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
    }),
  )
  uploadFile(@UploadedFile() file: S3MulterFile) {
    return { imgUrl: file.location };
  }
}
