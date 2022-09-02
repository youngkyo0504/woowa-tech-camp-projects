import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/exception.filter';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UploadImageModule } from './upload-image/upload-image.module';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/entities/*.entity.{js,ts}'],
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        extra: {
          decimalNumbers: true,
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'client', 'build'),
      exclude: ['/api*', '/docs*'],
    }),
    UserModule,
    RegionModule,
    AuthenticationModule,
    ProductModule,
    UploadImageModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
